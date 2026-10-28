# Estus Health

Neuroaffirming, gaming-informed occupational therapy. Perth, WA and telehealth
Australia-wide.

Vite + React single-page app on the Estus brand system (2026 rebrand): flat, black-ruled, Oswald and Barlow, one light theme.

## Develop

```bash
npm install
npm run dev      # local dev server
npm run build    # production build to dist/
npm run preview  # serve the production build locally
```

## Deploy (Vercel)

Zero config. Vercel auto-detects Vite (build `npm run build`, output `dist`).
`vercel.json` rewrites all non-file routes to `index.html` for client-side
routing; static files (including the CommCard PWA) are served directly.

## Layout

- `src/styles/tokens.css`: the whole design system. One light theme. Older
  token names are kept so every page re-skins from this file. Pages reference
  semantic tokens only.
- `src/components/` : Layout (nav/footer/theme switch), SEO, shared bits, decor,
  and the quiz result/share components.
- `src/pages/` : one file per route. `src/App.jsx` wires every path, including
  legacy redirects.
- `public/commcard/` : the CommCard PWA, served standalone at `/commcard/`.
  Edit it here; it is deployed as static files.
