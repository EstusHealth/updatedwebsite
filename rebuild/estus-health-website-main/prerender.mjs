/**
 * prerender.mjs: Static pre-rendering for Estus Health SPA
 * 
 * Runs after `vite build`, uses react-dom/server to render each route
 * to static HTML. No headless browser needed.
 * 
 * Usage:  vite build && vite build --ssr src/entry-server.jsx --outDir dist/server && node prerender.mjs
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, 'dist');

// ── All routes from your React Router config ──────────────────────────
const ROUTES = [
  '/',
  '/services/occupational-therapy',
  '/services/gaming-informed-therapy',
  '/services/minecraft-program',
  '/services/assessments-reports',
  '/services/sleep-program',
  '/about/approach',
  '/about/team',
  '/learn/understanding-pda',
  '/learn/late-autism-diagnosis',
  '/learn/executive-function-complex-health',
  '/contact',
  '/for-referrers',
  '/for-clinicians/performance-lab',
  '/learn/rpg-character-quiz',
  '/learn/eds-hsd',
  '/learn/eds-hsd-quiz',
];

// ── Per-page SEO meta (title + description) ───────────────────────────
const PAGE_META = {
  '/': {
    title: 'Estus Health | Neuro-Affirming & Gaming-Informed OT in Perth',
    description: 'Neuro-affirming occupational therapy in Perth for autistic adults, teens, and PDA profiles. Gaming-informed therapy, executive function support, NDIS & telehealth.',
  },
  '/services/occupational-therapy': {
    title: 'Occupational Therapy Perth | NDIS & Private | Estus Health',
    description: 'Evidence-based, neuro-affirming occupational therapy in Perth. Daily living skills, sensory regulation, executive function support. NDIS, private & telehealth.',
  },
  '/services/gaming-informed-therapy': {
    title: 'Gaming-Informed Therapy Perth | Estus Health',
    description: 'Gaming-informed occupational therapy for autistic youth and adults in Perth. Using gaming interests as therapeutic tools, not rewards. NDIS funded.',
  },
  '/services/minecraft-program': {
    title: 'Minecraft Therapy Program Perth | Estus Health',
    description: 'Structured Minecraft program for skill-building, social participation, and leadership. Clinician-facilitated digital environment for neurodivergent clients.',
  },
  '/services/assessments-reports': {
    title: 'OT Assessments & Reports Perth | Functional Capacity | Estus Health',
    description: 'Functional capacity assessments, NDIS access request support, and therapy reports. Clear, actionable documentation that translates into real outcomes.',
  },
  '/services/sleep-program': {
    title: 'Sleep Performance Program Perth | Neurodivergent Sleep Support | Estus Health',
    description: 'Clinician-led sleep intervention for neurodivergent adults. Chronotype assessment, sleep architecture, circadian alignment, and personalised protocols. 4-session OT program in Perth.',
  },
  '/about/approach': {
    title: 'Our Approach | Neuro-Affirming OT | Estus Health',
    description: 'Autonomy over compliance. We don\'t fix people. We fix the environment. Neuro-affirming, evidence-informed occupational therapy in Perth.',
  },
  '/about/team': {
    title: 'Our Team | Liam, Nam & Nik | Estus Health',
    description: 'Meet the Estus Health team. Occupational therapists specialising in gaming-informed, neuro-affirming practice for autistic adults and teens in Perth.',
  },
  '/learn/understanding-pda': {
    title: 'Understanding PDA (Pathological Demand Avoidance) | Estus Health',
    description: 'What is PDA? Understanding demand avoidance in autism. Why traditional approaches fail and what actually helps. Perth-based OT perspective.',
  },
  '/learn/late-autism-diagnosis': {
    title: 'Late Autism Diagnosis in Adults | Estus Health',
    description: 'Navigating a late autism diagnosis. Understanding masking, grief, identity, and finding community. Support from neuro-affirming OTs in Perth.',
  },
  '/learn/executive-function-complex-health': {
    title: 'Executive Function & Chronic Illness | Estus Health',
    description: 'Executive function challenges with chronic illness, ME/CFS, and complex health conditions. Energy accounting, capacity management, and OT strategies.',
  },
  '/contact': {
    title: 'Contact & Referrals | Estus Health Perth',
    description: 'Refer a client or enquire about occupational therapy at Estus Health. Accepting private, self-managed, and plan-managed NDIS clients in Perth.',
  },
  '/for-referrers': {
    title: 'For Referrers & Support Coordinators | Estus Health',
    description: 'Referral information for GPs, support coordinators, and allied health professionals. Clear communication, practical recommendations, fast turnaround.',
  },
  '/for-clinicians/performance-lab': {
    title: 'Performance Lab | Protocols for Allied Health Clinicians | Estus Health',
    description: 'Podcast, newsletter, and community of practice for allied health clinicians. Protocols for health, performance, burnout, and longevity. Built by Estus Health.',
  },
  '/learn/eds-hsd': {
    title: 'EDS & Hypermobility Spectrum Disorder | Neurodivergence Overlap | Estus Health',
    description: 'Ehlers-Danlos Syndromes and HSD explained for neurodivergent people. How hypermobility intersects with autism, ADHD, executive function, and daily life. OT support in Perth.',
  },
  '/learn/eds-hsd-quiz': {
    title: 'EDS/HSD Management Style Quiz | Estus Health',
    description: 'Discover your EDS/HSD management style. Are you a Strategist, Surfer, Fortress, or Alchemist? Practical tips for neurodivergent people managing hypermobility.',
  },
};

// ── Structured Data (JSON-LD) ─────────────────────────────────────────
const STRUCTURED_DATA = {
  organization: {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    'name': 'Estus Health',
    'url': 'https://www.estushealth.com',
    'description': 'Neuro-affirming, gaming-informed occupational therapy for autistic adults, teens, and PDA profiles in Perth, Western Australia.',
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Perth',
      'addressRegion': 'WA',
      'addressCountry': 'AU',
    },
    'areaServed': {
      '@type': 'City',
      'name': 'Perth',
    },
    'medicalSpecialty': 'Occupational Therapy',
    'knowsAbout': [
      'Autism',
      'Pathological Demand Avoidance',
      'Executive Function',
      'Gaming-Informed Therapy',
      'NDIS',
      'Neurodiversity-Affirming Practice',
    ],
    'sameAs': [
      'https://www.linkedin.com/in/liam-f-b50636273/',
    ],
  },
};

// ── Inject SEO + rendered content into HTML shell ─────────────────────
function buildPage(template, appHtml, route) {
  const meta = PAGE_META[route] || PAGE_META['/'];
  const canonical = `https://www.estushealth.com${route === '/' ? '' : route}`;
  const ogImage = 'https://www.estushealth.com/team-photo.jpeg';

  const seoTags = `
    <!-- Pre-rendered SEO Meta -->
    <meta name="description" content="${meta.description}" />
    <link rel="canonical" href="${canonical}" />
    
    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${meta.title}" />
    <meta property="og:description" content="${meta.description}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${ogImage}" />
    <meta property="og:site_name" content="Estus Health" />
    <meta property="og:locale" content="en_AU" />
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${meta.title}" />
    <meta name="twitter:description" content="${meta.description}" />
    <meta name="twitter:image" content="${ogImage}" />
    
    <!-- Structured Data -->
    <script type="application/ld+json">${JSON.stringify(STRUCTURED_DATA.organization)}</script>
  `;

  let html = template;

  // Replace title
  html = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${meta.title}</title>`
  );

  // Remove existing generic meta description
  html = html.replace(
    /<meta\s+name="description"[^>]*>/,
    ''
  );

  // Inject SEO tags before </head>
  html = html.replace('</head>', `${seoTags}\n</head>`);

  // Inject rendered app HTML into the root div
  html = html.replace(
    '<div id="root"></div>',
    `<div id="root">${appHtml}</div>`
  );

  return html;
}

// ── Main ──────────────────────────────────────────────────────────────
async function prerender() {
  console.log('🔧 Starting pre-render...\n');

  // Load the SSR bundle
  const { render } = await import(join(DIST, 'server', 'entry-server.js'));
  
  // Read the client HTML template
  const template = readFileSync(join(DIST, 'index.html'), 'utf-8');

  let rendered = 0;

  for (const route of ROUTES) {
    try {
      // Render the route to HTML string
      const { html: appHtml } = render(route);

      // Build the full page
      const fullHtml = buildPage(template, appHtml, route);

      // Write to dist
      const outputPath = route === '/'
        ? join(DIST, 'index.html')
        : join(DIST, route, 'index.html');

      mkdirSync(dirname(outputPath), { recursive: true });
      writeFileSync(outputPath, fullHtml, 'utf-8');

      rendered++;
      console.log(`  ✓ ${route}`);
    } catch (err) {
      console.error(`  ✗ ${route}: ${err.message}`);
    }
  }

  console.log(`\n✅ Pre-rendered ${rendered}/${ROUTES.length} pages`);
  console.log('   Output: ./dist/\n');
}

prerender().catch(console.error);
