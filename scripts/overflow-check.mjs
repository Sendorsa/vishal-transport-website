import { chromium } from "playwright-core";

const CHROME =
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const URL = process.env.URL || "http://localhost:3277/";
const WIDTHS = [320, 360, 375, 390, 414, 430, 480, 768, 1024];

const browser = await chromium.launch({ executablePath: CHROME, headless: true });
let anyFail = false;

for (const width of WIDTHS) {
  const page = await browser.newPage({ viewport: { width, height: 850 } });
  await page.goto(URL, { waitUntil: "networkidle" });

  // Scroll through the page in steps to trigger scroll-linked reveals,
  // tracking the worst horizontal overflow seen at any point.
  const result = await page.evaluate(async (vw) => {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    const doc = document.documentElement;
    let maxScrollW = 0;
    const offenders = new Map();

    const step = Math.max(300, Math.floor(window.innerHeight * 0.6));
    for (let y = 0; y <= doc.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await sleep(90);
      maxScrollW = Math.max(maxScrollW, doc.scrollWidth);
      for (const el of document.body.querySelectorAll("*")) {
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) continue;
        if (r.right > vw + 1 || r.left < -1) {
          const key =
            el.tagName.toLowerCase() +
            "." +
            (typeof el.className === "string"
              ? el.className.split(" ").slice(0, 3).join(".")
              : "");
          const overshoot = Math.max(r.right - vw, -r.left);
          if (!offenders.has(key) || offenders.get(key) < overshoot)
            offenders.set(key, Math.round(overshoot));
        }
      }
    }
    return {
      scrollW: maxScrollW,
      innerW: window.innerWidth,
      offenders: [...offenders.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6),
    };
  }, width);

  const overflow = result.scrollW - result.innerW;
  const ok = overflow <= 1;
  if (!ok) anyFail = true;
  console.log(
    `${ok ? "PASS" : "FAIL"}  ${String(width).padStart(4)}px  scrollW=${result.scrollW} innerW=${result.innerW} overflow=${overflow}px`,
  );
  if (!ok || result.offenders.length) {
    for (const [sel, px] of result.offenders)
      console.log(`        ↳ +${px}px  ${sel}`);
  }
  await page.close();
}

await browser.close();
console.log(anyFail ? "\nRESULT: horizontal overflow detected" : "\nRESULT: no horizontal overflow at any breakpoint");
process.exit(anyFail ? 1 : 0);
