import { FadeIn } from './FadeIn';

export function QuranVerse() {
  return (
    <section className="py-24 md:py-32 px-6 bg-panel border-y border-gold-dim/20">
      <FadeIn className="max-w-3xl mx-auto text-center">
        <span className="diamond-mark text-gold mb-8" />
        <p dir="rtl" lang="ar" className="font-arabic text-cream text-2xl md:text-4xl leading-[2.2] md:leading-[2.4]">
          وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ
        </p>
        <p className="font-display italic text-gold-dim tracking-[0.15em] text-sm mt-8 uppercase">
          Surah Ar-Rum, 30:21
        </p>
      </FadeIn>
    </section>
  );
}
