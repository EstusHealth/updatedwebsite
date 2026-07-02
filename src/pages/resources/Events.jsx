import SEO from '../../components/SEO'
import { PageHero, CTABand, Btn } from '../../components/Bits'
import { SPOTIFY_SHOW } from '../../lib/site'

const EVENTBRITE = 'https://www.eventbrite.com.au/o/estus-health'
const INSTAGRAM = 'https://www.instagram.com/estushealth'

export default function Events() {
  return (
    <>
      <SEO
        title="Events & Media | Estus Health"
        description="Live events, a growing archive of recordings, our Performance Lab: Protocols podcast, and the weekly Journal Club on Instagram."
        path="/events"
      />
      <PageHero eyebrow="Events & Media" title="Come along," accent="or catch up."
        sub="Live events, a permanent archive of recordings, our podcast, and the weekly Journal Club. Everything in one place, so nothing disappears after the live date." />

      {/* Eventbrite */}
      <section style={{ paddingTop: 0 }}>
        <div className="wrap wrap--narrow">
          <span className="eyebrow">Live events</span>
          <h2 className="sec-head" style={{ marginTop: 16 }}>Bi-monthly, in person and online.</h2>
          <p className="lead" style={{ marginTop: 14 }}>We run events every couple of months on the things clients and clinicians keep asking about. Recent topics include gaming in therapy and boundary setting. See what's coming up and grab a spot on Eventbrite.</p>
          <p style={{ marginTop: 20 }}><Btn href={EVENTBRITE} big>See upcoming events ↗</Btn></p>
          {/* NOTE: pull live upcoming/past events from Eventbrite at build time; do not hardcode dates. */}
        </div>
      </section>

      {/* Archive */}
      <section className="tint-section">
        <div className="wrap wrap--narrow">
          <span className="eyebrow eyebrow--mauve">Event archive</span>
          <h2 className="sec-head" style={{ marginTop: 16 }}>Missed one? Watch it back.</h2>
          <p className="lead" style={{ marginTop: 14 }}>Every past event gets a permanent home here with its recording, so it stays a usable resource long after the live date. Recordings are published to our YouTube channel and embedded on this page as they go up.</p>
        </div>
      </section>

      {/* Podcast */}
      <section>
        <div className="wrap wrap--narrow">
          <span className="eyebrow">Podcast</span>
          <div className="card card--static" style={{ marginTop: 20 }}>
            <span className="badge">Performance Lab: Protocols</span>
            <p style={{ color: 'var(--text-soft)', margin: '14px 0 0' }}>Conversations at the intersection of allied health, gaming, AI, and behavioural science. Leadership, retention, burnout, chronic pain, tech in therapy. With clinicians who are actually doing the work.</p>
            <p style={{ color: 'var(--text-soft)', margin: '10px 0 0', fontSize: '.9rem' }}>Episodes feature Liam and Nik.</p>
            <p style={{ marginTop: 18, marginBottom: 0 }}><Btn href={SPOTIFY_SHOW}>Listen on Spotify ↗</Btn></p>
          </div>
        </div>
      </section>

      {/* Instagram / Journal Club */}
      <section className="tint-section">
        <div className="wrap wrap--narrow">
          <span className="eyebrow eyebrow--mauve">Instagram</span>
          <h2 className="sec-head" style={{ marginTop: 16 }}>Journal Club, every week.</h2>
          <p className="lead" style={{ marginTop: 14 }}>Our weekly Journal Club lives on Instagram. It runs on Open Loops, our free journaling tool. Read the week's prompt, then work through your own loops in the tool.</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 20 }}>
            <Btn href={INSTAGRAM}>Follow on Instagram ↗</Btn>
            <Btn to="/resources/open-loops" variant="btn--ghost">Open Loops ▸</Btn>
          </div>
        </div>
      </section>

      <CTABand
        title="Want support, not just resources?"
        body="Our events and media are free and open to everyone. When you're ready for one-on-one support, we're here."
        buttons={<Btn to="/contact" big>Make a Referral ▸</Btn>}
      />
    </>
  )
}
