import SEO from '../components/SEO'
import { PageHero, Btn } from '../components/Bits'

export default function NotFound() {
  return (
    <>
      <SEO title="Page not found | Estus Health" description="That page does not exist." noindex />
      <PageHero eyebrow="Error 404" title="Nothing" accent="here." sub="That page does not exist, or it moved. Let's get you back on track.">
        <Btn to="/" big>Back to home ▸</Btn>
        <Btn to="/resources" variant="btn--alt" big>Free Resources</Btn>
      </PageHero>
    </>
  )
}
