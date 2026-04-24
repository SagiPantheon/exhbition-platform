# Prompt for New Chat — Exhibition Platform

Continue my Exhibition Platform project in VS Code / Next.js.

Important:
- Work terminal-only.
- Give one precise step at a time.
- Do not return to old breakages.
- Do not patch endlessly.
- If 2–3 small patches do not move the result, stop and use a stronger architectural approach.
- If an anchor is not found, inspect the live file first.
- Do not break `/layout-planning`.

Before coding, treat these files as the project baseline:
- `docs/PROJECT_STATE.md`
- `docs/PROJECT_MAP.md`
- `docs/TECH_DEBT.md`
- `docs/ASSET_INVENTORY.generated.txt`
- `docs/ROUTES.generated.txt`

Current direction:
- `layout-planning` is the stable operational editor.
- `layout-showcase` is old experimental source material.
- `layout-showcase-v2` was a technical sandbox and is not final.
- Build `layout-showcase-v3` as the clean executive demo showcase.

V3 must preserve:
- real existing 3D models/assets, not primitive placeholders
- big almost-full-screen central scene
- minimal top UI
- libraries/buttons moved down or kept compact
- blue carpet/floor as a real exhibition requirement
- elegant visible floor grid
- bright neon frame/perimeter
- four corner spotlights
- movable / rotatable / scalable inventory and exhibit objects
- stable lightweight performance for the work computer
- no breaking of `/layout-planning`
