import { Section, Card, CardContent, Button, CTABanner } from '../../components/ui';
import { ArrowRight, CheckCircle, FileText } from 'lucide-react';

export default function AssessmentsReports() {
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
              Assessments & Reports
            </h1>
            <p className="font-serif text-xl text-foreground/80 italic mb-6">
              Documentation that translates into action
            </p>
            <p className="text-foreground/70 leading-relaxed">
              Whether you need a functional capacity assessment, NDIS report, or documentation
              for another purpose, we create clear, practical reports that capture the full
              picture and translate into meaningful recommendations.
            </p>
          </div>
        </div>
      </section>

      {/* Types of Assessments */}
      <Section>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-display mb-6">What We Offer</h2>
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex gap-4">
                <FileText className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-display text-xl mb-2">Functional Capacity Assessments</h3>
                  <p className="text-foreground/70 text-sm mb-4">
                    Comprehensive assessment of your ability to perform daily activities, manage 
                    self-care, participate in work or study, and engage in community life. We 
                    assess what you can actually do on good days, bad days, and everything
                    in between.
                  </p>
                  <p className="text-foreground/60 text-xs">
                    Often requested for NDIS applications, plan reviews, or other funding bodies.
                  </p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="flex gap-4">
                <FileText className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-display text-xl mb-2">NDIS Reports</h3>
                  <p className="text-foreground/70 text-sm mb-4">
                    Reports written specifically for NDIS purposes, using the language and
                    evidence base that reviewers need to see. We understand what the NDIA 
                    looks for and how to present information effectively.
                  </p>
                  <p className="text-foreground/60 text-xs">
                    For access requests, plan reviews, or supporting specific funding items.
                  </p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="flex gap-4">
                <FileText className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-display text-xl mb-2">OT Progress Reports</h3>
                  <p className="text-foreground/70 text-sm mb-4">
                    Documentation of ongoing therapy: goals, progress, barriers, and
                    recommendations. Useful for NDIS reporting, sharing with other providers, 
                    or just having a clear record of the work.
                  </p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="flex gap-4">
                <FileText className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-display text-xl mb-2">Home & Environment Assessments</h3>
                  <p className="text-foreground/70 text-sm mb-4">
                    Assessment of physical and sensory environments, identifying barriers,
                    modifications, and supports that could improve daily functioning. 
                    Particularly useful for sensory profiles and executive function challenges.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Section>

      {/* Our Approach */}
      <Section className="bg-card/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-display mb-6">Our Approach to Assessments</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <span className="text-foreground font-medium">Low-demand process</span>
                <p className="text-foreground/70 text-sm mt-1">
                  We structure assessments to minimise overwhelm. No marathon sessions or 
                  unnecessary questioning.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <span className="text-foreground font-medium">Accurate capacity representation</span>
                <p className="text-foreground/70 text-sm mt-1">
                  We don't just assess you on a good day. We explore the full range of your 
                  capacity, including what happens when you're depleted or flaring.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <span className="text-foreground font-medium">Strengths alongside challenges</span>
                <p className="text-foreground/70 text-sm mt-1">
                  Our reports include what's working, not just what's difficult. A full picture 
                  leads to better recommendations.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <span className="text-foreground font-medium">Practical recommendations</span>
                <p className="text-foreground/70 text-sm mt-1">
                  Every report ends with clear, actionable recommendations. Not generic
                  suggestions, but specific next steps tailored to your situation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Process */}
      <Section>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-display mb-6">What to Expect</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <span className="font-display text-lg text-primary-foreground">1</span>
              </div>
              <div>
                <h3 className="font-display text-lg mb-2">Initial Conversation</h3>
                <p className="text-foreground/70 text-sm">
                  We discuss what you need the assessment for, gather background information, 
                  and plan how to structure sessions to work for you.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <span className="font-display text-lg text-primary-foreground">2</span>
              </div>
              <div>
                <h3 className="font-display text-lg mb-2">Assessment Sessions</h3>
                <p className="text-foreground/70 text-sm">
                  Usually 2-3 sessions depending on complexity. We combine conversation, 
                  observation, and standardised tools as appropriate. Breaks are always okay.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <span className="font-display text-lg text-primary-foreground">3</span>
              </div>
              <div>
                <h3 className="font-display text-lg mb-2">Report Writing</h3>
                <p className="text-foreground/70 text-sm">
                  We compile findings into a clear, professional report. Turnaround is typically 
                  2-3 weeks depending on current workload.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <span className="font-display text-lg text-primary-foreground">4</span>
              </div>
              <div>
                <h3 className="font-display text-lg mb-2">Feedback Session</h3>
                <p className="text-foreground/70 text-sm">
                  We talk through the report with you before finalising. You can ask questions, 
                  request clarifications, or flag anything that doesn't feel accurate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <CTABanner
        title="Need an Assessment?"
        description="Get in touch to discuss what you need and we'll let you know how we can help."
        primaryCTA={{ label: "Make a Referral", href: "/contact" }}
        secondaryCTA={{ label: "For Support Coordinators", href: "/for-referrers" }}
      />
    </>
  );
}
