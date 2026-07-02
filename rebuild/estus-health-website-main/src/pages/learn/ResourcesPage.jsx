import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ArrowRight,
  BookOpen,
  Brain,
  Zap,
  Moon,
  Gamepad2,
  Flame,
  Sword,
  Users,
  ClipboardList,
  MessageSquare,
  Activity,
} from 'lucide-react';
import { Section, Card, Badge, Button, CTABanner } from '../../components/ui';

const quizzes = [
  {
    icon: Brain,
    title: 'PDA Profile Quiz',
    href: '/learn/pda-quiz',
    badge: 'Autism',
    description:
      'Discover your PDA archetype and get personalised strategies for navigating demands.',
    cta: 'Take the quiz',
  },
  {
    icon: Moon,
    title: 'Chronotype Quiz',
    href: '/learn/chronotype-quiz',
    badge: 'Sleep',
    description:
      'Find out whether you\'re a Lion, Bear, Wolf, or Dolphin sleeper, and learn how to align your schedule to your biology.',
    cta: 'Take the quiz',
  },
  {
    icon: Zap,
    title: 'Energy & Executive Function Quiz',
    href: '/learn/energy-quiz',
    badge: 'Executive Function',
    description:
      'Map your energy patterns and executive function profile to understand when and why tasks feel impossible, and what actually helps.',
    cta: 'Take the quiz',
  },
  {
    icon: Flame,
    title: 'Autistic Burnout Quiz',
    href: '/learn/burnout-quiz',
    badge: 'Burnout',
    description:
      'Assess where you are on the burnout spectrum and get a clearer picture of what your nervous system needs right now.',
    cta: 'Take the quiz',
  },
  {
    icon: Gamepad2,
    title: 'Gaming & Wellbeing Quiz',
    href: '/learn/gaming-quiz',
    badge: 'Gaming',
    isGaming: true,
    description:
      'Explore the relationship between your gaming habits and your mental health, focus, and emotional regulation.',
    cta: 'Take the quiz',
  },
  {
    icon: Sword,
    title: 'RPG Character Build Quiz',
    href: '/learn/rpg-character-quiz',
    badge: 'Gaming',
    isGaming: true,
    description:
      'Build your neurodivergent character sheet. Find out your stat distribution, class archetype, and innate abilities.',
    cta: 'Take the quiz',
  },
  {
    icon: Activity,
    title: 'EDS/HSD Management Style Quiz',
    href: '/learn/eds-hsd-quiz',
    badge: 'EDS / HSD',
    description:
      'Discover how you naturally manage hypermobility, fatigue, and pain. Four archetypes, practical tips, and strategies that actually fit a neurodivergent brain.',
    cta: 'Take the quiz',
  },
];

const guides = [
  {
    icon: Users,
    title: 'Understanding PDA',
    href: '/learn/understanding-pda',
    badge: 'PDA',
    description:
      'Pathological Demand Avoidance explained: what it is, how it shows up across different ages, and why traditional approaches often backfire.',
    readTime: '8 min read',
  },
  {
    icon: ClipboardList,
    title: 'Late Autism Diagnosis',
    href: '/learn/late-autism-diagnosis',
    badge: 'Autism',
    description:
      'Why autism gets missed in adults, what the late-diagnosis experience is actually like, and how to move forward with self-understanding.',
    readTime: '7 min read',
  },
  {
    icon: Brain,
    title: 'Executive Function & Complex Health',
    href: '/learn/executive-function-complex-health',
    badge: 'Executive Function',
    description:
      'Managing POTS, hEDS, MCAS, ME/CFS, or chronic pain alongside neurodivergence? Here\'s why executive function takes the hit.',
    readTime: '10 min read',
  },
  {
    icon: Activity,
    title: 'EDS & Hypermobility',
    href: '/learn/eds-hsd',
    badge: 'EDS / HSD',
    description:
      'Ehlers-Danlos Syndromes and Hypermobility Spectrum Disorder: what they are, how they overlap with neurodivergence, and what OT support actually looks like.',
    readTime: '9 min read',
  },
];

export default function ResourcesPage() {
  return (
    <>
      <Helmet>
        <title>Resources & Quizzes | Estus Health</title>
        <meta
          name="description"
          content="Free interactive quizzes and in-depth guides on PDA, autism, sleep, executive function, burnout, and gaming. Know your brain. Build your life."
        />
      </Helmet>

      {/* Hero */}
      <section className="relative py-24 lg:py-32 grain-overlay overflow-hidden">
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <p className="text-noctua-russet font-display text-sm uppercase tracking-widest mb-4 font-semibold">
              Learn & Explore
            </p>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold leading-none mb-6 text-noctua-brown">
              Know your brain.
              <br />
              <span className="text-noctua-russet">Build your life.</span>
            </h1>
            <p className="font-serif text-xl text-noctua-brown/80 italic mb-6">
              Understanding your neurotype is the first step toward support that actually sticks.
            </p>
            <p className="text-lg text-noctua-brown/70 max-w-2xl leading-relaxed">
              Explore our free quizzes and guides,written for people navigating these
              experiences, not about them. No jargon, no clinical distance.
            </p>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-noctua-bone/50 to-transparent pointer-events-none" />
      </section>

      {/* Quizzes */}
      <Section className="bg-noctua-bone/30">
        <div className="mb-12">
          <p className="text-noctua-russet font-display text-sm uppercase tracking-widest mb-3 font-semibold">
            Interactive
          </p>
          <h2 className="text-2xl md:text-4xl font-display mb-4 text-noctua-brown">
            Quizzes
          </h2>
          <p className="text-noctua-brown/70 max-w-xl">
            Quick, personalised assessments that give you something useful,not just a score,
            but a map.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz) => {
            const Icon = quiz.icon;
            const isGaming = quiz.isGaming;
            return (
              <Card
                key={quiz.href}
                hover
                className={`shadow-sm flex flex-col ${
                  isGaming
                    ? 'border-noctua-brown/20'
                    : 'bg-noctua-bone border-noctua-brown/10'
                }`}
                style={
                  isGaming
                    ? { background: 'linear-gradient(135deg, hsl(35, 25%, 86%) 0%, hsl(30, 20%, 82%) 100%)' }
                    : undefined
                }
              >
                <div className="p-6 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        isGaming ? '' : 'bg-noctua-russet/10'
                      }`}
                      style={
                        isGaming
                          ? { background: 'hsl(25, 35%, 35%)' }
                          : undefined
                      }
                    >
                      <Icon
                        className={`w-6 h-6 ${isGaming ? '' : 'text-noctua-russet'}`}
                        style={
                          isGaming
                            ? { color: 'hsl(35, 30%, 92%)' }
                            : undefined
                        }
                      />
                    </div>
                    {isGaming ? (
                      <span
                        className="text-xs ml-3 mt-1 font-display uppercase tracking-wide px-2 py-0.5 rounded"
                        style={{
                          background: 'hsl(25, 35%, 35%)',
                          color: 'hsl(35, 30%, 92%)',
                          fontSize: '0.65rem',
                          letterSpacing: '0.08em',
                        }}
                      >
                        {quiz.badge}
                      </span>
                    ) : (
                      <Badge variant="primary" className="text-xs ml-3 mt-1">
                        {quiz.badge}
                      </Badge>
                    )}
                  </div>
                  <h3 className="font-display text-xl mb-3 text-noctua-brown">{quiz.title}</h3>
                  <p className="text-noctua-brown/70 text-sm leading-relaxed flex-1 mb-5">
                    {quiz.description}
                  </p>
                  <Link
                    to={quiz.href}
                    className="inline-flex items-center gap-1 text-noctua-russet text-sm font-medium font-display uppercase tracking-wide hover:gap-2 transition-all group"
                  >
                    {quiz.cta}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* Divider */}
      <div className="container">
        <hr className="border-noctua-brown/10" />
      </div>

      {/* Guides */}
      <Section>
        <div className="mb-12">
          <p className="text-noctua-russet font-display text-sm uppercase tracking-widest mb-3 font-semibold">
            In-Depth
          </p>
          <h2 className="text-2xl md:text-4xl font-display mb-4 text-noctua-brown">
            Guides & Articles
          </h2>
          <p className="text-noctua-brown/70 max-w-xl">
            Longer reads for when you want to go deeper. Research-grounded, plainly written.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {guides.map((guide) => {
            const Icon = guide.icon;
            return (
              <Card
                key={guide.href}
                hover
                className="bg-noctua-bone border-noctua-brown/10 shadow-sm flex flex-col"
              >
                <div className="p-6 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg bg-noctua-russet/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-noctua-russet" />
                    </div>
                    <div className="flex flex-col items-end gap-1 ml-3 mt-1">
                      <Badge variant="primary" className="text-xs">
                        {guide.badge}
                      </Badge>
                      <span className="flex items-center gap-1 text-xs text-noctua-brown/40">
                        <BookOpen className="w-3 h-3" />
                        {guide.readTime}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-display text-xl mb-3 text-noctua-brown">{guide.title}</h3>
                  <p className="text-noctua-brown/70 text-sm leading-relaxed flex-1 mb-5">
                    {guide.description}
                  </p>
                  <Link
                    to={guide.href}
                    className="inline-flex items-center gap-1 text-noctua-russet text-sm font-medium font-display uppercase tracking-wide hover:gap-2 transition-all group"
                  >
                    Read guide
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* Divider */}
      <div className="container">
        <hr className="border-noctua-brown/10" />
      </div>

      {/* CommCard Tool */}
      <Section>
        <div className="mb-12">
          <p className="text-noctua-russet font-display text-sm uppercase tracking-widest mb-3 font-semibold">
            Free Tool
          </p>
          <h2 className="text-2xl md:text-4xl font-display mb-4 text-noctua-brown">
            CommCard
          </h2>
          <p className="text-noctua-brown/70 max-w-xl">
            A free communication tool for moments when speaking is hard.
          </p>
        </div>

        <Card
          hover
          className="bg-noctua-bone border-noctua-brown/10 shadow-sm max-w-2xl"
        >
          <div className="p-6 flex flex-col">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-noctua-russet/10 flex items-center justify-center flex-shrink-0">
                <MessageSquare className="w-6 h-6 text-noctua-russet" />
              </div>
              <Badge variant="primary" className="text-xs ml-3 mt-1">
                Communication
              </Badge>
            </div>
            <h3 className="font-display text-xl mb-3 text-noctua-brown">
              Words When You Have None
            </h3>
            <p className="text-noctua-brown/70 text-sm leading-relaxed mb-5">
              Ready-made phrases and custom cards you can show on screen or speak aloud.
              Designed for neurodivergent adults who experience situational or intermittent
              speech difficulties. No signup, no data collected, works on any device.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://commcard.estushealth.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-noctua-russet text-sm font-medium font-display uppercase tracking-wide hover:gap-2 transition-all group"
              >
                Open CommCard
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <Link
                to="/resources/commcard"
                className="inline-flex items-center gap-1 text-noctua-brown/60 text-sm font-medium font-display uppercase tracking-wide hover:text-noctua-brown hover:gap-2 transition-all group"
              >
                Learn more
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </Card>
      </Section>

      {/* CTA */}
      <CTABanner
        title="Ready to take the next step?"
        description="Quizzes and guides are a starting point. If you want personalised support, we're here."
        primaryCTA={{ label: 'Make a Referral', href: '/contact' }}
        secondaryCTA={{ label: 'About Our Approach', href: '/about/approach' }}
        className="bg-noctua-bone/50"
      />
    </>
  );
}
