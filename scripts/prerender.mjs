// Post-build prerender. Most AI and answer-engine crawlers (GPTBot, ClaudeBot,
// PerplexityBot, CCBot) do not run JavaScript, so a client-rendered SPA would
// serve them the same empty shell on every URL. This renders every route in the
// sitemap with React on the server (src/entry-server.jsx, built by
// `vite build --ssr`) and writes dist/<route>/index.html. Vercel serves those
// static files directly (the filesystem is checked before the SPA rewrite),
// and real users still boot the full SPA on top.
//
// No headless browser is involved, so there is no environment-dependent step
// that can skip. Any route that renders empty, stuck on "Loading...", or with
// the wrong canonical FAILS THE BUILD. A deploy either has real HTML on every
// page or it does not ship.
//
// It also writes dist/llms-full.txt: the main content of every listed page as
// Markdown, generated from the same render so it can never drift from the site.
import { readFile, mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { NodeHtmlMarkdown } from 'node-html-markdown'
import { ROUTES, NO_PRERENDER } from '../src/lib/routes.js'
import { ORIGIN } from '../src/lib/origin.js'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const DIST = join(ROOT, 'dist')
const SSR_ENTRY = join(ROOT, 'dist-server', 'entry-server.js')

// Minimum visible text for a page to count as really rendered. The emptiest
// real page (a quiz intro) is well over this; the old shell was about 60 words.
const MIN_TEXT_CHARS = 400

function outputFile(path) {
  if (path === '/') return join(DIST, 'index.html')
  return join(DIST, path.replace(/^\/+/, ''), 'index.html')
}

const textOf = (html) => html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()

/* The client template, with its static fallback head removed. index.html
   carries a default <title> and data-rh meta for the bare shell; each page
   gets its own from Helmet instead, so the defaults would only duplicate. The
   <noscript> nav is also dropped: every prerendered page now has real content
   and the site header and footer links. */
function prepareTemplate(raw) {
  return raw
    .replace(/<title>[\s\S]*?<\/title>\s*/, '')
    .replace(/^[ \t]*<(meta|link)[^>]*data-rh="true"[^>]*>\s*$\n?/gm, '')
    .replace(/<noscript>\s*<main>[\s\S]*?<\/noscript>\s*/, '')
}

function headFrom(helmet) {
  if (!helmet) return ''
  return ['title', 'meta', 'link', 'script'].map((k) => helmet[k].toString()).filter(Boolean).join('\n  ')
}

function checkRoute(route, html, helmet) {
  const problems = []
  const text = textOf(html)
  if (text.length < MIN_TEXT_CHARS) problems.push(`only ${text.length} chars of text`)
  if (html.includes('Loading…')) problems.push('stuck on the Suspense "Loading…" fallback')
  if (!route.unlisted) {
    const want = `${ORIGIN}${route.path}`
    const link = helmet?.link?.toString() ?? ''
    const m = link.match(/rel="canonical" href="([^"]+)"/)
    const got = m ? m[1] : null
    const norm = (u) => (u || '').replace(/\/+$/, '')
    if (norm(got) !== norm(want)) problems.push(`canonical is ${got ?? 'missing'}, expected ${want}`)
  }
  return problems
}

/* Just the page's own content (inside <main>), as Markdown, for llms-full.txt.
   Header and footer repeat on every page, so they are left out. */
function mainMarkdown(html) {
  const m = html.match(/<main id="main">([\s\S]*)<\/main>/)
  const md = NodeHtmlMarkdown.translate(m ? m[1] : html)
  // Make relative links absolute so the file stands on its own.
  return md.replace(/\]\(\/(?!\/)/g, `](${ORIGIN}/`).replace(/\n{3,}/g, '\n\n').trim()
}

async function main() {
  const { render } = await import(pathToFileURL(SSR_ENTRY).href)
  const template = prepareTemplate(await readFile(join(DIST, 'index.html'), 'utf8'))
  if (!template.includes('<div id="root"></div>')) throw new Error('dist/index.html has no empty #root to fill')

  const routes = ROUTES.filter((r) => !NO_PRERENDER.has(r.path) && !r.unlisted)
  const failures = []
  const sections = []

  for (const route of routes) {
    try {
      const { html, helmet } = await render(route.path)
      const problems = checkRoute(route, html, helmet)
      if (problems.length) throw new Error(problems.join('; '))

      const page = template
        .replace('</head>', `  ${headFrom(helmet)}\n</head>`)
        .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
      const file = outputFile(route.path)
      await mkdir(dirname(file), { recursive: true })
      await writeFile(file, page)

      if (!route.unlisted) {
        const title = (helmet.title.toString().match(/>([^<]*)</) || [, route.label])[1]
        sections.push(`# ${title}\n\nURL: ${ORIGIN}${route.path}\n\n${mainMarkdown(html)}`)
      }
      console.log(`  prerendered ${route.path}`)
    } catch (err) {
      failures.push(route.path)
      console.error(`  FAILED ${route.path}: ${err.message}`)
    }
  }

  console.log(`\nPrerendered ${routes.length - failures.length}/${routes.length} routes.`)
  if (failures.length) {
    console.error(`Prerender failed for: ${failures.join(', ')}`)
    console.error('Not deploying: these pages would reach crawlers and AI agents with no content.')
    process.exit(1)
  }

  const header = [
    '# Estus Health: full site content',
    '',
    `> Every public page of ${ORIGIN}, as plain Markdown, generated at build time from the live pages. For a short index, see ${ORIGIN}/llms.txt. For key facts in one place, see ${ORIGIN}/ai.`,
    '',
    `Generated: ${new Date().toISOString().slice(0, 10)}`,
  ].join('\n')
  await writeFile(join(DIST, 'llms-full.txt'), `${header}\n\n---\n\n${sections.join('\n\n---\n\n')}\n`)
  console.log(`Wrote dist/llms-full.txt (${sections.length} pages).`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
