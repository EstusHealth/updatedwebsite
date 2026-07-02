import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Heart,
  Brain,
  Zap,
  Activity,
  Shield,
  Sparkles,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Battery,
  Thermometer,
  Eye,
  Hand,
} from 'lucide-react';
import { Section, Card, CardContent, Button, Badge, CTABanner } from '../../components/ui';

const signs = [
  { icon: Battery, title: 'Fatigue that rest doesn\'t fix', desc: 'You sleep eight hours and wake up feeling like you\'ve run a marathon. Your energy budget is smaller than other people\'s, and it depletes faster than you expect.' },
  { icon: Activity, title: 'Pain that moves and fluctuates', desc: 'Your pain shifts between joints, muscles, and areas of your body. Some days are manageable. Others make basic tasks feel enormous. People might have told you it\'s "just growing pains" or stress.' },
  { icon: Brain, title: 'Brain fog that derails your day', desc: 'You lose words mid-sentence. You walk into rooms and forget why. Cognitive tasks that used to be straightforward now take twice the effort, especially when you\'re physically symptomatic.' },
  { icon: Thermometer, title: 'Temperature and autonomic weirdness', desc: 'You overheat easily, get dizzy when standing, have a racing heart for no reason, or feel nauseous after meals. Your autonomic nervous system, the "autopilot" functions, doesn\'t regulate well.' },
  { icon: Hand, title: 'Joints that bend too far or give way', desc: 'Your fingers hyperextend. Your knees lock back. Your shoulders feel unstable. You might subluxate (partially dislocate) doing ordinary things like reaching for a shelf or rolling over in bed.' },
  { icon: Eye, title: 'Interoception gaps', desc: 'You don\'t notice hunger, thirst, pain, or the need to use the bathroom until it\'s urgent. Your body sends signals, but they\'re delayed, muted, or arrive all at once in a wave of overwhelm.' },
];

const missed = [
  { title: '"You\'re too young for this"', desc: 'Hypermobility is often dismissed in young people as flexibility or growing pains. Symptoms that start in childhood get normalised because you\'ve never known anything different.' },
  { title: '"It\'s just anxiety"', desc: 'Autonomic symptoms like racing heart, dizziness, and nausea are frequently misattributed to anxiety disorders. The physical cause gets overlooked, and the person is told it\'s psychological.' },
  { title: 'Masking hides the impact', desc: 'Neurodivergent people are often skilled at pushing through pain and fatigue because they\'ve learned to mask difficulties. By the time they seek help, the crash cycle is deeply entrenched.' },
  { title: 'Body and brain get treated separately', desc: 'Most healthcare systems treat physical symptoms and neurodevelopmental conditions in separate silos. The interaction between them, which is where most of the functional impact lives, falls through the gap.' },
];

const support = [
  { icon: Zap, title: 'Energy management and pacing', desc: 'Building a sustainable daily rhythm that accounts for both your physical energy limits and your executive function capacity. Not just "rest more" but a system that actually works with your brain.' },
  { icon: Shield, title: 'Routine and environmental design', desc: 'Designing your physical space, daily routines, and task sequences to reduce demand on your joints, your nervous system, and your cognitive load simultaneously.' },
  { icon: Heart, title: 'Sensory and autonomic support', desc: 'Finding sensory strategies, compression options, and environmental modifications that your neurodivergent brain can actually tolerate, not the generic recommendations that feel awful.' },
  { icon: Brain, title: 'Cognitive load reduction', desc: 'Reducing the executive function tax of managing a complex body: simplifying medical appointment systems, medication routines, self-advocacy scripts, and flare management protocols.' },
];

const facts = [
  'Over 50% of autistic, ADHD, and Tourette\'s adults show clinically significant hypermobility, versus roughly 20% of the general population',
  'People with EDS are 5.6 times more likely to have an ADHD diagnosis',
  'A Swedish registry study found people with EDS were 7.4 times more likely to be autistic',
  'Hypermobility mediates increased pain and dysautonomia in neurodivergent populations',
  'Shared genetic pathways between EDS/HSD and autism have been identified at the molecular level',
];

const faqData = [
  { q: 'What is the difference between EDS and HSD?', a: 'Ehlers-Danlos Syndromes (EDS) are a group of inherited connective tissue conditions. There are 13 subtypes, the most common being hypermobile EDS (hEDS), which has specific diagnostic criteria. Hypermobility Spectrum Disorder (HSD) describes symptomatic hypermobility that doesn\'t meet full hEDS criteria. Importantly, HSD is not a lesser diagnosis. Both can significantly affect daily function, and both benefit from the same occupational therapy strategies.' },
  { q: 'Why does an OT work with EDS and HSD, not just a physio?', a: 'Physiotherapy focuses on strengthening and stabilising joints, which is important. Occupational therapy focuses on how you actually do your daily activities, your routines, your energy, your environment, and the cognitive and emotional load of managing a complex body. We work on the whole picture: from how you set up your morning routine to how you manage fatigue across a work day to how you communicate your needs to the people around you.' },
  { q: 'I think I might have EDS or HSD. Can you diagnose me?', a: 'OTs don\'t diagnose EDS or HSD. Diagnosis typically comes from a rheumatologist, geneticist, or a GP with expertise in hypermobility. What we can do is help you understand how your body is affecting your daily function right now, regardless of where you are in the diagnostic process. You don\'t need a formal diagnosis to start working with us.' },
  { q: 'What does a neurodivergent person with EDS/HSD actually need from OT?', a: 'When you\'re managing both a neurodivergent brain and a hypermobile body, the load compounds. Executive function challenges make pacing harder. Interoception differences mean you might not notice pain or fatigue signals until you crash. Sensory sensitivities can make recommended supports (compression garments, exercises) intolerable. We build strategies that account for all of these layers, not just one at a time.' },
  { q: 'Do I need a referral or an NDIS plan?', a: 'No referral is needed to see us. We work with NDIS participants (both plan-managed and self-managed) and private clients. Telehealth sessions are available Australia-wide.' },
  { q: 'How is this different from what I\'d get at a standard OT clinic?', a: 'Most OT clinics approach EDS and HSD from a purely physical angle, or they don\'t have experience with hypermobility at all. We specialise in the intersection of neurodivergence and complex health. That means we understand masking, demand avoidance, shutdown, sensory overload, and how all of those interact with a body that subluxates, fatigues, and needs careful management. We don\'t treat your brain and your body as separate problems.' },
];

const resources = [
  { title: 'The Ehlers Danlos Society', desc: '"Joint Hypermobility Links Neurodivergence to Dysautonomia and Pain" in Frontiers in Psychiatry. The landmark study on hypermobility and neurodevelopmental conditions.', url: 'https://www.ehlers-danlos.com' },
  { title: 'Csecs et al. (2022) Research Paper', desc: 'Comprehensive resource for all EDS subtypes, diagnostic criteria, and management strategies. Includes an occupational therapy guide.', url: 'https://www.frontiersin.org/articles/10.3389/fpsyt.2021.786916/full' },
  { title: 'Ehlers-Danlos Support UK', desc: 'Practical guidance on physiotherapy, pacing strategies, and self-management for hypermobility. Excellent patient-facing resources.', url: 'https://www.ehlers-danlos.org' },
];

export default function LearnEDSHSD() {
  const [openFaq, setOpenFaq] = useState(-1);

  return (
    <>
      {/* Hero */}
      <section className="relative py-16 lg:py-24 grain-overlay border-b border-border">
        <div className="container">
          <div className="max-w-3xl">
            <div className="flex flex-wrap gap-2 mb-6">
              <Badge variant="primary">Learn</Badge>
              <Badge variant="outline">EDS</Badge>
              <Badge variant="outline">HSD</Badge>
              <Badge variant="outline">Hypermobility</Badge>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight mb-6">
              When Your Body Bends Further Than It Should
            </h1>
            <p className="font-serif text-xl text-foreground/80 italic mb-6">
              Ehlers-Danlos Syndromes and Hypermobility Spectrum Disorder affect far more than your joints. They shape how you move, think, rest, and get through each day.
            </p>
            <p className="text-foreground/70 leading-relaxed mb-8">
              If you're neurodivergent and hypermobile, you're managing two complex systems at once. Your brain works differently. Your connective tissue works differently. And the interaction between the two rarely gets addressed. This page is for people who are tired of being told they're "just flexible" or "just anxious," and want to understand what's actually going on.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button to="/learn/eds-hsd-quiz" size="lg">
                Take the EDS/HSD Quiz
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button to="/for-referrers" variant="outline" size="lg">
                Refer a Client
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-b border-border">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              ['50%+', 'of neurodivergent adults show elevated hypermobility'],
              ['5.6x', 'higher ADHD rates in people with EDS'],
              ['7.4x', 'higher autism rates in people with EDS'],
              ['75%', 'of EDS patients report severe fatigue'],
            ].map(([num, label], i) => (
              <div key={i} className="text-center">
                <div className="text-4xl md:text-5xl font-display text-gradient-accent mb-2">{num}</div>
                <div className="text-sm text-foreground/60 uppercase tracking-wide">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* In Plain Language */}
      <Section>
        <div className="max-w-3xl">
          <p className="text-primary font-display text-sm uppercase tracking-widest mb-4">What it actually is</p>
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-6">In Plain Language</h2>
          <div className="space-y-5 text-foreground/70 leading-relaxed">
            <p>
              Ehlers-Danlos Syndromes (EDS) are a group of inherited conditions that affect your connective tissue, the structural material that holds your body together. Collagen, the most abundant protein in your body, doesn't work the way it's supposed to. This means your joints, skin, blood vessels, organs, and fascia are all affected to varying degrees.
            </p>
            <p>
              Hypermobility Spectrum Disorder (HSD) sits on the same spectrum. Your joints move beyond the typical range, and this causes symptoms: pain, fatigue, instability, subluxations, and problems with your autonomic nervous system (the part of your body that controls automatic functions like heart rate, digestion, and temperature regulation).
            </p>
            <p>
              What most people don't hear about is the overlap with neurodivergence. Research now shows that over half of autistic and ADHD adults have clinically significant hypermobility. This isn't a coincidence. There appear to be shared genetic and neurological pathways linking connective tissue differences and neurodevelopmental conditions.
            </p>
            <p>
              For people living at this intersection, the experience compounds. Executive function challenges make pacing strategies harder to implement. Interoception differences mean pain and fatigue signals arrive late or all at once. Sensory sensitivities can make recommended supports feel intolerable. And the cognitive load of managing a complex body on top of a neurodivergent brain in a world designed for neither is immense.
            </p>
          </div>
        </div>
      </Section>

      {/* Common Signs */}
      <Section className="bg-card border-y border-border">
        <p className="text-primary font-display text-sm uppercase tracking-widest mb-4">Signs and experiences</p>
        <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">What You Might Notice</h2>
        <p className="text-foreground/70 leading-relaxed mb-8 max-w-2xl">
          These experiences are common in people with EDS, HSD, and related hypermobility conditions, especially when neurodivergence is also in the picture.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {signs.map((item, i) => (
            <Card key={i}>
              <CardContent>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-display mb-2">{item.title}</h3>
                <p className="text-foreground/70 text-sm leading-relaxed">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Why Missed */}
      <Section>
        <p className="text-primary font-display text-sm uppercase tracking-widest mb-4">The diagnostic gap</p>
        <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">Why It Gets Missed</h2>
        <p className="text-foreground/70 leading-relaxed mb-8 max-w-2xl">
          The average time to an EDS diagnosis is over a decade. For neurodivergent people, it can take even longer. Here's why.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {missed.map((item, i) => (
            <Card key={i}>
              <CardContent className="border-l-2 border-primary">
                <h3 className="text-lg font-display mb-2">{item.title}</h3>
                <p className="text-foreground/70 text-sm leading-relaxed">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Neurodivergence Connection */}
      <Section className="bg-card border-y border-border">
        <p className="text-primary font-display text-sm uppercase tracking-widest mb-4">The intersection</p>
        <h2 className="text-2xl md:text-3xl font-display font-bold mb-8">The Neurodivergence Connection</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-5 text-foreground/70 leading-relaxed">
            <p>
              This is the part most healthcare providers miss entirely. Neurodivergent people with hypermobility aren't just dealing with two separate conditions side by side. The two interact in ways that make both harder to manage.
            </p>
            <p>
              Proprioception (your sense of where your body is in space) is often affected in both autism and hypermobility. Interoception (your ability to sense internal body signals) is frequently different in neurodivergent people, which means you might not register pain, fatigue, or dehydration until it's already a crisis. Sensory sensitivities can make common EDS supports like compression garments, bracing, or specific exercise programs feel unbearable.
            </p>
            <p>
              And the executive function demands of managing a complex health condition, tracking symptoms, attending appointments, pacing energy, advocating to medical professionals, are enormous. When your brain already finds planning, sequencing, and task initiation challenging, the load of managing EDS or HSD on top of that can feel impossible without the right support structures.
            </p>
          </div>
          <div>
            <div className="bg-primary/5 rounded-lg p-6 border border-primary/10">
              <Badge variant="primary" className="mb-4">Research Snapshot</Badge>
              <h3 className="font-display text-lg mb-4">Key findings</h3>
              <div className="space-y-3">
                {facts.map((f, i) => (
                  <div key={i} className="flex gap-3 text-sm text-foreground/70 leading-relaxed">
                    <Sparkles className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-foreground/50 mt-4 italic">
                Sources: Csecs et al. (2022), Frontiers in Psychiatry; Casanova et al. (2020), Journal of Personalized Medicine; Swedish National Registry (2016)
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* How OT Helps */}
      <Section id="how-ot-helps">
        <p className="text-primary font-display text-sm uppercase tracking-widest mb-4">What support looks like</p>
        <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">What OT Actually Looks Like for EDS and HSD</h2>
        <p className="text-foreground/70 leading-relaxed mb-8 max-w-2xl">
          We don't treat your joints. We treat your daily life. That means looking at how hypermobility, fatigue, pain, and neurodivergence interact across everything you need and want to do.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {support.map((item, i) => (
            <Card key={i}>
              <CardContent>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-display mb-2">{item.title}</h3>
                <p className="text-foreground/70 text-sm leading-relaxed">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="text-foreground/50 text-sm italic mt-8 max-w-2xl">
          This isn't about learning to push through. It's about designing your days so that pushing through isn't the only option.
        </p>
      </Section>

      {/* FAQ */}
      <Section className="bg-card border-y border-border">
        <div className="max-w-3xl">
          <p className="text-primary font-display text-sm uppercase tracking-widest mb-4">FAQ</p>
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-8">Common Questions</h2>
          <div>
            {faqData.map((item, i) => (
              <div key={i} className="border-b border-border py-5">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                  className="flex items-center justify-between w-full text-left"
                >
                  <span className="font-display text-base md:text-lg pr-4">{item.q}</span>
                  {openFaq === i
                    ? <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
                    : <ChevronDown className="w-5 h-5 text-foreground/40 flex-shrink-0" />
                  }
                </button>
                {openFaq === i && (
                  <p className="text-foreground/70 text-sm leading-relaxed mt-3 max-w-2xl">
                    {item.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Resources */}
      <Section>
        <p className="text-primary font-display text-sm uppercase tracking-widest mb-4">Further reading</p>
        <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">Reputable Resources</h2>
        <p className="text-foreground/70 leading-relaxed mb-8 max-w-2xl">
          Trusted sources for learning more about EDS, HSD, and the neurodivergence connection.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {resources.map((item, i) => (
            <a key={i} href={item.url} target="_blank" rel="noopener noreferrer" className="block">
              <Card hover className="h-full">
                <CardContent>
                  <h3 className="font-display text-base mb-2 flex items-center gap-2">
                    {item.title}
                    <ExternalLink className="w-3.5 h-3.5 text-primary" />
                  </h3>
                  <p className="text-foreground/70 text-sm leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <CTABanner
        title="Your Body and Your Brain Deserve the Same Team"
        description="No referral needed. NDIS and private clients welcome. Telehealth available across Australia."
        primaryCTA={{ label: 'Take the EDS/HSD Quiz', href: '/learn/eds-hsd-quiz' }}
        secondaryCTA={{ label: 'Refer a Client', href: '/for-referrers' }}
      />
    </>
  );
}
