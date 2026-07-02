import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

const navigation = [
  {
    name: 'Services',
    children: [
      { name: 'Occupational Therapy', href: '/services/occupational-therapy' },
      { name: 'Gaming-Informed Therapy', href: '/services/gaming-informed-therapy' },
      { name: 'Minecraft Program', href: '/services/minecraft-program' },
      { name: 'Assessments & Reports', href: '/services/assessments-reports' },
      { name: 'Sleep Program', href: '/services/sleep-program' },
    ],
  },
  {
    name: 'About',
    children: [
      { name: 'Our Approach', href: '/about/approach' },
      { name: 'Team', href: '/about/team' },
    ],
  },
  {
    name: 'Learn',
    grouped: true,
    groups: [
      {
        label: 'Guides',
        items: [
          { name: 'Understanding PDA', href: '/learn/understanding-pda' },
          { name: 'Late Autism Diagnosis', href: '/learn/late-autism-diagnosis' },
          { name: 'Executive Function & Complex Health', href: '/learn/executive-function-complex-health' },
          { name: 'EDS & Hypermobility', href: '/learn/eds-hsd' },
        ],
      },
      {
        label: 'Quizzes',
        items: [
          { name: 'PDA Profile Quiz', href: '/learn/pda-quiz' },
          { name: 'Chronotype Quiz', href: '/learn/chronotype-quiz' },
          { name: 'Energy & Executive Function', href: '/learn/energy-quiz' },
          { name: 'Autistic Burnout Quiz', href: '/learn/burnout-quiz' },
          { name: 'Gaming & Wellbeing Quiz', href: '/learn/gaming-quiz' },
          { name: 'RPG Character Build', href: '/learn/rpg-character-quiz' },
          { name: 'EDS/HSD Management', href: '/learn/eds-hsd-quiz' },
        ],
      },
      {
        label: 'Resources',
        items: [
          { name: 'CommCard', href: '/resources/commcard' },
        ],
      },
    ],
    allLink: { name: 'All Guides & Quizzes', href: '/learn' },
  },
  { name: 'For Referrers', href: '/for-referrers' },
];

// Flatten grouped items for active-state checking
function getAllLinks(item) {
  if (item.grouped) {
    const links = item.groups.flatMap((g) => g.items);
    if (item.allLink) links.push(item.allLink);
    return links;
  }
  return item.children || [];
}

function NavDropdown({ item, mobile = false, onNavigate }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const allLinks = getAllLinks(item);
  const isActive = allLinks.some((link) => location.pathname === link.href);

  const linkClass = (href) =>
    location.pathname === href
      ? 'text-primary'
      : 'text-foreground/60 hover:text-foreground';

  // --- Mobile ---
  if (mobile) {
    return (
      <div className="space-y-2">
        <button
          onClick={() => setOpen(!open)}
          className={`flex items-center justify-between w-full px-4 py-2 text-lg font-display uppercase tracking-wide transition-colors ${
            isActive ? 'text-primary' : 'text-foreground/80 hover:text-foreground'
          }`}
        >
          {item.name}
          <ChevronDown className={`w-5 h-5 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
        {open && (
          <div className="pl-4 space-y-3">
            {item.grouped ? (
              <>
                {item.groups.map((group) => (
                  <div key={group.label}>
                    <p className="px-4 pt-1 pb-1 text-xs font-display uppercase tracking-widest text-foreground/40">
                      {group.label}
                    </p>
                    {group.items.map((child) => (
                      <Link
                        key={child.href}
                        to={child.href}
                        onClick={onNavigate}
                        className={`block px-4 py-1.5 text-base transition-colors ${linkClass(child.href)}`}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                ))}
                {item.allLink && (
                  <Link
                    to={item.allLink.href}
                    onClick={onNavigate}
                    className="block px-4 py-2 text-base font-medium text-primary"
                  >
                    {item.allLink.name} →
                  </Link>
                )}
              </>
            ) : (
              item.children.map((child) => (
                <Link
                  key={child.href}
                  to={child.href}
                  onClick={onNavigate}
                  className={`block px-4 py-2 text-base transition-colors ${linkClass(child.href)}`}
                >
                  {child.name}
                </Link>
              ))
            )}
          </div>
        )}
      </div>
    );
  }

  // --- Desktop ---
  if (item.grouped) {
    return (
      <div className="relative group">
        <button
          className={`flex items-center gap-1 px-3 py-2 text-sm font-display uppercase tracking-wide transition-colors ${
            isActive ? 'text-primary' : 'text-foreground/80 hover:text-foreground'
          }`}
        >
          {item.name}
          <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
        </button>
        <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
          <div className="bg-card border border-border rounded-lg shadow-lg p-5 min-w-[480px]">
            <div className="grid grid-cols-2 gap-6">
              {item.groups.map((group) => (
                <div key={group.label}>
                  <p className="text-xs font-display uppercase tracking-widest text-foreground/40 mb-2">
                    {group.label}
                  </p>
                  <div className="space-y-0.5">
                    {group.items.map((child) => (
                      <Link
                        key={child.href}
                        to={child.href}
                        className={`block px-2 py-1.5 text-sm rounded transition-colors ${
                          location.pathname === child.href
                            ? 'text-primary bg-secondary/50'
                            : 'text-foreground/80 hover:text-foreground hover:bg-secondary/30'
                        }`}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {item.allLink && (
              <div className="mt-4 pt-3 border-t border-border">
                <Link
                  to={item.allLink.href}
                  className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  {item.allLink.name} →
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative group">
      <button
        className={`flex items-center gap-1 px-3 py-2 text-sm font-display uppercase tracking-wide transition-colors ${
          isActive ? 'text-primary' : 'text-foreground/80 hover:text-foreground'
        }`}
      >
        {item.name}
        <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
      </button>
      <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
        <div className="bg-card border border-border rounded-lg shadow-lg py-2 min-w-[220px]">
          {item.children.map((child) => (
            <Link
              key={child.href}
              to={child.href}
              className={`block px-4 py-2 text-sm transition-colors ${
                location.pathname === child.href
                  ? 'text-primary bg-secondary/50'
                  : 'text-foreground/80 hover:text-foreground hover:bg-secondary/30'
              }`}
            >
              {child.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const closeMobile = () => setMobileMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container">
        <nav className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg overflow-hidden">
              <img src="/flame-logo.png" alt="Estus Health" className="w-full h-full object-cover" />
            </div>
            <span className="font-display text-xl uppercase tracking-wide">Estus Health</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navigation.map((item) =>
              item.children || item.grouped ? (
                <NavDropdown key={item.name} item={item} />
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 text-sm font-display uppercase tracking-wide transition-colors ${
                    location.pathname === item.href
                      ? 'text-primary'
                      : 'text-foreground/80 hover:text-foreground'
                  }`}
                >
                  {item.name}
                </Link>
              )
            )}

            {/* Client Portal Button (Desktop) */}
            <a
              href="https://questot.bookings.pracsuite.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 px-4 py-2 border border-border text-foreground text-sm font-display uppercase tracking-wide rounded-lg hover:border-primary hover:bg-secondary/50 transition-colors"
            >
              Client Portal
            </a>

            {/* Get Started Button (Desktop) */}
            <Link
              to="/contact"
              className="ml-2 px-5 py-2 bg-primary text-primary-foreground text-sm font-display uppercase tracking-wide rounded-lg hover:bg-primary/90 transition-colors"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border max-h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="space-y-2">
              {navigation.map((item) =>
                item.children || item.grouped ? (
                  <NavDropdown key={item.name} item={item} mobile onNavigate={closeMobile} />
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={closeMobile}
                    className={`block px-4 py-2 text-lg font-display uppercase tracking-wide transition-colors ${
                      location.pathname === item.href
                        ? 'text-primary'
                        : 'text-foreground/80 hover:text-foreground'
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              )}

              <div className="pt-4 px-4 space-y-3">
                {/* Client Portal Button (Mobile) */}
                <a
                  href="https://questot.bookings.pracsuite.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center px-5 py-3 border border-border text-foreground font-display uppercase tracking-wide rounded-lg hover:bg-secondary/50 transition-colors"
                >
                  Client Portal
                </a>

                {/* Get Started Button (Mobile) */}
                <Link
                  to="/contact"
                  onClick={closeMobile}
                  className="block w-full text-center px-5 py-3 bg-primary text-primary-foreground font-display uppercase tracking-wide rounded-lg"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-xl font-display font-bold text-primary-foreground">E</span>
              </div>
              <span className="font-display text-xl uppercase tracking-wide">Estus Health</span>
            </Link>
            <p className="text-foreground/60 text-sm leading-relaxed">
              Neuroaffirming occupational therapy across Perth and via telehealth Australia-wide.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-sm uppercase tracking-wide mb-4">Services</h4>
            <ul className="space-y-2">
              <li><Link to="/services/occupational-therapy" className="text-foreground/60 hover:text-primary text-sm transition-colors">Occupational Therapy</Link></li>
              <li><Link to="/services/gaming-informed-therapy" className="text-foreground/60 hover:text-primary text-sm transition-colors">Gaming-Informed Therapy</Link></li>
              <li><Link to="/services/minecraft-program" className="text-foreground/60 hover:text-primary text-sm transition-colors">Minecraft Program</Link></li>
              <li><Link to="/services/assessments-reports" className="text-foreground/60 hover:text-primary text-sm transition-colors">Assessments & Reports</Link></li>
            </ul>
          </div>

          {/* Learn */}
          <div>
            <h4 className="font-display text-sm uppercase tracking-wide mb-4">Learn</h4>
            <ul className="space-y-2">
              <li><Link to="/learn" className="text-foreground/60 hover:text-primary text-sm transition-colors font-medium">All Guides & Quizzes</Link></li>
              <li><Link to="/learn/pda-quiz" className="text-foreground/60 hover:text-primary text-sm transition-colors">PDA Profile Quiz</Link></li>
              <li><Link to="/learn/chronotype-quiz" className="text-foreground/60 hover:text-primary text-sm transition-colors">Chronotype Quiz</Link></li>
              <li><Link to="/learn/burnout-quiz" className="text-foreground/60 hover:text-primary text-sm transition-colors">Autistic Burnout Quiz</Link></li>
              <li><Link to="/learn/understanding-pda" className="text-foreground/60 hover:text-primary text-sm transition-colors">Understanding PDA</Link></li>
            </ul>
          </div>

          {/* Resources + Contact */}
          <div>
            <h4 className="font-display text-sm uppercase tracking-wide mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><Link to="/resources/commcard" className="text-foreground/60 hover:text-primary text-sm transition-colors">CommCard</Link></li>
            </ul>

            <h4 className="font-display text-sm uppercase tracking-wide mb-4 mt-8">Contact</h4>
            <ul className="space-y-2 text-sm text-foreground/60">
              <li>Perth, Western Australia</li>
              <li>Telehealth Australia-wide</li>
              <li>Mon - Sat, 8am - 7pm</li>
              <li className="pt-2">
                <Link to="/contact" className="text-primary hover:text-primary/80 transition-colors">
                  Make a referral →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-foreground/40">
            © {new Date().getFullYear()} Estus Health. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16 lg:pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
