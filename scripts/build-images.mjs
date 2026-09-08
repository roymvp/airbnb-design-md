import sharp from "sharp";
import { mkdir, stat } from "node:fs/promises";

await mkdir("public/images", { recursive: true });
for (const name of ["courtyard", "coast", "cabin"]) {
  const target = `public/images/${name}.webp`;
  await sharp(`assets/${name}.png`)
    .resize(640, 640, { fit: "cover" })
    .webp({ quality: 80 })
    .toFile(target);
  console.log(`${name}: ${Math.round((await stat(target)).size / 1024)} KB`);
}
