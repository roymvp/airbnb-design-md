import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";

function luminance(hex) {
  const [r, g, b] = hex.match(/[a-f\d]{2}/gi).map((part) => {
    const s = parseInt(part, 16) / 255;
    return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
function contrast(a, b) {
  const values = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (values[0] + 0.05) / (values[1] + 0.05);
}
assert(contrast("#e00b41", "#ffffff") >= 4.5);
assert(
  contrast("#ff385c", "#ffffff") < 4.5,
  "Source primary needs the documented text-CTA adaptation",
);
assert(contrast("#6a6a6a", "#ffffff") >= 4.5);
assert(contrast("#c13515", "#ffffff") >= 4.5);
const manifest = JSON.parse(await readFile("registry.json", "utf8"));
const built = JSON.parse(await readFile("public/r/airbnb-style.json", "utf8"));
assert.equal(manifest.items[0].files.length, built.files.length);
for (const file of built.files) {
  assert.equal(
    file.content,
    await readFile(file.path, "utf8"),
    `${file.path}: stale registry output`,
  );
  assert(!file.content.includes('from "cn"'));
  assert(
    !file.content.includes("/vercel/share/"),
    "No sandbox paths in shipped source",
  );
}
async function checkText(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) await checkText(path);
    else if (/\.(tsx?|css|mjs|json)$/.test(path))
      assert(
        !(await readFile(path, "utf8")).includes("\uFFFD"),
        `Corrupt Unicode in ${path}`,
      );
  }
}
for (const dir of ["app", "components", "lib", "scripts"]) await checkText(dir);
const tokens = JSON.parse(await readFile("public/design-tokens.json", "utf8"));
assert.equal(tokens.values["--primary"], "#ff385c");
assert.equal(tokens.theme["--radius-md"], "14px");
assert.equal(tokens.theme["--breakpoint-md"], "46.5rem");
console.log(
  `Checks passed: ${built.files.length} source files, token provenance, UTF-8, CTA contrast ${contrast("#e00b41", "#ffffff").toFixed(2)}:1.`,
);
