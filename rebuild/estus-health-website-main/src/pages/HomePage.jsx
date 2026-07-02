import { Helmet } from 'react-helmet-async';
import { ArrowRight, Clock, MapPin, FileText } from 'lucide-react';
import { Button } from '../components/ui';
import TeamSpotlight from '../components/TeamSpotlight';

const team = [
  {
    name: 'Liam Fagan',
    firstName: 'Liam',
    photoSrc: '/team-liam.jpg',
    photoPosition: 'left',
    profileHref: '/about/team#liam',
    roleLine:
      'Founder. Occupational therapist. Driving assessor. Top-four world speedrun ranking.',
    paragraph:
      'Liam came to OT through accounting, finance, and university librarianship before realising the thing he kept gravitating toward was helping people build systems that work for their brains. Being diagnosed autistic later in life reshaped everything he thought he understood about himself. His sessions are direct, practical, and built around your real life, not textbook goals.',
    personalStuff: [
      "Holds a top-four world record speedrun in Tony Hawk's Pro Skater. 20+ years of competitive gaming.",
      'Named this company after the healing item in Dark Souls.',
      'Finds spreadsheets relaxing and does budgeting for fun.',
      "Deeply interested in machine learning, AI, and how they'll reshape healthcare.",
      'Background in accounting, finance, computer science, and machine learning alongside OT.',
    ],
    accentPills: ['PDA profiles', 'Gaming-informed therapy', 'Driving OT'],
    neutralPills: ['Executive function', 'Late diagnosis', 'Complex health', 'Autism'],
  },
  {
    name: 'Dai Nam Lang',
    firstName: 'Nam',
    photoSrc: '/team-nam.jpg',
    photoPosition: 'right',
    profileHref: '/about/team#nam',
    roleLine:
      'Occupational therapist. Clinical lead, gaming and anime-informed therapy. Accepting new clients.',
    paragraph:
      "Nam specialises in working with autistic youth and young adults through the things they already care about. Anime, gaming, and storytelling aren't rewards or bribes in his sessions. They're the medium. He understands that interests aren't just hobbies. They're windows into how someone thinks, what they value, and where they feel most themselves.",
    personalStuff: [
      'Uses anime storylines as therapeutic tools. The best lessons come from characters you already connect with.',
      'Keen sportsperson. Football, gym, and always training for something.',
      'PC and Xbox gamer. Minecraft, Roblox, Sea of Thieves, Repo, and always open to co-op.',
      'Currently building a new PC with a wood grain CPU cooler.',
      'Speaks multiple languages and brings a multicultural lens to his clinical work.',
    ],
    accentPills: ['Anime-informed therapy', 'Gaming-informed therapy', 'Youth and young adults'],
    neutralPills: ['Screen and gaming transitions', 'Daily living independence', 'Minecraft program', 'Paediatrics'],
  },
  {
    name: 'Nik Peshwani',
    firstName: 'Nik',
    photoSrc: '/team-nik.jpg',
    photoPosition: 'left',
    profileHref: '/about/team#nik',
    roleLine:
      'Occupational therapist. Clinical lead, executive function. Speaks Hindi, Gujarati, English, and Sindhi.',
    paragraph:
      "Nik turned down a place in medical school because he realised he didn't just want to treat illness. He wanted to improve the quality of life people actually live. He brings a gaming-informed, identity-respecting lens to his work, particularly with high-masking people who've spent years being told they're fine. If you've been dismissed before and need someone who leads with curiosity instead of labels, that's where Nik comes in.",
    personalStuff: [
      'Currently deep into The Finals. Always up for learning a new game with clients.',
      'Plays Minecraft, Dead by Daylight, and Rocket League (badly, but his clients love teaching him).',
      'Catan is his all-time favourite board game. Loves tabletop games in general.',
      'Big into fitness, macros, nutrition, and supplements. Loves the science of how bodies work.',
      'Lifelong learner. Experiments on himself first before recommending anything to clients.',
    ],
    accentPills: ['Executive function', 'ADHD', 'Adolescents and adults'],
    neutralPills: ['Sleep', 'Sensory profiles', 'Hypermobility and pain', 'Late diagnosis'],
  },
];

const presentations = [
  'Autistic adults and adolescents',
  'PDA profiles (pathological demand avoidance)',
  'ADHD',
  'Late-diagnosed neurodivergent adults',
  'Executive function challenges',
  'Chronic health and fatigue (EDS, POTS, fibromyalgia)',
  'Sensory processing differences',
  'Hypermobility and chronic pain',
  'Children navigating school and daily routines',
];

const funding = [
  {
    label: 'NDIS plan-managed',
    description: 'Your plan manager pays us directly. No gap fees.',
  },
  {
    label: 'NDIS self-managed',
    description: 'You manage your own funding and claim our invoices against your plan.',
  },
  {
    label: 'Private',
    description: 'Pay per session. No referral needed. No funding body required.',
  },
];

const logistics = [
  {
    icon: Clock,
    label: 'Hours',
    detail: 'Monday to Saturday',
    sub: '8am to 7pm AWST',
  },
  {
    icon: MapPin,
    label: 'Location',
    detail: 'Perth, Western Australia',
    sub: 'Telehealth Australia-wide',
  },
  {
    icon: FileText,
    label: 'Referrals',
    detail: 'No referral needed',
    sub: 'Self-refer, parent-refer, or clinician-refer',
  },
];

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Estus Health | Neuroaffirming Occupational Therapy Perth</title>
        <meta
          name="description"
          content="A small team of neurodivergent occupational therapists in Perth, with telehealth Australia-wide. Working with autistic adults, PDA profiles, ADHD, and complex health."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://estushealth.com/" />
        <meta property="og:title" content="Estus Health | Neuroaffirming Occupational Therapy Perth" />
        <meta
          property="og:description"
          content="A small team of neurodivergent occupational therapists in Perth, with telehealth Australia-wide."
        />
        <meta property="og:image" content="https://estushealth.com/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="Estus Health, neuroaffirming and gaming-informed occupational therapy"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Estus Health | Neuroaffirming Occupational Therapy Perth" />
        <meta
          name="twitter:description"
          content="A small team of neurodivergent occupational therapists in Perth, with telehealth Australia-wide."
        />
        <meta name="twitter:image" content="https://estushealth.com/og-image.png" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "MedicalBusiness",
              "name": "Estus Health",
              "image": "https://estushealth.com/team-photo.jpeg",
              "description": "Neuroaffirming occupational therapy for autistic adults, teens, and people with PDA profiles.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Perth",
                "addressRegion": "WA",
                "addressCountry": "AU"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "-31.95",
                "longitude": "115.86"
              },
              "url": "https://estushealth.com",
              "priceRange": "$$",
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                  "opens": "08:00",
                  "closes": "19:00"
                }
              ]
            }
          `}
        </script>
      </Helmet>

      {/* Section 01: Hero */}
      <section className="relative grain-overlay py-12 md:py-16">
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-10 md:mb-14">
            <p className="font-display text-xs uppercase tracking-[0.2em] text-primary">
              Neuroaffirming Occupational Therapy · Perth + Telehealth
            </p>
            <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight mt-4">
              <span className="text-gradient-accent">Estus Health</span>
            </h1>
            <p className="font-serif italic text-lg md:text-xl text-foreground/70 max-w-xl mx-auto mt-4">
              A small team of neurodivergent clinicians who build sessions around how your brain actually works.
            </p>
          </div>

          {/* Team Banner */}
          <div className="relative w-full max-w-5xl mx-auto rounded-xl overflow-hidden border border-border shadow-heavy group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/0 blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />

            <div className="relative aspect-[16/9] md:aspect-[21/9] lg:aspect-[3/1] bg-card">
              <img
                src="/team-photo.jpeg"
                alt="The Estus Health team — Liam, Dai Nam, and Nik"
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />

              <div className="absolute bottom-0 left-0 p-6 md:p-8">
                <h2 className="text-white font-display text-2xl md:text-3xl mb-1 drop-shadow-md">
                  The Estus Health Team
                </h2>
                <p className="text-white/80 font-serif italic text-sm md:text-base drop-shadow-md">
                  Liam, Dai Nam, and Nik
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 02: Team Spotlights */}
      <section className="py-12 md:py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="font-display text-xs uppercase tracking-[0.2em] text-primary">
              Your clinicians
            </p>
            <h2 className="font-display text-3xl md:text-4xl mt-4">
              Meet the people, not the service menu.
            </h2>
            <p className="font-serif italic text-foreground/70 mt-4">
              Every clinician here chose this work because it matters to them. Most of us have been on the other side of that conversation.
            </p>
          </div>

          <div className="space-y-8 md:space-y-12">
            {team.map((member) => (
              <TeamSpotlight key={member.name} {...member} />
            ))}
          </div>
        </div>
      </section>

      {/* Section 03: Who We Work With */}
      <section className="bg-card border-y border-border py-12 md:py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl text-center mb-8">
              Who we work with.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* People */}
              <div>
                <p className="font-display text-lg mb-4">Presentations</p>
                <ul className="space-y-2">
                  {presentations.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-2 flex-shrink-0" />
                      <span className="text-sm text-foreground/70 leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Funding */}
              <div>
                <p className="font-display text-lg mb-4">How to pay</p>
                <div className="space-y-4">
                  {funding.map((item) => (
                    <div
                      key={item.label}
                      className="bg-secondary/50 rounded-lg p-4 border border-border"
                    >
                      <p className="font-display text-sm uppercase tracking-wide">
                        {item.label}
                      </p>
                      <p className="text-sm text-foreground/60 mt-1">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 04: Hours and Logistics */}
      <section className="py-10 md:py-14">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-display text-xl md:text-2xl text-center mb-6">
              The practical stuff.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              {logistics.map(({ icon: Icon, label, detail, sub }) => (
                <div key={label}>
                  <Icon className="w-5 h-5 text-primary mx-auto mb-3" />
                  <p className="font-display text-sm uppercase tracking-wide">
                    {label}
                  </p>
                  <p className="text-sm text-foreground/70 mt-1">{detail}</p>
                  <p className="text-xs text-foreground/50 mt-1">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 05: Referral Form CTA */}
      <section
        id="referral"
        className="bg-card border-y border-border py-12 md:py-16 scroll-mt-20"
      >
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-2xl md:text-3xl">
              Send us a referral.
            </h2>
            <p className="font-serif italic text-foreground/60 mt-2 mb-8">
              For yourself, your child, or your client. No GP referral required.
            </p>
            <div className="space-y-4">
              <Button
                href="https://questot.forms.pracsuite.com/t/9rrusgskOVlmiQQtMYzCuYn7"
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                className="w-full md:w-auto"
              >
                Open referral form
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <p className="text-sm text-foreground/50">
                Takes about 2 minutes. We'll be in touch within one business day.
              </p>
            </div>
            <p className="text-center text-sm text-foreground/40 mt-6">
              Or email us directly at{' '}
              <a
                href="mailto:hello@estushealth.com"
                className="underline hover:text-primary"
              >
                hello@estushealth.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
