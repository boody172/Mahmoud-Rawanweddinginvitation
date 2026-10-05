import { FadeIn } from './FadeIn';

/**
 * Waiting on the couple's actual story (how they met, proposal, etc.)
 * before writing real copy here — placeholder only, per explicit request
 * not to invent content. Swap STORY_MOMENTS below once the text arrives.
 */
const STORY_MOMENTS: { title: string; body: string }[] = [];

export function OurStory() {
  return (
    <section className="py-24 md:py-32 px-6 bg-ink relative">
      <FadeIn className="max-w-3xl mx-auto text-center">
        <span className="font-display italic text-gold-dim tracking-[0.3em] text-xs uppercase">Our Story</span>
        <h2 className="font-arabic gold-text text-4xl md:text-5xl mt-3 mb-14">إزاي بدأت حكايتنا</h2>

        {STORY_MOMENTS.length === 0 ? (
          <div className="border border-dashed border-gold-dim/30 rounded-sm py-16 px-8 text-cream-dim/70">
            <p className="font-display italic text-lg">هنا هتحكي قصتكم… محمود وروان اتقابلوا إزاي وعرفوا بعض لغاية يوم النهاردة.</p>
            <p className="text-xs mt-4 uppercase tracking-widest text-gold-dim/60">بانتظار النص منكم</p>
          </div>
        ) : (
          <div className="space-y-10 text-right">
            {STORY_MOMENTS.map((moment) => (
              <div key={moment.title}>
                <h3 className="font-arabic text-2xl text-gold mb-2">{moment.title}</h3>
                <p className="text-cream-dim leading-relaxed">{moment.body}</p>
              </div>
            ))}
          </div>
        )}
      </FadeIn>
    </section>
  );
}
