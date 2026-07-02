import { useState } from 'react';
import { Section, Card, Button } from '../components/ui';
import { Mail, MapPin, Clock, ChevronDown, ArrowRight, Calendar } from 'lucide-react';
import { BookingButtonPair } from '../components/BookingButtons';

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: "Do I need a GP referral?",
      a: "No. Self-referrals are welcome for all of our services. You can refer yourself or a family member directly using the self-referral form; no GP letter needed.",
    },
    {
      q: "How quickly will someone get back to me?",
      a: "We aim to respond to all enquiries within 24 hours. Our therapists are available Monday to Saturday, 8am to 7pm.",
    },
    {
      q: "What funding types do you accept?",
      a: "We accept private, self-managed NDIS, and plan-managed NDIS clients across all of our services.",
    },
    {
      q: "What if I'm not sure which service I need?",
      a: "That's completely fine. Just get in touch and we'll help you work out the right fit. The contact form is the quickest way to start that conversation.",
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative py-16 lg:py-24 grain-overlay border-b border-border">
        <div className="container">
          <div className="max-w-3xl">
            <p className="text-primary font-display text-sm uppercase tracking-widest mb-4">
              Get in Touch
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight mb-6">
              Contact <span className="text-gradient-accent">Us</span>
            </h1>
            <p className="font-serif text-xl text-foreground/80 italic mb-4">
              Have a question, or ready to get started? We're here to help.
            </p>
            <p className="text-sm text-foreground/60 uppercase tracking-wide">
              Response time within 24 hours
            </p>
          </div>
        </div>
      </section>

      {/* Discovery Call */}
      <Section className="bg-noctua-bone/30">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <Calendar className="w-8 h-8 text-noctua-russet mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-display mb-4 text-noctua-brown">
            Not ready for a full referral? Start with a conversation.
          </h2>
          <p className="text-noctua-brown/70 leading-relaxed">
            Book a free 15-minute discovery call to ask questions, check the fit, and figure out next steps. No obligation.
          </p>
        </div>
        <div className="max-w-lg mx-auto">
          <BookingButtonPair variant="card" />
        </div>
      </Section>

      {/* Main Content */}
      <Section>
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Left Column: Main Call to Action */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="p-8">
              <h2 className="text-2xl font-display mb-4">Send us a message</h2>
              <p className="text-foreground/70 mb-8 leading-relaxed">
                Use the contact form to ask a question or let us know you're interested. 
                If you're ready to refer yourself or a family member, the self-referral 
                form gives us everything we need to get started quickly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  href="https://questot.forms.pracsuite.com/t/9rrusgskOVlmiQQtMYzCuYn7"
                  target="_blank"
                  rel="noopener noreferrer"
                  size="lg"
                >
                  Open Contact Form <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </Card>

            {/* FAQ Section */}
            <div className="pt-8">
              <p className="text-primary font-display text-sm uppercase tracking-widest mb-4">
                Questions
              </p>
              <h2 className="text-2xl font-display mb-6">Common Questions</h2>
              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <div key={i} className="border-b border-border pb-4">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="flex items-center justify-between w-full text-left font-medium text-foreground hover:text-primary transition-colors"
                    >
                      {faq.q}
                      <ChevronDown 
                        className={`w-4 h-4 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`} 
                      />
                    </button>
                    {openFaq === i && (
                      <p className="mt-3 text-sm text-foreground/70 leading-relaxed animate-in fade-in slide-in-from-top-1">
                        {faq.a}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Sidebar Info */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-display text-sm uppercase tracking-widest mb-6 pb-4 border-b border-border">
                Other ways to reach us
              </h3>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0 border border-border">
                    <Mail className="w-5 h-5 text-foreground" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-foreground/50 mb-1">Email</p>
                    <a href="mailto:hello@estushealth.com" className="text-primary hover:underline">
                      hello@estushealth.com
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0 border border-border">
                    <MapPin className="w-5 h-5 text-foreground" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-foreground/50 mb-1">Location</p>
                    <p className="text-foreground/80 text-sm">Perth Metro & <br/>Telehealth Australia-wide</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0 border border-border">
                    <Clock className="w-5 h-5 text-foreground" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-foreground/50 mb-1">Response Time</p>
                    <p className="text-foreground/80 text-sm">Within 24 hours</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0 border border-border">
                    <Calendar className="w-5 h-5 text-foreground" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-foreground/50 mb-1">Therapist Availability</p>
                    <p className="text-foreground/80 text-sm">Monday - Saturday<br/>8am - 7pm</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

        </div>
      </Section>
    </>
  );
}
