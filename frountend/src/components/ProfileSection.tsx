import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const purchasedBooks = [
  { id: 1, title: "BOMIN", author: "AUTHOR NAME", color: "from-pink-500 to-orange-500" },
  { id: 2, title: "TITLE", author: "AUTHOR NAME", color: "from-pink-500 to-purple-500" },
  { id: 3, title: "MILK", author: "AUTHOR NAME", color: "from-cyan-400 to-cyan-500" },
  { id: 4, title: "THER SAGA", author: "AUTHOR NAME", color: "from-pink-500 to-purple-500" },
  { id: 5, title: "THE ETHER", author: "AUTHOR NAME", color: "from-cyan-500 to-blue-500" },
  { id: 6, title: "THE ETHER", author: "AUTHOR NAME", color: "from-purple-500 to-pink-500" },
];

export const ProfileSection = () => {
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
    <section id="profile" className="min-h-screen py-20 px-4 relative">
      <div className="dot-pattern absolute inset-0 opacity-30" />
      
      <div className="container mx-auto relative z-10 max-w-7xl">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-6xl md:text-7xl font-black text-foreground animate-slide-up">
            PROFILE PAGE
          </h2>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span>SYNCED: {currentTime} IST</span>
          </div>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* User Details */}
          <div className="lg:col-span-1 space-y-6 animate-slide-up">
            <div className="cyber-card p-8 space-y-6">
              <h3 className="text-2xl font-bold text-foreground border-b-2 border-border pb-4">
                YOUR DETAILS
              </h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">WALLET ADDRESS:</p>
                  <p className="text-lg font-mono text-foreground">0xFa...8aB3</p>
                </div>
                
                <Button className="w-full h-12 bg-background border-2 border-border hover:bg-primary hover:text-primary-foreground transition-all duration-300 flex items-center gap-2 group">
                  <span>VIEW TRANSACTION HISTORY</span>
                  <Clock className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Purchased Books */}
          <div className="lg:col-span-2 animate-slide-up" style={{ animationDelay: "200ms" }}>
            <div className="cyber-card p-8">
              <h3 className="text-2xl font-bold text-foreground border-b-2 border-border pb-4 mb-6">
                PURCHASED BOOKS
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {purchasedBooks.map((book, index) => (
                  <div
                    key={book.id}
                    className="cyber-card p-4 space-y-3 group hover:scale-105 transition-transform duration-300"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className={`aspect-square rounded-lg bg-gradient-to-br ${book.color} pixel-art flex items-center justify-center border-2 border-border`}>
                      <span className="text-2xl font-black text-white drop-shadow-lg">{book.title.slice(0, 5)}</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">{book.title}</p>
                      <p className="text-xs text-muted-foreground">BY {book.author}</p>
                    </div>
                    <Button className="w-full bg-background border-2 border-border hover:bg-accent hover:text-accent-foreground transition-all duration-300 text-sm">
                      READ / DOWNLOAD
                    </Button>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-center gap-2 mt-8">
                {[0, 1, 2].map((dot) => (
                  <div
                    key={dot}
                    className={`w-2 h-2 rounded-full ${dot === 0 ? 'bg-primary' : 'bg-muted'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
