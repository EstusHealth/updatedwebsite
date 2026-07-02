import SEO from '../components/SEO'
import { PageHero, Btn, ReferralButton, BookingButtonPair } from '../components/Bits'
import { REFERRAL_FORM, EMAIL } from '../lib/site'

const STEPS = [
  { h: 'Submit a referral', p: 'Use the self-referral form if you\'re referring yourself or a family member. If you\'re a GP, support coordinator, or another professional, you can use the same form on behalf of your client. Just fill in the "About the client" section with their details.' },
  { h: 'We review and make contact', p: "We'll review the referral and get in touch within 24 hours to discuss next steps, confirm suitability, and arrange an initial appointment." },
  { h: 'We keep you in the loop', p: "If you're a referring professional, we'll keep you updated on progress (with the client's consent) and send through any reports once the assessment or therapy is complete." },
]

const INCLUDE = [
  "Client's name and contact details (or yours, if referring yourself).",
  'What service you\'re enquiring about: NDIS Access Request Support, Functional Capacity Assessment, or Occupational Therapy.',
  'Funding type: private, self-managed NDIS, or plan-managed NDIS.',
  "A brief description of the client's needs. Even a few sentences helps us prepare.",
]

const FAQ = [
  { q: 'Do I need a GP referral?', a: 'No. Self-referrals are welcome for all of our services. You can refer yourself or a family member directly using the self-referral form, no GP letter needed.' },
  { q: 'How quickly will someone get back to me?', a: 'We aim to respond to all enquiries within 24 hours. Our therapists are available Monday to Saturday, 8am to 7pm.' },
  { q: 'What funding types do you accept?', a: 'We accept private, self-managed NDIS, and plan-managed NDIS clients across all of our services.' },
  { q: "What if I'm not sure which service I need?", a: "That's completely fine. Just get in touch and we'll help you work out the right fit. The contact form is the quickest way to start that conversation." },
]

export default function Contact() {
  return (
    <>
      <SEO
        title="Contact Us | Estus Health"
        description="Get in touch with Estus Health. Self-referrals welcome, no GP referral needed. Neuroaffirming OT in Perth and telehealth Australia-wide. We respond within 24 hours."
        path="/contact"
      />
      <PageHero
        eyebrow="Get in Touch"
        title="Contact Us"
        sub2="Have a question, or ready to get started? We're here to help."
      >
        <ReferralButton big>Open Contact Form ▸</ReferralButton>
      </PageHero>

      {/* Self-referral callout + process */}
      <section style={{ paddingTop: 0 }}>
        <div className="wrap wrap--narrow">
          <div className="callout">
            <span className="badge">Good news</span>
            <h2 className="sec-head" style={{ fontSize: 'clamp(1.5rem,4vw,2.2rem)', margin: '14px 0 10px' }}>Self-referrals are welcome.</h2>
            <p style={{ color: 'var(--text-soft)', margin: 0 }}>You don't need a GP or another professional to get started. If you'd like to refer yourself or a family member, use the self-referral form. No referral letter required.</p>
            <p style={{ marginTop: 16 }}><Btn href={REFERRAL_FORM} variant="btn--alt">Open the self-referral form ▸</Btn></p>
          </div>

          <h2 className="sec-head" style={{ fontSize: 'clamp(1.5rem,4vw,2.2rem)', marginTop: 44 }}>The referral process.</h2>
          <div className="numgrid" style={{ marginTop: 28 }}>
            {STEPS.map((s, i) => (
              <article className="card" key={s.h}><div className="num" aria-hidden="true">{i + 1}</div><h3>{s.h}</h3><p>{s.p}</p></article>
            ))}
          </div>

          <div className="callout" style={{ marginTop: 40 }}>
            <h3 style={{ color: 'var(--heading)', textTransform: 'uppercase', fontSize: '1.1rem', marginBottom: 10 }}>What to include in your referral</h3>
            <ul style={{ color: 'var(--text-soft)', paddingLeft: '1.2em', margin: 0 }}>
              {INCLUDE.map((t) => <li key={t} style={{ marginBottom: 6 }}>{t}</li>)}
            </ul>
            <p style={{ marginTop: 14, marginBottom: 0 }}><span className="badge badge--mauve">Accepting private, self-managed, and plan-managed NDIS clients</span></p>
          </div>
        </div>
      </section>

      {/* Discovery call */}
      <section className="tint-section">
        <div className="wrap wrap--narrow" style={{ textAlign: 'center' }}>
          <span className="eyebrow eyebrow--mauve">No pressure</span>
          <h2 className="sec-head" style={{ marginTop: 16 }}>Not ready for a full referral? Start with a conversation.</h2>
          <p className="lead" style={{ margin: '14px auto 0' }}>Book a free 15-minute discovery call to ask questions, check the fit, and figure out next steps. No obligation.</p>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 24 }}><BookingButtonPair /></div>
        </div>
      </section>

      {/* Send a message + sidebar */}
      <section>
        <div className="wrap two-col">
          <div>
            <span className="eyebrow">Say hello</span>
            <h2 className="sec-head" style={{ marginTop: 16 }}>Send us a message.</h2>
            <p className="lead" style={{ marginTop: 14 }}>Use the contact form to ask a question or let us know you're interested. If you're ready to refer yourself or a family member, the self-referral form gives us everything we need to get started quickly.</p>
            <p style={{ marginTop: 22 }}><ReferralButton big>Open Contact Form ▸</ReferralButton></p>

            <h3 style={{ color: 'var(--heading)', textTransform: 'uppercase', marginTop: 48, marginBottom: 18 }}>Common questions</h3>
            <div style={{ display: 'grid', gap: 12 }}>
              {FAQ.map((f) => (
                <details className="card card--static" key={f.q} style={{ padding: '16px 20px' }}>
                  <summary style={{ cursor: 'pointer', fontWeight: 700, color: 'var(--heading)' }}>{f.q}</summary>
                  <p style={{ color: 'var(--text-soft)', margin: '10px 0 0' }}>{f.a}</p>
                </details>
              ))}
            </div>
          </div>

          <aside>
            <div className="card card--static">
              <h3 style={{ color: 'var(--heading)', textTransform: 'uppercase', fontSize: '1rem', marginBottom: 16 }}>Other ways to reach us</h3>
              <dl style={{ margin: 0, display: 'grid', gap: 14 }}>
                <div><dt className="k" style={{ fontFamily: 'var(--f-display)', fontSize: '.7rem', textTransform: 'uppercase', color: 'var(--teal)' }}>Email</dt><dd style={{ margin: '2px 0 0' }}><a href={`mailto:${EMAIL}`} style={{ color: 'var(--mauve)', fontWeight: 700 }}>{EMAIL}</a></dd></div>
                <div><dt className="k" style={{ fontFamily: 'var(--f-display)', fontSize: '.7rem', textTransform: 'uppercase', color: 'var(--teal)' }}>Location</dt><dd style={{ margin: '2px 0 0', color: 'var(--text-soft)' }}>Perth Metro & Telehealth Australia-wide</dd></div>
                <div><dt className="k" style={{ fontFamily: 'var(--f-display)', fontSize: '.7rem', textTransform: 'uppercase', color: 'var(--teal)' }}>Response time</dt><dd style={{ margin: '2px 0 0', color: 'var(--text-soft)' }}>Within 24 hours</dd></div>
                <div><dt className="k" style={{ fontFamily: 'var(--f-display)', fontSize: '.7rem', textTransform: 'uppercase', color: 'var(--teal)' }}>Therapist availability</dt><dd style={{ margin: '2px 0 0', color: 'var(--text-soft)' }}>Monday to Saturday, 8am to 7pm</dd></div>
              </dl>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
