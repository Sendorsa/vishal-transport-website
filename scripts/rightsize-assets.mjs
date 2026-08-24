/**
 * Trims brand + partner marks to the largest size they are ever painted at.
 *
 * Photographs are deliberately excluded: measured across 320→1440 at 2x DPR,
 * every one of them needs MORE pixels than the 1280px source provides, so
 * shrinking them would degrade desktop. Only the logos were oversized.
 *
 * Run: node scripts/rightsize-assets.mjs
 */
import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

/** slug -> widest CSS px it is ever rendered at (measured, not guessed). */
const MAX_RENDERED = {
  "brand/vishal-logo.png": 390,
  "brand/vishal-logo-mono.png": 390,
  "partners/teal.png": 142,
  "partners/dhoot-transmission.png": 124,
  "partners/jbm-ogihara.png": 86,
  "partners/uno-minda.png": 67,
  "partners/tata-electronics.png": 48,
  "partners/titan-watches.png": 46,
  "partners/titan-jewellery.png": 46,
  "partners/suman-nirmal-minda-school.png": 42,
};

let before = 0;
let after = 0;
console.log("file                                  before            after");

for (const [rel, cssMax] of Object.entries(MAX_RENDERED)) {
  const file = path.join("public", rel);
  const target = cssMax * 2; // 2x for retina
  const src = sharp(file);
  const meta = await src.metadata();
  const b = (await stat(file)).size;

  if ((meta.width ?? 0) <= target) {
    console.log(`${rel.padEnd(38)} ${meta.width}px ${Math.round(b / 1024)}KB  — already at or under ${target}px, skipped`);
    before += b;
    after += b;
    continue;
  }

  const buf = await sharp(file)
    .resize({ width: target, withoutEnlargement: true })
    .png({ compressionLevel: 9, palette: true })
    .toBuffer();

  await sharp(buf).toFile(file);
  const a = buf.length;
  before += b;
  after += a;
  console.log(
    `${rel.padEnd(38)} ${String(meta.width).padStart(4)}px ${String(Math.round(b / 1024)).padStart(4)}KB  →  ${String(target).padStart(4)}px ${String(Math.round(a / 1024)).padStart(4)}KB`,
  );
}

console.log(
  `\nTOTAL  ${Math.round(before / 1024)}KB → ${Math.round(after / 1024)}KB  (saved ${Math.round((before - after) / 1024)}KB, ${Math.round((1 - after / before) * 100)}%)`,
);
