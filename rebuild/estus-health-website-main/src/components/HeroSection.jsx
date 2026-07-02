import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Lightbulb,
  Zap,
  ListChecks,
  Moon,
  Sun,
  Home,
  Gamepad2,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import { BOOKING } from './BookingButtons';

const specialties = [
  {
    icon: Lightbulb,
    title: 'Autism in youth, adolescents, and adults',
    sub: 'Late diagnosis, identity, daily function',
  },
  {
    icon: Zap,
    title: 'PDA profiles',
    sub: 'Demand avoidance, autonomy-based strategies',
  },
  {
    icon: ListChecks,
    title: 'Executive function',
    sub: 'Planning, task initiation, time management',
  },
  {
    icon: Moon,
    title: 'Sleep',
    sub: 'Circadian rhythm, wind-down routines',
  },
  {
    icon: Sun,
    title: 'Co-occurring + chronic health',
    sub: 'EDS, POTS, fatigue, pain management',
  },
  {
    icon: Home,
    title: 'Neurodivergent households',
    sub: 'Routines, logistics, family systems',
  },
  {
    icon: Gamepad2,
    title: 'Gaming-informed therapy',
    sub: 'Minecraft, Discord, interest-led engagement',
  },
];

const trustBadges = [
  'No referral needed',
  'NDIS, private, self-managed',
];

export default function HeroSection() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden grain-overlay">
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8 lg:gap-14 items-center">

          {/* Left column */}
          <div>
            <div className="w-12 h-[3px] bg-primary rounded-full mb-6" />

            <p className="text-primary font-display text-sm uppercase tracking-widest mb-5">
              Neuroaffirming Occupational Therapy · Perth + Telehealth
            </p>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-none uppercase">
              Finally, an OT
              <br />
              <span className="text-gradient-accent">who gets it.</span>
            </h1>

            <p className="font-serif text-xl md:text-2xl text-foreground/80 italic mt-6 max-w-xl leading-relaxed">
              You shouldn't have to explain what masking is, why eye contact is
              hard, or that your PDA isn't laziness. We already know.
            </p>

            <p className="text-lg text-foreground/60 mt-5 max-w-lg leading-relaxed">
              Specialist occupational therapy for autistic youth, adolescents,
              and adults. Practical strategies built around your brain, not
              against it.
            </p>

            <div className="flex flex-wrap gap-4 mt-10">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-display text-sm uppercase tracking-wider px-8 py-4 rounded-lg hover:bg-primary/90 hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(139,90,60,0.25)] transition-all duration-300"
              >
                Make a Referral
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/about/approach"
                className="inline-flex items-center gap-2 bg-transparent text-foreground font-display text-sm uppercase tracking-wider px-8 py-4 rounded-lg border-[1.5px] border-border hover:border-primary hover:text-primary transition-all duration-300"
              >
                Our Approach
              </Link>
            </div>

            <div className="flex items-center gap-4 mt-4">
              <span className="text-sm text-muted-foreground">or</span>
              <a
                href={BOOKING.adult.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-display text-sm uppercase tracking-wider px-6 py-3 rounded-lg border-[1.5px] border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <Calendar className="w-4 h-4" />
                Book a Free Discovery Call
              </a>
            </div>

            <div className="flex flex-wrap gap-6 mt-7">
              {trustBadges.map((badge) => (
                <span
                  key={badge}
                  className="flex items-center gap-1.5 text-sm text-muted-foreground"
                >
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Right column: specialty card */}
          <div className="bg-card rounded-lg p-8 lg:p-9 shadow-md">
            <h3 className="font-display text-sm uppercase tracking-[0.14em] text-primary mb-7">
              We work with
            </h3>
            <ul className="flex flex-col gap-4">
              {specialties.map(({ icon: Icon, title, sub }) => (
                <li key={title} className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-primary/[0.07] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-[0.9rem] font-semibold text-foreground leading-snug">
                      {title}
                    </p>
                    <p className="text-[0.78rem] text-muted-foreground mt-0.5 leading-snug">
                      {sub}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
