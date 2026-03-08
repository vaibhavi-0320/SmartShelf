import { PixelBook } from "./PixelBook";
import { AnimatedBackground } from "./AnimatedBackground";

export const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative z-10 text-center space-y-8 px-4 animate-slide-up">
        <h1 className="text-8xl md:text-9xl font-black text-foreground tracking-tighter">
          SmartShelf
        </h1>
        <p className="text-2xl md:text-3xl font-light">
          Fighting Piracy. Rewarding <span className="text-primary glow-text">Creators</span>. Together.
        </p>
        
        <div className="relative w-80 h-80 mx-auto animate-float">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 blur-3xl" />
          <div className="relative w-full h-full flex items-center justify-center">
            <PixelBook />
          </div>
        </div>
      </div>
    </section>
  );
};
