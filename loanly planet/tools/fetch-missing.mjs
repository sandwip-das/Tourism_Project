#!/usr/bin/env node
// Download any cloudfront/imgix image referenced by the mirrored HTML that the
// scrolling harvest missed (hover-only mega-nav art + the page share image),
// then append them to the asset manifest so build-clone can localize them.
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(".");
const SRC_HTML = path.join(ROOT, "RECON", "mirror", "site", "index.html");
const MANIFEST = path.join(ROOT, "assets", "asset-manifest.json");
const IMAGES = path.join(ROOT, "assets", "images");

function pickExt(buf) {
  if (buf.length < 12) return ".bin";
  const ascii = buf.toString("latin1", 0, 32);
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return ".jpg";
  if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) return ".png";
  if (ascii.startsWith("GIF8")) return ".gif";
  if (ascii.startsWith("RIFF") && ascii.slice(8, 12) === "WEBP") return ".webp";
  if (ascii.slice(4, 8) === "ftyp" && /avif|avis/.test(ascii.slice(8, 16))) return ".avif";
  return ".bin";
}

const html = fs.readFileSync(SRC_HTML, "utf8");
const manifest = JSON.parse(fs.readFileSync(MANIFEST, "utf8"));
const haveId = new Set();
const haveBase = new Set();
for (const e of manifest.assets) {
  const id = (e.url.match(/image_[a-z0-9]+/i) || [])[0];
  if (id) haveId.add(id);
  if (/imgix\.net/.test(e.url)) { try { haveBase.add(new URL(e.url).pathname.split("/").pop()); } catch {} }
}

const refs = [...new Set([...html.matchAll(/https:\/\/(?:d2vbr83hnyiux1\.cloudfront\.net|ew-media-production\.imgix\.net)\/[^"'\s)]+/g)].map((m) => m[0]))];
const missing = refs.filter((u) => {
  if (/cloudfront/.test(u)) { const id = (u.match(/image_[a-z0-9]+/i) || [])[0]; return !id || !haveId.has(id); }
  try { return !haveBase.has(new URL(u).pathname.split("/").pop()); } catch { return true; }
});

console.log("missing refs:", missing.length);

for (const rawUrl of missing) {
  const url = rawUrl.replace(/&quot;.*$/, "");
  const id = (url.match(/image_[a-z0-9]+/i) || [])[0];
  const base = (() => { try { return new URL(url).pathname.split("/").pop(); } catch { return null; } })();
  const key = (id || base || "img").replace(/\.[a-z0-9]+$/i, "");
  try {
    const res = await fetch(url, {
      headers: { "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/154 Safari/537.36", referer: "https://www.lonelyplanet.com/" },
    });
    if (!res.ok) { console.log("FAIL", res.status, url.slice(0, 90)); continue; }
    const buf = Buffer.from(await res.arrayBuffer());
    const ext = pickExt(buf);
    const host = new URL(url).host;
    const dir = path.join(IMAGES, host);
    fs.mkdirSync(dir, { recursive: true });
    const file = `${key}-${buf.length.toString(16)}${ext}`;
    fs.writeFileSync(path.join(dir, file), buf);
    manifest.assets.push({ url, kind: "image", via: "fetch-missing", status: "ok", bytes: buf.length, localPath: `images/${host}/${file}` });
    if (id) haveId.add(id);
    console.log("OK", file, buf.length);
  } catch (e) {
    console.log("ERR", e.message, url.slice(0, 90));
  }
}

fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2));
console.log("manifest entries:", manifest.assets.length);
