/* ==========================================================================
   Site-wide constants. One source of truth for links, so the canonical
   Pracsuite referral form (reused everywhere per the content handover) can
   be changed in exactly one place.
   ========================================================================== */

// The single canonical referral / contact form (Pracsuite). Reused by every
// "Make a Referral" / "Open referral form" / "Open Contact Form" CTA.
export const REFERRAL_FORM = 'https://questot.forms.pracsuite.com/t/9rrusgskOVlmiQQtMYzCuYn7'
export const CLIENT_PORTAL = 'https://questot.bookings.pracsuite.com/'
export const EMAIL = 'hello@estushealth.com'

// Podcasts. Performance Lab: Protocols is Liam's show; OT and Yap is Nik's.
export const PODCASTS = {
  performanceLab: { name: 'Performance Lab: Protocols', host: 'Liam', url: 'https://open.spotify.com/show/3IsFpkUItgNPDrwIu9dyy6' },
  otAndYap: { name: 'OT and Yap', host: 'Nik', url: 'https://open.spotify.com/show/0inAJS350wpidn8xLcPY9m' },
}
export const COMMCARD_APP = '/commcard/' // bundled standalone PWA in public/commcard
export const COMMCARD_EXTERNAL = 'https://commcard.estushealth.com'
// GIVE WAY! road rules arcade: bundled standalone page in public/giveway.
// Append ?studio to unlock the team-only Instagram export panel.
export const GIVEWAY_APP = '/giveway/'

// Current intake capacity. One source of truth for the notice shown on the
// home page, the contact / referral page, and the team profiles, so the three
// never drift apart. Update here when intake changes.
export const CAPACITY = {
  badge: 'Term 4 places open',
  heading: 'Limited Term 4 places are now available.',
  body: 'We have opened a small number of places for Term 4 ongoing therapy. Spaces are limited and are offered in the order referrals come in, so book a free call now and we will find you a start date.',
  short: 'Limited Term 4 places are now available. Spaces are offered in the order referrals come in.',
  cta: 'Book a free call',
  // Shown on the team profiles for clinicians with Term 4 places.
  clinicianStatus: 'Limited Term 4 places available',
}

// Discovery-call booking (BookingButtonPair on Contact + Minecraft pages).
export const BOOKING = [
  { name: 'Nik', label: '16 and over', url: 'https://calendar.app.google/iLxEVkhaRCFEhsSC8' },
  { name: 'Nam', label: 'Under 16', url: 'https://calendar.app.google/vGXRQqSbPwSXsY8q9' },
]

// Services menu. Assessments & Reports and Live Sessions stay live at their
// own URLs but are out of the menus (site map v2, October 2026).
export const SERVICES = [
  { to: '/services/occupational-therapy', label: 'Occupational Therapy' },
  { to: '/services/small-hinges', label: 'Small Hinges Programs' },
  { to: '/services/gaming-informed-therapy', label: 'Gaming-Informed Therapy' },
  { to: '/services/minecraft-program', label: 'Minecraft Program' },
  { to: '/resources/driving-ot', label: 'Driving OT', soon: true },
]

// The new primary call to action: the free 15 minute welcome call lives on
// the referrals page, which keeps the /contact address.
export const BOOK_PATH = '/contact'
export const WHAT_TO_EXPECT = '/what-to-expect'
export const DRIVING_WAITLIST = 'mailto:hello@estushealth.com?subject=Driving%20OT%20waitlist'

// Who takes the free call, by lane. Photos live in public/.
export const CLINICIANS = {
  over: {
    key: 'over', label: '16 and over', first: 'Nik', full: 'Nik Peshwani', tag: 'Teens 16+ and adults',
    line: 'Experimenter energy. Tries it on himself before he suggests it to you.',
    img: '/team-nik.jpg', href: 'https://calendar.app.google/iLxEVkhaRCFEhsSC8', cta: 'Pick a time with Nik', tone: 'c-blue',
  },
  under: {
    key: 'under', label: 'Under 16', first: 'Nam', full: 'Nam Lang', tag: 'Kids under 16 and families',
    line: 'Storyteller energy. Meets your child through the game or story they already love.',
    img: '/team-nam.jpg', href: 'https://calendar.app.google/vGXRQqSbPwSXsY8q9', cta: 'Pick a time with Nam', tone: 'c-plum',
  },
  drive: {
    key: 'drive', label: 'Driving (soon)', first: 'Liam', full: 'Liam Fagan', tag: 'Driving OT · coming soon',
    line: 'In-person driving assessments in Perth are coming soon. Join the waitlist and we will tell you when bookings open.',
    img: '/team-liam.jpg', href: 'mailto:hello@estushealth.com?subject=Driving%20OT%20waitlist', cta: 'Join the driving waitlist', tone: 'c-plum',
  },
}

// Free Resources menu: the hub, then its topic sections (anchors on the
// /resources page, handled by ScrollToTop).
export const NAV_RESOURCES = [
  { to: '/resources', label: 'All free resources' },
  { to: '/resources#quizzes', label: 'Quizzes' },
  { to: '/resources#guides', label: 'Guides' },
  { to: '/resources#tools', label: 'Tools' },
]

export const FOOTER_RESOURCES = [
  { to: '/resources', label: 'All free resources' },
  { to: '/resources/understanding-pda', label: 'Understanding PDA' },
  { to: '/resources/pda-quiz', label: 'PDA Profile Quiz' },
  { to: '/resources/commcard', label: 'CommCard' },
  { to: '/resources/lexicon', label: 'The Shared Lexicon' },
  { to: '/resources/open-loops', label: 'Open Loops' },
]

// Instagram profile. INSTAGRAM_EMBED is the unofficial profile-embed endpoint
// used for the home-page feed iframe; if Instagram ever breaks it, the section
// still degrades to its "Follow us" button.
export const INSTAGRAM = 'https://www.instagram.com/estus_health/'
export const INSTAGRAM_EMBED = 'https://www.instagram.com/estus_health/embed'

// Social media links shown bottom-left of the footer. Placeholder hrefs
// ('#') can be swapped for the real profile URLs when they are ready.
export const SOCIALS = [
  { label: 'Instagram', icon: 'instagram', href: INSTAGRAM },
  { label: 'YouTube', icon: 'youtube', href: 'https://www.youtube.com/@Estushealth' },
  { label: 'Facebook', icon: 'facebook', href: 'https://www.facebook.com/profile.php?id=61567995865625' },
  { label: 'LinkedIn', icon: 'linkedin', href: 'https://www.linkedin.com/company/estus-health' },
]
