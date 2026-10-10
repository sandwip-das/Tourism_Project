#!/usr/bin/env node
// Capture reliable viewport-sized slices down a long page (full-page CDP
// captures crash the headless browser on image-heavy pages here).
import fs from "node:fs";
import path from "node:path";
import { systemChromium } from "../.od-skills/web-clone-85e17309c6/scripts/lib/system-browser.mjs";

const EXE = process.env.OD_BROWSER_EXECUTABLE_PATH || "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const url = process.argv[2];
const outDir = process.argv[3] || "RECON/screenshots";
const label = process.argv[4] || "clone";
const step = Number(process.argv[5] || 900);
const widths = (process.argv[6] || "1440").split(",").map(Number);
fs.mkdirSync(outDir, { recursive: true });

for (const width of widths) {
  const browser = await systemChromium.launch({ executablePath: EXE });
  try {
    const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForLoadState("networkidle", { timeout: 8000 }).catch(() => {});
    await page.waitForTimeout(2000);
    const total = await page.evaluate(() => document.documentElement.scrollHeight);
    let i = 0;
    for (let y = 0; y < total; y += step) {
      await page.evaluate((yy) => window.scrollTo(0, yy), y);
      await page.waitForTimeout(450);
      const name = `${label}-${width}-y${String(i).padStart(2, "0")}.png`;
      // Clip in document coordinates so the slice reflects position y.
      const { data } = await page.connection.send("Page.captureScreenshot", {
        format: "png", fromSurface: true, captureBeyondViewport: true,
        clip: { x: 0, y, width, height: step, scale: 1 },
      }, 60000);
      fs.writeFileSync(path.join(outDir, name), Buffer.from(data, "base64"));
      console.log("shot", name, "y=" + y);
      i += 1;
      if (i > 14) break;
    }
  } finally {
    await browser.close().catch(() => {});
  }
}
