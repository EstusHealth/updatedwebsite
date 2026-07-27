// Post-build prerender. Most AI/answer-engine crawlers (GPTBot, ClaudeBot,
// PerplexityBot, CCBot) do not execute JavaScript, so a client-rendered SPA
// serves them the shared fallback on every URL instead of the page's real
// content. This drives headless Chromium over `vite preview`, snapshots the
// hydrated DOM for each route in the sitemap, and writes it to
// dist/<route>/index.html. Vercel serves those static files directly (the
// filesystem is checked before the SPA-fallback rewrite), while real users
// still boot the full SPA on top of the snapshot.
import { existsSync } from 'node:fs'
import { readFile, mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { preview } from 'vite'
import { chromium } from 'playwright-core'
import { NO_PRERENDER } from '../src/lib/routes.js'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const DIST = join(ROOT, 'dist')
const ORIGIN = 'https://www.estushealth.com'
const PORT = 4180

// Routes come from the built sitemap so this stays in sync with one source of
// truth. Strip the canonical origin down to path-only.
//
// The sitemap also lists the standalone apps under public/ (/commcard/,
// /giveway/), which are hand-written static HTML with no React #root. The
// readiness gate in snapshot() waits for #root to have children, so those
// would time out, land in `failures`, and fail the build. They are already
// static, so there is nothing to prerender: skip them.
async function readRoutes() {
  const xml = await readFile(join(DIST, 'sitemap.xml'), 'utf8')
  const paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((m) => m[1].replace(ORIGIN, '') || '/')
  return [...new Set(paths)].filter((p) => !NO_PRERENDER.has(p))
}

// Resolve a Chromium to drive, in priority order:
//  1. An explicit executable via PLAYWRIGHT_CHROMIUM_PATH.
//  2. The Chromium pre-installed in this sandbox (used for local verification).
//  3. On serverless Linux (the Vercel build image), @sparticuz/chromium — a
//     dependency-free Chromium that needs no system libraries or OS-specific
//     Playwright download. Vercel's build image reports as an unsupported OS
//     and lacks Chrome's shared libs, so a normal `playwright install` browser
//     will not launch there; this bundled build does.
//  4. A locally-installed Google Chrome (macOS/Windows dev machines).
async function launchBrowser() {
  const explicit = process.env.PLAYWRIGHT_CHROMIUM_PATH
  if (explicit) return chromium.launch({ executablePath: explicit })
  if (existsSync('/opt/pw-browsers/chromium')) {
    return chromium.launch({ executablePath: '/opt/pw-browsers/chromium' })
  }
  if (process.platform === 'linux') {
    const { default: sparticuz } = await import('@sparticuz/chromium')
    return chromium.launch({
      args: sparticuz.args,
      executablePath: await sparticuz.executablePath(),
      headless: true,
    })
  }
  return chromium.launch({ channel: 'chrome' })
}

// Map a route path to its output file: '/' -> dist/index.html,
// '/services/x' -> dist/services/x/index.html.
function outputFile(path) {
  if (path === '/') return join(DIST, 'index.html')
  return join(DIST, path.replace(/^\/+/, ''), 'index.html')
}

async function snapshot(page, path) {
  await page.goto(`http://localhost:${PORT}${path}`, { waitUntil: 'load', timeout: 30000 })
  // Wait for a deterministic "page fully rendered" signal:
  //  - #root has real content and is past the React.lazy Suspense "Loading…"
  //    fallback, and
  //  - react-helmet-async has flushed the head for THIS route. Every page's
  //    <SEO> sets a canonical to its own path, so once the canonical matches
  //    the route we know title/description/canonical are all committed. This
  //    replaces a flaky fixed timeout that could snapshot a stale head.
  await page.waitForFunction(
    (expected) => {
      const root = document.getElementById('root')
      if (!root || root.children.length === 0 || root.innerText.includes('Loading…')) return false
      const link = document.querySelector('link[rel="canonical"]')
      if (!link) return false
      const norm = (p) => p.replace(/\/+$/, '') || '/'
      return norm(new URL(link.href).pathname) === norm(expected)
    },
    path,
    { timeout: 15000 },
  )
  return page.content()
}

async function main() {
  const routes = await readRoutes()
  const server = await preview({ preview: { port: PORT, strictPort: true } })

  // Prerendering is a build-time SEO enhancement, not a hard requirement: if no
  // headless browser can start in this environment (for example @sparticuz
  // Chromium missing system libs like libnss3 in the Vercel build container),
  // skip it and ship the SPA rather than failing the whole deploy. JS-less
  // crawlers then get the shared fallback HTML, exactly as before prerendering
  // existed. This is loud on purpose so a broken browser is easy to spot.
  let browser
  try {
    browser = await launchBrowser()
  } catch (err) {
    console.error('\n==================================================================')
    console.error('  PRERENDER SKIPPED: could not launch a headless browser.')
    console.error(`  ${err.message.split('\n')[0]}`)
    console.error('  The SPA still deploys; JS-less crawlers get the fallback HTML.')
    console.error('==================================================================\n')
    await new Promise((resolve) => server.httpServer.close(resolve))
    return
  }
  const page = await browser.newPage()

  const failures = []
  for (const path of routes) {
    try {
      const html = await snapshot(page, path)
      const file = outputFile(path)
      await mkdir(dirname(file), { recursive: true })
      await writeFile(file, html)
      console.log(`  prerendered ${path}`)
    } catch (err) {
      failures.push(path)
      console.error(`  FAILED ${path}: ${err.message}`)
    }
  }

  await browser.close()
  await new Promise((resolve) => server.httpServer.close(resolve))

  console.log(`\nPrerendered ${routes.length - failures.length}/${routes.length} routes.`)
  if (failures.length) {
    console.error(`Prerender failed for: ${failures.join(', ')}`)
    process.exit(1)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
