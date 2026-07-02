import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle,
  XCircle,
  BookOpen
} from 'lucide-react';
import { Section, Card, CardContent, Button, Badge } from '../../components/ui';

export default function LearnPDA() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-16 lg:py-24 grain-overlay border-b border-border">
        <div className="container">
          <div className="max-w-3xl">
            <div className="flex flex-wrap gap-2 mb-6">
              <Badge variant="primary">Learn</Badge>
              <Badge variant="outline">PDA</Badge>
              <Badge variant="outline">Autism</Badge>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight mb-6">
              Understanding PDA
            </h1>
            <p className="font-serif text-xl text-foreground/80 italic mb-6">
              Pathological Demand Avoidance: what it is, how it shows up, and what actually helps
            </p>
            <p className="text-foreground/70 leading-relaxed">
              PDA is a profile of autism where the nervous system perceives everyday demands as 
              threats. It's not defiance or "bad behaviour." It's a survival response. And what 
              helps isn't more structure. It's less pressure.
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
                PDA (Pathological Demand Avoidance) is a profile of autism where the nervous 
                system perceives everyday demands as threats. It's not defiance or "bad behaviour." 
                It's a survival response. What helps isn't more structure. It's less pressure.
              </p>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Main Content */}
      <Section>
        <div className="max-w-3xl mx-auto">
          <article className="prose prose-invert max-w-none">
            
            <section className="mb-16">
              <h2 className="text-2xl md:text-3xl font-display mb-6">
                What is PDA?
              </h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Pathological Demand Avoidance (PDA) is a profile of autism first described by 
                Elizabeth Newson in the 1980s. The core feature is an anxiety-driven need to 
                avoid demands, not out of defiance or laziness, but because demands feel
                genuinely threatening to the nervous system.
              </p>
              <p className="text-foreground/80 leading-relaxed mb-4">
                The word "pathological" is contested. Many in the PDA community prefer terms 
                like "Pervasive Drive for Autonomy" or simply "PDA profile." Whatever you call 
                it, the experience is the same: ordinary expectations that most people navigate 
                easily can feel impossible, overwhelming, or even dangerous.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                This isn't about being "oppositional." People with PDA often want to do the 
                thing. They just can't, not when it's framed as a demand. The demand itself 
                triggers a threat response.
              </p>
            </section>

            <section className="mb-16">
              <h2 className="text-2xl md:text-3xl font-display mb-6">
                How PDA Shows Up
              </h2>
              
              <h3 className="font-display text-xl mb-4 text-primary">In Children</h3>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">→</span>
                  <span className="text-foreground/80"><strong className="text-foreground">School refusal</strong>: not "won't go" but genuinely can't. The demand of school attendance triggers overwhelm.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">→</span>
                  <span className="text-foreground/80"><strong className="text-foreground">Meltdowns over "easy" tasks</strong>: brushing teeth, getting dressed, homework that they clearly know how to do.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">→</span>
                  <span className="text-foreground/80"><strong className="text-foreground">Social masking</strong>: appearing to cope in public, then falling apart at home where it feels safe.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">→</span>
                  <span className="text-foreground/80"><strong className="text-foreground">Role play and fantasy</strong>: using imaginative play to process demands or create control.</span>
                </li>
              </ul>

              <h3 className="font-display text-xl mb-4 text-primary">In Adults</h3>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">→</span>
                  <span className="text-foreground/80"><strong className="text-foreground">Burnout cycles</strong>: periods of pushing through followed by complete collapse.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">→</span>
                  <span className="text-foreground/80"><strong className="text-foreground">Employment difficulties</strong>: struggling with workplace demands even when the work itself is enjoyable.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">→</span>
                  <span className="text-foreground/80"><strong className="text-foreground">Avoiding even things you want to do</strong>: the demand itself is the problem, not the activity.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">→</span>
                  <span className="text-foreground/80"><strong className="text-foreground">Difficulty with self-care</strong>: eating, showering, medical appointments become demands too.</span>
                </li>
              </ul>
            </section>

            <section className="mb-16">
              <h2 className="text-2xl md:text-3xl font-display mb-6">
                PDA vs Other Presentations
              </h2>
              
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 pr-4 font-display text-foreground">Feature</th>
                      <th className="text-left py-3 px-4 font-display text-foreground">PDA</th>
                      <th className="text-left py-3 px-4 font-display text-foreground">ODD</th>
                    </tr>
                  </thead>
                  <tbody className="text-foreground/70">
                    <tr className="border-b border-border/50">
                      <td className="py-3 pr-4 font-medium text-foreground">Root cause</td>
                      <td className="py-3 px-4">Anxiety / threat response</td>
                      <td className="py-3 px-4">Often trauma or conduct issues</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 pr-4 font-medium text-foreground">Response to demands</td>
                      <td className="py-3 px-4">Avoidance driven by overwhelm</td>
                      <td className="py-3 px-4">Active defiance</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 font-medium text-foreground">What helps</td>
                      <td className="py-3 px-4">Reducing demands, autonomy</td>
                      <td className="py-3 px-4">Boundaries, consistency</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <Card className="p-4 border-l-2 border-primary bg-primary/5">
                <p className="text-foreground/80 text-sm">
                  <strong className="text-foreground">Why this matters:</strong> PDA is frequently 
                  misdiagnosed as ODD, leading to interventions that make things worse.
                </p>
              </Card>
            </section>

            <section className="mb-16">
              <h2 className="text-2xl md:text-3xl font-display mb-6">
                What Helps
              </h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="font-display text-xl mb-3 text-primary">Low-Demand Approaches</h3>
                  <p className="text-foreground/80 leading-relaxed mb-3">
                    This doesn't mean "no expectations." It means reducing unnecessary demands:
                  </p>
                  <ul className="space-y-2 text-foreground/70 text-sm">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Does this actually need to happen right now?</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Does it need to happen this way, or is there flexibility?</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>What's the cost of not doing this vs forcing it?</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-display text-xl mb-3 text-primary">Autonomy Over Compliance</h3>
                  <ul className="space-y-2 text-foreground/70 text-sm">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Offering genuine choices (not "do this or else")</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Indirect language: "I wonder if..." instead of "You need to..."</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Letting the person set the pace where possible</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-display text-xl mb-3 text-primary">What Backfires</h3>
                  <ul className="space-y-2 text-foreground/70 text-sm">
                    <li className="flex items-start gap-3">
                      <XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                      <span><strong className="text-foreground">Reward charts</strong>: turn activities into demands with performance pressure</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                      <span><strong className="text-foreground">Consequences</strong>: escalate anxiety without addressing the root cause</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                      <span><strong className="text-foreground">Countdowns and timers</strong>: create urgency that increases threat response</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                      <span><strong className="text-foreground">Praise</strong>: can feel like pressure to repeat performance</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-16">
              <h2 className="text-2xl md:text-3xl font-display mb-6">
                How We Work With PDA at Estus Health
              </h2>
              
              <div className="grid gap-4">
                <Card className="p-4 border-primary/20">
                  <h3 className="font-display text-lg mb-2">Low-Demand Therapy</h3>
                  <p className="text-foreground/70 text-sm leading-relaxed">
                    Our philosophy isn't about compliance. It's about reducing pressure until 
                    the next step feels possible, however long that takes.
                  </p>
                </Card>
                
                <Card className="p-4 border-primary/20">
                  <h3 className="font-display text-lg mb-2">Gaming-Informed Approaches</h3>
                  <p className="text-foreground/70 text-sm leading-relaxed">
                    Traditional therapy is full of demands. Gaming-informed therapy meets people 
                    in a space that already feels safe.
                  </p>
                </Card>
                
                <Card className="p-4 border-primary/20">
                  <h3 className="font-display text-lg mb-2">Lived Experience</h3>
                  <p className="text-foreground/70 text-sm leading-relaxed">
                    Our team have lived expereince with Autism and PDA. We understand from the 
                    inside, not just from textbooks.
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
            Looking for PDA-Informed Support?
          </h2>
          <p className="text-foreground/70 mb-8">
            We understand why traditional approaches haven't worked. Our team specialises 
            in support that actually helps.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button to="/contact" size="lg">
              Make a Referral
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button to="/services/gaming-informed-therapy" variant="outline" size="lg">
              Gaming-Informed Therapy
            </Button>
          </div>
        </div>
      </Section>

      {/* Related */}
      <Section>
        <h2 className="text-xl font-display mb-6">Related Reading</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card hover>
            <CardContent>
              <h3 className="font-display text-lg mb-2">Late Autism Diagnosis</h3>
              <p className="text-foreground/70 text-sm mb-4">
                Why autism gets missed and what late diagnosis means.
              </p>
              <Link 
                to="/learn/late-autism-diagnosis" 
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
