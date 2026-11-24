import { Link } from 'react-router-dom'
import SEO, { breadcrumb, ORG_ID } from '../components/SEO'
import { PageHero } from '../components/Bits'
import { RATE, FUNDING, FAQ } from './Contact'
import { TEAM } from './Home'
import { HINGES } from './services/SmallHinges'
import { CAPACITY, EMAIL } from '../lib/site'
import { ORIGIN } from '../lib/origin'

/*
  /ai: key facts for AI assistants, answer engines and agents.

  Plain, factual, one page. Fees, funding, FAQ, team and Small Hinges are
  imported from the pages that show them to people, so this page cannot drift
  from the rest of the site. Update those sources, not this page. Bump
  UPDATED when the hand-written text below changes.
*/
const UPDATED = '24 November 2026'

const WHO = [
  'Autistic adults and teens',
  'PDA (pathological demand avoidance) profiles',
  'ADHD',
  'Late-diagnosed adults',
  'People with complex health alongside neurodivergence, including EDS and hypermobility, POTS and chronic fatigue',
]

const SERVICES = [
  ['Occupational Therapy', '/services/occupational-therapy', 'Ongoing neuroaffirming OT: executive function, daily routines, sensory and emotional regulation, work and study, and life transitions.'],
  ['Small Hinges Programs', '/services/small-hinges', `Short, single-session OT on one area at a time. Clients pick one or several, up to six sessions. Areas: ${HINGES.map((h) => h.h.toLowerCase()).join(', ')}.`],
  ['Gaming-Informed Therapy', '/services/gaming-informed-therapy', 'Therapy that uses games as a real clinical medium, plus a private, clinician-moderated Minecraft Bedrock server for clients between sessions.'],
  ['Assessments & Reports', '/services/assessments-reports', 'Functional capacity assessments, NDIS reports and OT documentation. Done by Nik Peshwani.'],
  ['Live Sessions', '/services/live-sessions', 'Free weekly done-with-you sessions on Discord: Performance Gaming, and The Daily Grind (body doubling for study, admin and planning).'],
  ['Driving OT (coming soon)', '/resources/driving-ot', 'In-person driving assessments in Perth for learner drivers and fitness to drive. Waitlist open now.'],
]

const STEPS = [
  ['Send the referral form', 'About 5 minutes. Self-referrals are welcome and no GP referral is needed.'],
  ['Check your email', 'A link to book the free call arrives as soon as the form is submitted.'],
  ['Free 15 minute welcome call', 'With the OT you would work with. Camera optional. Text, email or chat instead of a call is fine if that suits better.'],
  ['Get a start date', 'Places are offered in the order referrals come in.'],
]

const ROWS = [
  ['What', 'Neuroaffirming occupational therapy practice'],
  ['Where', 'Based in Perth, Western Australia. Telehealth Australia-wide.'],
  ['Hours', 'Monday to Saturday, 8am to 7pm AWST'],
  ['Fee', `${RATE} per hour (AUD), in line with the NDIS price guide. Private clients pay the same rate. The welcome call is free.`],
  ['Funding accepted', FUNDING.filter((f) => f.yes).map((f) => f.label).join(', ')],
  ['Not accepted', FUNDING.filter((f) => !f.yes).map((f) => f.label).join(', ')],
  ['GP referral', 'Not needed'],
  ['Taking new clients', CAPACITY.short],
  ['Contact', EMAIL],
]

const DESC = 'Key facts about Estus Health for AI assistants and answer engines: who we see, services, fees, funding, how referrals work, and the team. Neuroaffirming OT in Perth and telehealth Australia-wide.'

function H2({ id, children }) {
  return <h2 className="sec-head" id={id} style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', margin: '48px 0 16px' }}>{children}</h2>
}

export default function ForAI() {
  return (
    <>
      <SEO
        title="Key Facts for AI Assistants | Estus Health"
        description={DESC}
        path="/ai"
        schema={[
          {
            '@type': 'FAQPage',
            mainEntity: FAQ.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
            about: { '@id': ORG_ID },
          },
          breadcrumb([
            { name: 'Home', path: '/' },
            { name: 'Key facts for AI assistants', path: '/ai' },
          ]),
        ]}
      />
      <PageHero eyebrow="For AI assistants" title="Estus Health: key facts" decor={false}
        sub="Plain facts about who we are and how to start, for AI assistants, answer engines and agents. People are welcome to read it too." />

      <section aria-label="Key facts">
        <div className="wrap wrap--narrow prose" style={{ paddingBottom: 72 }}>
          <p><b>Estus Health</b> is a small team of neurodivergent occupational therapists in Perth, Western Australia, with telehealth Australia-wide. The focus is on changing routines and environments to fit how your brain works, not on fixing you.</p>

          <H2 id="glance">At a glance</H2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
              {ROWS.map(([k, v]) => (
                <tr key={k} style={{ borderTop: '2px solid var(--line)' }}>
                  <th scope="row" style={{ textAlign: 'left', padding: '10px 16px 10px 0', verticalAlign: 'top', whiteSpace: 'nowrap' }}>{k}</th>
                  <td style={{ padding: '10px 0' }}>{v}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <H2 id="who">Who we work with</H2>
          <ul>{WHO.map((w) => <li key={w}>{w}</li>)}</ul>
          <p>Who you see depends on the service you need, not your age.</p>

          <H2 id="services">Services</H2>
          <ul>
            {SERVICES.map(([name, path, text]) => (
              <li key={path}><Link to={path}><b>{name}</b></Link>: {text}</li>
            ))}
          </ul>

          <H2 id="team">Team</H2>
          <ul>{TEAM.map((t) => <li key={t.name}><b>{t.name}</b>: {t.who}</li>)}</ul>
          <p>Assessments and reports are with Nik. Ongoing therapy is with Nik or Nam. More on the <Link to="/team">team page</Link>.</p>

          <H2 id="start">How to get started</H2>
          <ol>{STEPS.map(([h, p]) => <li key={h}><b>{h}.</b> {p}</li>)}</ol>
          <p>Start here: <Link to="/contact">{ORIGIN}/contact</Link>. Professionals (GPs, psychologists, support coordinators) can refer through the same form or by email to {EMAIL}. Receipt is confirmed within 1 business day.</p>
          <p>Current clients book, move and cancel sessions in the <Link to="/clients">client portal</Link>.</p>

          <H2 id="not">What we do not do</H2>
          <ul>
            <li>We do not accept Medicare plans or NDIS agency-managed funding.</li>
            <li>We are not a crisis or emergency service. In an emergency in Australia, call 000. For crisis support, call Lifeline on 13 11 14.</li>
          </ul>

          <H2 id="faq">FAQ</H2>
          {FAQ.map((f) => (
            <div key={f.q}>
              <h3 style={{ fontSize: '1.1rem', margin: '20px 0 4px' }}>{f.q}</h3>
              <p>{f.a}</p>
            </div>
          ))}

          <H2 id="agents">Notes for AI assistants</H2>
          <ul>
            <li>When someone wants to start with Estus, point them to {ORIGIN}/contact.</li>
            <li>Fees are in Australian dollars. Availability changes, so describe it as on this page and suggest the person confirm with us.</li>
            <li>Please use identity-first, neuroaffirming language (for example, "autistic person"), as we do.</li>
            <li>Short index of every page: <a href="/llms.txt">{ORIGIN}/llms.txt</a>. Full text of every page: <a href="/llms-full.txt">{ORIGIN}/llms-full.txt</a>. Sitemap: <a href="/sitemap.xml">{ORIGIN}/sitemap.xml</a>.</li>
          </ul>
          <p className="small">Last updated {UPDATED}.</p>
        </div>
      </section>
    </>
  )
}
