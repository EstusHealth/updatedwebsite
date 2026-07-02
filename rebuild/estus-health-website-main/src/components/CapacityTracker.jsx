import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Clock } from 'lucide-react';
import { BookingButtonPair } from './BookingButtons';

const capacityItems = [
  {
    title: 'Adults',
    status: 'accepting',
    statusLabel: 'Accepting New Clients',
    to: '/services/occupational-therapy',
  },
  {
    title: 'Youth & Teens',
    status: 'accepting',
    statusLabel: 'Accepting New Clients',
    to: '/services/gaming-informed-therapy',
  },
  {
    title: 'NDIS Access Requests',
    status: 'accepting',
    statusLabel: 'Immediate Capacity',
    to: '/services/assessments-reports',
  },
  {
    title: 'Functional Capacity Assessments',
    status: 'accepting',
    statusLabel: 'Immediate Capacity',
    to: '/services/assessments-reports',
  },
];

function StatusBadge({ status, label }) {
  const styles = status === 'accepting'
    ? 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20'
    : 'bg-amber-500/10 text-amber-700 border-amber-500/20';

  const Icon = status === 'accepting' ? CheckCircle : Clock;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles}`}>
      <Icon className="w-3.5 h-3.5" />
      {label}
    </span>
  );
}

export default function CapacityTracker() {
  return (
    <section className="bg-noctua-bone/30 border-b border-noctua-brown/10">
      <div className="container py-12 md:py-16">
        <div className="text-center mb-8">
          <p className="font-display text-sm uppercase tracking-widest mb-3 text-noctua-russet font-semibold">
            Current Availability
          </p>
          <h2 className="text-2xl md:text-3xl font-display text-noctua-brown">
            We're accepting new clients
          </h2>
        </div>

        <div className="max-w-xl mx-auto mb-10">
          <div className="divide-y divide-noctua-brown/10">
            {capacityItems.map((item) => (
              <div
                key={item.title}
                className="flex items-center justify-between gap-4 py-3"
              >
                <Link
                  to={item.to}
                  className="text-noctua-brown font-medium text-sm hover:text-noctua-russet transition-colors inline-flex items-center gap-1"
                >
                  {item.title}
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 -ml-1 group-hover:opacity-100 transition-opacity" />
                </Link>
                <StatusBadge status={item.status} label={item.statusLabel} />
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-noctua-brown/10 pt-8 text-center">
          <p className="text-noctua-brown/70 mb-4">
            Not sure where to start? Book a free 15-minute discovery call. No commitment, no pressure.
          </p>
          <div className="flex justify-center">
            <BookingButtonPair />
          </div>
          <p className="text-noctua-brown/40 text-xs mt-4">
            Appointments available Monday to Saturday, 8am to 7pm
          </p>
        </div>
      </div>
    </section>
  );
}
