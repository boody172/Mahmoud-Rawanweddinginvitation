import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FadeIn } from './FadeIn';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const TARGET_DATE = new Date('2027-04-04T18:00:00+02:00').getTime();

function getTimeLeft(): TimeLeft {
  const difference = TARGET_DATE - Date.now();
  if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

function FlipDigit({ value }: { value: string }) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ y: '-100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="absolute inset-0 flex items-center justify-center font-display text-4xl md:text-5xl text-cream font-medium"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const [isTicking, setIsTicking] = useState(false);
  const tickTimeout = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    setIsMounted(true);
    setTimeLeft(getTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
      setIsTicking(true);
      clearTimeout(tickTimeout.current);
      tickTimeout.current = setTimeout(() => setIsTicking(false), 250);
    }, 1000);
    return () => {
      clearInterval(timer);
      clearTimeout(tickTimeout.current);
    };
  }, []);

  if (!isMounted) return null;

  const timeUnits = [
    { label: 'يوم', value: timeLeft.days },
    { label: 'ساعة', value: timeLeft.hours },
    { label: 'دقيقة', value: timeLeft.minutes },
    { label: 'ثانية', value: timeLeft.seconds },
  ];

  return (
    <section className="py-24 md:py-32 px-6 relative overflow-hidden bg-panel border-y border-gold-dim/20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(207,169,104,0.06),transparent_70%)] pointer-events-none" />
      <FadeIn className="max-w-4xl mx-auto relative">
        <div className="text-center mb-14">
          <span className="font-display italic text-gold-dim tracking-[0.3em] text-xs uppercase">Counting down to</span>
          <h2 className="font-arabic gold-text text-4xl md:text-5xl mt-3">يوم فرحتنا</h2>
        </div>

        <div className="flex items-center justify-center gap-2 mb-10">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold/70 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
          </span>
          <span className="text-[10px] uppercase tracking-[0.3em] text-cream-dim font-medium">Live</span>
        </div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          {timeUnits.map(({ label, value }, index) => (
            <motion.div
              key={label}
              className="flex flex-col items-center"
              animate={isTicking && index === 3 ? { scale: [1, 1.04, 1] } : {}}
              transition={{ duration: 0.4 }}
            >
              <div className="relative w-24 h-24 md:w-28 md:h-32 bg-ink border border-gold-dim/40 shadow-lg overflow-hidden px-1">
                <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gold-dim/30 z-10" />
                <FlipDigit value={value.toString().padStart(2, '0')} />
              </div>
              <span className="mt-4 text-[10px] md:text-xs uppercase tracking-[0.2em] text-gold-dim font-medium">
                {label}
              </span>
            </motion.div>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
