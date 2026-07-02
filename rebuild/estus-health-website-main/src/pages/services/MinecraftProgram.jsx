import { useState } from 'react';
import {
  ArrowRight,
  ChevronDown,
  Shield,
  Users,
  Boxes,
  Wrench,
  Monitor,
  Smartphone,
  Lock,
  Server,
  Gamepad2,
  Target,
  Brain,
} from 'lucide-react';
import {
  Section,
  Card,
  Button,
  Badge,
  ProcessStep,
  PullQuote,
  CTABanner,
} from '../../components/ui';
import { BOOKING } from '../../components/BookingButtons';

const faqs = [
  {
    q: 'Does my child need their own Minecraft account?',
    a: 'Yes. For Java Edition, you need a Minecraft: Java Edition account (purchased through minecraft.net). For Bedrock Edition, you need the version for your platform (available through the Microsoft Store, PlayStation Store, Nintendo eShop, or App Store). We can help troubleshoot setup during a session.',
  },
  {
    q: 'What is the All of Create modpack?',
    a: 'All of Create is a popular modpack built around the Create mod, which adds mechanical engineering, automation, trains, and factory-building tools to Minecraft. It includes over 50 addons and has been downloaded over a million times on CurseForge. It runs on Java Edition only.',
  },
  {
    q: 'Why is PvP turned off?',
    a: 'Our servers focus on collaborative building. Turning off PvP removes the anxiety and conflict that competitive environments create. Participants can focus on building, planning, and connecting without worrying about being attacked. This is a deliberate clinical decision.',
  },
  {
    q: 'Can my child play on the Bedrock server from their iPad or Switch?',
    a: "Yes. The Bedrock server supports PC (Windows 10/11), Xbox, PlayStation, Nintendo Switch, and mobile devices (iOS and Android). That is the whole point of running a separate Bedrock server -- to make sure no one is excluded because of their device.",
  },
  {
    q: 'Is the server monitored?',
    a: 'Yes. Both servers are whitelisted (only approved participants can join) and clinician-moderated. We have server logs, clear rules, and an active moderation approach. This is a therapeutic environment, not a public server.',
  },
  {
    q: 'Do we need to be existing Estus Health clients?',
    a: 'Yes. The Minecraft Program is part of our gaming-informed therapy model and requires active engagement with an Estus Health clinician. Server access is integrated into your therapy plan, not a standalone service.',
  },
];

const javaDetails = [
  { label: 'Edition', value: 'Minecraft Java' },
  { label: 'Modpack', value: 'All of Create' },
  { label: 'Focus', value: 'Infrastructure builds' },
  { label: 'PvP', value: 'Disabled' },
  { label: 'Access', value: 'Whitelisted, private' },
];

const bedrockDetails = [
  { label: 'Edition', value: 'Minecraft Bedrock' },
  { label: 'Platforms', value: 'PC, Xbox, PS, Switch, Mobile' },
  { label: 'Modpack', value: 'Vanilla (no mods required)' },
  { label: 'PvP', value: 'Disabled' },
  { label: 'Access', value: 'Whitelisted, private' },
];

function ServerCard({ icon: Icon, title, tag, description, details }) {
  return (
    <Card className="p-0 overflow-hidden">
      <div className="p-6 pb-4 border-b border-border bg-primary/[0.04]">
        <div className="flex items-center gap-3 mb-3">
          <Icon className="w-5 h-5 text-primary" />
          <h3 className="font-display text-lg">{title}</h3>
          <Badge variant="primary">{tag}</Badge>
        </div>
        <p className="text-sm text-foreground/70 leading-relaxed">{description}</p>
      </div>
      <div className="p-6">
        {details.map((d, i) => (
          <div
            key={i}
            className={`flex justify-between items-center py-2.5 text-sm ${
              i < details.length - 1 ? 'border-b border-border/50' : ''
            }`}
          >
            <span className="text-foreground/60">{d.label}</span>
            <span className="font-medium text-foreground">{d.value}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default function MinecraftProgram() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <>
      {/* Hero */}
      <section className="relative py-16 lg:py-24 grain-overlay border-b border-border">
        <div className="container">
          <div className="max-w-3xl">
            <p className="text-primary font-display text-sm uppercase tracking-widest mb-4">
              Services
            </p>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight mb-4">
              Minecraft{' '}
              <span className="text-gradient-accent">Program</span>
            </h1>

            <div className="mb-6">
              <Badge variant="primary" className="text-sm px-3 py-1">
                <Wrench className="w-3.5 h-3.5 mr-1.5 inline" />
                April 2026: New modpack, new Bedrock server
              </Badge>
            </div>

            <p className="font-serif text-xl text-foreground/80 italic mb-4">
              A space to build, connect, and just be yourself.
            </p>
            <p className="font-serif text-foreground/60 italic mb-6">
              Not a reward system. Not a bribe. A genuine community where gaming is the medium and growth happens naturally.
            </p>

            <p className="text-foreground/70 leading-relaxed mb-8">
              Our Minecraft servers are clinician-facilitated environments where neurodivergent young people practise executive function, collaboration, and communication through shared building projects. No PvP. No pressure. Just meaningful participation on your terms.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button to="/contact" size="lg">
                Get Started <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button to="/services/gaming-informed-therapy" variant="outline" size="lg">
                Gaming-Informed Therapy
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* What This Is */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-display mb-6">What the Minecraft Program is</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              We run two Minecraft servers as part of our gaming-informed therapy model. One runs Java Edition with a full modpack. The other runs Bedrock Edition for cross-platform access. Both are private, whitelisted, and clinician-moderated.
            </p>
            <p className="text-foreground/70 leading-relaxed mb-8">
              This is not a social skills group dressed up as gaming. The server is a genuine digital third space where participants build, problem-solve, and connect at their own pace. Clinicians observe, scaffold, and facilitate, but the environment is participant-led. We structure the server around collaborative infrastructure builds, not competition. PvP is turned off. The focus is on creating something together.
            </p>
            <PullQuote
              quote="He logs on to build with the group more than he talks to anyone at school. This is where his friendships actually happen."
              attribution="Parent of a participant, age 14"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Shield, label: 'PvP disabled' },
              { icon: Lock, label: 'Whitelisted access' },
              { icon: Wrench, label: 'Infrastructure focus' },
              { icon: Server, label: 'Two servers available' },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg"
              >
                <Icon className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Our Servers */}
      <Section className="bg-card/50">
        <p className="text-primary font-display text-sm uppercase tracking-widest mb-3">
          Our Servers
        </p>
        <h2 className="text-2xl md:text-3xl font-display mb-3">Two servers. Two ways to connect.</h2>
        <p className="text-foreground/70 leading-relaxed max-w-2xl mb-10">
          We run a Java Edition server for the full modded experience and a Bedrock Edition server for cross-platform access. Both are private, safe, and clinician-moderated.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <ServerCard
            icon={Monitor}
            title="Java Edition Server"
            tag="Modded"
            description="Our primary server runs the All of Create modpack -- a Create mod experience with 50+ addons focused on engineering, automation, and building. Participants design factories, transport systems, and collaborative infrastructure projects."
            details={javaDetails}
          />
          <ServerCard
            icon={Smartphone}
            title="Bedrock Edition Server"
            tag="Cross-Platform"
            description="Our Bedrock server is for participants who play on console, tablet, or mobile. No mods needed, no special setup. Just join and build. This makes the community accessible regardless of what device you play on."
            details={bedrockDetails}
          />
        </div>
      </Section>

      {/* What We Build */}
      <Section>
        <p className="text-primary font-display text-sm uppercase tracking-widest mb-3">
          Current Focus
        </p>
        <h2 className="text-2xl md:text-3xl font-display mb-3">Infrastructure builds, not battles.</h2>
        <p className="text-foreground/70 leading-relaxed max-w-2xl mb-10">
          PvP is turned off across both servers. The focus right now is collaborative building. Here is what that looks like in practice.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: Boxes,
              title: 'Collaborative Builds',
              body: 'Shared infrastructure projects where participants contribute at their own pace. Railway networks, shared storage systems, town planning. Each build has natural decision points that practise negotiation, planning, and compromise.',
            },
            {
              icon: Wrench,
              title: 'Engineering & Automation (Java)',
              body: 'The All of Create modpack gives participants access to mechanical systems, conveyor belts, trains, and processing chains. Designing a working factory is genuine problem-solving with visible outcomes.',
            },
            {
              icon: Target,
              title: 'Resource & Project Management',
              body: 'Gathering, allocating, and managing resources across a shared project is executive function in action. Participants learn to plan ahead, coordinate with others, and adapt when things go wrong.',
            },
          ].map(({ icon: Icon, title, body }) => (
            <Card key={title} hover className="h-full">
              <div className="p-6 flex flex-col h-full">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-lg mb-3">{title}</h3>
                <p className="text-foreground/70 text-sm leading-relaxed flex-1">{body}</p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Who It's For */}
      <Section className="bg-card/50">
        <h2 className="text-2xl md:text-3xl font-display mb-3">Who this is for</h2>
        <p className="text-foreground/70 leading-relaxed max-w-2xl mb-10">
          The Minecraft Program works well for young people who are already interested in gaming and benefit from a structured, low-pressure social environment.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              icon: Users,
              title: 'Young people who find face-to-face social settings overwhelming',
              body: 'The server provides a way to participate socially without the sensory and performance demands of in-person interaction. Conversations happen alongside shared activity, not as the main event.',
            },
            {
              icon: Shield,
              title: 'Participants who have had negative experiences in competitive gaming',
              body: "PvP is off. Griefing is not tolerated. The server rules are clear, the moderation is active, and the culture is collaborative. This is a space where everyone builds, nobody destroys.",
            },
            {
              icon: Brain,
              title: 'Young people working on executive function, planning, or collaboration',
              body: 'Building projects require sequencing, resource management, and working alongside others. These skills transfer to real-world contexts because they are practised in a motivating, low-stakes environment.',
            },
            {
              icon: Gamepad2,
              title: 'Clients already engaged in gaming-informed therapy at Estus Health',
              body: 'The server extends your OT sessions into a between-session space where skills can be practised in a natural context. Your clinician can observe progress over time and adjust therapy goals accordingly.',
            },
          ].map(({ icon: Icon, title, body }) => (
            <Card key={title} className="p-6">
              <Icon className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-display text-lg mb-2">{title}</h3>
              <p className="text-foreground/70 text-sm leading-relaxed">{body}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* How It Works */}
      <Section>
        <h2 className="text-2xl md:text-3xl font-display mb-3">How it works</h2>
        <p className="text-foreground/70 leading-relaxed max-w-2xl mb-10">
          Getting onto the server is straightforward. Here is the process from start to first login.
        </p>

        <div className="max-w-2xl space-y-6">
          <ProcessStep
            number="1"
            title="Start with an OT session"
            description="The Minecraft Program is part of our gaming-informed therapy model. Your clinician will discuss whether it is a good fit during your initial sessions and help set goals that the server environment supports."
          />
          <ProcessStep
            number="2"
            title="Choose your server"
            description="If you play Java Edition on PC and want the modded experience, you will join the Java server running All of Create. If you play on console, tablet, mobile, or prefer vanilla Minecraft, you will join the Bedrock server."
          />
          <ProcessStep
            number="3"
            title="Get whitelisted"
            description="Both servers are private. Once your clinician confirms you are ready, we will add your gamertag to the whitelist. You will receive the server details, the rules, and a brief orientation."
          />
          <ProcessStep
            number="4"
            title="Build, connect, grow"
            description="Log on when you want. Join a build project. Start your own. The server is available between sessions as a space to practise skills and connect with others in the community."
          />
        </div>
      </Section>

      {/* What to Expect */}
      <Section className="bg-card/50">
        <h2 className="text-2xl md:text-3xl font-display mb-3">What to expect</h2>
        <p className="text-foreground/70 leading-relaxed max-w-2xl mb-10">
          Honest answers about how the program runs, so you know exactly what you are signing up for.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: 'Session integration',
              body: 'The server complements your OT sessions. Your clinician may set specific goals for server participation, observe your interactions, or use server activity as a starting point for session conversations.',
            },
            {
              title: 'Moderation and safety',
              body: 'Both servers are whitelisted and monitored. We have clear rules around respectful communication, building etiquette, and server conduct. Breaches are addressed directly with the participant and their family.',
            },
            {
              title: 'Technical setup',
              body: 'For the Java server, you will need to install the All of Create modpack via CurseForge. We provide step-by-step instructions. For the Bedrock server, no special setup is needed -- just enter the server address.',
            },
            {
              title: 'Funding',
              body: 'The Minecraft Program runs as part of your funded OT sessions through NDIS Improved Daily Living (Capacity Building). Server access itself does not have a separate fee.',
            },
          ].map(({ title, body }) => (
            <Card key={title} className="p-6">
              <h3 className="font-display text-lg mb-2">{title}</h3>
              <p className="text-foreground/70 text-sm leading-relaxed">{body}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <h2 className="text-2xl md:text-3xl font-display mb-8">Frequently asked questions</h2>
        <div className="max-w-2xl space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-border pb-4">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="flex items-center justify-between w-full text-left font-medium text-foreground hover:text-primary transition-colors"
              >
                {faq.q}
                <ChevronDown
                  className={`w-4 h-4 flex-shrink-0 ml-4 transition-transform duration-200 ${
                    openFaq === i ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openFaq === i && (
                <p className="mt-3 text-sm text-foreground/70 leading-relaxed">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <CTABanner
        title="Ready to join the server?"
        description="The Minecraft Program is part of our gaming-informed occupational therapy. Get in touch to start your sessions and get whitelisted."
        primaryCTA={{ label: 'Get Started', href: '/contact' }}
        secondaryCTA={{ label: 'Gaming-Informed Therapy', href: '/services/gaming-informed-therapy' }}
      />
    </>
  );
}
