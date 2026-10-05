import { GateIntro } from '@/components/GateIntro';
import { Hero } from '@/components/Hero';
import { Countdown } from '@/components/Countdown';
import { OurStory } from '@/components/OurStory';
import { EventDetails } from '@/components/EventDetails';
import { Gallery } from '@/components/Gallery';
import { RsvpForm } from '@/components/RsvpForm';
import { Footer } from '@/components/Footer';
import { MusicPlayer } from '@/components/MusicPlayer';

export default function App() {
  return (
    <main className="bg-ink min-h-screen selection:bg-gold/30 selection:text-cream">
      <GateIntro />
      <Hero />
      <Countdown />
      <OurStory />
      <EventDetails />
      <Gallery />
      <RsvpForm />
      <Footer />
      <MusicPlayer />
    </main>
  );
}
