import { Section, Card, CardContent, Button, ProcessStep, CTABanner } from '../../components/ui';
import { ArrowRight, CheckCircle } from 'lucide-react';

export default function OccupationalTherapy() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-16 lg:py-24 grain-overlay border-b border-border">
        <div className="container">
          <div className="max-w-3xl">
            <p className="text-primary font-display text-sm uppercase tracking-widest mb-4">
              Services
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight mb-6">
              Occupational Therapy
            </h1>
            <p className="font-serif text-xl text-foreground/80 italic mb-6">
              Functional support that respects who you are
            </p>
            <p className="text-foreground/70 leading-relaxed">
              Occupational therapy is about helping people do the things they need and want to do 
              in their daily lives. For neurodivergent people, that means therapy that works with 
              your brain, not against it.
            </p>
          </div>
        </div>
      </section>

      {/* What It Is */}
      <Section>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-display mb-6">What is Occupational Therapy?</h2>
          <p className="text-foreground/80 leading-relaxed mb-4">
            Occupational therapy (OT) focuses on function: your ability to do the activities 
            that matter to you, from self-care and household tasks to work, study, and leisure. 
            "Occupation" in this context means anything that occupies your time and has meaning 
            to you.
          </p>
          <p className="text-foreground/80 leading-relaxed mb-4">
            For autistic people and those with other neurodivergent profiles, OT can address 
            challenges with sensory processing, executive function, daily routines, emotional 
            regulation, and participation in life activities, all while respecting who you are.
          </p>
        </div>
      </Section>

      {/* Who It's For */}
      <Section className="bg-card/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-display mb-6">Who This Is For</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-foreground/80">Autistic adults and teens seeking neuroaffirming support</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-foreground/80">People with PDA profiles where traditional approaches haven't worked</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-foreground/80">Anyone struggling with executive function, daily routines, or self-care</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-foreground/80">People navigating late diagnosis and understanding their needs</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-foreground/80">Those managing chronic conditions alongside neurodivergence</span>
            </div>
          </div>
        </div>
      </Section>

      {/* What We Work On */}
      <Section>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-display mb-6">What We Can Work On Together</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-5">
              <h3 className="font-display text-lg mb-2">Daily Living Skills</h3>
              <p className="text-foreground/70 text-sm">
                Morning routines, meal preparation, household management, and personal care.
                Building systems that work for your brain.
              </p>
            </Card>
            <Card className="p-5">
              <h3 className="font-display text-lg mb-2">Executive Function</h3>
              <p className="text-foreground/70 text-sm">
                Task initiation, planning, prioritising, time management, and bridging the 
                gap between knowing and doing.
              </p>
            </Card>
            <Card className="p-5">
              <h3 className="font-display text-lg mb-2">Sensory Regulation</h3>
              <p className="text-foreground/70 text-sm">
                Understanding your sensory profile, identifying triggers, and building 
                environments and routines that support regulation.
              </p>
            </Card>
            <Card className="p-5">
              <h3 className="font-display text-lg mb-2">Work & Study Support</h3>
              <p className="text-foreground/70 text-sm">
                Accommodations, workspace setup, managing workload, and strategies for 
                sustainable productivity.
              </p>
            </Card>
            <Card className="p-5">
              <h3 className="font-display text-lg mb-2">Emotional Regulation</h3>
              <p className="text-foreground/70 text-sm">
                Understanding emotional responses, building coping strategies, and 
                creating conditions that support stability.
              </p>
            </Card>
            <Card className="p-5">
              <h3 className="font-display text-lg mb-2">Life Transitions</h3>
              <p className="text-foreground/70 text-sm">
                Moving out, starting work, navigating diagnosis, or any major change.
                Support through transitions.
              </p>
            </Card>
          </div>
        </div>
      </Section>

      {/* NDIS Info */}
      <Section className="bg-card/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-display mb-6">Funding & Fees</h2>
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-border">
                <span className="text-foreground">Occupational Therapy</span>
                <span className="font-display text-primary">$193.99/hr</span>
              </div>
              <p className="text-foreground/70 text-sm">
                This rate applies to NDIS participants (Capacity Building: Improved Daily Living), self-managed, and private pay clients.
              </p>
              <p className="text-foreground/70 text-sm">
                Sessions are typically 1 hour. We offer both in-person sessions (Perth metro) 
                and telehealth Australia-wide.
              </p>
            </div>
          </Card>
        </div>
      </Section>

      {/* CTA */}
      <CTABanner
        title="Ready to Get Started?"
        description="We'd love to hear from you. Whether you're self-referring or coming through a support coordinator, the first step is the same."
        primaryCTA={{ label: "Make a Referral", href: "/contact" }}
        secondaryCTA={{ label: "For Support Coordinators", href: "/for-referrers" }}
      />
    </>
  );
}
