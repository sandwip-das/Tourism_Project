# original vs clone · Clone evaluation report

## Conclusion
- Original URL: https://www.lonelyplanet.com/
- Clone URL: http://127.0.0.1:8123/
- Auto-inferred complexity: L3
- Recommended clone mode: visual clone / content rewrite
- Auto-report scope: structure, counts, framework, and console can be compared automatically; with a visual-diff passed in, the pixel-difference score is also included. Content residue and legal matters still require auditing.

## Technical signals
| Item | Original | Clone |
|---|---|---|
| title | Travel Guides & Travel Inspiration - Lonely Planet | Travel Guides & Travel Inspiration - Lonely Planet |
| lang | en | en |
| frameworks | astro | none |
| scrollHeight | 9913 | 8048 |
| h1 | Prince Edward Island, Canada | Prince Edward Island, Canada |

## Count comparison
| Metric | Original | Clone | Auto score |
|---|---:|---:|---:|
| sections | 100 | 100 | 5/5 |
| links | 945 | 906 | 5/5 |
| images | 121 | 86 | 3/5 |
| video | 0 | 0 | 5/5 |
| canvas | 0 | 0 | 5/5 |
| forms | 2 | 2 | 5/5 |
| buttons | 200 | 179 | 4/5 |
| inputs | 17 | 8 | 2/5 |
| interactive | 1174 | 1101 | 5/5 |
| scripts | 24 | 1 | 1/5 |

## Clone scores
- Source evidence: 3/5
- Structural fidelity: 2/5
- Visual fidelity: 5/5
- Motion/interaction: 5/5
- Responsiveness: 4/5
- Functional completeness: 4/5
- Content replacement: needs manual copy-residue review
- Legal/deployment risk: needs manual license/asset check

## Console
- Original console errors: 0
- Clone console errors: 0
- Original page errors: 0
- Clone page errors: 0

## Route coverage
- Original routes: 0
- Clone routes: 0
- Coverage: 100%
- Original route map: RECON/routes/original-route-map.json
- Clone route map: RECON/routes-clone/clone-route-map.json
- Missing routes: none
- Extra routes: none


## Interaction coverage
- No interaction-probe results provided. Interactive sites require --original-interactions / --clone-interactions.


## Screenshot evidence
- Original recon: RECON/original-recon.json
- Clone recon: RECON/clone-recon.json
- Pixel diff: RECON/visual-diff-1440.json
- Pixel difference rate: 0.0048742283950617285
- Original screenshots: screenshots/original-1440.png, screenshots/original-768.png, screenshots/original-390.png
- Clone screenshots: screenshots/clone-1440.png, screenshots/clone-768.png, screenshots/clone-390.png

## Known gaps
- Without a visual-diff passed in, visual fidelity needs manual screenshot confirmation.
- Legal matters, asset licensing, and brand-replacement completeness need manual review.
