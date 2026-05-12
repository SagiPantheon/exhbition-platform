# PROJECT PROTOCOL — IAI Exhibition Platform

## Project
Built by **Sagi Amiel**. Exhibition management system for Israel Aerospace Industries.

## Stack
- Next.js 16, TypeScript, Tailwind CSS
- GitHub: https://github.com/SagiPantheon/exhbition-platform

## Design System
- Background: `#01020e`
- Accent / neon: `#00c8ff` (cyan)
- Branding palette: IAI blue family (`#0080ff`, `#22d3ee`, `#3b82f6`, `#00aaff`)
- Font: Heebo (Hebrew UI), Assistant fallback
- Style: dark military-tech, neon glow, glassmorphism cards

## Divisions
| ID | Hebrew | Notes |
|----|--------|-------|
| `missiles-space-defense` | חטיבת מט"ח | Missiles · Space · Defense (MALM) |
| `elta` | חטיבת אלתא | Radar · Comms · Robotics |
| `aviation` | חטיבת תעופה | MRO · Bedek |
| `uav` | חטיבת כט"צ | UAV / Drones |

## Key Files
- `src/app/page.tsx` — main hub page (clean rewrite, do not bloat)
- `src/app/global-exhibit-bank/page.tsx` — exhibit bank hub
- `src/data/exhibits.ts` — exhibits data source (next to build)
- `public/images/` — all cover and exhibit images
- `public/covers/iai-white.png` — IAI logo white

## Working Rules
1. All code changes via the agreed workflow (Python scripts or direct edits).
2. Run `npm run dev` after every change to verify.
3. `git commit` at the end of every session.
4. UI text: Hebrew and English only.
5. Code (variables, functions, comments): English only.
6. Session language: **Russian**.

## Build Roadmap
| # | Status | Block |
|---|--------|-------|
| 1 | ✅ Done | Hero section, Global Exhibit Bank hub, 4 division cards, animated globe, IAI dot pattern |
| 2 | 🔲 Next | `src/data/exhibits.ts` data layer, division page, exhibit card component |
| 3 | 🔲 | Tent configurator with drag-and-drop layout |
| 4 | 🔲 | Exhibitions center — Israel and abroad views |
| 5 | 🔲 | Polish pass — animations, transitions, print/export |

## Branding Notes
- IAI dot pattern: scattered blue dots (varying size 2–10px, opacity 0.2–0.7) over hero images — see hero in `src/app/page.tsx` for reference implementation.
- Neon lines / SVG connectors used in the division grid to show relationships.
- All division cover images follow naming: `/images/divisions/<id>-cover.png`.
