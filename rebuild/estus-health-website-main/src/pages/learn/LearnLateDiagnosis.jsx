import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Brain, 
  Heart,
  CheckCircle,
  AlertCircle,
  BookOpen,
  Users
} from 'lucide-react';
import { Section, Card, CardContent, Button, Badge } from '../../components/ui';

export default function LearnLateDiagnosis() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-16 lg:py-24 grain-overlay border-b border-border">
        <div className="container">
          <div className="max-w-3xl">
            <div className="flex flex-wrap gap-2 mb-6">
              <Badge variant="primary">Learn</Badge>
              <Badge variant="outline">Autism</Badge>
              <Badge variant="outline">Diagnosis</Badge>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight mb-6">
              Late Autism Diagnosis
            </h1>
            <p className="font-serif text-xl text-foreground/80 italic mb-6">
              What it means to be diagnosed as an adult, and what comes next
            </p>
            <p className="text-foreground/70 leading-relaxed">
              Many autistic people aren't diagnosed until adulthood. Getting diagnosed later 
              isn't "less valid." For many, it's the missing piece that finally makes a 
              lifetime of experiences make sense.
            </p>
          </div>
        </div>
      </section>

      {/* TL;DR */}
      <Section className="bg-card/50 py-12">
        <div className="max-w-3xl mx-auto">
          <Card className="border-primary/30">
            <CardContent className="p-6 lg:p-8">
              <h2 className="font-display text-lg mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                The Short Version
              </h2>
              <p className="text-foreground/90 leading-relaxed">
                Late autism diagnosis is increasingly common, especially for women, people of
                colour, and anyone who learned to mask their traits. Getting diagnosed as an adult 
                isn't "less valid." For many, it's the missing piece that finally makes a lifetime 
                of experiences make sense.
              </p>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Main Content */}
      <Section>
        <div className="max-w-3xl mx-auto">
          <article className="prose prose-invert max-w-none">
            
            {/* Why Autism Gets Missed */}
            <section className="mb-16">
              <h2 className="text-2xl md:text-3xl font-display mb-6">
                Why Autism Gets Missed
              </h2>
              <p className="text-foreground/80 leading-relaxed mb-6">
                Autism wasn't always understood the way it is now.  
                If you didn't fit that narrow picture, you were unlikely to be identified.
              </p>
              
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <AlertCircle className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg mb-1">Outdated Diagnostic Criteria</h3>
                    <p className="text-foreground/70 text-sm leading-relaxed">
                      The "classic" autism presentation was defined by researchers observing males. 
                      Girls, women, and anyone who presented differently were systematically missed.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <AlertCircle className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg mb-1">Masking and Camouflaging</h3>
                    <p className="text-foreground/70 text-sm leading-relaxed">
                      Many autistic people, especially those socialised as girls, learned early 
                      to hide their differences. Copying peers, suppressing stims, forcing eye 
                      contact. The mask worked well enough to pass as neurotypical, but at enormous 
                      personal cost.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <AlertCircle className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg mb-1">High Academic Achievement</h3>
                    <p className="text-foreground/70 text-sm leading-relaxed">
                      "But you did well in school" is something many late-diagnosed autistics hear. 
                      Intelligence doesn't prevent autism. It can actually help mask it.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <AlertCircle className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg mb-1">Misdiagnosis</h3>
                    <p className="text-foreground/70 text-sm leading-relaxed">
                      Before autism was considered, many people received other diagnoses: anxiety, 
                      depression, disordered eating, bipolar disorder, borderline personality disorder, ADHD alone. 
                      These conditions can co-occur with autism, but often the autism was the 
                      underlying piece that explained why other treatments only partially helped.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Signs That Get Overlooked */}
            <section className="mb-16">
              <h2 className="text-2xl md:text-3xl font-display mb-6">
                Signs That Often Get Overlooked
              </h2>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">→</span>
                  <span className="text-foreground/80"><strong className="text-foreground">Social exhaustion after "normal" interactions</strong>: needing hours or days to recover from social events.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">→</span>
                  <span className="text-foreground/80"><strong className="text-foreground">Sensory sensitivities dismissed as "fussiness"</strong>: can't wear certain fabrics, overwhelmed by busy environments.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">→</span>
                  <span className="text-foreground/80"><strong className="text-foreground">Intense interests labelled as "obsessions"</strong>: deep dives into topics that bring joy and focus.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">→</span>
                  <span className="text-foreground/80"><strong className="text-foreground">Difficulty with unwritten social rules</strong>: feeling like everyone else got a manual you never received.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">→</span>
                  <span className="text-foreground/80"><strong className="text-foreground">Burnout cycles mistaken for depression</strong>: pushing through until you can't, crashing, repeating.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">→</span>
                  <span className="text-foreground/80"><strong className="text-foreground">Feeling "different" without knowing why</strong>: a persistent sense of observing humanity from the outside.</span>
                </li>
              </ul>
            </section>

            {/* What Late Diagnosis Feels Like */}
            <section className="mb-16">
              <h2 className="text-2xl md:text-3xl font-display mb-6">
                What Late Diagnosis Feels Like
              </h2>
              
              <div className="grid gap-4 mb-6">
                <Card className="p-4">
                  <h3 className="font-display text-lg mb-2 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-primary" />
                    Relief
                  </h3>
                  <p className="text-foreground/70 text-sm leading-relaxed">
                    "There's a reason. It's not a character flaw. I'm not broken. My brain just
                    works differently." For many, finally having an explanation brings profound relief.
                  </p>
                </Card>
                
                <Card className="p-4">
                  <h3 className="font-display text-lg mb-2 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-primary" />
                    Grief
                  </h3>
                  <p className="text-foreground/70 text-sm leading-relaxed">
                    Grief for the years spent not knowing. For the support you could have had. For 
                    the energy spent trying to be someone you weren't. This grief is real and valid.
                  </p>
                </Card>
                
                <Card className="p-4">
                  <h3 className="font-display text-lg mb-2 flex items-center gap-2">
                    <Brain className="w-5 h-5 text-primary" />
                    Re-evaluation
                  </h3>
                  <p className="text-foreground/70 text-sm leading-relaxed">
                    Looking back at your entire life through a new lens. Childhood struggles, 
                    relationship patterns, career choices. Everything gets reframed.
                  </p>
                </Card>
                
                <Card className="p-4">
                  <h3 className="font-display text-lg mb-2 flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    Identity Shifts
                  </h3>
                  <p className="text-foreground/70 text-sm leading-relaxed">
                    Integrating "autistic" into your identity is a process. There's no right speed, 
                    and your relationship with this part of yourself will likely evolve.
                  </p>
                </Card>
              </div>

              <Card className="p-4 border-l-2 border-primary bg-primary/5">
                <p className="text-foreground/80 text-sm">
                  <strong className="text-foreground">A note on "unmasking":</strong> After diagnosis, 
                  many people feel pressure to immediately unmask. Be gentle with yourself. The mask 
                  developed as a survival strategy. Taking it off is gradual, and some parts can stay.
                </p>
              </Card>
            </section>

            {/* What Helps After Diagnosis */}
            <section className="mb-16">
              <h2 className="text-2xl md:text-3xl font-display mb-6">
                What Helps After Diagnosis
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-display text-xl mb-3 text-primary">Finding Community</h3>
                  <p className="text-foreground/80 leading-relaxed">
                    Connecting with other autistic people, especially other late-diagnosed adults,
                    can be transformative. For the first time, you might find people who truly understand.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-display text-xl mb-3 text-primary">Adjusting Expectations</h3>
                  <p className="text-foreground/80 leading-relaxed">
                    Diagnosis gives you permission to reassess. Maybe you don't need to enjoy parties. 
                    Maybe your need for alone time isn't antisocial. Maybe the accommodations you've 
                    been quietly making for yourself are actually reasonable.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-display text-xl mb-3 text-primary">Sensory Accommodations</h3>
                  <p className="text-foreground/80 leading-relaxed">
                    Now that you understand your sensory differences, you can address them directly. 
                    Noise-cancelling headphones, specific textures, control over lighting: these
                    aren't luxuries, they're access needs.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-display text-xl mb-3 text-primary">Understanding Your Capacity</h3>
                  <p className="text-foreground/80 leading-relaxed">
                    Concepts like "spoon theory" or "energy accounting" can help you understand and 
                    communicate your fluctuating capacity. Learning to track and budget energy helps 
                    prevent burnout cycles.
                  </p>
                </div>
              </div>
            </section>

            {/* Our Approach */}
            <section className="mb-16">
              <h2 className="text-2xl md:text-3xl font-display mb-6">
                How We Support Late-Diagnosed Adults
              </h2>
              
              <div className="grid gap-4">
                <Card className="p-4 border-primary/20">
                  <h3 className="font-display text-lg mb-2">Assessment Tailored to Adult Presentations</h3>
                  <p className="text-foreground/70 text-sm leading-relaxed">
                    We understand that autism in adults, especially those who've spent years
                    masking, doesn't look like the textbook descriptions.
                  </p>
                </Card>
                
                <Card className="p-4 border-primary/20">
                  <h3 className="font-display text-lg mb-2">Focus on Self-Understanding, Not "Fixing"</h3>
                  <p className="text-foreground/70 text-sm leading-relaxed">
                    Our goal isn't to make you more neurotypical. It's to help you understand 
                    your brain and build a life that actually fits who you are.
                  </p>
                </Card>
                
                <Card className="p-4 border-primary/20">
                  <h3 className="font-display text-lg mb-2">Executive Function Support</h3>
                  <p className="text-foreground/70 text-sm leading-relaxed">
                    We help build systems and supports that work for your brain, not against it.
                  </p>
                </Card>
              </div>
            </section>

          </article>
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-card border-t border-border">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-display mb-4">
            Navigating Late Diagnosis?
          </h2>
          <p className="text-foreground/70 mb-8">
            Whether you're seeking assessment, recently diagnosed, or looking for support 
            in understanding what diagnosis means for your life, we're here to help.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button to="/contact" size="lg">
              Make a Referral
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button to="/services/occupational-therapy" variant="outline" size="lg">
              Our OT Services
            </Button>
          </div>
        </div>
      </Section>

      {/* Related Content */}
      <Section>
        <h2 className="text-xl font-display mb-6">Related Reading</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card hover>
            <CardContent>
              <h3 className="font-display text-lg mb-2">Understanding PDA</h3>
              <p className="text-foreground/70 text-sm mb-4">
                Pathological Demand Avoidance and why traditional approaches often backfire.
              </p>
              <Link 
                to="/learn/understanding-pda" 
                className="inline-flex items-center text-primary text-sm font-medium"
              >
                Read guide <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </CardContent>
          </Card>
          <Card hover>
            <CardContent>
              <h3 className="font-display text-lg mb-2">Executive Function & Complex Health</h3>
              <p className="text-foreground/70 text-sm mb-4">
                Managing POTS, hEDS, MCAS, or ME/CFS alongside neurodivergence.
              </p>
              <Link 
                to="/learn/executive-function-complex-health" 
                className="inline-flex items-center text-primary text-sm font-medium"
              >
                Read guide <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </CardContent>
          </Card>
        </div>
      </Section>
    </>
  );
}
