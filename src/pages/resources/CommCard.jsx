import SEO, { breadcrumb } from '../../components/SEO'
import { PageHero, CTABand, Btn } from '../../components/Bits'
import { COMMCARD_APP, EMAIL } from '../../lib/site'

const FEATURES = [
  ['Your Privacy, Protected', 'CommCard does not collect, store, or transmit any personal data. Nothing you type or speak is recorded or sent anywhere. Your communication is yours alone.'],
  ['Text-to-Speech', 'Tap a phrase to hear it spoken aloud. Adjust voice, speed, and volume in settings. For moments when showing a screen works better than finding words.'],
  ['Ready-Made Phrases', 'Six categories of pre-written phrases covering common situations: Right Now, Low Battery, Setting the Scene, Out in the World, Explaining Me, and At Appointments.'],
  ['Make Your Own Cards', 'Create custom communication cards with your own words. Choose your colour. Download as an image or show directly from your screen.'],
]

const QUOTES = [
  "I can think the words but I can't say them right now.",
  "I need to tell someone how I'm feeling but I don't know where to start.",
  "I'm at a medical appointment and I'm too overwhelmed to explain.",
  "I want to order coffee but verbal communication isn't available to me today.",
]

const USES = [
  'Pre-load it on a client\'s phone as part of a session',
  'Recommend it as part of a communication toolkit alongside AAC devices',
  'Use it during appointments to help clients express needs',
  'Share the link with families and support workers',
  'Add it to therapy resource packs and discharge summaries',
]

const STEPS = [
  ['Open the app', 'Visit CommCard. No download, no signup, no login.'],
  ['Find or create your phrase', 'Pick from six categories, or make a custom card.'],
  ['Show or speak', 'Display it on screen, speak it aloud via text-to-speech, or copy the text.'],
]

export default function CommCard() {
  return (
    <>
      <SEO
        title="CommCard | Words When You Have None"
        description="A free communication tool for moments when speaking is hard. Ready-made phrases and custom cards. No signup, no data collected. A tool by Estus Health."
        path="/resources/commcard"
        schema={breadcrumb([
          { name: 'Home', path: '/' },
          { name: 'Free Resources', path: '/resources' },
          { name: 'CommCard', path: '/resources/commcard' },
        ])}
      />
      <PageHero eyebrow="Augmented Communication App" title="Words When You Have None" sub2="A free communication tool for moments when speaking is hard."
        sub="CommCard gives you ready-made phrases and custom cards you can show on screen or speak aloud. No signup. No data collected. Works on any device with a browser.">
        <Btn href={COMMCARD_APP} big>Open CommCard ↗</Btn>
        <Btn href="#features" variant="btn--alt" big>Learn More Below</Btn>
      </PageHero>

      {/* Features */}
      <section id="features" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <span className="eyebrow">Designed for How Your Brain Works</span>
          <p className="lead" style={{ marginTop: 14 }}>Practical features that stay out of your way when you need them most.</p>
          <div className="grid grid-2" style={{ marginTop: 32 }}>
            {FEATURES.map(([h, p]) => (
              <article className="card" key={h}><h3 style={{ color: 'var(--heading)', textTransform: 'uppercase', fontSize: '1.05rem', marginBottom: 8 }}>{h}</h3><p style={{ color: 'var(--text-soft)', margin: 0 }}>{p}</p></article>
            ))}
          </div>
        </div>
      </section>

      {/* Who for */}
      <section className="tint-section">
        <div className="wrap wrap--narrow">
          <span className="eyebrow eyebrow--mauve">Who CommCard Is For</span>
          <div className="prose" style={{ marginTop: 16 }}>
            <p>CommCard was designed for neurodivergent adults who experience intermittent or situational speech difficulties. That includes autistic adults, people with ADHD who experience verbal shutdowns, selective mutism, burnout-related communication challenges, or anyone who sometimes needs words on a screen instead of in their mouth.</p>
            <p>It is a neuroaffirming tool. It does not try to fix how you communicate. It gives you another way to do it when you need one.</p>
          </div>
          <div style={{ display: 'grid', gap: 12, marginTop: 20 }}>
            {QUOTES.map((q) => <p className="pullquote" key={q} style={{ margin: 0 }}>{q}</p>)}
          </div>
        </div>
      </section>

      {/* For clinicians */}
      <section>
        <div className="wrap wrap--narrow">
          <span className="eyebrow">Recommend CommCard to Your Clients</span>
          <p className="lead" style={{ marginTop: 14 }}>CommCard is a free, no-signup tool you can recommend to clients who experience situational or intermittent communication difficulties. It works on any device with a browser. There is nothing to install, no account to create, and no data is ever collected.</p>
          <ul className="prose" style={{ marginTop: 16 }}>
            {USES.map((u) => <li key={u}>{u}</li>)}
          </ul>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 20 }}>
            <Btn href={COMMCARD_APP}>Share CommCard ↗</Btn>
            <Btn href={`mailto:${EMAIL}`} variant="btn--ghost">Suggest a Phrase</Btn>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="tint-section">
        <div className="wrap">
          <span className="eyebrow eyebrow--mauve">How it works</span>
          <div className="numgrid" style={{ marginTop: 32 }}>
            {STEPS.map(([h, p], i) => (
              <article className="card" key={h}><div className="num" aria-hidden="true">{i + 1}</div><h3>{h}</h3><p>{p}</p></article>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy */}
      <section>
        <div className="wrap wrap--narrow">
          <div className="callout" style={{ textAlign: 'center' }}>
            <p className="pullquote" style={{ borderLeft: 'none', paddingLeft: 0, margin: 0 }}>CommCard does not collect, store, or transmit any personal data. Nothing you type or say through this tool is recorded, saved, or sent to any server. Your communication is yours alone.</p>
            <p style={{ marginTop: 12, marginBottom: 0 }}><span className="badge">CommCard Privacy Promise</span></p>
          </div>
        </div>
      </section>

      <CTABand
        title="Try CommCard now."
        body="Free. Private. No signup needed. Works on any device."
        buttons={<><Btn href={COMMCARD_APP} big>Open CommCard ↗</Btn><Btn href={`mailto:${EMAIL}`} variant="btn--alt" big>Suggest a Phrase</Btn></>}
      />
    </>
  )
}
