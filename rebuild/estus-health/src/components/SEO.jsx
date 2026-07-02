import { Helmet } from 'react-helmet-async'

const SITE = 'https://www.estushealth.com'
const OG_IMAGE = `${SITE}/og-image.png`

/*
  Per-page meta. Every route should render one <SEO>. Titles and descriptions
  come from CONTENT-HANDOVER.md where specified.
*/
export default function SEO({ title, description, path = '/', image = OG_IMAGE, type = 'website' }) {
  const url = `${SITE}${path}`
  return (
    <Helmet>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Estus Health" />
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="en_AU" />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  )
}
