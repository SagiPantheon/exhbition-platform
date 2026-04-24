# Exhibition Platform — Project State

## Purpose

Exhibition Platform is an internal operational and executive-visibility system for exhibition planning.

The platform should support:
- exhibition asset catalog management
- Space / Air / Land / Naval asset sections
- Israel and abroad exhibition planning
- inventory and support equipment management
- tent / booth / layout planning
- executive-level visual presentation
- future cross-device scene persistence

This project is not only a personal tool. It is intended to become a unified platform for:
1. operational work,
2. management visibility,
3. executive presentation.

## Current Strategic Rule

Do not turn the project into a pile of patches.

If 2–3 small patches do not create visible progress, stop patching and move to:
- component extraction,
- full-file replacement,
- or a clean separate route.

## Stable Areas

### Home
Status: stable enough.
Do not change without real reason.

### Space
Status: stable.
Safe edit-flow exists.
Space can be edited on catalog page and detail / 3D page.
EN / HE parity works.
Legacy static Space routes are disabled.
Dynamic `[slug]` route is the main route.

### Air
Status: working.
Do not touch without real reason.

### Israel Exhibitions
Status: operational page works.
Important Hebrew operational fields exist.
Build-mode logic was improved.
This is an important real-work page.

### Inventory
Status: operational and important.
Inventory is a supporting layer, not the first executive-presentation layer.
Important for quantities, condition, photos, support items, podiums, screens, flags, banners, etc.

### Layout Planning
Route: `/layout-planning`
Status: stable operational editor.
This page must not be broken for showcase experiments.

Purpose:
- real editor mode
- add / move / rotate / scale objects
- layout planning
- stable work-computer compatibility

Important:
- layout scene currently uses localStorage.
- cross-device sync is not solved yet.
- future direction: scene preset / JSON export-import / project-based persistence.

## Showcase Routes

### `/layout-showcase`
Status: experimental old showcase.
Contains useful real-scene work and real model references.
Do not treat as final, but use as source material.

### `/layout-showcase-v2`
Status: technical sandbox only.
Not final.
It used primitive placeholder objects and should not be developed as final visual direction.

### Future `/layout-showcase-v3`
Status: planned main demo showcase.

V3 must preserve the baseline requirements below.

## V3 Showcase Baseline Requirements

V3 must have:
- real existing 3D models/assets, not primitive placeholders
- big almost-full-screen central scene
- minimal top UI
- object libraries/buttons moved down or kept compact
- blue carpet/floor as a real exhibition requirement
- elegant visible floor grid
- bright neon frame/perimeter
- four corner spotlights
- movable / rotatable / scalable inventory and exhibit objects
- stable lightweight performance for the work computer
- no breaking of `/layout-planning`
- clear separation between editor mode and showcase mode

## Visual Direction

The desired visual language:
- premium
- futuristic
- executive-level
- clean dashboard
- high-end exhibition configuration
- not toy-like
- not a small scene
- not primitive boxes
- not patch-on-patch

The central scene is the main wow-argument.
Inventory is important but should be presented as a supporting layer.

## Working Rules

- Work terminal-only.
- Prefer one strong, considered step over many tiny patches.
- Always backup before big replacements.
- Do not touch Home or Air without real reason.
- Do not break `/layout-planning` for showcase work.
- If a code anchor is not found, inspect the live file before editing.
- Do not rediscover old requirements; treat this document as project baseline.
