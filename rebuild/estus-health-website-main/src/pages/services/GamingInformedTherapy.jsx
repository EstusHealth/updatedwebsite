import { Section, Card, CardContent, Button, CTABanner } from '../../components/ui';
import { ArrowRight, CheckCircle, Gamepad2 } from 'lucide-react';

export default function GamingInformedTherapy() {
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
              Gaming-Informed Therapy
            </h1>
            <p className="font-serif text-xl text-foreground/80 italic mb-6">
              Therapy through a channel that actually works
            </p>
            <p className="text-foreground/70 leading-relaxed">
              For many neurodivergent people, gaming isn't just a hobby. It's a space where
              they feel competent, connected, and regulated. We meet people there, using games 
              as a genuine therapeutic tool rather than treating them as something to overcome.
            </p>
          </div>
        </div>
      </section>

      {/* What It Is */}
      <Section>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-display mb-6">What is Gaming-Informed Therapy?</h2>
          <p className="text-foreground/80 leading-relaxed mb-4">
            Gaming-informed therapy uses video games as a medium for therapeutic work. This isn't 
            about using games as a reward or treating gaming as problematic. It's about 
            recognising that games create genuine opportunities for skill development, emotional 
            processing, and connection.
          </p>
          <p className="text-foreground/80 leading-relaxed mb-4">
            Games provide a lower-stakes environment to practice skills that feel overwhelming 
            in real life. They offer immediate feedback, clear rules, and controllable challenge 
            levels, all things that can be difficult to find in everyday situations.
          </p>
          <Card className="p-4 border-l-2 border-primary bg-primary/5 mt-6">
            <p className="text-foreground/80 text-sm">
              <strong className="text-foreground">Note on evidence:</strong> Gaming-informed therapy 
              is an emerging area of practice. We draw on established 
              principles of play therapy, occupational therapy, and neurodivergent-affirming practice.
            </p>
          </Card>
        </div>
      </Section>

      {/* Who It's For */}
      <Section className="bg-card/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-display mb-6">Who This Is For</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-foreground/80">Autistic youth and adults who already love gaming</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-foreground/80">People with PDA profiles who find traditional therapy too demanding</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-foreground/80">Anyone whose interests have been dismissed or pathologised</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-foreground/80">People who struggle to engage in talk-based therapy</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-foreground/80">Young people transitioning to adult services</span>
            </div>
          </div>
        </div>
      </Section>

      {/* How We Use It */}
      <Section>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-display mb-6">How We Use Gaming in Sessions</h2>
          <div className="space-y-6">
            <Card className="p-5">
              <div className="flex gap-4">
                <Gamepad2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-display text-lg mb-2">Building Connection & Trust</h3>
                  <p className="text-foreground/70 text-sm">
                    Playing together creates genuine connection without the pressure of face-to-face 
                    conversation. For PDA profiles especially, this parallel engagement feels safer 
                    than direct demands.
                  </p>
                </div>
              </div>
            </Card>
            
            <Card className="p-5">
              <div className="flex gap-4">
                <Gamepad2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-display text-lg mb-2">Practicing Problem-Solving</h3>
                  <p className="text-foreground/70 text-sm">
                    Games present problems to solve with immediate feedback. We can observe how 
                    someone approaches challenges, where they get stuck, and what strategies help,
                    then translate this to real-world situations.
                  </p>
                </div>
              </div>
            </Card>
            
            <Card className="p-5">
              <div className="flex gap-4">
                <Gamepad2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-display text-lg mb-2">Emotional Regulation</h3>
                  <p className="text-foreground/70 text-sm">
                    Games can be regulating (Stardew Valley, Minecraft creative mode) or challenging 
                    (competitive games, harder difficulty levels). We use this range intentionally 
                    to practice managing different emotional states.
                  </p>
                </div>
              </div>
            </Card>
            
            <Card className="p-5">
              <div className="flex gap-4">
                <Gamepad2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-display text-lg mb-2">Social Skills in Context</h3>
                  <p className="text-foreground/70 text-sm">
                    Multiplayer games provide natural opportunities to practice communication, 
                    cooperation, and conflict resolution. These are skills that can feel artificial when 
                    taught through worksheets.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Section>

      {/* What This Looks Like */}
      <Section className="bg-card/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-display mb-6">What Sessions Look Like</h2>
          <p className="text-foreground/80 leading-relaxed mb-6">
            Sessions vary based on the person and their goals. They might include:
          </p>
          <ul className="space-y-3 text-foreground/70">
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">→</span>
              <span>Playing Minecraft together while talking through a challenge they're facing</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">→</span>
              <span>Using a story-driven game to explore emotions and perspectives</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">→</span>
              <span>Practicing frustration tolerance through progressively challenging games</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">→</span>
              <span>Co-op games to work on communication and turn-taking</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">→</span>
              <span>VR experiences for exposure therapy or sensory exploration</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">→</span>
              <span>Discussing their existing gaming interests as a way to understand their values and strengths</span>
            </li>
          </ul>
        </div>
      </Section>

      {/* CTA */}
      <CTABanner
        title="Interested in Gaming-Informed Therapy?"
        description="If you or someone you support might benefit from this approach, we'd love to chat about whether it's a good fit."
        primaryCTA={{ label: "Make a Referral", href: "/contact" }}
        secondaryCTA={{ label: "Our Other Services", href: "/services/occupational-therapy" }}
      />
    </>
  );
}
