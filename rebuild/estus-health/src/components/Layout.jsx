import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { SERVICES, FOOTER_RESOURCES, CLIENT_PORTAL, EMAIL } from '../lib/site'

/* ==========================================================================
   Nav route map per revision brief section 5:
   Services (dropdown) / Team / Free Resources, then Client Portal (separate,
   external) + Get Started (primary CTA). "About" and "For Referrers" removed.
   ========================================================================== */

function ThemeSwitch() {
  const [theme, setTheme] = useState(() =>
    (typeof document !== 'undefined' && document.documentElement.getAttribute('data-theme')) || 'neon'
  )
  const apply = (t) => {
    const valid = t === 'neon' || t === 'neon-light' ? t : 'neon'
    document.documentElement.setAttribute('data-theme', valid)
    try { localStorage.setItem('estus-theme', valid) } catch (e) { /* non-fatal */ }
    setTheme(valid)
  }
  return (
    <div className="theme-switch" role="group" aria-label="Colour theme">
      <span className="lbl" aria-hidden="true">Theme</span>
      <button className="sw sw--night" title="Neon night" aria-label="Neon night theme"
        aria-pressed={theme === 'neon'} onClick={() => apply('neon')} />
      <button className="sw sw--day" title="Neon day" aria-label="Neon day theme"
        aria-pressed={theme === 'neon-light'} onClick={() => apply('neon-light')} />
    </div>
  )
}

function Nav() {
  const [drawer, setDrawer] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const servicesRef = useRef(null)
  const { pathname } = useLocation()

  // Close menus on navigation.
  useEffect(() => { setDrawer(false); setServicesOpen(false) }, [pathname])

  // Close services dropdown on outside click / Escape.
  useEffect(() => {
    const onClick = (e) => { if (servicesRef.current && !servicesRef.current.contains(e.target)) setServicesOpen(false) }
    const onKey = (e) => { if (e.key === 'Escape') setServicesOpen(false) }
    document.addEventListener('click', onClick)
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('click', onClick); document.removeEventListener('keydown', onKey) }
  }, [])

  return (
    <header className="nav">
      <div className="wrap nav-in">
        <Link className="brand" to="/" aria-label="Estus Health home">
          <span className="mark" aria-hidden="true">E</span> Estus Health
        </Link>

        <nav aria-label="Primary">
          <ul className="links">
            <li className={`has-menu${servicesOpen ? ' open' : ''}`} ref={servicesRef}>
              <button className="menu-btn" aria-expanded={servicesOpen} aria-controls="services-menu"
                onClick={() => setServicesOpen((v) => !v)}>
                Services <span className="chev" aria-hidden="true">▾</span>
              </button>
              <ul className="menu" id="services-menu">
                {SERVICES.map((s) => (
                  <li key={s.to}><Link to={s.to}>{s.label}</Link></li>
                ))}
              </ul>
            </li>
            <li><Link to="/team">Team</Link></li>
            <li><Link to="/resources">Free Resources</Link></li>
          </ul>
        </nav>

        <div className="nav-cta">
          <a className="btn btn--ghost" href={CLIENT_PORTAL} target="_blank" rel="noopener">Client Portal</a>
          <Link className="btn" to="/contact">Get Started</Link>
        </div>

        <button className="burger" aria-label="Menu" aria-expanded={drawer} aria-controls="mnav"
          onClick={() => setDrawer((v) => !v)}>
          <span></span><span></span><span></span>
        </button>
      </div>

      <nav className={`mnav wrap${drawer ? ' open' : ''}`} id="mnav" aria-label="Mobile">
        <p className="group">Services</p>
        {SERVICES.map((s) => <Link key={s.to} className="sub" to={s.to}>{s.label}</Link>)}
        <Link to="/team">Team</Link>
        <Link to="/resources">Free Resources</Link>
        <a href={CLIENT_PORTAL} target="_blank" rel="noopener">Client Portal ↗</a>
        <Link to="/contact"><strong>Get Started</strong></Link>
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
            <div className="brand"><span className="mark" aria-hidden="true">E</span> Estus Health</div>
            <p className="blurb">Neuroaffirming occupational therapy across Perth and via telehealth Australia-wide.</p>
          </div>
          <nav aria-label="Services">
            <h2>Services</h2>
            <ul>{SERVICES.map((s) => <li key={s.to}><Link to={s.to}>{s.label}</Link></li>)}</ul>
          </nav>
          <nav aria-label="Free resources">
            <h2>Free Resources</h2>
            <ul>{FOOTER_RESOURCES.map((r) => <li key={r.to}><Link to={r.to}>{r.label}</Link></li>)}</ul>
          </nav>
          <nav aria-label="Contact">
            <h2>Contact</h2>
            <ul>
              <li>Perth, Western Australia</li>
              <li>Telehealth Australia-wide</li>
              <li>Mon – Sat, 8am – 7pm</li>
              <li><Link to="/contact">Make a referral →</Link></li>
              <li><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
            </ul>
          </nav>
        </div>
        <div className="foot-bottom">
          <span>© {year} Estus Health. All rights reserved.</span>
          <a href={CLIENT_PORTAL} target="_blank" rel="noopener">Client Portal ↗</a>
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
      <ThemeSwitch />
    </>
  )
}
