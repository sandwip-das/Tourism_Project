# Lonely Planet · Clone Notes

## Source info
- Original URL: https://www.lonelyplanet.com/
- Source repo: No public repository (Astro static output, hashed build assets: `_astro/global.Bs89zo3x.css`, `_astro/landingPageSchema.VQL8-Zjb.css`)
- Original author: Lonely Planet (Lonely Planet Global Inc.)
- License: **Proprietary (NONE)** — no open-source license declared; all text, images, fonts, and branding are Lonely Planet / third-party photographer copyrighted material. **Local study only; do not redistribute or deploy.**
- Attribution requirement: None (which does not make it commercially usable)

## Tech stack
- Original: Astro (`data-theme="khonsu"`, SSR to static HTML) + Tailwind v4 (`_astro/global.*.css`) + Solid islands (`astro-island`, client hydration) + Google Tag Manager.
- Clone: **Plain static HTML/CSS/JS**, no build step; `index.html` is the only page and every asset is localized.
- Toolchain Node: v24.14.1 (used only for the recon/scrape/build scripts; running the site does not require Node).

## Pre-clone assessment
- Complexity: **L3** (single-page long scroll, multiple breakpoints, mega menu, carousel; no WebGL/canvas)
- Recommended mode: **Faithful clone** (keep the original text/images/brand; remove only tracking and scripts)
- High-fidelity targets: layout skeleton, typography, color, hero, mega navigation menu, footer, breakpoint responsiveness.
- Approximated or substituted:
  - Client-injected content (lazy-loaded images, extra carousel slides, search/modal inputs) → the static clone keeps only the SSR first paint.
  - The "American Grotesk Bold Italic" webfont 404s → approximated with local **American Grotesk Bold** (`assets/fonts/fonts.css:5`).
- Not cloned: GTM/GA tracking, A/B experiments, Solid hydration logic, third-party review/ad SDKs, real search backend.
- Main risk: **legal/copyright** (proprietary assets cannot be published); residual brand name/outbound links (unavoidable in a faithful clone).

## Running it
```powershell
# Option 1 (bundled local server, MIME + gzip configured)
node tools\serve.mjs            # http://127.0.0.1:8123/
# Option 2 (any static server)
python -m http.server 8123
```

## What changed (vs. the original)
- **Removed tracking scripts**: GTM (`GTM-P9V444`) and the dataLayer injection — original mirror `RECON/mirror/site/index.html:26-52`; fully removed in the clone.
- **Removed all remote `<script>` tags**: original 24 scripts (Solid islands + tracking) → the clone keeps only 2: JSON-LD structured data plus a local `assets/app.js` (`defer`). Zero external scripts site-wide.
- **Localized images**: remote images from `assets.staticlp.com` / `cloudfront` / `imgix` etc. → `assets/media/` (45 files; all 86 `<img>` tags point locally).
- **Self-hosted fonts**: original `https://assets.staticlp.com/fonts/...` → `assets/fonts/assets.staticlp.com/...`, with `@font-face` rewritten to relative paths; the only remaining external reference (Bold Italic) is gone.
- **Internal link rewrite**: in-site routes (`/…`) point to the live `https://www.lonelyplanet.com/…` (this is a single-page clone, to avoid dead links); the 542 outbound links are genuine breadcrumb/nav/footer navigation intents.
- **Recovered missing images**: `tools/fetch-missing.mjs` fetched 15 more (hover nav images + share images).
- **Injected fix CSS/JS**: `assets/app.css` + `assets/app.js` restore mega-menu open/close, carousel arrows, newsletter form validation, and the keyboard focus ring.

## Original vs. clone
| Module | Original behavior | Clone implementation | Difference / trade-off | Evidence |
|---|---|---|---|---|
| Hero | Hero + "Prince Edward Island, Canada" | Pixel-identical | 0.49% diff | `RECON/screenshots/visual-diff-1440.png` |
| Navigation | Top nav + mega menu (JS toggle) | Static CSS + `app.js` restoring toggle/overlay/Esc/hover | Same behavior | `RECON/screenshots/clone-nav-open.png` |
| Key motion | Carousel (Solid hydration) | `app.js` switches slides manually | First slide in place, rest on demand | `assets/app.js` |
| Content blocks | 100 sections | 100 sections | Same structural count (5/5) | `CLONE_REPORT.md` |
| Mobile | 390 / 768 / 1440 | All three captured | 768 evidence added | `RECON/screenshots/` |

## Clone scores
- Source evidence: 4/5 (real mirrored HTML + CSS + recon JSON; the original's private build source is unavailable)
- Structural fidelity: 3/5 (sections 100/100; but JS-injected img/input/button are counted in the original DOM and absent from the static clone)
- Visual fidelity: **5/5** (1440 diff 0.49%, RMSE 0.031)
- Motion/interaction: 5/5 (mega menu, carousel, form validation all restored; 0 console errors)
- Responsiveness: 4/5 (1440/768/390 aligned)
- Functional completeness: 4/5 (static functionality complete; no search/login backend)
- Content replacement: N/A (faithful clone; original copy/images intentionally kept)
- Legal/deployment risk: **High** (proprietary license; must not be published)
- Overall: a high-fidelity static clone valid as **local study / further development**; **not for public deployment**.

> In the auto report, scripts 1/5, images 3/5, and inputs 2/5 are a "live original DOM vs static SSR" measurement difference — the original injects lazy-loaded images, carousel duplicates, and the search box via JS, and the tracking scripts are the ones we **deliberately removed**. These are expected trade-offs, not defects.

## Replacement map (what to change, where)
- Text → `index.html` (body/title/metadata; `<title>`, `h1`, each section)
- Images/media → `assets/media/` (45 files)
- Colors → CSS variables in `_astro/global.Bs89zo3x.css`: `--core-brand: oklch(44% .1928 261.11)`, `--core-brand-guide: #3a1fe6`, `--core-neutral-ink`, `--core-neutral-paper`
- Fonts → `assets/fonts/fonts.css` (+ `assets/fonts/assets.staticlp.com/`)
- Brand replacement checklist (must be handled before going live): all "Lonely Planet" text and logos, `favicon.ico`, canonical/OG meta (`index.html:1`), the 542 `lonelyplanet.com` outbound links, social accounts, `fb:app_id`, copyright footer.

## Verification
- [x] Runs locally, 0 console errors (`tools/clone-recon.mjs`; clone 0 console / 0 page errors)
- [x] Screenshots compared with the original (`RECON/screenshots/original-{1440,768,390}.png` / `clone-{1440,768,390}.png`)
- [x] `visual-diff.mjs` produced the screenshot diff report (`RECON/visual-diff-1440.json`, 0.49% diff, score 5/5)
- [x] `compare-recon.mjs` produced the comparison report (`CLONE_REPORT.md`)
- [x] `audit-clone.mjs --strict` passed (exit 0, `CLONE_AUDIT.md`; only the expected brand-residue notices)
- [x] Route/interaction/network recon (re-run 2026-10-05, `OD_BROWSER_EXECUTABLE_PATH` pointed at the system Chrome):
  - Original: `RECON/routes/original-route-map.json`, `RECON/interactions/original-interactions.json` (+ first-paint screenshot), `RECON/network/original-network.json` (fixtures include consent/ad endpoints, confirming tracking was removed).
  - Clone: `RECON/routes-clone/clone-route-map.json`; route coverage 0/0 = 100% (single-page site; the seed itself is not counted).
  - `CLONE_REPORT.md` regenerated with the above evidence.
- [ ] Not used: `design-dna.json` (deliberately skipped for the **faithful clone** branch; see the skill's discipline).
- Things we could not verify (recorded honestly):
  - Clone-side `interaction-probe.mjs` failed 3× with `CDP connection closed` (the same script works against the original) — the local clone's interaction probe could not complete, so manual screenshot evidence (`clone-nav-open.png`, etc.) was used instead. Root cause not located; no speculation.
  - The count of lazy-loaded images, carousel duplicates, and search inputs injected by the original after JS hydration cannot be fully matched in the static clone.
  - No original private build source; the `_astro` chunks were not reverse-engineered one by one.
  - The "American Grotesk Bold Italic" source file 404s; approximated with Bold.
