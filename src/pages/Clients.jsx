import SEO, { breadcrumb } from '../components/SEO'
import { SecIntro } from './Home'
import { CLIENT_PORTAL, EMAIL } from '../lib/site'

/*
  For current clients: how to use the PracSuite client portal to book,
  reschedule and cancel without messaging the team. Matches PracSuite's
  Login Portal features (view upcoming, book, reschedule, cancel, shared
  family bookings). The notice window is set in PracSuite, so the copy
  points to it rather than stating a number.
*/
const ACTIONS = [
  { id: 'book', top: 'top-navy', tone: 'c-navy', h: 'Book a session', steps: ['Sign in to the client portal.', 'Choose Book Appointment.', 'Pick your OT, a session type and a time.', 'Confirm. It goes straight into the calendar.'] },
  { id: 'move', top: 'top-blue', tone: 'c-blue', h: 'Move a session', steps: ['Sign in and open your upcoming appointments.', 'Choose the session you want to move.', 'Choose Reschedule and pick a new time.', 'Confirm. Your old time is released.'] },
  { id: 'cancel', top: 'top-plum', tone: 'c-plum', h: 'Cancel a session', steps: ['Sign in and open your upcoming appointments.', 'Choose the session.', 'Choose Cancel and confirm.', 'Want another time? Book a new one straight away.'] },
]

const SETUP = [
  { n: 1, tone: 'c-navy', h: 'Open the portal', p: 'Use the button on this page. Save it to your phone home screen if that helps.' },
  { n: 2, tone: 'c-blue', h: 'Register once', p: 'Use the same email address you gave us, so your appointments link to you.' },
  { n: 3, tone: 'c-teal', h: 'Check your email', p: 'PracSuite sends a link to confirm your email and create a password.' },
  { n: 4, tone: 'c-plum', h: "You're in", p: 'Sign in any time to see what is coming up, and book, move or cancel.' },
]

const FAQ = [
  { q: 'Can I cancel or move a session at short notice?', a: 'The portal lets you change sessions up to our notice cut-off. Inside that window the option is not shown, so email us and we will sort it out with you.' },
  { q: 'I book for my child. How does that work?', a: 'Email us once and we will link your family in PracSuite. After that, when you book, the portal asks who the appointment is for and you can pick your child. You will see their sessions alongside yours.' },
  { q: "I can't see any times that suit.", a: 'The portal only shows open times. Email us and we will look at what else we can do, including the waitlist.' },
  { q: 'Can I see a different OT?', a: 'Usually yes. Email us first so we can hand over properly. Then you can book with them in the portal.' },
  { q: "I can't sign in.", a: `Check you are using the email address we have on file. Still stuck? Email ${EMAIL} and we will fix it.` },
  { q: 'Do I have to use the portal?', a: 'No. It is there so you never have to call or text if you would rather not. Email still works for everything.' },
]

function PortalButton({ big = true }) {
  return (
    <a className={`btn${big ? ' btn--big' : ''}`} href={CLIENT_PORTAL} target="_blank" rel="noopener">
      Open the client portal <span aria-hidden="true">↗</span>
    </a>
  )
}

export default function Clients() {
  return (
    <>
      <SEO
        title="Client Portal: Book, Move or Cancel | Estus Health"
        description="Current Estus Health clients can book, reschedule and cancel sessions themselves in the PracSuite client portal, any time, without calling or texting."
        path="/clients"
        schema={breadcrumb([{ name: 'Home', path: '/' }, { name: 'Client portal', path: '/clients' }])}
      />

      <section className="hero" aria-labelledby="page-title">
        <div className="wrap" style={{ display: 'flex', flexWrap: 'wrap', gap: 48, alignItems: 'center' }}>
          <div style={{ flex: '1 1 480px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 20 }}>
            <span className="eyebrow">For current clients</span>
            <h1 id="page-title" style={{ margin: 0 }}>Your sessions, <span className="accent">your way.</span></h1>
            <p className="sub" style={{ margin: 0 }}>Book, move or cancel your own sessions in the client portal. Any time, day or night. No calls, no texts, no waiting on us.</p>
            <div className="hero-cta" style={{ marginTop: 0 }}>
              <PortalButton />
              <a href="#setup" style={{ fontWeight: 600, color: 'var(--navy)', textDecoration: 'underline', textUnderlineOffset: 3 }}>First time? Set up your login</a>
            </div>
          </div>
          <div className="panel" style={{ flex: '1 1 320px', minWidth: 0, maxWidth: 440, boxShadow: '8px 8px 0 var(--teal-brand)' }}>
            <div className="ph label">In the portal you can</div>
            <div className="pb" style={{ paddingTop: 6, paddingBottom: 6 }}>
              {['See your upcoming sessions', 'Book a new session', 'Move a session to another time', 'Cancel a session', "Book for your child, once we've linked you"].map((t) => (
                <div key={t} className="dots" style={{ borderBottomStyle: 'solid', borderBottomColor: 'var(--hair)', alignItems: 'center' }}>
                  <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="3" strokeLinecap="square" style={{ flex: 'none' }}><path d="M4 12l5 5L20 6" /></svg>
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="how-title" style={{ paddingTop: 8, paddingBottom: 24 }}>
        <div className="wrap">
          <SecIntro eyebrow="Three things, a few taps each" title="Book, move or cancel" id="how-title" />
          <div className="ruled">
            {ACTIONS.map((a) => (
              <div key={a.id} id={a.id} className={`${a.top} jump-target`}>
                <span className="cell-title">{a.h}</span>
                <ol style={{ margin: 0, paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 6, color: 'var(--text-soft)' }}>
                  {a.steps.map((s) => <li key={s}>{s}</li>)}
                </ol>
              </div>
            ))}
          </div>
          <p className="small" style={{ marginTop: 14 }}>Button names can differ slightly on your device. Look for your upcoming appointments after you sign in.</p>
        </div>
      </section>

      <section id="setup" className="jump-target" aria-labelledby="setup-title" style={{ paddingBottom: 24 }}>
        <div className="wrap">
          <SecIntro eyebrow="Do this once" title="Set up your login" id="setup-title" />
          <div className="ruled" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
            {SETUP.map((s) => (
              <div key={s.n}>
                <span className={`step-n ${s.tone}`} aria-hidden="true">{s.n}</span>
                <b style={{ fontSize: '1.2rem' }}>{s.h}</b>
                <span className="cell-body">{s.p}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="tint-section" aria-labelledby="family-title">
        <div className="wrap" style={{ display: 'flex', flexWrap: 'wrap', gap: 32, alignItems: 'center' }}>
          <div style={{ flex: '1 1 420px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <span className="eyebrow">Parents and carers</span>
            <h2 className="sec-head" id="family-title">Booking for your child</h2>
            <p style={{ margin: 0, fontSize: '1.1rem' }}>Your child doesn't need their own login. Email us once and we'll link your family. From then on, when you book, the portal asks who the session is for, and you'll see everyone's sessions in one place.</p>
          </div>
          <div style={{ flex: '1 1 300px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <a className="btn btn--ghost" href={`mailto:${EMAIL}?subject=Please%20link%20my%20family%20in%20the%20portal`}>Ask us to link your family</a>
            <span className="small">Or email {EMAIL} with your name and your child's name.</span>
          </div>
        </div>
      </section>

      <section aria-labelledby="faq-title">
        <div className="wrap" style={{ maxWidth: 900 }}>
          <SecIntro eyebrow="Good to know" title="Questions" id="faq-title" />
          <div className="faq">
            {FAQ.map((f) => (
              <details key={f.q}>
                <summary>{f.q}<span className="plus" aria-hidden="true">+</span></summary>
                <div className="ans">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="final-title" style={{ paddingTop: 8, paddingBottom: 80 }}>
        <div className="wrap">
          <div className="split">
            <div className="l">
              <h2 id="final-title">Ready when you are.</h2>
              <p>The portal is open 24/7. Email us any time for anything it can't do.</p>
            </div>
            <div className="r">
              <a className="btn btn--big" href={CLIENT_PORTAL} target="_blank" rel="noopener">Open the client portal ↗</a>
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
