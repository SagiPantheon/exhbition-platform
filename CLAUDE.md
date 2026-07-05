# CLAUDE.md — Agent Instructions

**START HERE:** Read `PROJECT_PROTOCOL.md` in full before doing anything. It contains all project context and the hard rules. Follow them exactly.

## Critical rules (never break)
- Install ONLY with: `npm install --legacy-peer-deps`
- NEVER run `npm audit fix --force` (breaks 3D)
- NEVER commit `next-env.d.ts`
- Always run `npm run build` before committing (expect 149/149 pages)
- Back up files to `_backups/` before editing
- UI text: Hebrew + English. Code: English. Talk to Sagi in Russian, call him "брат".

## Source of truth
- Exhibits/inventory: `src/data/masterExhibits.ts`
- Tent configurator: `src/app/tents-layout/page.tsx`
- Exhibitions center: `src/app/exhibitions/israel/page.tsx`

## Workflow
`git pull` -> edit -> `npm run build` -> `git add -A` -> `git restore --staged next-env.d.ts` -> `git commit` -> `git push`

For everything else, see PROJECT_PROTOCOL.md.
