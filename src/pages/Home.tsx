import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PixelBook } from "@/components/PixelBook";
import { FloatingEthCoins } from "@/components/FloatingEthCoins";
import { TermsSection } from "@/components/TermsSection";
import { ArrowRight, BookOpen, Shield, Coins, Wallet, Lock, Users, Sparkles, Zap, Gift } from "lucide-react";

const Home = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const navigate = useNavigate();


  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 3;

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
    }> = [];

    const colors = ["#FF6B35", "#FF8C00", "#FFA500"];

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 4 + 1,
        speedX: Math.random() * 1.5 - 0.75,
        speedY: Math.random() * 1.5 - 0.75,
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
      canvas.height = window.innerHeight * 3;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

    return (
    <div className="min-h-screen w-full bg-background overflow-y-auto">
      <FloatingEthCoins />
      <canvas ref={canvasRef} className="fixed inset-0 opacity-20 pointer-events-none" />
      <div className="dot-pattern fixed inset-0 pointer-events-none" />
      <div className="blue-glow fixed inset-0 pointer-events-none" />


      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <div className="text-center space-y-8 max-w-4xl animate-fade-in">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter font-pixel text-foreground">
            SmartShelf
          </h1>
          
          <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground font-retro">
            Fighting Piracy. Rewarding <span className="text-primary font-semibold">Creators</span>. Together.
          </p>

          <div className="w-48 h-48 md:w-64 md:h-64 mx-auto">
            <PixelBook />
          </div>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Button
              size="lg"
              className="h-14 px-8 text-lg font-bold group bg-primary hover:bg-primary/90"
              onClick={() => navigate("/auth")}
            >
              Get Started
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-14 px-8 text-lg border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              onClick={() => navigate("/auth")}
            >
              <BookOpen className="mr-2 w-5 h-5" />
              Explore Library
            </Button>
          </div>

          {/* Features Grid - Colorful Icons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
            <div className="flex flex-col items-center space-y-2 p-6 bg-card/50 rounded-lg border border-border hover:border-pink-500 transition-colors">
              <div className="w-14 h-14 rounded-full bg-pink-500/20 flex items-center justify-center">
                <Shield className="w-7 h-7 text-pink-500" />
              </div>
              <h3 className="font-bold font-pixel text-sm text-foreground">Anti-Piracy</h3>
              <p className="text-sm text-muted-foreground text-center font-retro">
                NFT-based ownership verification
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 p-6 bg-card/50 rounded-lg border border-border hover:border-primary transition-colors">
              <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center">
                <Coins className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-bold font-pixel text-sm text-foreground">Creator Rewards</h3>
              <p className="text-sm text-muted-foreground text-center font-retro">
                Direct royalties to authors
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 p-6 bg-card/50 rounded-lg border border-border hover:border-teal-500 transition-colors">
              <div className="w-14 h-14 rounded-full bg-teal-500/20 flex items-center justify-center">
                <BookOpen className="w-7 h-7 text-teal-500" />
              </div>
              <h3 className="font-bold font-pixel text-sm text-foreground">Digital Library</h3>
              <p className="text-sm text-muted-foreground text-center font-retro">
                Own your books forever
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-card/30">
        <div className="max-w-6xl w-full space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-black font-pixel">
              How <span className="text-primary">SmartShelf</span> Works
            </h2>
            <p className="text-lg text-muted-foreground font-retro max-w-2xl mx-auto">
              A revolutionary platform that uses blockchain technology to protect creators and reward readers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="relative p-6 bg-card rounded-lg border border-border hover:border-purple-500 transition-all group hover:shadow-lg hover:shadow-purple-500/20">
              <div className="absolute -top-4 left-4 w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center font-pixel text-sm text-white">
                1
              </div>
              <div className="pt-4 space-y-3">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-purple-500" />
                </div>
                <h3 className="font-bold font-pixel text-sm text-foreground">Connect Wallet</h3>
                <p className="text-sm text-muted-foreground font-retro">
                  Link your MetaMask or any Web3 wallet to get started
                </p>
              </div>
            </div>

            <div className="relative p-6 bg-card rounded-lg border border-border hover:border-teal-500 transition-all group hover:shadow-lg hover:shadow-teal-500/20">
              <div className="absolute -top-4 left-4 w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center font-pixel text-sm text-white">
                2
              </div>
              <div className="pt-4 space-y-3">
                <div className="w-12 h-12 rounded-full bg-teal-500/20 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-teal-500" />
                </div>
                <h3 className="font-bold font-pixel text-sm text-foreground">Browse Library</h3>
                <p className="text-sm text-muted-foreground font-retro">
                  Discover books from talented authors worldwide
                </p>
              </div>
            </div>

            <div className="relative p-6 bg-card rounded-lg border border-border hover:border-pink-500 transition-all group hover:shadow-lg hover:shadow-pink-500/20">
              <div className="absolute -top-4 left-4 w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center font-pixel text-sm text-white">
                3
              </div>
              <div className="pt-4 space-y-3">
                <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center">
                  <Lock className="w-6 h-6 text-pink-500" />
                </div>
                <h3 className="font-bold font-pixel text-sm text-foreground">Purchase NFT</h3>
                <p className="text-sm text-muted-foreground font-retro">
                  Buy book NFTs to own them forever on the blockchain
                </p>
              </div>
            </div>

            <div className="relative p-6 bg-card rounded-lg border border-border hover:border-amber-500 transition-all group hover:shadow-lg hover:shadow-amber-500/20">
              <div className="absolute -top-4 left-4 w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center font-pixel text-sm text-white">
                4
              </div>
              <div className="pt-4 space-y-3">
                <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-amber-500" />
                </div>
                <h3 className="font-bold font-pixel text-sm text-foreground">Read & Earn</h3>
                <p className="text-sm text-muted-foreground font-retro">
                  Enjoy reading and earn rewards for your engagement
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <div className="max-w-6xl w-full space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-black font-pixel">
              Why Choose <span className="text-primary">SmartShelf</span>?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-card rounded-lg border border-border hover:border-cyan-500 transition-all space-y-4 hover:shadow-lg hover:shadow-cyan-500/10">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-cyan-500/20 rounded-full flex items-center justify-center">
                  <Users className="w-7 h-7 text-cyan-500" />
                </div>
                <h3 className="font-bold font-pixel text-lg text-foreground">For Readers</h3>
              </div>
              <ul className="space-y-3 font-retro text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="text-cyan-500">▸</span> True ownership of your digital books
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-cyan-500">▸</span> Resell books you've finished reading
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-cyan-500">▸</span> Earn rewards for reading & reviews
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-cyan-500">▸</span> Access exclusive author content
                </li>
              </ul>
            </div>

            <div className="p-8 bg-card rounded-lg border border-border hover:border-rose-500 transition-all space-y-4 hover:shadow-lg hover:shadow-rose-500/10">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-rose-500/20 rounded-full flex items-center justify-center">
                  <Gift className="w-7 h-7 text-rose-500" />
                </div>
                <h3 className="font-bold font-pixel text-lg text-foreground">For Authors</h3>
              </div>
              <ul className="space-y-3 font-retro text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="text-rose-500">▸</span> Automatic royalties on resales
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-rose-500">▸</span> Direct connection with readers
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-rose-500">▸</span> Anti-piracy protection built-in
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-rose-500">▸</span> Transparent sales analytics
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center pt-8">
            <Button
              size="lg"
              className="h-16 px-12 text-xl font-bold bg-primary hover:bg-primary/90"
              onClick={() => navigate("/auth")}
            >
              Start Your Journey
              <ArrowRight className="ml-3 w-6 h-6" />
            </Button>
          </div>
        </div>
      </section>

      {/* Terms and Conditions */}
      <TermsSection />

      {/* Footer */}
      <footer className="relative z-10 py-8 border-t border-border">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="font-retro text-muted-foreground">
            © 2025 SmartShelf
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;