import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn } from './FadeIn';
import photo1 from '@/assets/couple-1.jpg';
import photo2 from '@/assets/couple-2.jpg';
import photo3 from '@/assets/couple-3.jpg';

const photos = [
  { src: photo1, alt: 'Mahmoud and Rawan' },
  { src: photo2, alt: 'Mahmoud and Rawan' },
  { src: photo3, alt: 'Mahmoud and Rawan' },
];

export function Gallery() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section className="py-24 md:py-32 px-6 bg-ink">
      <FadeIn className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="font-display italic text-gold-dim tracking-[0.3em] text-xs uppercase">Gallery</span>
          <h2 className="font-display italic gold-text text-4xl md:text-5xl mt-3">Moments We Love</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {photos.map((photo, index) => (
            <div
              key={index}
              onClick={() => setSelected(index)}
              className="relative aspect-[3/4] overflow-hidden cursor-pointer group border border-gold-dim/20"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/20 transition-colors duration-500" />
              <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/40 transition-colors duration-500 pointer-events-none" />
            </div>
          ))}
        </div>
      </FadeIn>

      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 backdrop-blur-sm p-4"
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-6 right-6 text-gold-dim hover:text-gold text-sm uppercase tracking-widest"
              aria-label="Close"
            >
              Close ✕
            </button>
            <motion.img
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              src={photos[selected].src}
              alt={photos[selected].alt}
              className="max-w-full max-h-[90vh] object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
