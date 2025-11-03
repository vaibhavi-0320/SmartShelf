import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export const Header = () => {
  const [currentTime, setCurrentTime] = useState("");
  const [isWalletConnected, setIsWalletConnected] = useState(false);

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
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
          <span className="text-sm text-muted-foreground">SYNCED: {currentTime} IST</span>
        </div>
        
        <div className="flex items-center gap-4">
          {!isWalletConnected ? (
            <Button 
              variant="outline" 
              className="rounded-full border-2 border-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              onClick={() => setIsWalletConnected(true)}
            >
              Connect Wallet
            </Button>
          ) : (
            <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-full border border-border">
              <span className="text-primary font-bold text-lg">M</span>
              <span className="text-sm font-mono">0xFa...8aB3</span>
              <div className="w-2 h-2 rounded-full bg-accent" />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
