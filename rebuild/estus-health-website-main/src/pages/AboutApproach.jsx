import { Link } from 'react-router-dom';
import { Section, Card, CardContent, Button, PullQuote } from '../components/ui';
import { ArrowRight, Heart, Sparkles, Brain, Shield, Users } from 'lucide-react';

export default function AboutApproach() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-16 lg:py-24 grain-overlay border-b border-border">
        <div className="container">
          <div className="max-w-3xl">
            <p className="text-primary font-display text-sm uppercase tracking-widest mb-4">
              Our Philosophy
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight mb-6">
              We Don't Fix People
              <br />
              <span className="text-gradient-accent">We Fix the Environment</span>
            </h1>
            <p className="text-foreground/70 leading-relaxed">
              Traditional therapy often asks neurodivergent people to change who they are. 
              We take a different view: when the environment is right, people thrive.
            </p>
          </div>
        </div>
      </section>

      {/* Core Philosophy */}
      <Section>
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-foreground/80 leading-relaxed mb-8">
            Estus Health exists because too many autistic people have been harmed by therapy 
            that treated them as problems to be solved. We've seen what happens when clinicians 
            prioritise compliance over connection, when "functioning" is measured by how well 
            someone can pass as neurotypical, when the goal is to make people easier to manage 
            rather than helping them live well.
          </p>
          <p className="text-lg text-foreground/80 leading-relaxed mb-8">
            We believe something different is possible.
          </p>
          <PullQuote 
            quote="We don't force change. We walk alongside until the next step feels possible."
            className="my-12"
          />
        </div>
      </Section>

      {/* Principles */}
      <Section className="bg-card/50">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl md:text-3xl font-display mb-4">What This Looks Like in Practice</h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card className="p-6">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Heart className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-display text-xl mb-3">Neuroaffirming, Not Normalising</h3>
            <p className="text-foreground/70 text-sm leading-relaxed">
              We don't try to make autistic people act less autistic. Stimming, special interests, 
              and different communication styles aren't problems to fix. They're valid ways of
              being in the world.
            </p>
          </Card>
          
          <Card className="p-6">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-display text-xl mb-3">Low-Demand by Design</h3>
            <p className="text-foreground/70 text-sm leading-relaxed">
              Our sessions are designed to reduce pressure, not add to it. We understand that 
              traditional therapy structures can feel like demands, and for PDA profiles
              especially, demands trigger the nervous system.
            </p>
          </Card>
          
          <Card className="p-6">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Brain className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-display text-xl mb-3">Strengths-Based</h3>
            <p className="text-foreground/70 text-sm leading-relaxed">
              We start with what's working, what brings joy, what you're already good at. 
              Deficits-focused approaches miss the full picture of who someone is.
            </p>
          </Card>
          
          <Card className="p-6">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-display text-xl mb-3">Safety First</h3>
            <p className="text-foreground/70 text-sm leading-relaxed">
              Therapeutic progress requires feeling safe. We prioritise building trust and 
              connection before asking anyone to do hard things. Regulation before expectation.
            </p>
          </Card>
          
          <Card className="p-6">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-display text-xl mb-3">Lived Experience Matters</h3>
            <p className="text-foreground/70 text-sm leading-relaxed">
              Several members of our team are neurodivergent ourselves. We understand this 
              work from the inside: the struggles, the strengths, and what actually helps.
            </p>
          </Card>
          
          <Card className="p-6">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <ArrowRight className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-display text-xl mb-3">Practical, Not Just Theoretical</h3>
            <p className="text-foreground/70 text-sm leading-relaxed">
              We're occupational therapists. Our job is to help people do the things they 
              need and want to do in their actual lives, not just talk about it.
            </p>
          </Card>
        </div>
      </Section>

      {/* What We Don't Do */}
      <Section>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-display mb-6">What We Don't Do</h2>
          <p className="text-foreground/80 leading-relaxed mb-6">
            Being clear about what we don't do is just as important as what we offer:
          </p>
          <ul className="space-y-4 text-foreground/70">
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold mt-1">✕</span>
              <span><strong className="text-foreground">ABA or compliance-based approaches</strong>: we don't use methods designed to extinguish autistic behaviours or prioritise obedience.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold mt-1">✕</span>
              <span><strong className="text-foreground">Masking as a goal</strong>: we don't teach people to hide who they are. If someone chooses to mask in certain contexts for safety, we support that choice, but it's never our therapeutic goal.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold mt-1">✕</span>
              <span><strong className="text-foreground">Pathologising difference</strong>: being autistic isn't a disorder to be cured. The challenges come from living in a world not designed for neurodivergent brains.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold mt-1">✕</span>
              <span><strong className="text-foreground">Pushing through at any cost</strong>: we don't believe in "no pain, no gain" approaches. Sustainable progress respects capacity limits.</span>
            </li>
          </ul>
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-card border-t border-border">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-display mb-4">
            This Resonates With You?
          </h2>
          <p className="text-foreground/70 mb-8">
            If you've been looking for therapy that actually gets it, we're here.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button to="/contact" size="lg">
              Make a Referral
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button to="/about/team" variant="outline" size="lg">
              Meet the Team
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
