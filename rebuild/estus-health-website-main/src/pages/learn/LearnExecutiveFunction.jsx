import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Brain, 
  Battery, 
  AlertCircle,
  CheckCircle,
  BookOpen
} from 'lucide-react';
import { Section, Card, CardContent, Button, Badge } from '../../components/ui';

export default function LearnExecutiveFunction() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-16 lg:py-24 grain-overlay border-b border-border">
        <div className="container">
          <div className="max-w-3xl">
            <div className="flex flex-wrap gap-2 mb-6">
              <Badge variant="primary">Learn</Badge>
              <Badge variant="outline">Executive Function</Badge>
              <Badge variant="outline">Chronic Illness</Badge>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight mb-6">
              Executive Function & Chronic Illness
            </h1>
            <p className="font-serif text-xl text-foreground/80 italic mb-6">
              Managing life with POTS, hEDS, MCAS, ME/CFS and neurodivergence
            </p>
            <p className="text-foreground/70 leading-relaxed">
              When you're managing multiple conditions alongside autism or ADHD, everything 
              competes for the same limited energy. The solution isn't "try harder." It's 
              building systems that account for your actual capacity.
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
                Executive function (your brain's ability to plan, start, and finish tasks) doesn't
                exist in isolation. When you're managing conditions like POTS, hEDS, MCAS, or ME/CFS 
                alongside neurodivergence, everything competes for the same limited energy. The solution 
                isn't "try harder." It's building systems that account for your actual capacity.
              </p>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Main Content */}
      <Section>
        <div className="max-w-3xl mx-auto">
          <article className="prose prose-invert max-w-none">
            
            {/* What is Executive Function */}
            <section className="mb-16">
              <h2 className="text-2xl md:text-3xl font-display mb-6">
                What is Executive Function?
              </h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Executive function is your brain's control centre, the set of cognitive processes
                that help you plan, prioritise, start tasks, stay focused, and manage your time and
                emotions. It includes:
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground/80"><strong className="text-foreground">Working memory:</strong> holding information while you use it</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground/80"><strong className="text-foreground">Task initiation:</strong> actually starting things</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground/80"><strong className="text-foreground">Planning and prioritising:</strong> figuring out what to do and in what order</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground/80"><strong className="text-foreground">Cognitive flexibility:</strong> switching between tasks or adapting when plans change</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground/80"><strong className="text-foreground">Emotional regulation:</strong> managing feelings so they don't derail you</span>
                </li>
              </ul>
              <p className="text-foreground/80 leading-relaxed">
                For autistic and ADHD brains, executive function is often already harder. The 
                prefrontal cortex, where much of this processing happens, works differently. 
                This isn't a character flaw. It's neurology.
              </p>
            </section>

            {/* The Overlap */}
            <section className="mb-16">
              <h2 className="text-2xl md:text-3xl font-display mb-6">
                The Overlap: Why These Conditions Travel Together
              </h2>
              <p className="text-foreground/80 leading-relaxed mb-6">
                If you're autistic or have ADHD and also have one or more of POTS, hEDS, MCAS, 
                or ME/CFS, you're not imagining the connection. Research is increasingly showing 
                that these conditions cluster together at rates far higher than chance.
              </p>
              
              <div className="grid gap-4 mb-6">
                <Card className="p-4">
                  <h3 className="font-display text-lg mb-2 flex items-center gap-2">
                    <span className="text-primary">hEDS:</span> Hypermobile Ehlers-Danlos Syndrome
                  </h3>
                  <p className="text-foreground/70 text-sm leading-relaxed">
                    A connective tissue disorder causing joint hypermobility, chronic pain, and fatigue. 
                    Studies show significantly higher rates of autism and ADHD in people with hEDS. The 
                    connective tissue differences may affect how the nervous system develops and functions.
                  </p>
                </Card>
                
                <Card className="p-4">
                  <h3 className="font-display text-lg mb-2 flex items-center gap-2">
                    <span className="text-primary">POTS:</span> Postural Orthostatic Tachycardia Syndrome
                  </h3>
                  <p className="text-foreground/70 text-sm leading-relaxed">
                    A form of dysautonomia where your heart rate increases abnormally when you stand. 
                    This causes dizziness, brain fog, fatigue, and difficulty concentrating. POTS and 
                    autism share links through the autonomic nervous system, the same system involved 
                    in sensory processing differences.
                  </p>
                </Card>
                
                <Card className="p-4">
                  <h3 className="font-display text-lg mb-2 flex items-center gap-2">
                    <span className="text-primary">MCAS:</span> Mast Cell Activation Syndrome
                  </h3>
                  <p className="text-foreground/70 text-sm leading-relaxed">
                    A condition where mast cells release too many chemical mediators, causing 
                    inflammation throughout the body. Symptoms include brain fog, fatigue, pain, 
                    and cognitive difficulties. The inflammation directly affects brain function 
                    and executive capacity.
                  </p>
                </Card>
                
                <Card className="p-4">
                  <h3 className="font-display text-lg mb-2 flex items-center gap-2">
                    <span className="text-primary">ME/CFS:</span> Myalgic Encephalomyelitis / Chronic Fatigue Syndrome
                  </h3>
                  <p className="text-foreground/70 text-sm leading-relaxed">
                    A complex, chronic illness characterised by profound fatigue, post-exertional 
                    malaise (PEM), and cognitive dysfunction. ME/CFS doesn't just make you tired.
                    It fundamentally limits how much cognitive and physical energy you have available.
                  </p>
                </Card>
              </div>

              <p className="text-foreground/80 leading-relaxed">
                The common thread? These conditions all affect the resources your brain needs to 
                function, whether through dysautonomia, inflammation, energy production, or 
                connective tissue differences. When you add neurodivergence to the mix, you're 
                working with a system that was already running on different parameters.
              </p>
            </section>

            {/* What This Looks Like */}
            <section className="mb-16">
              <h2 className="text-2xl md:text-3xl font-display mb-6">
                What This Actually Looks Like Day-to-Day
              </h2>
              
              <div className="space-y-6 mb-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Brain className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg mb-2">Knowing what to do but not being able to start</h3>
                    <p className="text-foreground/70 text-sm leading-relaxed">
                      The task is clear. The steps are clear. Your body won't move. This isn't laziness.
                      It's a disconnect between intention and initiation that's compounded by physical 
                      symptoms. When your heart rate spikes just from standing, starting anything feels 
                      like climbing a mountain.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Battery className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg mb-2">Decision fatigue before you've made a single decision</h3>
                    <p className="text-foreground/70 text-sm leading-relaxed">
                      When your baseline is already depleted by managing symptoms, monitoring how your 
                      body feels, and compensating for brain fog, there's nothing left for choosing 
                      what to eat or which email to answer first.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg mb-2">The "good day" trap</h3>
                    <p className="text-foreground/70 text-sm leading-relaxed">
                      You feel better, so you do more. Then you crash. Then you rest. Then you feel 
                      better, so you do more. This boom-bust cycle is exhausting and demoralising,
                      especially when people around you see your "good days" and assume that's your 
                      real capacity.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Brain className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg mb-2">Medical admin as a part-time job</h3>
                    <p className="text-foreground/70 text-sm leading-relaxed">
                      Managing multiple conditions means managing multiple specialists, medications, 
                      appointments, and endless forms. This coordination load uses up executive 
                      function that you don't have spare, often before you've even started on the 
                      things you actually want to do.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Why Planners Don't Work */}
            <section className="mb-16">
              <h2 className="text-2xl md:text-3xl font-display mb-6">
                Why "Just Use a Planner" Doesn't Work
              </h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Most productivity advice is built for healthy neurotypical brains with consistent 
                energy. When you have fluctuating capacity, the standard tools often make things worse:
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">→</span>
                  <span className="text-foreground/80"><strong className="text-foreground">Planners assume consistent capacity.</strong> They don't account for the day your POTS is flaring and you can't sit upright, or the MCAS reaction that wipes out your afternoon.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">→</span>
                  <span className="text-foreground/80"><strong className="text-foreground">To-do lists can become shame lists.</strong> When you can't complete what you planned, the list becomes evidence of failure rather than a helpful tool.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">→</span>
                  <span className="text-foreground/80"><strong className="text-foreground">Time management doesn't address the real problem.</strong> The issue isn't usually managing time. It's managing energy, symptoms, and the gap between intention and action.</span>
                </li>
              </ul>
              <p className="text-foreground/80 leading-relaxed">
                The graveyard of abandoned planners, apps, and systems isn't evidence that you're 
                failing. It's evidence that those tools weren't built for your situation.
              </p>
            </section>

            {/* What Actually Helps */}
            <section className="mb-16">
              <h2 className="text-2xl md:text-3xl font-display mb-6">
                What Actually Helps
              </h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="font-display text-xl mb-3 text-primary">Energy Accounting (Not Time Management)</h3>
                  <p className="text-foreground/80 leading-relaxed mb-3">
                    Instead of planning by time, plan by energy. What do you have available today,
                    not in an ideal world, but right now? This might mean categorising tasks by 
                    energy cost (low, medium, high) rather than by time required.
                  </p>
                  <p className="text-foreground/70 text-sm leading-relaxed">
                    Some people find spoon theory helpful. Others prefer thinking in terms of 
                    "energy budget" or "capacity units." The framework matters less than the 
                    principle: your energy is finite and fluctuating, and acknowledging that 
                    isn't giving up. It's being strategic.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-display text-xl mb-3 text-primary">Externalising Executive Function</h3>
                  <p className="text-foreground/80 leading-relaxed mb-3">
                    If your brain can't hold onto things, don't ask it to. Move executive function 
                    outside your head:
                  </p>
                  <ul className="space-y-2 text-foreground/70 text-sm">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong className="text-foreground">Body doubling:</strong> having another person present (even virtually) while you work</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong className="text-foreground">Visual cues:</strong> putting things where you'll see them, not where they "belong"</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong className="text-foreground">Automation:</strong> recurring orders, automatic payments, scheduled reminders</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong className="text-foreground">Resistance Breaker support:</strong> someone to help bridge the gap between knowing and doing</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-display text-xl mb-3 text-primary">Pacing Strategies That Respect PEM</h3>
                  <p className="text-foreground/80 leading-relaxed mb-3">
                    Post-exertional malaise (PEM) means that overdoing it today creates a crash 
                    tomorrow, or in two days, or three. This delayed consequence makes it hard to 
                    learn pacing intuitively.
                  </p>
                  <p className="text-foreground/70 text-sm leading-relaxed">
                    Effective pacing often means stopping before you feel you need to. It means 
                    building in rest as a scheduled, non-negotiable part of your day, not as a 
                    reward for productivity. This is counterintuitive for most people, and 
                    especially hard when you've spent your life pushing through.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-display text-xl mb-3 text-primary">Reducing Decisions, Not Adding Tools</h3>
                  <p className="text-foreground/80 leading-relaxed mb-3">
                    Every decision costs energy. The goal isn't to optimise decision-making. It's
                    to make fewer decisions:
                  </p>
                  <ul className="space-y-2 text-foreground/70 text-sm">
                    <li className="flex items-start gap-3">
                      <span className="text-primary">→</span>
                      <span>Same breakfast every day (or rotating between 2-3 options)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary">→</span>
                      <span>Clothes laid out the night before (or a capsule wardrobe)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary">→</span>
                      <span>Default answers for common requests ("I'll get back to you" buys time)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary">→</span>
                      <span>Pre-made decisions for bad days (what to eat, what to watch, who to text)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How We Support */}
            <section className="mb-16">
              <h2 className="text-2xl md:text-3xl font-display mb-6">
                How We Support Executive Function at Estus Health
              </h2>
              <p className="text-foreground/80 leading-relaxed mb-6">
                Our approach starts with understanding your whole picture, not just the neurodivergence, 
                but the conditions that travel with it. We don't treat executive function in isolation.
              </p>
              
              <div className="grid gap-4">
                <Card className="p-4 border-primary/20">
                  <h3 className="font-display text-lg mb-2">Functional Capacity Assessment</h3>
                  <p className="text-foreground/70 text-sm leading-relaxed">
                    We assess what you can actually do, on good days, bad days, and everything in 
                    between. This isn't about diagnosis. It's about understanding your real capacity 
                    so we can build systems that work.
                  </p>
                </Card>
                
                <Card className="p-4 border-primary/20">
                  <h3 className="font-display text-lg mb-2">Systems Built Around Fluctuating Capacity</h3>
                  <p className="text-foreground/70 text-sm leading-relaxed">
                    We help you design routines, environments, and supports that flex with your 
                    energy. Not rigid systems that break when you have a flare, but adaptable ones 
                    that have "bad day" modes built in.
                  </p>
                </Card>
                
                
                <Card className="p-4 border-primary/20">
                  <h3 className="font-display text-lg mb-2">Coordination With Your Other Providers</h3>
                  <p className="text-foreground/70 text-sm leading-relaxed">
                    Managing multiple conditions often means managing multiple practitioners. We 
                    communicate clearly with your other providers so everyone's working from the 
                    same page, and you're not stuck being the messenger.
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
            Need Support With Executive Function?
          </h2>
          <p className="text-foreground/70 mb-8">
            Whether you're managing multiple conditions or just finding that standard 
            approaches don't work for your brain, we're here to help build something that does.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button to="/contact" size="lg">
              Make a Referral
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button to="/services/executive-function-support" variant="outline" size="lg">
              Learn About Our Support
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
              <h3 className="font-display text-lg mb-2">Late Autism Diagnosis</h3>
              <p className="text-foreground/70 text-sm mb-4">
                Why autism gets missed and what late diagnosis means for understanding yourself.
              </p>
              <Link 
                to="/learn/late-autism-diagnosis" 
                className="inline-flex items-center text-primary text-sm font-medium"
              >
                Read guide <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Schema markup would go in the head via React Helmet or similar */}
    </>
  );
}
