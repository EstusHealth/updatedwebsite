# Estus Health — Rebuild Brief for Claude Code

## What this repo contains

- `index.html` — the design system for the rebuild. Read this first, in full, including its embedded comments. It defines the theme tokens (neon / neon-light), typography (Bungee, Archivo Black, Poppins), signature UI details (offset hard shadows, 3px borders, dot-grid background, rotated eyebrow chips, squiggle underline, synthwave sun, ticker band), copy rules, and the target route map. Treat it as the spec for every page you build, not just a reference for the homepage.
- `CONTENT-HANDOVER.md` — Revision 2 of the content handover. This is the source of truth for copy, meta/SEO, and content structure, organized by route. It documents what changed from v1 (deleted/merged/new pages) and flags `[DRAFT]` copy that still needs sign-off. Cross-reference its route map against `index.html`'s route map — they should agree; flag me if they don't.
- `estus-health-website-main/` — the old live site (React/Vite). Contains the current implementation, team/profile photos (`team-liam.jpg`, `team-nam.jpg`, `team-nik.jpg`, `team-photo.jpeg`, etc.), and OG/favicon assets. This is being replaced, not extended — see build approach below.
- `open loops.html` and `second brain maker.html` — two standalone lead-magnet tools ("Open Loops" and "Second Brain Setup"), currently styled as retro Windows 98/2000-era UI. These need to be brought into the new site (new routes, linked from Free Resources) and reskinned to match the new design system, while keeping their interactive functionality.
- `commcardv3-main/` — a separate branded PWA (communication card app), currently a standalone HTML/CSS/JS site with its own manifest, icons, and service worker. Keep it functioning as a standalone PWA, but restyle its visual branding (colors, type, header/footer touchpoints) to align with the new design system, and link to/from it from the new main site where relevant.

## Build approach

Start a fresh Vite + React scaffold. Do not build on top of `estus-health-website-main`'s existing code — port over what's reusable (photos, assets, any solid component logic worth keeping) rather than editing that codebase in place. Once the new app is working and assets are migrated, the old `estus-health-website-main` folder can be deleted from the repo.

## Sequence

1. Read `index.html` and `CONTENT-HANDOVER.md` in full before writing any code. Reconcile their route maps into one final route list and show it to me before scaffolding pages.
2. Scaffold the new Vite/React app with the design system from `index.html` extracted into reusable tokens/components (don't hardcode colors or type per-page — follow the "semantic tokens" rule from the mockup's own comments).
3. Build out routes per the reconciled route map, populating each with copy from `CONTENT-HANDOVER.md`. Carry forward unchanged content as noted in the handover; implement the noted changes (deleted pages, merged pages, new `/team` bios, revised nav).
4. Migrate photos and static assets from `estus-health-website-main` (favicons, OG image, team photos, sitemap/robots).
5. Integrate `open loops.html` and `second brain maker.html` as new routes under the resources/tools area, reskinned to the new design system, functionality preserved.
6. Reskin `commcardv3-main` to match the new brand (keep it a standalone PWA), and add a link to it from the new main site.
7. Remove `estus-health-website-main` once migration is complete.
8. Report back: final route list, any `[DRAFT]` copy still needing my sign-off, any open questions from the handover doc you couldn't resolve, and anything in the mockup that was ambiguous or that you deviated from and why.

## Ground rules

- No em-dashes in any copy (per the mockup's copy rules).
- "Neuroaffirming", never "neurodivergent-friendly".
- Second person, short sentences, active voice.
- Respect `prefers-reduced-motion` for all decorative motion.
- Don't invent copy for routes the handover already specifies — only fill gaps flagged `[DRAFT]`, and flag those back to me rather than finalizing them yourself.
