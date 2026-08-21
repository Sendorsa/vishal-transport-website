/**
 * One-off authoring step for the brand mark.
 *
 * The supplied `Vishal Logo.png` is the current lockup but has been through a
 * lossy round-trip (~1,070 unique opaque colours, JPEG-style mud on the
 * edges). This snaps every pixel back to the two flat brand colours while
 * keeping the original alpha, then emits the four variants the site needs.
 *
 * Colours target the documented tokens (#0F7DC1 / #1F3265) rather than the
 * file's own #007FEC: white-on-#007FEC measures 4.00:1 and fails WCAG AA,
 * so the site accent cannot follow it. See CLAUDE.md §7.
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SRC = "Vishal Photos/Vishal Logo.png";
const OUT = "public/brand";
const ICON_OUT = "src/app";

const SRC_BLUE = [0, 127, 236];
const SRC_NAVY = [1, 35, 112];
const TGT_BLUE = [15, 125, 193]; // #0F7DC1
const TGT_NAVY = [31, 50, 101]; // #1F3265

/** Emblem bounds inside the source, found from the ink-density trough at x≈665. */
const EMBLEM = { left: 49, top: 73, width: 617, height: 536 };

const dist = (p, o, c) => (p[o] - c[0]) ** 2 + (p[o + 1] - c[1]) ** 2 + (p[o + 2] - c[2]) ** 2;

async function flatten({ mono }) {
  const { data, info } = await sharp(SRC)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const out = Buffer.alloc(data.length);
  for (let i = 0; i < data.length; i += 4) {
    const c = mono
      ? [255, 255, 255]
      : dist(data, i, SRC_BLUE) < dist(data, i, SRC_NAVY)
        ? TGT_BLUE
        : TGT_NAVY;
    out[i] = c[0];
    out[i + 1] = c[1];
    out[i + 2] = c[2];
    out[i + 3] = data[i + 3]; // alpha untouched — never re-cut the shape
  }
  return sharp(out, { raw: { width: info.width, height: info.height, channels: 4 } });
}

await mkdir(OUT, { recursive: true });

for (const mono of [false, true]) {
  const name = mono ? "vishal-logo-mono" : "vishal-logo";

  // Full lockup, trimmed to its own ink so callers control padding.
  await (await flatten({ mono }))
    .png({ compressionLevel: 9 })
    .trim()
    .toFile(path.join(OUT, `${name}.png`));

  // Reduced emblem — the "V" mark on its own, for tight square slots.
  await (await flatten({ mono }))
    .extract(EMBLEM)
    .png({ compressionLevel: 9 })
    .toFile(path.join(OUT, `${name}-emblem.png`));
}

// App Router favicon: emblem on transparent, square, padded so the spikes
// are not flush to the edge.
await sharp(path.join(OUT, "vishal-logo-emblem.png"))
  .resize(180, 180, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .extend({ top: 19, bottom: 19, left: 19, right: 19, background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png({ compressionLevel: 9 })
  .toFile(path.join(ICON_OUT, "icon.png"));

for (const f of ["vishal-logo", "vishal-logo-mono", "vishal-logo-emblem", "vishal-logo-mono-emblem"]) {
  const p = path.join(OUT, `${f}.png`);
  try {
    const m = await sharp(p).metadata();
    console.log(`${f}.png  ${m.width}x${m.height}`);
  } catch {}
}
const icon = await sharp(path.join(ICON_OUT, "icon.png")).metadata();
console.log(`app/icon.png  ${icon.width}x${icon.height}`);
