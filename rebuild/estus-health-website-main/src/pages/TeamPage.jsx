import { Section, Card, CardContent, Button, Badge } from '../components/ui';
import { ArrowRight } from 'lucide-react';

const team = [
   {
    name: "Nik Peshwani",
    role: "Occupational Therapist",
    status: "Accepting referrals",
    photoSrc: "/team-nik.jpg",
    bio: "Nik brings deep expertise in gaming-informed therapy and understands how to meet clients in the spaces they already feel comfortable. His approach prioritises building genuine connection before any therapeutic 'work' happens, because trust comes first.",
    background: "Background in gaming culture and neurodivergent-affirming practice.",
    specialties: ["Gaming-Informed Therapy", "Adolescents & Young Adults", "Executive Function", "Assessment"],
  },
  {
    name: "Dai Nam Lang",
    role: "Occupational Therapist",
    status: "Accepting referrals",
    photoSrc: "/team-nam.jpg",
    bio: "Nam specialises in working with autistic youth and adults, with particular expertise in anime and gaming-informed approaches. He understands that interests aren't just hobbies. They're windows into how someone thinks, what they value, and where they feel most themselves.",
    background: "Passionate about anime, gaming, and neuroaffirming practice.",
    specialties: ["Anime-Informed Therapy", "Gaming Informed Therapy", "Youth & Young Adults"],
  },
   {
    name: "Liam Fagan",
    role: "Founder & Occupational Therapist",
    status: "Not Accepting Referrals",
    photoSrc: "/team-liam.jpg",
    bio: "Late-diagnosed autistic clinician with a PDA profile. Liam founded Estus Health to create the kind of support he wished existed: therapy that works with neurodivergent brains, not against them. His focus areas include PDA, gaming-informed therapy, executive function, and supporting adults through the unmasking process.",
    background: "Degrees in Occupational Therapy, Finance, Computer Science, and Machine Learning.",
    specialties: ["PDA Profiles", "Gaming-Informed Therapy", "Executive Function", "Unmasking Support"],
  },
];

export default function TeamPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-16 lg:py-24 grain-overlay border-b border-border">
        <div className="container">
          <div className="max-w-3xl mb-12">
            <p className="text-primary font-display text-sm uppercase tracking-widest mb-4">
              Our Team
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight mb-6">
              Meet the Clinicians
            </h1>
            <p className="text-foreground/70 leading-relaxed">
              Our team combines clinical expertise with lived experience. Several of us are 
              neurodivergent ourselves. We understand this work from the inside, not just 
              from textbooks.
            </p>
          </div>

          {/* Team Photo Section */}
          <div className="relative w-full rounded-xl overflow-hidden border border-border shadow-heavy group">
            {/* Glow effect behind */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/0 blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
            
            <div className="relative aspect-[16/9] md:aspect-[21/9] lg:aspect-[3/1] bg-card">
              <img 
                src="/team-photo.jpeg" 
                alt="The Estus Health Team" 
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
              
              {/* Caption */}
              <div className="absolute bottom-0 left-0 p-6 md:p-8">
                <h3 className="text-white font-display text-2xl md:text-3xl mb-1 drop-shadow-md">
                  The Estus Health Team
                </h3>
                <p className="text-white/80 font-serif italic text-sm md:text-base drop-shadow-md">
                  Liam, Dai Nam, and Nik
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <Section>
        <div className="space-y-8">
          {team.map((member, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-6 lg:p-8">
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                  {/* Photo */}
                  <div className="flex-shrink-0">
                    <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-lg bg-secondary flex items-center justify-center border border-border overflow-hidden">
                      {member.photoSrc ? (
                        <img
                          src={member.photoSrc}
                          alt={`Portrait of ${member.name}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-4xl font-display text-primary">{member.name[0]}</span>
                      )}
                    </div>
                  </div>
                  
                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        <h2 className="text-2xl font-display mb-1">{member.name}</h2>
                        <p className="text-foreground/70">{member.role}</p>
                      </div>
                      <Badge variant={member.status.includes("Limited") ? "outline" : "primary"}>
                        {member.status}
                      </Badge>
                    </div>
                    
                    <p className="text-foreground/80 leading-relaxed mb-4">
                      {member.bio}
                    </p>
                    
                    {member.background && (
                      <p className="text-foreground/60 text-sm mb-4">
                        {member.background}
                      </p>
                    )}
                    
                    <div className="flex flex-wrap gap-2">
                      {member.specialties.map((specialty, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-display mb-4">
            Ready to Work With Us?
          </h2>
          <p className="text-foreground/70 mb-8">
            Whether you're self-referring, a parent, or a support coordinator, we're
            here to help find the right fit.
          </p>
          <Button to="/contact" size="lg">
            Make a Referral
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </Section>
    </>
  );
}
