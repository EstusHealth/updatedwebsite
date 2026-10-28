import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Instagram, Facebook, Linkedin, Youtube } from 'lucide-react'
import { SERVICES, NAV_RESOURCES, FOOTER_RESOURCES, SOCIALS, CLIENT_PORTAL, EMAIL, BOOK_PATH } from '../lib/site'
import { WEBINARS } from '../lib/webinars'

const SOCIAL_ICONS = { instagram: Instagram, facebook: Facebook, linkedin: Linkedin, youtube: Youtube }

// Events & Media menu: the hub, then a direct link to each webinar's own page.
const NAV_EVENTS = [
  { to: '/events', label: 'All events & media' },
  ...WEBINARS.map((w) => ({ to: w.path, label: w.title })),
]

/* ==========================================================================
   Site map v2 (October 2026):
   Services / Free resources / Events & media / Team, then Get started.
   Client portal moves to the footer and the mobile menu.
   ========================================================================== */

export function Wordmark() {
  return (
    <span className="brand-in" style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      <span className="stripe" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
      <span className="word"><b>ESTUS</b> HEALTH</span>
    </span>
  )
}

function Dropdown({ id, label, items, open, setOpen, innerRef }) {
  return (
    <li className={`has-menu${open ? ' open' : ''}`} ref={innerRef}>
      <button className="menu-btn" aria-expanded={open} aria-controls={id} onClick={() => setOpen((v) => !v)}>
        {label} <span className="chev" aria-hidden="true">▾</span>
      </button>
      <ul className="menu" id={id}>
        {items.map((s) => (
          <li key={s.to}><Link to={s.to}>{s.label}{s.soon ? ' (coming soon)' : ''}</Link></li>
        ))}
      </ul>
    </li>
  )
}

function Nav() {
  const [drawer, setDrawer] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [resourcesOpen, setResourcesOpen] = useState(false)
  const [eventsOpen, setEventsOpen] = useState(false)
  const servicesRef = useRef(null)
  const resourcesRef = useRef(null)
  const eventsRef = useRef(null)
  const { pathname, hash } = useLocation()

  useEffect(() => { setDrawer(false); setServicesOpen(false); setResourcesOpen(false); setEventsOpen(false) }, [pathname, hash])

  useEffect(() => {
    const onClick = (e) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target)) setServicesOpen(false)
      if (resourcesRef.current && !resourcesRef.current.contains(e.target)) setResourcesOpen(false)
      if (eventsRef.current && !eventsRef.current.contains(e.target)) setEventsOpen(false)
    }
    const onKey = (e) => { if (e.key === 'Escape') { setServicesOpen(false); setResourcesOpen(false); setEventsOpen(false) } }
    document.addEventListener('click', onClick)
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('click', onClick); document.removeEventListener('keydown', onKey) }
  }, [])

  return (
    <header className="nav">
      <div className="wrap nav-in">
        <Link className="brand" to="/" aria-label="Estus Health home"><Wordmark /></Link>

        <nav aria-label="Primary">
          <ul className="links">
            <Dropdown id="services-menu" label="Services" items={SERVICES} open={servicesOpen} setOpen={setServicesOpen} innerRef={servicesRef} />
            <Dropdown id="resources-menu" label="Free resources" items={NAV_RESOURCES} open={resourcesOpen} setOpen={setResourcesOpen} innerRef={resourcesRef} />
            <Dropdown id="events-menu" label="Events & media" items={NAV_EVENTS} open={eventsOpen} setOpen={setEventsOpen} innerRef={eventsRef} />
            <li><NavLink to="/team">Team</NavLink></li>
          </ul>
        </nav>

        <div className="nav-cta">
          <Link className="btn btn--teal" to={BOOK_PATH}>Get started</Link>
        </div>

        <button className="burger" aria-label="Menu" aria-expanded={drawer} aria-controls="mnav"
          onClick={() => setDrawer((v) => !v)}>
          <span></span><span></span><span></span>
        </button>
      </div>

      <nav className={`mnav wrap${drawer ? ' open' : ''}`} id="mnav" aria-label="Mobile">
        <p className="group">Services</p>
        {SERVICES.map((s) => <Link key={s.to} className="sub" to={s.to}>{s.label}{s.soon ? ' (coming soon)' : ''}</Link>)}
        <p className="group">Free resources</p>
        {NAV_RESOURCES.map((r) => <Link key={r.to} className="sub" to={r.to}>{r.label}</Link>)}
        <p className="group">Events & media</p>
        {NAV_EVENTS.map((e) => <Link key={e.to} className="sub" to={e.to}>{e.label}</Link>)}
        <p className="group">Estus</p>
        <Link className="sub" to="/team">Team</Link>
        <a className="sub" href={CLIENT_PORTAL} target="_blank" rel="noopener">Client portal ↗</a>
        <Link className="btn btn--teal" to={BOOK_PATH}>Get started</Link>
      </nav>
    </header>
  )
}

function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <div className="brand"><Wordmark /></div>
            <p className="blurb">Neuroaffirming occupational therapy. Perth, and telehealth Australia-wide.</p>
            <ul className="foot-social" aria-label="Social media">
              {SOCIALS.map((s) => {
                const Icon = SOCIAL_ICONS[s.icon]
                return (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} title={s.label}>
                      {Icon ? <Icon size={20} aria-hidden="true" /> : s.label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
          <nav aria-label="Services">
            <h2>Services</h2>
            <ul>{SERVICES.map((s) => <li key={s.to}><Link to={s.to}>{s.label}</Link></li>)}</ul>
          </nav>
          <nav aria-label="Free resources">
            <h2>Free resources</h2>
            <ul>{FOOTER_RESOURCES.map((r) => <li key={r.to}><Link to={r.to}>{r.label}</Link></li>)}</ul>
          </nav>
          <nav aria-label="Events and media">
            <h2>Events & media</h2>
            <ul>{NAV_EVENTS.map((e) => <li key={e.to}><Link to={e.to}>{e.label}</Link></li>)}</ul>
          </nav>
          <nav aria-label="Contact">
            <h2>Estus</h2>
            <ul>
              <li><Link to="/team">Meet the team</Link></li>
              <li><Link to={BOOK_PATH}>Get started</Link></li>
              <li><Link to={`${BOOK_PATH}#pros`}>For professionals</Link></li>
              <li><a href={CLIENT_PORTAL} target="_blank" rel="noopener">Client portal ↗</a></li>
              <li>Mon to Sat, 8am to 7pm AWST</li>
              <li><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
            </ul>
          </nav>
        </div>
        <div className="foot-bottom">
          <span>© {year} Estus Health. All rights reserved.</span>
          <span>Perth, Western Australia · Telehealth Australia-wide</span>
        </div>
      </div>
    </footer>
  )
}

export default function Layout({ children }) {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Nav />
      <main id="main">{children}</main>
      <Footer />
    </>
  )
}
