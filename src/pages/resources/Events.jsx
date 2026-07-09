import { Link } from 'react-router-dom'
import SEO from '../../components/SEO'
import { PageHero, CTABand, Btn, PlayIcon } from '../../components/Bits'
import { PODCASTS } from '../../lib/site'
import { WEBINARS, ytThumb } from '../../lib/webinars'

const EVENTBRITE = 'https://www.eventbrite.com.au/o/estus-health'
const INSTAGRAM = 'https://www.instagram.com/estus_health/'

// Featured upcoming event. Update (or clear) as the schedule changes.
const NEXT_EVENT = {
  title: 'Saying No: Boundary Setting for Neurodivergent Brains',
  blurb: 'A practical session on boundaries for neurodivergent brains — why they feel so hard, and how to set them without burning out.',
  url: 'https://www.eventbrite.com/e/saying-no-boundary-setting-for-neurodivergent-brains-tickets-1990458277289',
}

export default function Events() {
  return (
    <>
      <SEO
        title="Events & Media | Estus Health"
        description="Live events, a growing archive of recordings, our podcasts (Performance Lab: Protocols and OT and Yap), and the weekly Journal Club on Instagram."
        path="/events"
      />
      <PageHero eyebrow="Events & Media" title="Come along," accent="or catch up."
        sub="Live events, a permanent archive of recordings, our podcasts, and the weekly Journal Club. Everything in one place, so nothing disappears after the live date." />

      {/* Eventbrite */}
      <section style={{ paddingTop: 0 }}>
        <div className="wrap wrap--narrow">
          <span className="eyebrow">Live events</span>
          <h2 className="sec-head" style={{ marginTop: 16 }}>Bi-monthly, in person and online.</h2>
          <p className="lead" style={{ marginTop: 14 }}>We run events every couple of months on the things clients and clinicians keep asking about. Recent topics include gaming in therapy and boundary setting. See what's coming up and grab a spot on Eventbrite.</p>
          {NEXT_EVENT && (
            <div className="card card--static" style={{ marginTop: 24 }}>
              <span className="badge">Next event</span>
              <h3 style={{ margin: '14px 0 0' }}>{NEXT_EVENT.title}</h3>
              <p style={{ color: 'var(--text-soft)', margin: '10px 0 0' }}>{NEXT_EVENT.blurb}</p>
              <p style={{ marginTop: 18, marginBottom: 0 }}><Btn href={NEXT_EVENT.url}>Get tickets ↗</Btn></p>
            </div>
          )}
          <p style={{ marginTop: 24 }}><Btn href={EVENTBRITE} variant="btn--ghost">See all events ↗</Btn></p>
          {/* NOTE: pull live upcoming/past events from Eventbrite at build time; do not hardcode dates. */}
        </div>
      </section>

      {/* Archive */}
      <section className="tint-section">
        <div className="wrap wrap--narrow">
          <span className="eyebrow eyebrow--mauve">Event archive</span>
          <h2 className="sec-head" style={{ marginTop: 16 }}>Missed one? Watch it back.</h2>
          <p className="lead" style={{ marginTop: 14 }}>Every past event gets its own page here, with the full recording, chapter markers and interactive resources. It stays a usable resource long after the live date.</p>
          <div style={{ display: 'grid', gap: 20, marginTop: 28 }}>
            {WEBINARS.map((w) => (
              <Link key={w.slug} to={w.path} className="card media-card media-card--wide" aria-label={`Watch: ${w.title}`}>
                <div className="media-thumb">
                  <img
                    src={ytThumb(w.videoId)}
                    alt={`${w.title} workshop`}
                    loading="lazy"
                    width="1280" height="720"
                    onError={(e) => {
                      if (!e.currentTarget.dataset.fallback) {
                        e.currentTarget.dataset.fallback = '1'
                        e.currentTarget.src = ytThumb(w.videoId, 'hqdefault')
                      }
                    }}
                  />
                  <span className="play-badge"><PlayIcon /></span>
                </div>
                <div className="media-body">
                  <span className="badge badge--mauve" style={{ alignSelf: 'flex-start' }}>{w.tag}</span>
                  <h3 style={{ color: 'var(--heading)', textTransform: 'uppercase', fontSize: '1.2rem', margin: '2px 0 0', letterSpacing: '-.3px' }}>{w.title}</h3>
                  <p style={{ color: 'var(--text)', fontWeight: 600, margin: 0 }}>{w.subtitle}</p>
                  <div className="media-meta">
                    <span>{w.presenter}</span><span aria-hidden="true">·</span>
                    <span>{w.dateLabel}</span><span aria-hidden="true">·</span>
                    <span>{w.duration}</span>
                  </div>
                  <p style={{ color: 'var(--text-soft)', margin: '4px 0 0', fontSize: '.94rem' }}>{w.blurb}</p>
                  <span className="profile-link" aria-hidden="true" style={{ marginTop: 6 }}>Watch the workshop ▸</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Podcasts */}
      <section>
        <div className="wrap wrap--narrow">
          <span className="eyebrow">Podcasts</span>
          <h2 className="sec-head" style={{ marginTop: 16 }}>Two shows, one team.</h2>
          <div className="grid grid-2" style={{ marginTop: 24 }}>
            <div className="card card--static">
              <span className="badge">{PODCASTS.performanceLab.name}</span>
              <p style={{ color: 'var(--text-soft)', margin: '14px 0 0' }}>Conversations at the intersection of allied health, gaming, AI, and behavioural science. Leadership, retention, burnout, chronic pain, tech in therapy. With clinicians who are actually doing the work.</p>
              <p style={{ color: 'var(--text-soft)', margin: '10px 0 0', fontSize: '.9rem' }}>Hosted by Liam.</p>
              <p style={{ marginTop: 18, marginBottom: 0 }}><Btn href={PODCASTS.performanceLab.url}>Listen on Spotify ↗</Btn></p>
            </div>
            <div className="card card--static">
              <span className="badge">{PODCASTS.otAndYap.name}</span>
              <p style={{ color: 'var(--text-soft)', margin: '14px 0 0' }}>Nik's own show: honest, curious conversations about occupational therapy, neurodivergence, and everything in between. Less lecture, more yap.</p>
              <p style={{ color: 'var(--text-soft)', margin: '10px 0 0', fontSize: '.9rem' }}>Hosted by Nik.</p>
              <p style={{ marginTop: 18, marginBottom: 0 }}><Btn href={PODCASTS.otAndYap.url}>Listen on Spotify ↗</Btn></p>
            </div>
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
