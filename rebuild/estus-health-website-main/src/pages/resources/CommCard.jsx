import {
  Section,
  Card,
  CardContent,
  Button,
  PullQuote,
  CTABanner,
  ProcessStep,
  Badge
} from '../../components/ui';
import {
  ArrowRight,
  Shield,
  Volume2,
  LayoutGrid,
  PenLine
} from 'lucide-react';

const COMMCARD_URL = 'https://commcard.estushealth.com';
const SUGGEST_PHRASE_MAILTO = 'mailto:performancelab@estushealth.com';

const features = [
  {
    icon: Shield,
    title: 'Your Privacy, Protected',
    description:
      'CommCard does not collect, store, or transmit any personal data. Nothing you type or speak is recorded or sent anywhere. Your communication is yours alone.',
  },
  {
    icon: Volume2,
    title: 'Text-to-Speech',
    description:
      'Tap a phrase to hear it spoken aloud. Adjust voice, speed, and volume in settings. For moments when showing a screen works better than finding words.',
  },
  {
    icon: LayoutGrid,
    title: 'Ready-Made Phrases',
    description:
      'Six categories of pre-written phrases covering common situations: Right Now, Low Battery, Setting the Scene, Out in the World, Explaining Me, and At Appointments.',
  },
  {
    icon: PenLine,
    title: 'Make Your Own Cards',
    description:
      'Create custom communication cards with your own words. Choose your colour. Download as an image or show directly from your screen.',
  },
];

const clinicianUseCases = [
  'Pre-load it on a client\'s phone as part of a session',
  'Recommend it as part of a communication toolkit alongside AAC devices',
  'Use it during appointments to help clients express needs',
  'Share the link with families and support workers',
  'Add it to therapy resource packs and discharge summaries',
];

const userQuotes = [
  'I can think the words but I can\'t say them right now.',
  'I need to tell someone how I\'m feeling but I don\'t know where to start.',
  'I\'m at a medical appointment and I\'m too overwhelmed to explain.',
  'I want to order coffee but verbal communication isn\'t available to me today.',
];

export default function CommCard() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 lg:py-32 grain-overlay">
        <div className="container relative z-10">
          <div className="max-w-4xl">
            <p className="text-primary font-display text-sm uppercase tracking-widest mb-4">
              Free Tool
            </p>
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-display font-bold leading-none mb-6">
              Words When You
              <br />
              <span className="text-gradient-accent">Have None</span>
            </h1>
            <p className="font-serif text-xl md:text-2xl text-foreground/80 italic mb-6">
              A free communication tool for moments when speaking is hard.
            </p>
            <p className="text-lg text-foreground/70 max-w-2xl mb-8 leading-relaxed">
              CommCard gives you ready-made phrases and custom cards you can show on screen
              or speak aloud. No signup. No data collected. Works on any device with a browser.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                href={COMMCARD_URL}
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
              >
                Open CommCard
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                href="#features"
                variant="outline"
                size="lg"
              >
                Learn More Below
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <Section id="features" className="bg-card/50">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl md:text-4xl font-display mb-4">
            Designed for How Your Brain Works
          </h2>
          <p className="text-foreground/70">
            Practical features that stay out of your way when you need them most.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {features.map((feature) => (
            <Card key={feature.title} hover className="h-full">
              <CardContent className="flex flex-col h-full">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-display mb-3">{feature.title}</h3>
                <p className="text-foreground/70 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Who It's For */}
      <Section>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-display mb-10">
            Who CommCard Is For
          </h2>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <p className="text-foreground/80 leading-relaxed mb-4">
                CommCard was designed for neurodivergent adults who experience intermittent
                or situational speech difficulties. That includes autistic adults, people with
                ADHD who experience verbal shutdowns, selective mutism, burnout-related
                communication challenges, or anyone who sometimes needs words on a screen
                instead of in their mouth.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                It is a neuroaffirming tool. It does not try to fix how you communicate. It
                gives you another way to do it when you need one.
              </p>
            </div>
            <div className="space-y-6">
              {userQuotes.map((quote) => (
                <p key={quote} className="font-serif italic text-foreground/80 text-lg leading-relaxed">
                  "{quote}"
                </p>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* For Clinicians and Referrers */}
      <Section className="bg-card border-y border-border">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-display mb-4">
            Recommend CommCard to Your Clients
          </h2>
          <p className="text-foreground/70 leading-relaxed mb-8 max-w-2xl">
            CommCard is a free, no-signup tool you can recommend to clients who experience
            situational or intermittent communication difficulties. It works on any device
            with a browser. There is nothing to install, no account to create, and no data
            is ever collected.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {clinicianUseCases.map((useCase) => (
              <Card key={useCase} className="p-4">
                <p className="text-foreground/80 text-sm leading-relaxed">{useCase}</p>
              </Card>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <Button
              href={COMMCARD_URL}
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
            >
              Share CommCard
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button
              href={SUGGEST_PHRASE_MAILTO}
              variant="outline"
              size="lg"
            >
              Suggest a Phrase
            </Button>
          </div>
        </div>
      </Section>

      {/* How It Works */}
      <Section>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-display mb-10 text-center">
            How It Works
          </h2>
          <div className="space-y-8">
            <ProcessStep
              number={1}
              title="Open the app"
              description="Visit commcard.estushealth.com on any device. No download, no signup, no login."
            />
            <ProcessStep
              number={2}
              title="Find or create your phrase"
              description="Browse six categories of pre-written phrases or make your own custom card."
            />
            <ProcessStep
              number={3}
              title="Show or speak"
              description="Tap to display the card on screen, speak it aloud with text-to-speech, or copy the text."
            />
          </div>
        </div>
      </Section>

      {/* Privacy Callout */}
      <Section className="bg-card/50">
        <div className="max-w-3xl mx-auto">
          <PullQuote
            quote="CommCard does not collect, store, or transmit any personal data. Nothing you type or say through this tool is recorded, saved, or sent to any server. Your communication is yours alone."
            attribution="CommCard Privacy Promise"
          />
        </div>
      </Section>

      {/* CTA Banner */}
      <section className="py-20 lg:py-24 bg-card border-y border-border">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-display mb-4">Try CommCard Now</h2>
            <p className="text-foreground/70 mb-8">
              Free. Private. No signup needed. Works on any device.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                href={COMMCARD_URL}
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
              >
                Open CommCard
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                href={SUGGEST_PHRASE_MAILTO}
                variant="outline"
                size="lg"
              >
                Suggest a Phrase
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
