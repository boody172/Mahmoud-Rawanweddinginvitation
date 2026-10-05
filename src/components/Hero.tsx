import { motion } from 'framer-motion';
import coupleImg from '@/assets/couple-3.jpg';

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 py-28">
      <div className="absolute inset-0">
        <img
          src={coupleImg}
          alt="Mahmoud and Rawan"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/85 to-ink" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="relative z-10 text-center flex flex-col items-center"
      >
        <span className="font-display italic text-gold-dim tracking-[0.35em] text-xs uppercase mb-6">
          The Wedding Of
        </span>
        <h1 className="font-display italic gold-text text-6xl md:text-8xl leading-tight mb-4">
          Mahmoud &amp; Rawan
        </h1>
        <div className="ornate-divider my-6 w-56">
          <span className="text-gold text-sm">✦</span>
        </div>
        <p className="font-display italic text-2xl md:text-3xl text-cream-dim">
          Sunday, April 4th 2027
        </p>
        <p className="mt-2 text-sm tracking-widest uppercase text-gold-dim">Casa de Palm</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-10 z-10 flex flex-col items-center gap-2 text-gold-dim"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-gold to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
}
