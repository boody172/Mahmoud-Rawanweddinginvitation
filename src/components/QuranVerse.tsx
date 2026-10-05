import { FadeIn } from './FadeIn';

export function QuranVerse() {
  return (
    <section className="py-24 md:py-32 px-6 bg-panel border-y border-gold-dim/20">
      <FadeIn className="max-w-3xl mx-auto text-center">
        <span className="text-gold text-2xl mb-8 block">✦</span>
        <p dir="rtl" lang="ar" className="font-arabic text-cream text-2xl md:text-4xl leading-[2.2] md:leading-[2.4]">
          وَاللَّهُ جَعَلَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا وَجَعَلَ لَكُم مِّنْ أَزْوَاجِكُم بَنِينَ وَحَفَدَةً وَرَزَقَكُم مِّنَ الطَّيِّبَاتِ
        </p>
        <p className="font-display italic text-gold-dim tracking-[0.15em] text-sm mt-8 uppercase">
          Surah An-Nahl, 16:72
        </p>
      </FadeIn>
    </section>
  );
}
