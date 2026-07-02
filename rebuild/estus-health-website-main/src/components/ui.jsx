import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

// Button component
export function Button({ 
  children, 
  variant = 'primary', 
  size = 'default',
  href,
  to,
  className = '',
  ...props 
}) {
  const baseStyles = "inline-flex items-center justify-center font-display uppercase tracking-wide transition-all duration-200 rounded-lg";
  
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-glow-strong",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    outline: "border border-border text-foreground hover:bg-secondary hover:border-primary",
    ghost: "text-foreground hover:bg-secondary",
  };
  
  const sizes = {
    sm: "h-9 px-4 text-xs",
    default: "h-10 px-5 text-sm",
    lg: "h-12 px-8 text-sm",
  };

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  if (to) {
    return <Link to={to} className={classes} {...props}>{children}</Link>;
  }
  
  if (href) {
    return <a href={href} className={classes} {...props}>{children}</a>;
  }

  return <button className={classes} {...props}>{children}</button>;
}

// Card component
export function Card({ children, className = '', hover = false, ...props }) {
  return (
    <div 
      className={`
        bg-card border border-border rounded-lg shadow-md
        ${hover ? 'transition-all duration-300 hover:scale-[1.02] hover:shadow-glow hover:border-primary/30' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '' }) {
  return <div className={`p-6 pb-0 ${className}`}>{children}</div>;
}

export function CardContent({ children, className = '' }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}

// Section component for consistent spacing
export function Section({ children, className = '', id }) {
  return (
    <section id={id} className={`py-20 lg:py-24 ${className}`}>
      <div className="container">
        {children}
      </div>
    </section>
  );
}

// Hero section
export function Hero({ 
  eyebrow, 
  title, 
  titleAccent,
  subtitle, 
  description, 
  primaryCTA,
  secondaryCTA,
  className = '' 
}) {
  return (
    <section className={`relative py-24 lg:py-32 grain-overlay ${className}`}>
      <div className="container relative z-10">
        <div className="max-w-4xl">
          {eyebrow && (
            <p className="text-primary font-display text-sm uppercase tracking-widest mb-4">
              {eyebrow}
            </p>
          )}
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-display font-bold leading-none mb-6">
            {title}
            {titleAccent && (
              <>
                <br />
                <span className="text-gradient-accent">{titleAccent}</span>
              </>
            )}
          </h1>
          {subtitle && (
            <p className="font-serif text-xl md:text-2xl text-foreground/80 italic mb-6">
              {subtitle}
            </p>
          )}
          {description && (
            <p className="text-lg text-foreground/70 max-w-2xl mb-8 leading-relaxed">
              {description}
            </p>
          )}
          {(primaryCTA || secondaryCTA) && (
            <div className="flex flex-wrap gap-4">
              {primaryCTA && (
                <Button to={primaryCTA.href} size="lg">
                  {primaryCTA.label}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              )}
              {secondaryCTA && (
                <Button to={secondaryCTA.href} variant="outline" size="lg">
                  {secondaryCTA.label}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// Feature card for services
export function FeatureCard({ icon: Icon, title, description, href }) {
  return (
    <Card hover className="h-full">
      <CardContent className="flex flex-col h-full">
        {Icon && (
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
            <Icon className="w-6 h-6 text-primary" />
          </div>
        )}
        <h3 className="text-xl font-display mb-3">{title}</h3>
        <p className="text-foreground/70 text-sm leading-relaxed flex-1 mb-4">
          {description}
        </p>
        {href && (
          <Link 
            to={href} 
            className="inline-flex items-center text-primary text-sm font-medium hover:gap-2 transition-all"
          >
            Learn more <ArrowRight className="ml-1 w-4 h-4" />
          </Link>
        )}
      </CardContent>
    </Card>
  );
}

// Testimonial / Pull quote
export function PullQuote({ quote, attribution, className = '' }) {
  return (
    <blockquote className={`border-l-2 border-primary pl-6 py-2 ${className}`}>
      <p className="font-serif text-xl md:text-2xl italic text-foreground/90 leading-relaxed mb-4">
        "{quote}"
      </p>
      {attribution && (
        <footer className="text-sm text-foreground/60">
{attribution}
        </footer>
      )}
    </blockquote>
  );
}

// Stats display
export function StatCard({ value, label }) {
  return (
    <div className="text-center">
      <div className="text-4xl md:text-5xl font-display text-gradient-accent mb-2">
        {value}
      </div>
      <div className="text-sm text-foreground/60 uppercase tracking-wide">
        {label}
      </div>
    </div>
  );
}

// CTA Banner
export function CTABanner({ title, description, primaryCTA, secondaryCTA }) {
  return (
    <Section className="bg-card border-y border-border">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-display mb-4">{title}</h2>
        {description && (
          <p className="text-foreground/70 mb-8">{description}</p>
        )}
        <div className="flex flex-wrap justify-center gap-4">
          {primaryCTA && (
            <Button to={primaryCTA.href} size="lg">
              {primaryCTA.label}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          )}
          {secondaryCTA && (
            <Button to={secondaryCTA.href} variant="outline" size="lg">
              {secondaryCTA.label}
            </Button>
          )}
        </div>
      </div>
    </Section>
  );
}

// Process steps
export function ProcessStep({ number, title, description }) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center">
        <span className="font-display text-lg text-primary-foreground">{number}</span>
      </div>
      <div>
        <h3 className="font-display text-lg mb-2">{title}</h3>
        <p className="text-foreground/70 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

// Badge
export function Badge({ children, variant = 'default', className = '' }) {
  const variants = {
    default: 'bg-secondary text-foreground',
    primary: 'bg-primary/10 text-primary',
    outline: 'border border-border text-foreground/70',
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
