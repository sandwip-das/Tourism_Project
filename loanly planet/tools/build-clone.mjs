#!/usr/bin/env node
// Build a faithful local clone from the mirrored Astro source:
//  - localize every cloudfront/imgix image into assets/media/
//  - self-host fonts by rewriting @font-face urls in the real CSS
//  - strip all third-party tracker scripts, preconnects and external JS
//  - keep the real layout CSS so the result matches the original 1:1
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(".");
const SRC = path.join(ROOT, "RECON", "mirror", "site");
const ASSETS = path.join(ROOT, "assets");
const MEDIA = path.join(ASSETS, "media");
const ASTRO_OUT = path.join(ROOT, "_astro");
fs.mkdirSync(MEDIA, { recursive: true });
fs.mkdirSync(ASTRO_OUT, { recursive: true });

const manifest = JSON.parse(fs.readFileSync(path.join(ASSETS, "asset-manifest.json"), "utf8"));
const entries = manifest.assets.filter((a) => a.status === "ok" && a.localPath);

const idOf = (u) => (u.match(/image_[a-z0-9]+/i) || [])[0] || null;
const imgixBaseOf = (u) => {
  try { const p = new URL(u).pathname; return p.split("/").pop(); } catch { return null; }
};

const byId = new Map();
const byImgixBase = new Map();
for (const e of entries) {
  const id = idOf(e.url);
  if (id) {
    const prev = byId.get(id);
    if (!prev || (e.bytes || 0) > (prev.bytes || 0)) byId.set(id, e);
  }
  if (/imgix\.net/.test(e.url)) {
    const base = imgixBaseOf(e.url);
    if (base) {
      const prev = byImgixBase.get(base);
      if (!prev || (e.bytes || 0) > (prev.bytes || 0)) byImgixBase.set(base, e);
    }
  }
}

function pickExt(buf) {
  if (buf.length < 12) return ".bin";
  const ascii = buf.toString("latin1", 0, 32);
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return ".jpg";
  if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) return ".png";
  if (ascii.startsWith("GIF8")) return ".gif";
  if (ascii.startsWith("RIFF") && ascii.slice(8, 12) === "WEBP") return ".webp";
  if (ascii.slice(4, 8) === "ftyp" && /avif|avis/.test(ascii.slice(8, 16))) return ".avif";
  if (buf.toString("latin1", 0, 4) === "wOF2") return ".woff2";
  if (buf.toString("latin1", 0, 4) === "wOFF") return ".woff";
  if (buf[0] === 0x00 && buf[1] === 0x00 && buf[2] === 0x01 && buf[3] === 0x00) return ".ico";
  if (ascii.trimStart().startsWith("<")) return ".svg";
  return ".bin";
}

const copied = new Map(); // key -> relative path
let miss = 0;
function localizeImage(url) {
  let e = null;
  if (/cloudfront\.net/.test(url)) {
    const id = idOf(url);
    if (id) e = byId.get(id);
  } else if (/imgix\.net/.test(url)) {
    const base = imgixBaseOf(url);
    if (base) e = byImgixBase.get(base);
  }
  if (!e) { miss += 1; return null; }
  const srcPath = path.join(ASSETS, e.localPath);
  if (!fs.existsSync(srcPath)) { miss += 1; return null; }
  const key = (idOf(e.url) || imgixBaseOf(e.url) || "img").replace(/\.[a-z0-9]+$/i, "");
  if (copied.has(key)) return copied.get(key);
  const buf = fs.readFileSync(srcPath);
  const ext = pickExt(buf);
  const name = `${key}${ext}`;
  fs.writeFileSync(path.join(MEDIA, name), buf);
  const rel = `assets/media/${name}`;
  copied.set(key, rel);
  return rel;
}

// ---- fonts ----
const fontByUrl = new Map();
for (const e of entries) if (/staticlp\.com/.test(e.url)) fontByUrl.set(e.url, e.localPath);
const fallbackFont = "fonts/assets.staticlp.com/american-grotesk-bold-3456e3713a.woff2";
function localizeFont(url) {
  const lp = fontByUrl.get(url) || fallbackFont;
  return `../assets/${lp}`;
}

// ---------- process HTML ----------
let html = fs.readFileSync(path.join(SRC, "index.html"), "utf8");
const urlRe = /https:\/\/(?:d2vbr83hnyiux1\.cloudfront\.net|ew-media-production\.imgix\.net)\/[^"'\s)]+/g;
html = html.replace(urlRe, (u) => localizeImage(u) || u);

// strip external scripts (any absolute http src) and all local astro module scripts
html = html.replace(/<script\b[^>]*\bsrc="https?:\/\/[^"]*"[^>]*><\/script>/gi, "");
html = html.replace(/<script\b[^>]*\bsrc="\/_astro\/[^"]*"[^>]*><\/script>/gi, "");
html = html.replace(/<script\b[^>]*\bsrc="\/_astro\/[^"]*"[^>]*\/>/gi, "");
// strip inline tracking / env scripts
html = html.replace(/<script(?![^>]*application\/ld\+json)[^>]*>[\s\S]*?<\/script>/gi, (block) => {
  if (/googletagmanager|dataLayer|gtag\(|_env_|newrelic|cohesion|appsflyer|attentivemobile|quantserve|doubleclick|scorecardresearch|Onetrust|oneTrust|cookielaw|getyourguide|COHESION_|TYPESENSE_KEY/i.test(block)) return "";
  return block;
});
// strip tracker noscript fallbacks / external iframes
html = html.replace(/<noscript>[\s\S]*?googletagmanager[\s\S]*?<\/noscript>/gi, "");
html = html.replace(/<iframe\b[^>]*\bsrc="https?:\/\/[^"]*"[^>]*><\/iframe>/gi, "");
// drop analytics payload attributes (they also carried external URLs)
html = html.replace(/\sdata-tagular(?:-[a-z-]+)?="[^"]*"/gi, "");
html = html.replace(/\sdata-view-track(?:="[^"]*")?/gi, "");
html = html.replace(/\sdata-tagular-position="[^"]*"/gi, "");
// remove external preconnect / dns-prefetch / preload / modulepreload
html = html.replace(/<link\b[^>]*rel="(?:preconnect|dns-prefetch|preload|modulepreload)"[^>]*>/gi, "");
// rewrite root-absolute local references
html = html.replace(/(src|href)="\/_astro\//g, '$1="_astro/');
html = html.replace(/href="\/images\/favicon\.ico"/g, 'href="favicon.ico"');
html = html.replace(/href="\/"/g, 'href="index.html"');
// Internal routes would 404 in a static copy — point them at the live site.
html = html.replace(/href="\/(?!\/)([^"]*)"/g, 'href="https://www.lonelyplanet.com/$1"');

// Inspectability hooks for the OpenDesign file panel.
html = html.replace('<main id="main-content"', '<main id="main-content" data-od-id="main-content"');
html = html.replace(/<global-nav\b/, '<global-nav data-od-id="global-navigation"');
html = html.replace(/<footer\b(?![^>]*data-od-id)/, '<footer data-od-id="site-footer"');

// Remove every remaining script (Astro island hydration, theme bootstrap…).
// The page is fully server-rendered, so only JSON-LD needs to stay.
html = html.replace(/<script(?![^>]*application\/ld\+json)[^>]*>[\s\S]*?<\/script>/gi, "");
html = html.replace(/<script(?![^>]*application\/ld\+json)[^>]*\/>/gi, "");

// inject self-hosted font link + app assets just before </head>
const headInject = `<link rel="stylesheet" href="assets/fonts/fonts.css"><link rel="stylesheet" href="assets/app.css">`;
html = html.replace(/<\/head>/i, `${headInject}</head>`);
html = html.replace(/<\/body>/i, `<script src="assets/app.js" defer></script></body>`);

fs.writeFileSync(path.join(ROOT, "index.html"), html);

// ---------- process CSS ----------
for (const file of fs.readdirSync(path.join(SRC, "_astro")).filter((f) => f.endsWith(".css"))) {
  let css = fs.readFileSync(path.join(SRC, "_astro", file), "utf8");
  css = css.replace(/https:\/\/assets\.staticlp\.com\/fonts\/[^)'"]+/g, (u) => localizeFont(u));
  fs.writeFileSync(path.join(ASTRO_OUT, file), css);
}

// favicon
const fav = path.join(SRC, "images", "favicon.ico");
if (fs.existsSync(fav)) fs.copyFileSync(fav, path.join(ROOT, "favicon.ico"));

console.log("images localized:", copied.size, "misses:", miss);
console.log("index.html bytes:", fs.statSync(path.join(ROOT, "index.html")).size);
