import { User, Users, Calendar } from 'lucide-react';

export const BOOKING = {
  adult: {
    name: 'Nik',
    label: 'Over 16s',
    url: 'https://calendar.app.google/iLxEVkhaRCFEhsSC8',
  },
  youth: {
    name: 'Nam',
    label: 'Under 16s',
    url: 'https://calendar.app.google/vGXRQqSbPwSXsY8q9',
  },
};

export function BookingButtonPair({ variant = 'outline' }) {
  const styles = {
    outline:
      'border border-noctua-brown/20 text-noctua-brown hover:bg-noctua-brown hover:text-white',
    card: '',
  };

  if (variant === 'card') {
    return (
      <div className="grid sm:grid-cols-2 gap-6">
        {[
          { key: 'adult', icon: User, ...BOOKING.adult },
          { key: 'youth', icon: Users, ...BOOKING.youth },
        ].map(({ key, icon: Icon, label, name, url }) => (
          <a
            key={key}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white border border-noctua-brown/10 rounded-lg p-6 text-center transition-all hover:shadow-md hover:border-noctua-russet/30"
          >
            <div className="w-12 h-12 rounded-full bg-noctua-russet/10 flex items-center justify-center mx-auto mb-4">
              <Icon className="w-6 h-6 text-noctua-russet" />
            </div>
            <p className="font-display text-lg text-noctua-brown mb-1">{label}</p>
            <p className="text-noctua-brown/60 text-sm mb-4">with {name}</p>
            <span className="inline-flex items-center gap-2 font-display text-sm uppercase tracking-wide text-noctua-russet group-hover:gap-3 transition-all">
              Book call <Calendar className="w-4 h-4" />
            </span>
          </a>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {[
        { key: 'adult', icon: User, ...BOOKING.adult },
        { key: 'youth', icon: Users, ...BOOKING.youth },
      ].map(({ key, icon: Icon, label, name, url }) => (
        <a
          key={key}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center justify-center gap-2 h-10 px-5 rounded-lg font-display text-sm uppercase tracking-wide transition-all duration-200 w-full sm:w-auto ${styles.outline}`}
        >
          <Icon className="w-4 h-4" />
          {label} with {name}
        </a>
      ))}
    </div>
  );
}
