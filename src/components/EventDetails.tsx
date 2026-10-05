import { FadeIn } from './FadeIn';

const MAP_LINK = 'https://maps.app.goo.gl/Eu35N5KNKKwHKBLr8?g_st=ic';

const DETAILS = [
  {
    icon: '📅',
    label: 'Date',
    value: 'Sunday, April 4th 2027',
  },
  {
    icon: '👔',
    label: 'Attire',
    value: 'Formal',
  },
  {
    icon: '📍',
    label: 'Venue',
    value: 'Casa de Palm',
  },
];

export function EventDetails() {
  return (
    <section className="py-24 md:py-32 px-6 bg-panel border-y border-gold-dim/20">
      <FadeIn className="max-w-4xl mx-auto text-center">
        <span className="font-display italic text-gold-dim tracking-[0.3em] text-xs uppercase">Details</span>
        <h2 className="font-display italic gold-text text-4xl md:text-5xl mt-3 mb-16">Event Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">
          {DETAILS.map((d) => (
            <div key={d.label} className="flex flex-col items-center">
              <span className="text-3xl mb-4" aria-hidden="true">
                {d.icon}
              </span>
              <span className="text-[11px] uppercase tracking-[0.25em] text-gold-dim mb-2">{d.label}</span>
              <span className="font-display italic text-xl text-cream">{d.value}</span>
            </div>
          ))}
        </div>

        <a
          href={MAP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center mt-16 px-10 py-4 border border-gold-dim text-gold hover:bg-gold hover:text-ink font-sans text-xs uppercase tracking-[0.2em] transition-colors duration-300"
        >
          Open in Maps
        </a>
      </FadeIn>
    </section>
  );
}
