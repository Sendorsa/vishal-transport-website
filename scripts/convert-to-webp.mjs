/**
 * Converts the served image sources to WebP.
 *
 * next/image already delivers AVIF regardless of source format, so this does
 * not change what users download — it cuts repository and deploy weight, and
 * shortens cold-start optimization. Quality is kept high (photos q88, marks
 * lossless) because these files are the input to that optimization step.
 *
 * Run: node scripts/convert-to-webp.mjs
 */
import { readdir, stat, unlink } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const DIRS = [
  { dir: "public/photos", opts: { quality: 88 } },
  { dir: "public/partners", opts: { lossless: true } },
  { dir: "public/brand", opts: { lossless: true } },
];

let before = 0;
let after = 0;
const renamed = [];

for (const { dir, opts } of DIRS) {
  for (const f of await readdir(dir)) {
    if (!/\.(png|jpe?g)$/i.test(f)) continue;
    const src = path.join(dir, f);
    const out = src.replace(/\.(png|jpe?g)$/i, ".webp");
    const b = (await stat(src)).size;

    await sharp(src).webp(opts).toFile(out);
    const a = (await stat(out)).size;

    if (a >= b) {
      // WebP lost — keep the original and drop the conversion.
      await unlink(out);
      before += b;
      after += b;
      console.log(`${f.padEnd(34)} ${String(Math.round(b / 1024)).padStart(4)}KB  kept (webp was larger)`);
      continue;
    }

    await unlink(src);
    renamed.push([f, path.basename(out)]);
    before += b;
    after += a;
    console.log(
      `${f.padEnd(34)} ${String(Math.round(b / 1024)).padStart(4)}KB → ${String(Math.round(a / 1024)).padStart(4)}KB  ${path.basename(out)}`,
    );
  }
}

console.log(
  `\nTOTAL ${Math.round(before / 1024)}KB → ${Math.round(after / 1024)}KB  (saved ${Math.round((before - after) / 1024)}KB, ${Math.round((1 - after / before) * 100)}%)`,
);
console.log(`converted: ${renamed.length} files`);
