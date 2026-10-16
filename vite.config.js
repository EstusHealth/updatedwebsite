import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { routesByGroup } from './src/lib/routes.js'

const escape = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/*
  Fills the <noscript> nav in index.html from the route manifest.

  That nav is the only internal link graph a crawler sees if it does not run JS
  and lands on a page the prerenderer did not cover, so a route missing from it
  is an orphan. Generating it means adding a route to src/lib/routes.js is the
  single step needed to get it linked, sitemapped, and prerendered.
*/
function noscriptNav() {
  return {
    name: 'noscript-nav',
    transformIndexHtml(html) {
      const markup = routesByGroup()
        .map(([group, routes]) => {
          const items = routes
            .map((r) => `          <li><a href="${r.path}">${escape(r.label)}</a></li>`)
            .join('\n')
          return `        <h2>${escape(group)}</h2>\n        <ul>\n${items}\n        </ul>`
        })
        .join('\n')
      return html.replace('<!--NOSCRIPT_NAV-->', `\n${markup}\n      `)
    },
  }
}

// The CommCard PWA is copied into public/commcard as a static standalone app,
// so it ships in the same deploy and is reachable at /commcard/.
export default defineConfig({
  plugins: [react(), noscriptNav()],
})
