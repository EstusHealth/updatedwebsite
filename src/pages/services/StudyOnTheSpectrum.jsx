import { Link } from 'react-router-dom'
import SEO, { breadcrumb } from '../../components/SEO'
import { PageHero, CTABand, Btn, ReferralButton, PlayIcon } from '../../components/Bits'
import { EMAIL, STUDY_FORM } from '../../lib/site'

/* ==========================================================================
   Study On The Spectrum: done-with-you study support, launching 2027.
   A pre-launch landing page. Three things are placeholders waiting on
   content, and each is a single edit:
     - STUDY_FORM in lib/site.js: the register-interest form URL. While null,
       the register section shows an email fallback instead of the form.
     - VIDEOS: set `youtubeId` on an entry to swap its placeholder for the video.
     - GUIDES: set `to` on an entry to turn its placeholder into a link.
   No Service schema yet: the service is not bookable until launch.
   ========================================================================== */

const VIDEOS = [
  { title: 'Introducing Study On The Spectrum', youtubeId: null },
  { title: 'What a done-with-you session looks like', youtubeId: null },
  { title: 'Setting up a study space that works for your brain', youtubeId: null },
]

const GUIDES = [
  { title: 'Starting when you cannot start', blurb: 'Task initiation for study, and why willpower is the wrong tool.', to: null },
  { title: 'Planning a semester you can actually follow', blurb: 'Turning a unit outline into a week-by-week plan with room for low-energy days.', to: null },
  { title: 'Exams, assessments and reasonable adjustments', blurb: 'What you can ask for, and how to ask for it.', to: null },
]

const WHAT = [
  ['Done with you', 'Support happens while the work happens. You bring the assignment, the reading, or the exam prep, and we work through it alongside you instead of handing you a plan and wishing you luck.'],
  ['Not tutoring', 'We do not teach the subject. We work on how studying happens for you: starting, planning, focus, sensory set-up, energy, and getting back on track after a bad week.'],
  ['Built by OTs', 'Run by occupational therapists who know executive function and neurodivergent brains from the inside. Strategies fit how you work, not how you are told you should.'],
]

const WHO = [
  'High school students heading into senior years or ATAR',
  'TAFE and university students, including those starting in 2027',
  'Adults returning to study after a break, a burnout, or a late diagnosis',
  'Autistic, ADHD, and otherwise neurodivergent students, with or without a formal diagnosis',
]

// Free tools that already help with study, while the program is being built.
const NOW = [
  { to: '/resources/executive-function-complex-health', label: 'Executive Function & Complex Health' },
  { to: '/resources/open-loops', label: 'Open Loops' },
  { to: '/resources/second-brain', label: 'Second Brain' },
  { to: '/resources/energy-quiz', label: 'Energy Quiz' },
  { to: '/resources/chronotype-quiz', label: 'Chronotype Quiz' },
]

const cardHead = { color: 'var(--heading)', textTransform: 'uppercase', fontSize: '1.05rem', marginBottom: 8 }
const soon = { display: 'inline-block', fontSize: '.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--mauve)' }

function VideoSlot({ title, youtubeId }) {
  return (
    <article className="card card--static" style={{ padding: 0, overflow: 'hidden' }}>
      {youtubeId ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
          title={title}
          loading="lazy"
          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ display: 'block', width: '100%', aspectRatio: '16 / 9', border: 0 }}
        />
      ) : (
        <div aria-hidden="true" style={{
          aspectRatio: '16 / 9', display: 'grid', placeItems: 'center',
          background: 'var(--surface)', borderBottom: '2px dashed var(--line)', color: 'var(--text-soft)',
        }}>
          <PlayIcon size={40} />
        </div>
      )}
      <div style={{ padding: '16px 20px' }}>
        {!youtubeId && <span style={soon}>Video coming soon</span>}
        <h3 style={{ fontSize: '1rem', margin: '4px 0 0' }}>{title}</h3>
      </div>
    </article>
  )
}

function RegisterInterest() {
  if (STUDY_FORM) {
    return (
      <>
        <iframe
          src={STUDY_FORM}
          title="Study On The Spectrum: register your interest"
          loading="lazy"
          style={{ display: 'block', width: '100%', minHeight: 720, border: 0, borderRadius: 12, background: 'var(--surface)', marginTop: 24 }}
        />
        <p style={{ color: 'var(--text-soft)', marginTop: 12 }}>
          Form not loading? <a href={STUDY_FORM} target="_blank" rel="noopener">Open it in a new tab</a>.
        </p>
      </>
    )
  }
  const subject = encodeURIComponent('Study On The Spectrum: register interest')
  return (
    <div className="callout" style={{ marginTop: 24 }}>
      <span style={soon}>Form coming soon</span>
      <p style={{ margin: '8px 0 0' }}>
        The registration form is on its way. Until then, email us with your name, the student's year level or
        course, and the best way to reach you, and we will add you to the list.
      </p>
      <p style={{ margin: '12px 0 0', fontWeight: 600 }}>{EMAIL}</p>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 16 }}>
        <Btn href={`mailto:${EMAIL}?subject=${subject}`}>Email to register ▸</Btn>
      </div>
    </div>
  )
}

export default function StudyOnTheSpectrum() {
  return (
    <>
      <SEO
        title="Study On The Spectrum | Study Support Launching 2027 | Estus Health"
        description="Done-with-you study support for autistic, ADHD and neurodivergent students, from Estus Health's occupational therapists. Launching 2027. Register your interest."
        path="/services/study-on-the-spectrum"
        schema={breadcrumb([
          { name: 'Home', path: '/' },
          { name: 'Study On The Spectrum', path: '/services/study-on-the-spectrum' },
        ])}
      />
      <PageHero eyebrow="Study On The Spectrum" badge="Launching 2027" title="Study, done" accent="with you."
        sub2="Done-with-you study support for neurodivergent students."
        sub="Study On The Spectrum is a new program from Estus Health's occupational therapists. We are building it now and opening places in 2027. Register your interest and you will be first to hear when it opens.">
        <Btn to="/services/study-on-the-spectrum#register" big>Register your interest ▸</Btn>
      </PageHero>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <span className="eyebrow">What it is</span>
          <h2 className="sec-head" style={{ marginTop: 16 }}>Do the work, with someone in the room.</h2>
          <div className="grid grid-3" style={{ marginTop: 32 }}>
            {WHAT.map(([h, p]) => (
              <article className="card" key={h}><h3 style={cardHead}>{h}</h3><p style={{ color: 'var(--text-soft)', margin: 0 }}>{p}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="tint-section">
        <div className="wrap wrap--narrow">
          <span className="eyebrow eyebrow--mauve">Who it is for</span>
          <ul style={{ listStyle: 'none', padding: 0, marginTop: 22, display: 'grid', gap: 12 }}>
            {WHO.map((w) => (
              <li key={w} className="card card--static" style={{ padding: '16px 20px', color: 'var(--text-soft)' }}>{w}</li>
            ))}
          </ul>
        </div>
      </section>

      <section id="videos" className="jump-target">
        <div className="wrap">
          <span className="eyebrow">Watch</span>
          <h2 className="sec-head" style={{ marginTop: 16 }}>See how it works.</h2>
          <div className="grid grid-3" style={{ marginTop: 32 }}>
            {VIDEOS.map((v) => <VideoSlot key={v.title} {...v} />)}
          </div>
        </div>
      </section>

      <section id="guides" className="jump-target tint-section">
        <div className="wrap">
          <span className="eyebrow eyebrow--mauve">Guides</span>
          <h2 className="sec-head" style={{ marginTop: 16 }}>Study guides, on the way.</h2>
          <div className="grid grid-3" style={{ marginTop: 32 }}>
            {GUIDES.map((g) => (
              <article className="card card--static" key={g.title}>
                {!g.to && <span style={soon}>Guide coming soon</span>}
                <h3 style={{ ...cardHead, marginTop: 4 }}>{g.to ? <Link to={g.to}>{g.title}</Link> : g.title}</h3>
                <p style={{ color: 'var(--text-soft)', margin: 0 }}>{g.blurb}</p>
              </article>
            ))}
          </div>
          <p style={{ marginTop: 28, color: 'var(--text-soft)' }}>
            Free tools that help with study right now:{' '}
            {NOW.map((n, i) => (
              <span key={n.to}>{i > 0 && ' · '}<Link to={n.to}>{n.label}</Link></span>
            ))}
          </p>
        </div>
      </section>

      <section id="register" className="jump-target">
        <div className="wrap wrap--narrow">
          <span className="eyebrow">Register your interest</span>
          <h2 className="sec-head" style={{ marginTop: 16 }}>Be first to hear when places open.</h2>
          <p className="lead" style={{ marginTop: 14 }}>
            Registering is free and does not commit you to anything. We will get in touch before launch with
            dates, format and fees.
          </p>
          <RegisterInterest />
        </div>
      </section>

      <CTABand
        title="Need support with study now?"
        body="Study On The Spectrum opens in 2027, but our occupational therapists already work on study, executive function and workload in regular OT sessions."
        buttons={<><ReferralButton big /><Btn to="/services/occupational-therapy" variant="btn--alt" big>Occupational Therapy</Btn></>}
      />
    </>
  )
}
