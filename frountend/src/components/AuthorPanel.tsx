import { Rocket, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";

const uploadedBooks = [
  { id: 1, title: "THER SAGA", earnings: "0.15 ETH", color: "from-pink-500 to-purple-500" },
  { id: 2, title: "STER1€CS", earnings: "0.15 ETH", color: "from-purple-500 to-blue-500" },
  { id: 3, title: "MILK", earnings: "0.15 ETH", color: "from-cyan-400 to-cyan-500" },
  { id: 4, title: "THE ETHER SAGA", earnings: "0.15 ETH", color: "from-pink-500 to-rose-500" },
  { id: 5, title: "BOMIN", earnings: "0.15 ETH", color: "from-pink-500 to-orange-500" },
];

export const AuthorPanel = () => {
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
  
  return (
    <section id="author" className="min-h-screen py-20 px-4 relative">
      <div className="dot-pattern absolute inset-0 opacity-30" />
      
      <div className="container mx-auto relative z-10 max-w-7xl">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-6xl md:text-7xl font-black text-foreground animate-slide-up">
            AUTHOR PANEL
          </h2>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span>SYNCED: {currentTime} IST</span>
          </div>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Form */}
          <div className="cyber-card p-8 space-y-6 animate-slide-up">
            <h3 className="text-2xl font-bold text-foreground border-b-2 border-border pb-4">
              UPLOAD NEW BOOK
            </h3>
            
            <div className="space-y-4">
              <Input
                placeholder="Title"
                className="h-12 bg-input border-2 border-border text-foreground"
              />
              <Input
                placeholder="Title"
                className="h-12 bg-input border-2 border-border text-foreground"
              />
              <Textarea
                placeholder="Description"
                className="min-h-[100px] bg-input border-2 border-border text-foreground resize-none"
              />
              <Input
                placeholder="File URL"
                className="h-12 bg-input border-2 border-border text-foreground"
              />
              <div className="text-sm text-muted-foreground">File URL</div>
              <Input
                placeholder="Price (ETH)"
                className="h-12 bg-input border-2 border-border text-foreground"
              />
              
              <Button className="w-full h-12 bg-background border-2 border-border hover:bg-primary hover:text-primary-foreground transition-all duration-300 flex items-center gap-2 group">
                <span>UPLOAD</span>
                <Rocket className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
          
          {/* Uploaded Books */}
          <div className="space-y-6 animate-slide-up" style={{ animationDelay: "200ms" }}>
            <div className="cyber-card p-8">
              <h3 className="text-2xl font-bold text-foreground border-b-2 border-border pb-4 mb-6">
                YOUR UPLOADED BOOKS
              </h3>
              
              <div className="grid grid-cols-3 gap-4">
                {uploadedBooks.map((book, index) => (
                  <div
                    key={book.id}
                    className="cyber-card p-4 space-y-3 group hover:scale-105 transition-transform duration-300"
                  >
                    <div className={`aspect-square rounded-lg bg-gradient-to-br ${book.color} pixel-art flex items-center justify-center border-2 border-border`}>
                      <span className="text-2xl font-black text-white drop-shadow-lg">{book.title.slice(0, 4)}</span>
                    </div>
                    <div className="text-xs text-foreground flex items-center gap-1">
                      <span>EARNINGS: {book.earnings}</span>
                      <span className="text-secondary">💰</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="cyber-card p-8 bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-primary animate-border-glow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-8 h-8 text-primary" />
                  <span className="text-2xl font-bold text-foreground">TOTAL EARNINGS: 0.30 ETH</span>
                </div>
                <TrendingUp className="w-6 h-6 text-accent animate-pulse-glow" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
