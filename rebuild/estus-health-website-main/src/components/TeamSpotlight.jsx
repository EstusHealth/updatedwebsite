import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function TeamSpotlight({
  name,
  firstName,
  initials,
  roleLine,
  paragraph,
  personalStuff = [],
  accentPills = [],
  neutralPills = [],
  photoSrc,
  photoAlt,
  photoPosition = 'left',
  profileHref,
}) {
  const [imgFailed, setImgFailed] = useState(false);

  const gridClass =
    photoPosition === 'right'
      ? 'grid grid-cols-1 md:grid-cols-[1fr_40%] gap-6 md:gap-10 items-center'
      : 'grid grid-cols-1 md:grid-cols-[40%_1fr] gap-6 md:gap-10 items-center';

  const photoOrderClass = photoPosition === 'right' ? 'md:order-2' : 'md:order-1';
  const contentOrderClass = photoPosition === 'right' ? 'md:order-1' : 'md:order-2';

  const display = firstName || name.split(' ')[0];
  const fallbackInitials =
    initials ||
    name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase();

  return (
    <article className="bg-card rounded-xl border border-border p-6 md:p-10">
      <div className={gridClass}>
        {/* Photo */}
        <div className={photoOrderClass}>
          <div className="rounded-lg overflow-hidden aspect-[3/4] bg-secondary">
            {imgFailed || !photoSrc ? (
              <div className="w-full h-full flex items-center justify-center">
                <span className="font-display text-4xl text-primary/40">
                  {fallbackInitials}
                </span>
              </div>
            ) : (
              <img
                src={photoSrc}
                alt={photoAlt || `Portrait of ${name}`}
                className="object-cover w-full h-full"
                onError={() => setImgFailed(true)}
              />
            )}
          </div>
        </div>

        {/* Content */}
        <div className={`flex flex-col justify-center ${contentOrderClass}`}>
          <h3 className="font-display text-2xl md:text-3xl font-bold leading-tight">
            {name}
          </h3>
          <p className="text-foreground/60 text-sm md:text-base mt-1 mb-4">
            {roleLine}
          </p>

          <p className="font-serif italic text-foreground/80 text-base md:text-lg leading-relaxed border-l-2 border-primary/30 pl-4 py-2">
            {paragraph}
          </p>

          {personalStuff.length > 0 && (
            <div className="mt-6">
              <p className="text-xs font-display uppercase tracking-wide text-foreground/40 mb-3">
                The personal stuff
              </p>
              <ul className="space-y-2">
                {personalStuff.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-2 flex-shrink-0" />
                    <span className="text-sm text-foreground/70 leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {(accentPills.length > 0 || neutralPills.length > 0) && (
            <div className="flex flex-wrap gap-2 mt-5">
              {accentPills.map((pill) => (
                <span
                  key={pill}
                  className="text-xs font-display uppercase tracking-wide px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                >
                  {pill}
                </span>
              ))}
              {neutralPills.map((pill) => (
                <span
                  key={pill}
                  className="text-xs font-display uppercase tracking-wide px-3 py-1 rounded-full bg-secondary text-foreground/50 border border-border"
                >
                  {pill}
                </span>
              ))}
            </div>
          )}

          {profileHref && (
            <Link
              to={profileHref}
              className="mt-5 text-sm text-primary font-medium inline-flex items-center gap-1 hover:gap-2 transition-all w-fit"
            >
              Read {display}'s full profile
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
