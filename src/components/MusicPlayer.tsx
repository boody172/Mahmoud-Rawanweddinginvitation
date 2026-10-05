import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const TRACK_SRC = '/audio/background-music.mp3';

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const startedRef = useRef(false);

  useEffect(() => {
    const audio = new Audio(TRACK_SRC);
    audio.loop = true;
    audio.volume = 0.45;
    audioRef.current = audio;

    const tryStart = () => {
      if (startedRef.current) return;
      audio
        .play()
        .then(() => {
          startedRef.current = true;
          setIsPlaying(true);
          cleanup();
        })
        .catch(() => {
          // Autoplay blocked — will retry on the next interaction event.
        });
    };

    // Attempt immediately (works if the browser already granted autoplay
    // permission for this origin from a previous visit).
    tryStart();

    const events: (keyof WindowEventMap)[] = ['scroll', 'wheel', 'touchstart', 'pointerdown', 'keydown'];
    const cleanup = () => {
      events.forEach((e) => window.removeEventListener(e, tryStart));
    };
    events.forEach((e) => window.addEventListener(e, tryStart, { passive: true }));

    return () => {
      cleanup();
      audio.pause();
    };
  }, []);

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => {
          startedRef.current = true;
          setIsPlaying(true);
        })
        .catch(() => {});
    }
  };

  return (
    <button
      onClick={toggle}
      className="fixed bottom-6 left-6 z-[90] w-12 h-12 bg-panel/80 backdrop-blur-sm border border-gold-dim/40 rounded-full flex items-center justify-center text-gold-dim hover:text-gold hover:border-gold transition-all duration-300 shadow-lg"
      aria-label={isPlaying ? 'كتم الموسيقى' : 'تشغيل الموسيقى'}
    >
      {isPlaying ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
    </button>
  );
}
