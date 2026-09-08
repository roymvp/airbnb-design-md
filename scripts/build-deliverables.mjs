import { readFile, writeFile, mkdir } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import assert from "node:assert/strict";

const css = await readFile("app/globals.css", "utf8");
const root = css.match(/:root\s*\{([^}]+)\}/)?.[1];
const theme = css.match(/@theme inline\s*\{([^}]+)\}/)?.[1];
assert(root && theme, "Design token blocks must exist");
const variables = (text) =>
  Object.fromEntries(
    [...text.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)].map(([, name, value]) => [
      name,
      value.trim(),
    ]),
  );
const manifest = JSON.parse(await readFile("registry.json", "utf8"));
await writeFile(
  "public/design-tokens.json",
  JSON.stringify(
    {
      name: "airbnb 风格",
      version: "0.1.0",
      source: manifest.items[0].meta.source,
      format: "css-custom-properties",
      values: variables(root),
      theme: variables(theme),
    },
    null,
    2,
  ),
);
await mkdir("public/downloads", { recursive: true });
const included = [
  "app",
  "components",
  "lib",
  "scripts",
  "assets",
  "public/images",
  "public/r",
  "public/design-tokens.json",
  "registry.json",
  "package.json",
  "pnpm-lock.yaml",
  "pnpm-workspace.yaml",
  "tsconfig.json",
  "next-env.d.ts",
  "next.config.mjs",
  "postcss.config.mjs",
  "components.json",
  ".gitignore",
];
execFileSync("tar", [
  "-czf",
  "public/downloads/airbnb-style-starter.tar.gz",
  ...included,
]);
console.log(
  "Built design-tokens.json and self-contained starter archive; no env files, caches, node_modules, or skill persistence.",
);
