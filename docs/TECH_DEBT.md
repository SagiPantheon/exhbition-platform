# Exhibition Platform — Technical Debt

## Known Risks

1. Several showcase routes exist.
   - `/layout-showcase`
   - `/layout-showcase-v2`
   - planned `/layout-showcase-v3`

2. Some showcase experiments used primitive placeholder geometry.
   - V3 must use real GLB/assets.

3. Scene persistence is local only.
   - Current scene state uses localStorage.
   - This does not sync between home and work computers.
   - Future fix: JSON export/import or project-based scene persistence.

4. Patch-heavy work caused instability.
   - Future rule: after 2–3 failed patches, stop and redesign the approach.

5. Large 3D work must stay lightweight.
   - Work computer compatibility is a priority.
   - Avoid heavy visual experiments in operational editor.

6. Need a real asset inventory map.
   - Must list all GLB / images in public.
   - Must identify which assets are used and which are unused.

## Cleanup Later

Later, after V3 is stable:
- decide whether to keep or archive `/layout-showcase-v2`
- decide whether `/layout-showcase` should be replaced by V3
- document real model paths used in V3
- add scene export/import
- add cross-device sync strategy
