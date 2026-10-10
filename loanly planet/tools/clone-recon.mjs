#!/usr/bin/env node
// Hardened recon harness. The skill's recon-site.mjs drops the CDP socket on
// very tall / image-heavy pages in this environment, so this variant isolates
// each viewport in its own browser process and degrades full-page captures to
// viewport captures instead of failing the whole run.
//
// Usage: node tools/clone-recon.mjs --url <url> --out RECON --label original --widths 1440,768,390
import fs from "node:fs";
import path from "node:path";
import { systemChromium } from "../.od-skills/web-clone-85e17309c6/scripts/lib/system-browser.mjs";

const EXE = process.env.OD_BROWSER_EXECUTABLE_PATH
  || "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

function parseArgs(argv) {
  const out = { url: "", outDir: "RECON", label: "site", widths: [1440, 768, 390], waitMs: 2500, navTimeout: 60000 };
  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === "--url") out.url = argv[++i] || "";
    else if (a === "--out") out.outDir = argv[++i] || "";
    else if (a === "--label") out.label = argv[++i] || "site";
    else if (a === "--widths") out.widths = (argv[++i] || "").split(",").map((n) => Number(n.trim())).filter(Boolean);
    else if (a === "--wait") out.waitMs = Number(argv[++i] || "2500");
    else if (a === "--navigation-timeout") out.navTimeout = Number(argv[++i] || "60000");
  }
  return out;
}

const nowTag = () => new Date().toISOString().slice(11, 19);
const log = (...m) => console.error(nowTag(), ...m);

async function launch() {
  return systemChromium.launch({ executablePath: EXE });
}

async function safeClose(browser) {
  try { await browser?.close(); } catch { /* browser may already be gone */ }
}

const COLLECT = () => {
  const q = (sel) => Array.from(document.querySelectorAll(sel));
  const txt = (n) => (n?.textContent || "").trim().replace(/\s+/g, " ");
  const win = window;
  const scripts = q("script[src]").map((s) => s.src);
  const stylesheets = q("link[rel='stylesheet']").map((s) => s.href);
  const paletteOf = (node) => {
    if (!node) return null;
    const s = getComputedStyle(node);
    return {
      backgroundColor: s.backgroundColor,
      color: s.color,
      borderColor: s.borderTopColor,
      fontFamily: s.fontFamily,
      backgroundImage: s.backgroundImage !== "none" ? s.backgroundImage.slice(0, 400) : "",
    };
  };
  const fontFaces = Array.from(document.styleSheets).flatMap((sheet) => {
    let rules; try { rules = Array.from(sheet.cssRules || []); } catch { return []; }
    return rules.filter((r) => r instanceof CSSFontFaceRule).map((r) => {
      const src = r.style.getPropertyValue("src");
      const srcUrls = Array.from(src.matchAll(/url\(\s*['"]?([^'")]+)['"]?\s*\)/gi)).map((m) => m[1]);
      return {
        family: r.style.getPropertyValue("font-family").replace(/['"]/g, "").trim(),
        weight: r.style.getPropertyValue("font-weight") || "",
        style: r.style.getPropertyValue("font-style") || "",
        srcUrls, cssText: r.cssText, sheetHref: sheet.href || location.href,
      };
    });
  }).slice(0, 80);
  const resources = { images: [], fonts: [], media: [] };
  for (const e of performance.getEntriesByType("resource")) {
    const u = e.name;
    if (/\.(woff2?|ttf|otf|eot)(?:$|[?#])/i.test(u)) resources.fonts.push(u);
    else if (e.initiatorType === "img" || /\.(png|jpe?g|gif|webp|avif|svg|ico)(?:$|[?#])/i.test(u)) resources.images.push(u);
    else if (/\.(mp4|webm|m4v|mp3|ogg)(?:$|[?#])/i.test(u)) resources.media.push(u);
  }
  resources.images = Array.from(new Set(resources.images)).slice(0, 400);
  resources.fonts = Array.from(new Set(resources.fonts)).slice(0, 80);
  resources.media = Array.from(new Set(resources.media)).slice(0, 60);
  const cssRulesAll = Array.from(document.styleSheets).flatMap((sheet) => {
    try { return Array.from(sheet.cssRules || []); } catch { return []; }
  });
  const cssVariables = cssRulesAll.flatMap((rule) => {
    const st = rule.style; if (!st) return [];
    return Array.from(st).filter((n) => n.startsWith("--")).map((n) => [n, st.getPropertyValue(n).trim()]);
  }).slice(0, 300);
  const rootStyle = getComputedStyle(document.documentElement);
  const rootVariables = cssVariables.map(([n]) => [n, rootStyle.getPropertyValue(n).trim()]).filter(([, v]) => v).slice(0, 300);
  let scrollSnapRules = 0; let smoothScrollRules = 0;
  for (const r of cssRulesAll) {
    const t = r.cssText || "";
    if (t.includes("scroll-snap")) scrollSnapRules += 1;
    if (t.includes("scroll-behavior") && t.includes("smooth")) smoothScrollRules += 1;
  }
  const stickyOrFixedCount = q("header,nav,aside,section,div").slice(0, 600)
    .filter((el) => ["sticky", "fixed"].includes(getComputedStyle(el).position)).length;
  const sections = q("header,nav,main,section,article,aside,footer").slice(0, 100).map((node) => {
    const rect = node.getBoundingClientRect();
    const s = getComputedStyle(node);
    return {
      tag: node.tagName.toLowerCase(), id: node.id || "",
      className: String(node.className || "").slice(0, 200), text: txt(node).slice(0, 260),
      rect: { x: Math.round(rect.x), y: Math.round(rect.y), width: Math.round(rect.width), height: Math.round(rect.height) },
      style: { display: s.display, position: s.position, backgroundColor: s.backgroundColor, color: s.color, fontFamily: s.fontFamily, fontSize: s.fontSize },
    };
  });
  const images = q("img").slice(0, 200).map((img) => ({
    src: img.currentSrc || img.src || img.getAttribute("data-src") || "",
    srcset: img.srcset || img.getAttribute("data-srcset") || "",
    alt: img.alt || "", width: img.naturalWidth || img.width || 0, height: img.naturalHeight || img.height || 0,
  }));
  const headings = q("h1,h2,h3,h4").slice(0, 80).map((h) => ({ tag: h.tagName.toLowerCase(), text: txt(h).slice(0, 180) }));
  const backgroundImages = cssRulesAll.flatMap((r) => {
    const bi = r.style?.backgroundImage; if (!bi || bi === "none") return [];
    return Array.from(bi.matchAll(/url\(\s*['"]?([^'")]+)['"]?\s*\)/gi)).map((m) => m[1]);
  }).slice(0, 120);
  return {
    href: location.href, title: document.title, lang: document.documentElement.lang || "",
    bodyTextChars: (document.body?.innerText || "").length,
    scrollHeight: document.documentElement.scrollHeight,
    viewport: { width: window.innerWidth, height: window.innerHeight },
    h1: q("h1").map((h) => txt(h)).filter(Boolean).slice(0, 10),
    headings, metaDescription: document.querySelector("meta[name='description']")?.content || "",
    counts: {
      links: q("a[href]").length, images: q("img").length, video: q("video").length, canvas: q("canvas").length,
      sections: sections.length, forms: q("form").length, buttons: q("button").length,
      inputs: q("input,textarea,select").length,
      interactive: q("a[href],button,input,textarea,select,summary,[role='button'],[tabindex]").length,
      scripts: scripts.length, stylesheets: stylesheets.length,
    },
    frameworks: {
      react: Boolean(win.__REACT_DEVTOOLS_GLOBAL_HOOK__) || Boolean(document.querySelector("#__next,[data-reactroot],[data-reactid]")),
      next: Boolean(document.querySelector("#__next")) || scripts.some((s) => s.includes("/_next/")),
      vue: Boolean(win.__VUE__) || Boolean(document.querySelector("[data-v-app]")),
      nuxt: Boolean(win.__NUXT__) || scripts.some((s) => s.includes("/_nuxt/")),
      svelte: Boolean(document.querySelector("[data-svelte-h]")),
      astro: Boolean(document.querySelector("[data-astro-cid]")) || scripts.some((s) => s.includes("astro")),
      three: Boolean(win.THREE) || scripts.some((s) => /three(\.module)?(\.min)?\.js/i.test(s)),
      gsap: Boolean(win.gsap) || scripts.some((s) => s.toLowerCase().includes("gsap")),
      lenis: Boolean(win.Lenis) || scripts.some((s) => s.toLowerCase().includes("lenis")),
      swiper: Boolean(win.Swiper) || scripts.some((s) => s.toLowerCase().includes("swiper")),
      algolia: Boolean(win.algoliasearch) || scripts.some((s) => s.toLowerCase().includes("algolia")),
    },
    scripts: scripts.slice(0, 150), stylesheets: stylesheets.slice(0, 100),
    sections, cssVariables, rootVariables,
    palette: {
      body: paletteOf(document.body), header: paletteOf(document.querySelector("header")),
      nav: paletteOf(document.querySelector("nav")), main: paletteOf(document.querySelector("main")),
      footer: paletteOf(document.querySelector("footer")),
      buttons: q("button,[role='button'],a[class*='btn' i],a[class*='button' i]").slice(0, 15).map((n) => ({ text: txt(n).slice(0, 40), ...paletteOf(n) })),
    },
    motion: {
      htmlScrollBehavior: getComputedStyle(document.documentElement).scrollBehavior,
      scrollSnapRules, smoothScrollRules, stickyOrFixedCount,
    },
    fonts: Array.from(document.fonts || []).map((f) => f.family).filter(Boolean).slice(0, 50),
    fontFaces, resources, images, backgroundImages,
    canvases: q("canvas").map((c) => ({ width: c.width, height: c.height, cssWidth: c.getBoundingClientRect().width, cssHeight: c.getBoundingClientRect().height })),
  };
};

async function scrollThrough(page, step = 600) {
  const total = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y <= total; y += step) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y).catch(() => {});
    await page.waitForTimeout(90).catch(() => {});
  }
  await page.waitForTimeout(800).catch(() => {});
  await page.evaluate(() => window.scrollTo(0, 0)).catch(() => {});
  await page.waitForTimeout(400).catch(() => {});
}

async function captureShot(width, shotsDir, name, { fullPage }) {
  const browser = await launch();
  try {
    const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
    await page.goto(ARGS.url, { waitUntil: "domcontentloaded", timeout: ARGS.navTimeout });
    await page.waitForLoadState("networkidle", { timeout: 8000 }).catch(() => {});
    await page.waitForTimeout(ARGS.waitMs);
    await scrollThrough(page);
    const out = path.join(shotsDir, name);
    await page.screenshot({ path: out, fullPage });
    return out;
  } finally {
    await safeClose(browser);
  }
}

const ARGS = parseArgs(process.argv.slice(2));
if (!ARGS.url) { console.error("missing --url"); process.exit(1); }

const outDir = path.resolve(ARGS.outDir);
const shotsDir = path.join(outDir, "screenshots");
fs.mkdirSync(shotsDir, { recursive: true });

const consoleState = { errors: [], warnings: [], pageErrors: [] };
const captures = [];
const navigation = [];

for (const width of ARGS.widths) {
  log(`signals @ ${width}px`);
  const browser = await launch();
  try {
    const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
    page.on("console", (m) => {
      const e = { type: m.type(), text: m.text(), viewport: width };
      if (m.type() === "error") consoleState.errors.push(e);
      if (m.type() === "warning") consoleState.warnings.push(e);
    });
    page.on("pageerror", (e) => consoleState.pageErrors.push({ message: e.message, viewport: width }));
    let navState;
    try {
      await page.goto(ARGS.url, { waitUntil: "domcontentloaded", timeout: ARGS.navTimeout });
      navState = { recovered: false, url: page.url(), readyState: await page.evaluate(() => document.readyState) };
    } catch (error) {
      navState = { recovered: true, url: page.url(), warning: error.message };
    }
    navigation.push({ viewport: width, ...navState });
    await page.waitForLoadState("networkidle", { timeout: 8000 }).catch(() => {});
    await page.waitForTimeout(ARGS.waitMs);
    await scrollThrough(page);
    let signals = null;
    for (let attempt = 0; attempt < 2 && !signals; attempt += 1) {
      try { signals = await page.evaluate(COLLECT); }
      catch (e) { log(`signals attempt ${attempt + 1} failed: ${e.message}`); }
    }
    captures.push({ viewport: { width, height: 900 }, signals: signals || {}, screenshot: null });
  } catch (e) {
    log(`viewport ${width} signals failed: ${e.message}`);
    captures.push({ viewport: { width, height: 900 }, signals: {}, screenshot: null });
  } finally {
    await safeClose(browser);
  }

  const shotName = `${ARGS.label}-${width}.png`;
  let shotPath = null;
  try {
    await captureShot(width, shotsDir, shotName, { fullPage: true });
    shotPath = `screenshots/${shotName}`;
    log(`fullpage shot ok @ ${width}`);
  } catch (e) {
    log(`fullpage shot failed @ ${width}: ${e.message}; trying viewport`);
    try {
      await captureShot(width, shotsDir, shotName, { fullPage: false });
      shotPath = `screenshots/${shotName}`;
      log(`viewport shot ok @ ${width}`);
    } catch (e2) {
      log(`viewport shot failed @ ${width}: ${e2.message}`);
    }
  }
  if (captures.length) captures[captures.length - 1].screenshot = shotPath;
}

const result = {
  label: ARGS.label, url: ARGS.url, capturedAt: new Date().toISOString(),
  console: consoleState, navigation, captures,
};
fs.writeFileSync(path.join(outDir, `${ARGS.label}-recon.json`), `${JSON.stringify(result, null, 2)}\n`);

const first = captures[0]?.signals || {};
const lines = [
  `# ${ARGS.label} recon`,
  "",
  `- URL: ${result.url}`,
  `- Title: ${first.title || ""}`,
  `- Lang: ${first.lang || ""}`,
  `- Viewports: ${captures.map((c) => c.viewport.width).join(", ")}`,
  `- Framework signals: ${Object.entries(first.frameworks || {}).filter(([, v]) => v).map(([k]) => k).join(", ") || "none"}`,
  `- Canvas count: ${first.counts?.canvas ?? 0}`,
  `- Video count: ${first.counts?.video ?? 0}`,
  `- Image count: ${first.counts?.images ?? 0}`,
  `- Link count: ${first.counts?.links ?? 0}`,
  `- Console errors: ${consoleState.errors.length}`,
  `- Page errors: ${consoleState.pageErrors.length}`,
  "",
  "## Palette",
  ...Object.entries(first.palette || {}).filter(([k, v]) => k !== "buttons" && v)
    .map(([k, v]) => `- ${k}: bg ${v.backgroundColor} | text ${v.color} | font ${v.fontFamily?.split(",")[0] || ""}`),
  "",
  "## Fonts",
  `- Loaded families: ${(first.fonts || []).join(", ") || "none"}`,
  `- @font-face rules: ${(first.fontFaces || []).length}; font files: ${(first.resources?.fonts || []).length}`,
  "",
  "## Assets",
  `- Image resources loaded: ${(first.resources?.images || []).length}`,
  "",
  "## Screenshots",
  ...captures.map((c) => `- ${c.viewport.width}: ${c.screenshot || "missing"}`),
  "",
];
fs.writeFileSync(path.join(outDir, `${ARGS.label}-summary.md`), lines.join("\n"));
log(`wrote ${ARGS.label}-recon.json`);
console.log(path.join(outDir, `${ARGS.label}-recon.json`));
