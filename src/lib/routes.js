/*
  Single source of truth for every indexable URL on the site.

  Three things derive from this list, so adding a page here is the only step
  needed to get it crawled:
    - public/sitemap.xml            (scripts/generate-sitemap.mjs, pre-build)
    - the <noscript> nav in index.html   (vite.config.js transformIndexHtml)
    - the prerender route list      (scripts/prerender.mjs, via the sitemap)

  generate-sitemap.mjs also validates this list against the <Route path> set in
  src/App.jsx and against public/llms.txt, and fails the build on a mismatch.
  A route missing here is a route that never gets prerendered, so the drift is
  worth catching loudly.

  Fields:
    path      Absolute, origin-relative. Trailing slash only for the standalone
              static apps under public/, which are directories, not SPA routes.
    label     Link text in the <noscript> nav. Plain text; escaped at build.
    group     Heading the nav groups this under.
    priority  sitemap.xml <priority>.
    lastmod   sitemap.xml <lastmod>. Hand-edited when the page's content
              meaningfully changes. Do NOT bulk-stamp these to today's date:
              a sitemap where every URL changed at once carries no signal.
    prerender Set false for pages that are already static HTML and have no
              React #root for the prerenderer to wait on. Omitted means true.
*/

export const ROUTES = [
  // Main
  { path: '/', label: 'Home', group: 'Main', priority: 1.0, lastmod: '2026-07-12' },
  { path: '/team', label: 'Meet the Team', group: 'Main', priority: 0.8, lastmod: '2026-07-12' },
  { path: '/contact', label: 'Contact & Referrals', group: 'Main', priority: 0.9, lastmod: '2026-07-12' },

  // Services
  { path: '/services/occupational-therapy', label: 'Occupational Therapy', group: 'Services', priority: 0.8, lastmod: '2026-07-12' },
  { path: '/services/gaming-informed-therapy', label: 'Gaming-Informed Therapy', group: 'Services', priority: 0.8, lastmod: '2026-07-12' },
  { path: '/services/minecraft-program', label: 'Minecraft Program', group: 'Services', priority: 0.8, lastmod: '2026-07-12' },
  { path: '/services/assessments-reports', label: 'Assessments & Reports', group: 'Services', priority: 0.8, lastmod: '2026-07-12' },

  // Events
  { path: '/events', label: 'Events & Webinars', group: 'Events', priority: 0.7, lastmod: '2026-07-12' },
  { path: '/events/gaming-informed-therapy', label: 'Gaming-Informed Therapy Webinar', group: 'Events', priority: 0.7, lastmod: '2026-07-12' },
  { path: '/events/boundary-setting', label: 'Boundary Setting Webinar', group: 'Events', priority: 0.7, lastmod: '2026-07-18' },

  // Guides and tools
  { path: '/resources', label: 'Free Resources', group: 'Free Resources', priority: 0.7, lastmod: '2026-07-12' },
  { path: '/resources/understanding-pda', label: 'Understanding PDA', group: 'Free Resources', priority: 0.6, lastmod: '2026-07-12' },
  { path: '/resources/late-autism-diagnosis', label: 'Late Autism Diagnosis', group: 'Free Resources', priority: 0.6, lastmod: '2026-07-12' },
  { path: '/resources/executive-function-complex-health', label: 'Executive Function & Complex Health', group: 'Free Resources', priority: 0.6, lastmod: '2026-07-12' },
  { path: '/resources/eds-hsd', label: 'EDS & HSD', group: 'Free Resources', priority: 0.6, lastmod: '2026-07-12' },
  { path: '/resources/commcard', label: 'CommCard', group: 'Free Resources', priority: 0.6, lastmod: '2026-07-12' },
  { path: '/resources/lexicon', label: 'The Shared Lexicon', group: 'Free Resources', priority: 0.6, lastmod: '2026-07-12' },
  { path: '/resources/open-loops', label: 'Open Loops', group: 'Free Resources', priority: 0.6, lastmod: '2026-07-12' },
  { path: '/resources/second-brain', label: 'Second Brain', group: 'Free Resources', priority: 0.6, lastmod: '2026-07-12' },
  { path: '/resources/driving-ot', label: 'Driving OT', group: 'Free Resources', priority: 0.6, lastmod: '2026-07-25' },

  // Quizzes
  { path: '/resources/pda-quiz', label: 'PDA Profile Quiz', group: 'Quizzes', priority: 0.6, lastmod: '2026-07-12' },
  { path: '/resources/chronotype-quiz', label: 'Chronotype Quiz', group: 'Quizzes', priority: 0.6, lastmod: '2026-07-12' },
  { path: '/resources/energy-quiz', label: 'Energy Quiz', group: 'Quizzes', priority: 0.6, lastmod: '2026-07-12' },
  { path: '/resources/burnout-quiz', label: 'Autistic Burnout Quiz', group: 'Quizzes', priority: 0.6, lastmod: '2026-07-12' },
  { path: '/resources/gaming-quiz', label: 'Gaming & Wellbeing Quiz', group: 'Quizzes', priority: 0.6, lastmod: '2026-07-12' },
  { path: '/resources/rpg-character-quiz', label: 'RPG Character Build Quiz', group: 'Quizzes', priority: 0.6, lastmod: '2026-07-12' },
  { path: '/resources/eds-hsd-quiz', label: 'EDS/HSD Management Style Quiz', group: 'Quizzes', priority: 0.6, lastmod: '2026-07-12' },
  { path: '/resources/learner-driver-quiz', label: 'Learner Driver Style Quiz', group: 'Quizzes', priority: 0.6, lastmod: '2026-07-12' },
  { path: '/resources/sensory-profile', label: 'Sensory Profile Quiz', group: 'Quizzes', priority: 0.6, lastmod: '2026-07-12' },
  { path: '/resources/boundary-style-quiz', label: 'Boundary Style Quiz', group: 'Quizzes', priority: 0.7, lastmod: '2026-07-18' },

  // Standalone apps: plain static HTML in public/, not React routes.
  { path: '/commcard/', label: 'CommCard App', group: 'Apps', priority: 0.6, lastmod: '2026-07-02', prerender: false },
  { path: '/giveway/', label: 'Give Way! WA Road Rules Arcade', group: 'Apps', priority: 0.6, lastmod: '2026-07-25', prerender: false },
]

/* Routes the prerenderer must skip: no #root, so its readiness gate never
   resolves and the build would fail on a 15s timeout. */
export const NO_PRERENDER = new Set(
  ROUTES.filter((r) => r.prerender === false).map((r) => r.path),
)

/* Nav groups in declaration order, for the <noscript> fallback nav. */
export function routesByGroup() {
  const groups = new Map()
  for (const r of ROUTES) {
    if (!groups.has(r.group)) groups.set(r.group, [])
    groups.get(r.group).push(r)
  }
  return [...groups]
}
