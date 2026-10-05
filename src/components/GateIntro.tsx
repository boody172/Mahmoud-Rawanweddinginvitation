import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';

const ARCH_COUNT = 6;
const CORRIDOR_START = 0.42;
const CORRIDOR_END = 0.82;

function ArchLayer({ progress, index }: { progress: MotionValue<number>; index: number }) {
  const span = (CORRIDOR_END - CORRIDOR_START) / ARCH_COUNT;
  const start = CORRIDOR_START + index * span * 0.65;
  const mid = start + span;
  const end = start + span * 2.4;

  const scale = useTransform(progress, [start, mid, end], [0.1, 1, 3.4]);
  const opacity = useTransform(progress, [start, start + span * 0.35, mid + span * 0.7, end], [0, 1, 1, 0]);
  const blurPx = useTransform(progress, [start, mid, end], [3, 0, 8]);
  const filter = useTransform(blurPx, (b) => `blur(${b}px)`);

  const baseSize = 46 + index * 9;

  return (
    <motion.div
      style={{ scale, opacity, filter }}
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
    >
      <div
        className="rounded-t-full"
        style={{
          width: `${baseSize}vmin`,
          height: `${baseSize * 1.35}vmin`,
          border: '2px solid rgba(207,169,104,0.5)',
          boxShadow:
            'inset 0 0 70px rgba(207,169,104,0.12), 0 0 50px rgba(207,169,104,0.08)',
        }}
      />
    </motion.div>
  );
}

export function GateIntro() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const doorRotateLeft = useTransform(scrollYProgress, [0.1, 0.38], [0, -108]);
  const doorRotateRight = useTransform(scrollYProgress, [0.1, 0.38], [0, 108]);
  const doorOpacity = useTransform(scrollYProgress, [0.32, 0.42], [1, 0]);

  const glowOpacity = useTransform(scrollYProgress, [0.08, 0.3, 0.46], [0, 1, 0]);

  const introOpacity = useTransform(scrollYProgress, [0, 0.07], [1, 0]);
  const introY = useTransform(scrollYProgress, [0, 0.1], [0, -36]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.045], [1, 0]);

  const arrivalOpacity = useTransform(scrollYProgress, [0.68, 0.92], [0, 1]);
  const arrivalScale = useTransform(scrollYProgress, [0.68, 1], [1.12, 1]);

  return (
    <section ref={containerRef} className="relative h-[380vh] bg-ink" aria-label="Invitation entrance">
      <motion.div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-gradient-to-b from-[#0c0906] via-ink to-[#0c0906]">
        {/* vignette */}
        <div className="absolute inset-0 z-30 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_28%,rgba(0,0,0,0.8)_100%)]" />

        {/* corridor arches */}
        <div className="absolute inset-0 z-10">
          {Array.from({ length: ARCH_COUNT }).map((_, i) => (
            <ArchLayer key={i} progress={scrollYProgress} index={i} />
          ))}
        </div>

        {/* center burst */}
        <motion.div
          style={{ opacity: glowOpacity }}
          className="absolute z-20 w-[36vmin] h-[68vmin] rounded-full blur-3xl pointer-events-none"
        >
          <div className="w-full h-full bg-[radial-gradient(ellipse,rgba(233,201,136,0.55),transparent_70%)]" />
        </motion.div>

        {/* gate doors */}
        <div className="absolute inset-0 z-40" style={{ perspective: 1800 }}>
          <motion.div
            style={{ rotateY: doorRotateLeft, opacity: doorOpacity, transformOrigin: 'left center' }}
            className="door-panel door-panel-left absolute left-0 top-0 h-full w-1/2"
          />
          <motion.div
            style={{ rotateY: doorRotateRight, opacity: doorOpacity, transformOrigin: 'right center' }}
            className="door-panel door-panel-right absolute right-0 top-0 h-full w-1/2"
          />
        </div>

        {/* names overlay */}
        <motion.div
          style={{ opacity: introOpacity, y: introY }}
          className="absolute z-50 flex flex-col items-center text-center px-6 text-backdrop"
        >
          <span className="font-display italic text-gold-bright text-pop tracking-[0.35em] text-[11px] uppercase mb-4">
            You're Invited
          </span>
          <h1 className="font-display text-gold-bright text-pop text-5xl md:text-7xl leading-tight italic">Mahmoud &amp; Rawan</h1>
          <div className="ornate-divider my-6 w-44">
            <span className="text-gold-bright text-pop text-sm">✦</span>
          </div>
          <p className="font-display italic text-cream text-pop text-xl">April 4, 2027</p>
        </motion.div>

        <motion.div
          style={{ opacity: hintOpacity }}
          className="absolute bottom-10 z-50 flex flex-col items-center gap-2 text-gold-bright text-pop"
        >
          <span className="text-[10px] uppercase tracking-[0.35em] font-medium">Scroll to open the gate</span>
          <motion.span
            animate={{ y: [0, 9, 0] }}
            transition={{ duration: 1.7, repeat: Infinity, ease: 'easeInOut' }}
            className="text-xl leading-none"
          >
            ⌄
          </motion.span>
        </motion.div>

        {/* arrival */}
        <motion.div
          style={{ opacity: arrivalOpacity, scale: arrivalScale }}
          className="absolute inset-0 z-[60] flex items-center justify-center bg-gradient-to-b from-[#1a140c] via-[#241a10] to-ink"
        >
          <div className="text-center px-6 text-backdrop">
            <span className="font-display italic text-gold-bright text-pop tracking-[0.35em] text-[11px] uppercase">
              Welcome to
            </span>
            <h2 className="font-display italic text-gold-bright text-pop text-4xl md:text-6xl mt-3">Our Wedding</h2>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
