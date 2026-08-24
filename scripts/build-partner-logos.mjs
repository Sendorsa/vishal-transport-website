/**
 * Normalises the sourced partner logos into web assets.
 *
 * Sources are whatever each company publishes on its own site, so they arrive
 * at wildly different sizes, aspect ratios and padding. This trims each to its
 * own ink, re-renders at a common master height, and records the trimmed
 * aspect ratio so the wall can reserve an exact box (no CLS).
 *
 * `scale` is optical correction, not geometry. Balance is by rendered AREA, not
 * height: a 1:1 crest at the same height as a 5:1 wordmark covers a fraction of
 * the space and reads as an afterthought. So compact marks get MORE height and
 * very wide wordmarks get less. Run: node scripts/build-partner-logos.mjs
 */
import { mkdir, writeFile } from "node:fs/promises";
import { readFileSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const RAW = process.env.RAW_DIR;
const OUT = "public/partners";
const MASTER_H = 160; // 4× the largest render height (40px) — crisp at 2× DPR

const SOURCES = [
  { slug: "uno-minda", file: "unominda.png", scale: 1 },
  { slug: "dhoot-transmission", file: "dhoot.png", scale: 0.85 },
  { slug: "titan-watches", file: "titan-watches.png", scale: 1.3 },
  { slug: "titan-jewellery", file: "titan-watches2.png", scale: 1.3 },
  { slug: "teal", file: "teal.png", scale: 0.85 },
  // The TEPL nav wordmark is ~12:1 — at any sane width cap it renders ~13px
  // tall and reads as a hairline next to the other marks. The Tata group mark
  // is proportioned like the rest of the wall and is the recognisable brand.
  // The wordmark alternate is kept at tata-electronics-wordmark.png.
  { slug: "tata-electronics", file: "tata.svg", scale: 1.25 },
  { slug: "tata-electronics-wordmark", file: "tatael.svg", scale: 1, recolour: "#486AAE" },
  { slug: "jbm-ogihara", file: "jbm.png", scale: 1 },
  { slug: "suman-nirmal-minda-school", file: "school.png", scale: 1.3 },
];

await mkdir(OUT, { recursive: true });
const manifest = [];

for (const s of SOURCES) {
  const src = path.join(RAW, s.file);
  let input;

  if (s.recolour) {
    // Flat single-colour vector shipped as a white knockout for a dark navbar.
    // Recolouring the fill keeps it vector-sharp; rasterising it white and
    // inverting would fringe the anti-aliased edges.
    const svg = readFileSync(src, "utf8").replaceAll('fill="white"', `fill="${s.recolour}"`);
    input = sharp(Buffer.from(svg), { density: 600 });
  } else {
    input = sharp(src);
  }

  const trimmed = await input
    .ensureAlpha()
    .trim({ threshold: 10 })
    .png()
    .toBuffer({ resolveWithObject: true });

  const { data, info } = trimmed;
  const width = Math.round((info.width / info.height) * MASTER_H);

  await sharp(data)
    .resize({ height: MASTER_H, width, fit: "fill" })
    .png({ compressionLevel: 9, palette: true })
    .toFile(path.join(OUT, `${s.slug}.png`));

  manifest.push({ slug: s.slug, width, height: MASTER_H, scale: s.scale });
  console.log(
    `${s.file.padEnd(20)} → ${s.slug}.png  ${width}×${MASTER_H}  ratio ${(width / MASTER_H).toFixed(2)}  scale ${s.scale}`,
  );
}

// Values are copied straight into content.ts; no runtime manifest is needed.
await writeFile(
  "src/lib/partner-logos.json",
  JSON.stringify(Object.fromEntries(manifest.map((m) => [m.slug, m])), null, 2) + "\n",
);
console.log(`\n${manifest.length} logos → ${OUT}`);
