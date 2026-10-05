import { FadeIn } from './FadeIn';

export function OurStory() {
  return (
    <section className="py-24 md:py-32 px-6 bg-ink relative">
      <FadeIn className="max-w-2xl mx-auto text-center">
        <span className="font-display italic text-gold-dim tracking-[0.3em] text-xs uppercase">Our Story</span>
        <h2 className="font-display italic gold-text text-4xl md:text-5xl mt-3 mb-12">How It All Began</h2>

        <p className="font-display text-lg md:text-xl text-cream-dim leading-relaxed">
          It started on a rainy afternoon in Cairo, both reaching for the same umbrella outside a
          bookstore. An awkward laugh over bad timing turned into hours of conversation over coffee
          that went cold twice. Mahmoud says he knew by the third cup; Rawan admits it took her a
          little longer — and a lot more coffee — to admit the same. Three years, countless road
          trips, and one very nervous proposal later, here they are: about to say "I do."
        </p>
      </FadeIn>
    </section>
  );
}
