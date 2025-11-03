import { useEffect, useRef, useState } from "react";
import { PixelBook } from "./PixelBook";

export const HeroSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const istTime = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }).format(now);
      setCurrentTime(istTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
    }> = [];

    const colors = ["#FF1493", "#FF6B35", "#00CED1"];

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: Math.random() * 2 - 1,
        speedY: Math.random() * 2 - 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        ctx.fillStyle = particle.color;
        ctx.fillRect(particle.x, particle.y, particle.size, particle.size);

        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 opacity-20" />
      <div className="dot-pattern absolute inset-0" />
      
      <div className="relative z-10 text-center space-y-8 px-4 animate-slide-up">
        <h1 className="text-8xl md:text-9xl font-black text-foreground tracking-tighter">
          SmartShelf
        </h1>
        <p className="text-2xl md:text-3xl font-light">
          Fighting Piracy. Rewarding <span className="text-secondary glow-text">Creators</span>. Together.
        </p>
        
        <div className="relative w-80 h-80 mx-auto animate-float">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 blur-3xl" />
          <div className="relative w-full h-full flex items-center justify-center">
            <PixelBook />
          </div>
        </div>
        
        <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span>LAST UPDATED: OCT 2025</span>
        </div>
      </div>
    </section>
  );
};
