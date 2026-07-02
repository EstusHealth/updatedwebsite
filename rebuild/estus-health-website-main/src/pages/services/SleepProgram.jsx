import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Moon,
  Sun,
  Brain,
  Activity,
  Clock,
  AlertTriangle,
  CheckCircle,
  Zap,
  Heart,
  Target,
  BookOpen
} from 'lucide-react';
import { Section, Card, CardContent, Button, Badge, ProcessStep, CTABanner } from '../../components/ui';

export default function SleepProgram() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-16 lg:py-24 grain-overlay border-b border-border">
        <div className="container">
          <div className="max-w-3xl">
            <p className="text-primary font-display text-sm uppercase tracking-widest mb-4">
              Services
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-display font-bold leading-tight mb-6">
              Sleep Performance
              <br />
              <span className="text-gradient-accent">Program</span>
            </h1>
            <p className="font-serif text-xl text-foreground/80 italic mb-6">
              The single highest-leverage intervention for nearly every performance domain
            </p>
            <p className="text-foreground/70 leading-relaxed mb-8">
              Sleep isn't a luxury or a "nice to have." It's the foundation that every other 
              protocol sits on. Nutrition, exercise, focus, emotional regulation: all degraded 
              without sleep. Your brain literally takes out the trash during deep sleep. Skip 
              this and metabolic waste accumulates.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button to="/contact" size="lg">
                Book a Session
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button to="#program" variant="outline" size="lg">
                See the Program
              </Button>
            </div>
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
                The Sleep Performance Program is a focused, 4-session OT intervention. We assess 
                your sleep, build the structure around it, and give you protocols that fit your 
                actual life. Not tips. Systems. Designed for neurodivergent adults who know sleep 
                matters but haven't found an approach that sticks.
              </p>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* How Sleep Works */}
      <Section>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-display mb-6">
            How Sleep Actually Works
          </h2>
          <p className="text-foreground/80 leading-relaxed mb-4">
            You don't need a PhD in neuroscience, but understanding the mechanics changes 
            how you approach sleep. Most people think of sleep as a single state: you're 
            either awake or you're not. In reality, sleep is a series of cycles, each doing 
            different work.
          </p>

          <div className="grid gap-6 mt-8">
            <Card>
              <CardContent className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <Moon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-lg mb-2">Sleep Architecture</h3>
                  <p className="text-foreground/70 text-sm leading-relaxed">
                    Your brain cycles through NREM stages 1-3 and REM sleep throughout the night. 
                    Each stage serves a different function: memory consolidation, tissue repair, 
                    emotional processing. Six hours of quality, well-structured sleep can outperform 
                    eight hours of fragmented sleep.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <Sun className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-lg mb-2">Circadian Rhythm</h3>
                  <p className="text-foreground/70 text-sm leading-relaxed">
                    Your master clock governs not just sleep but mood, appetite, and cognitive peaks. 
                    It's set by external cues called zeitgebers: light exposure, meal timing, physical 
                    activity. When these are misaligned, everything downstream suffers.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-lg mb-2">Chronotype</h3>
                  <p className="text-foreground/70 text-sm leading-relaxed">
                    You have a biological preference for when you sleep and when you're most alert. 
                    Fighting your chronotype creates friction. Understanding it creates leverage. We 
                    assess yours and build your schedule around it, not the other way around.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>

      {/* Assessment */}
      <Section className="bg-card/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-display mb-6">
            Sleep Assessment
          </h2>
          <p className="text-foreground/80 leading-relaxed mb-6">
            Before we change anything, we need to understand what's actually happening. 
            Not what you think is happening. Not what your fitness tracker says. A proper 
            clinical assessment.
          </p>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-foreground/80">
                <strong className="text-foreground">Sleep history and pattern analysis</strong> including 
                onset latency, wake frequency, and perceived quality
              </span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-foreground/80">
                <strong className="text-foreground">Chronotype identification</strong> to understand your 
                natural biological rhythm and where you're fighting it
              </span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-foreground/80">
                <strong className="text-foreground">Environment audit</strong> covering light, temperature, 
                noise, device proximity, and bedroom function
              </span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-foreground/80">
                <strong className="text-foreground">Behavioural mapping</strong> of your evening and morning 
                routines, caffeine timing, and screen habits
              </span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-foreground/80">
                <strong className="text-foreground">Neurodivergent-specific factors</strong> including sensory 
                sensitivities, medication interactions, delayed sleep phase patterns, and ADHD/autistic 
                sleep profiles
              </span>
            </div>
          </div>
        </div>
      </Section>

      {/* Downstream Effects */}
      <Section>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-display mb-4">
            Why Sleep Changes Everything
          </h2>
          <p className="text-foreground/80 leading-relaxed mb-8">
            Sleep isn't just about feeling rested. It's the upstream input that determines 
            the quality of nearly every downstream output. When sleep improves, the effects 
            cascade through every performance domain.
          </p>

          <div className="grid sm:grid-cols-2 gap-6">
            <Card hover>
              <CardContent>
                <Brain className="w-6 h-6 text-primary mb-3" />
                <h3 className="font-display text-lg mb-2">Concentration & Cognition</h3>
                <p className="text-foreground/70 text-sm leading-relaxed">
                  Working memory, processing speed, and sustained attention all degrade 
                  measurably with poor sleep. One night of restricted sleep produces cognitive 
                  impairment comparable to a blood alcohol level of 0.05.
                </p>
              </CardContent>
            </Card>

            <Card hover>
              <CardContent>
                <Activity className="w-6 h-6 text-primary mb-3" />
                <h3 className="font-display text-lg mb-2">Athletic Performance</h3>
                <p className="text-foreground/70 text-sm leading-relaxed">
                  Reaction time, endurance, injury rates, and recovery all correlate directly 
                  with sleep quality. Stanford research found basketball players who extended 
                  sleep saw sprint times, free-throw accuracy, and reaction times all improve.
                </p>
              </CardContent>
            </Card>

            <Card hover>
              <CardContent>
                <Heart className="w-6 h-6 text-primary mb-3" />
                <h3 className="font-display text-lg mb-2">Emotional Regulation</h3>
                <p className="text-foreground/70 text-sm leading-relaxed">
                  The amygdala becomes up to 60% more reactive after sleep deprivation, 
                  while prefrontal cortex activity decreases. The result: bigger emotional 
                  reactions with less capacity to regulate them. This compounds for 
                  neurodivergent people who already navigate heightened emotional processing.
                </p>
              </CardContent>
            </Card>

            <Card hover>
              <CardContent>
                <Zap className="w-6 h-6 text-primary mb-3" />
                <h3 className="font-display text-lg mb-2">Energy & Metabolism</h3>
                <p className="text-foreground/70 text-sm leading-relaxed">
                  Glucose regulation, appetite hormones (ghrelin and leptin), and cortisol 
                  rhythms are all governed by sleep. Poor sleep doesn't just make you tired. 
                  It changes your metabolic profile, increases cravings for high-calorie food, 
                  and disrupts the hormones that signal satiety.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Neuroaffirming callout */}
          <Card className="mt-8 border-primary/30 bg-primary/5">
            <CardContent>
              <h3 className="font-display text-lg mb-2 text-primary">A Note on Neurodivergent Sleep</h3>
              <p className="text-foreground/80 text-sm leading-relaxed">
                Autistic and ADHD sleep profiles often diverge from neurotypical patterns. 
                Delayed sleep phase, sensory sensitivities to light and sound, difficulty with 
                sleep-wake transitions, and medication-related disruptions are common. Generic 
                sleep advice ignores all of this. Our approach doesn't. Every protocol is designed 
                around who you actually are, not who the textbook assumes you should be.
              </p>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Common Mistakes */}
      <Section className="bg-card/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-display mb-4">
            Where People Get Stuck
          </h2>
          <p className="text-foreground/80 leading-relaxed mb-8">
            Most people aren't failing because they lack information. They're failing because 
            the information they have is either wrong, incomplete, or badly sequenced.
          </p>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-display text-base mb-1">Optimising the wrong variable</h3>
                <p className="text-foreground/70 text-sm leading-relaxed">
                  Buying a new mattress when the real issue is light exposure. Investing in 
                  supplements when the problem is caffeine timing. Most people fix what's visible, 
                  not what matters.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <AlertTriangle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-display text-base mb-1">Treating the symptom, not the system</h3>
                <p className="text-foreground/70 text-sm leading-relaxed">
                  "I can't fall asleep" is a symptom. The system might be circadian misalignment, 
                  cortisol dysregulation, or an evening routine that actively promotes wakefulness. 
                  You need to map the system before you fix the symptom.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <AlertTriangle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-display text-base mb-1">Following generic advice</h3>
                <p className="text-foreground/70 text-sm leading-relaxed">
                  "Go to bed at 10pm. Wake at 6am. No screens before bed." This is fine for 
                  someone whose biology, lifestyle, and neurology align with that template. For 
                  everyone else, it's setting up for failure.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <AlertTriangle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-display text-base mb-1">Changing everything at once</h3>
                <p className="text-foreground/70 text-sm leading-relaxed">
                  New supplement, new app, new routine, all in the same week. Two weeks later 
                  you've abandoned all of it. Sustainable change is sequential, not simultaneous. 
                  The order matters as much as the changes themselves.
                </p>
              </div>
            </div>
          </div>

          <p className="text-foreground/80 leading-relaxed mt-8 font-serif italic">
            If any of these sound familiar, you're not broken. You just haven't had the right 
            structure yet.
          </p>
        </div>
      </Section>

      {/* The Program */}
      <Section id="program">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-display mb-4">
            The <span className="text-gradient-accent">Sleep Performance</span> Program
          </h2>
          <p className="text-foreground/80 leading-relaxed mb-8">
            A focused, 4-session OT intervention designed to assess your sleep, build the 
            structure around it, and give you protocols that fit your actual life. Part of 
            our Small Hinges Series: short, targeted interventions that create disproportionate 
            change.
          </p>

          <div className="space-y-6">
            <ProcessStep 
              number="1" 
              title="Assessment & Mapping" 
              description="Comprehensive sleep assessment including chronotype identification, environment audit, behavioural mapping, and neurodivergent-specific factors. We build a complete picture of what's actually happening before we touch anything."
            />
            <ProcessStep 
              number="2" 
              title="Architecture & Environment" 
              description="We design your sleep environment and circadian alignment strategy. Light exposure protocols, temperature regulation, sensory considerations, and the physical setup that supports your biology."
            />
            <ProcessStep 
              number="3" 
              title="Routine & Protocol Building" 
              description="Your personalised evening and morning routines, built around your chronotype and lifestyle constraints. We sequence changes carefully so they actually stick. Includes the 3-2-1 framework adapted to your context."
            />
            <ProcessStep 
              number="4" 
              title="Integration & Tracking" 
              description="Monitoring systems, troubleshooting protocols, and long-term sustainability planning. We make sure the changes survive contact with real life, not just the first two weeks of motivation."
            />
          </div>
        </div>
      </Section>

      {/* Who This Is For */}
      <Section className="bg-card/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-display mb-6">Who This Is For</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-foreground/80">
                Neurodivergent adults who know sleep matters but haven't found an approach that sticks
              </span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-foreground/80">
                People with ADHD or autism navigating delayed sleep phase or sensory-related sleep disruption
              </span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-foreground/80">
                Anyone managing burnout, brain fog, or energy crashes who suspects sleep is the root cause
              </span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-foreground/80">
                High performers and professionals who want to optimise cognitive output through better sleep systems
              </span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-foreground/80">
                People who've tried the generic advice and need something built for their actual life
              </span>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <CTABanner
        title="Ready to Stop Guessing?"
        description="The Sleep Performance Program is 4 sessions. We assess your sleep, build the structure, and give you protocols that work. Not tips. Systems."
        primaryCTA={{ label: "Book a Session", href: "/contact" }}
        secondaryCTA={{ label: "Learn About OT", href: "/services/occupational-therapy" }}
      />

      {/* Related */}
      <Section>
        <h2 className="text-xl font-display mb-6">Related Services</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card hover>
            <CardContent>
              <h3 className="font-display text-lg mb-2">Occupational Therapy</h3>
              <p className="text-foreground/70 text-sm mb-4">
                Functional support that respects who you are. Sleep sits within our broader OT approach.
              </p>
              <Link 
                to="/services/occupational-therapy" 
                className="inline-flex items-center text-primary text-sm font-medium"
              >
                Learn more <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </CardContent>
          </Card>
          <Card hover>
            <CardContent>
              <h3 className="font-display text-lg mb-2">Gaming-Informed Therapy</h3>
              <p className="text-foreground/70 text-sm mb-4">
                Therapy built around your interests and engagement patterns.
              </p>
              <Link 
                to="/services/gaming-informed-therapy" 
                className="inline-flex items-center text-primary text-sm font-medium"
              >
                Learn more <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </CardContent>
          </Card>
        </div>
      </Section>
    </>
  );
}
