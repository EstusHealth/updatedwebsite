import { Helmet } from 'react-helmet-async'

const SITE = 'https://www.estushealth.com'
const OG_IMAGE = `${SITE}/og-image.png`

/* The practice itself, declared once in index.html as a JS-less fallback.
   Per-page schema references it by @id rather than restating it, so there is
   one business entity across the site instead of thirty near-copies. */
export const ORG_ID = `${SITE}/#organization`

/*
  Breadcrumb trail for a page. Pass the ancestors and the page itself, e.g.
    breadcrumb([{ name: 'Free Resources', path: '/resources' },
                { name: 'Understanding PDA', path: '/resources/understanding-pda' }])
*/
export function breadcrumb(items) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${SITE}${it.path}`,
    })),
  }
}

/* One of the four things we offer, tied back to the practice as provider. */
export function service({ name, description, path }) {
  return {
    '@type': 'Service',
    name,
    serviceType: name,
    description,
    url: `${SITE}${path}`,
    provider: { '@id': ORG_ID },
    areaServed: [
      { '@type': 'City', name: 'Perth' },
      { '@type': 'Country', name: 'Australia' },
    ],
    availableChannel: {
      '@type': 'ServiceChannel',
      name: 'In person (Perth) and telehealth Australia-wide',
      serviceUrl: `${SITE}/contact`,
    },
  }
}

/*
  A recorded workshop. These are archived recordings with no future session, so
  they are VideoObject rather than Event — an Event with a past date and no
  upcoming instance would misrepresent them.
*/
export function videoObject(w) {
  // A webinar with no recording published yet has videoId null. Claiming a
  // VideoObject for it would describe a video that does not exist.
  if (!w.videoId) return null
  return {
    '@type': 'VideoObject',
    name: w.title,
    description: w.blurb,
    url: `${SITE}${w.path}`,
    thumbnailUrl: `https://i.ytimg.com/vi/${w.videoId}/maxresdefault.jpg`,
    embedUrl: `https://www.youtube-nocookie.com/embed/${w.videoId}`,
    uploadDate: w.dateISO,
    // `duration` in the catalogue is approximate ("~60 min"); keep it as a
    // whole-minute ISO 8601 value and drop it entirely if it is not parseable.
    ...(/(\d+)/.test(w.duration) ? { duration: `PT${w.duration.match(/(\d+)/)[1]}M` } : {}),
    publisher: { '@id': ORG_ID },
  }
}

/*
  Per-page meta. Every route should render one <SEO>. Titles and descriptions
  come from CONTENT-HANDOVER.md where specified.

  `schema` takes a JSON-LD node or an array of them, emitted as an @graph. It
  survives prerendering for free: react-helmet-async writes the script into the
  live DOM, and scripts/prerender.mjs snapshots that DOM, so the structured data
  lands in the static HTML that JS-less crawlers receive.
*/
export default function SEO({ title, description, path = '/', image = OG_IMAGE, type = 'website', noindex = false, schema = null }) {
  const url = `${SITE}${path}`
  const graph = schema ? (Array.isArray(schema) ? schema : [schema]) : null
  return (
    <Helmet>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      <meta name="robots" content={noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1'} />
      {/* No canonical on noindex pages. The 404 renders on whatever unknown URL
          was requested, so any canonical it could claim would point somewhere
          it isn't. */}
      {!noindex && <link rel="canonical" href={url} />}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Estus Health" />
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      {!noindex && <meta property="og:url" content={url} />}
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_AU" />
      <meta name="twitter:card" content="summary_large_image" />
      {/* Helmet requires a single string child on <script>; it ignores
          dangerouslySetInnerHTML. Escaping `<` stops a "</script>" inside any
          description from closing the block early. */}
      {graph && (
        <script type="application/ld+json">
          {JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c')}
        </script>
      )}
    </Helmet>
  )
}
