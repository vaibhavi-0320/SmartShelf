import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

interface RocketSignOutProps {
  onSignOut?: () => void;
}

export const RocketSignOut = ({ onSignOut }: RocketSignOutProps) => {
  const [isLaunching, setIsLaunching] = useState(false);
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    setIsLaunching(true);
    
    // Wait for animation to complete before signing out
    setTimeout(async () => {
      await signOut();
      if (onSignOut) onSignOut();
    }, 1500);
  };

  return (
    <div className="relative">
      <button
        onClick={handleSignOut}
        className="flex items-center gap-3 px-8 py-4 bg-card border-2 border-border rounded-lg hover:border-primary transition-all font-pixel text-base group"
        disabled={isLaunching}
      >
        <span className="text-foreground group-hover:text-primary transition-colors">
          Sign Out
        </span>
        <div className={`relative transition-transform duration-300 ${isLaunching ? '' : 'group-hover:-translate-y-2'}`}>
          {/* Rocket with ETH coin */}
          <svg 
            width="40" 
            height="56" 
            viewBox="0 0 40 56" 
            className={`pixel-art transition-all duration-1000 ${isLaunching ? 'animate-rocket-launch' : ''}`}
          >
            {/* Rocket body */}
            <rect x="12" y="8" width="16" height="28" fill="hsl(var(--foreground))" />
            <rect x="16" y="12" width="8" height="8" fill="hsl(var(--primary))" />
            {/* Rocket tip */}
            <rect x="16" y="0" width="8" height="8" fill="hsl(var(--foreground))" />
            {/* Rocket fins */}
            <rect x="4" y="28" width="8" height="8" fill="hsl(var(--foreground))" />
            <rect x="28" y="28" width="8" height="8" fill="hsl(var(--foreground))" />
            {/* ETH coin on rocket */}
            <circle cx="20" cy="18" r="5" fill="hsl(var(--primary))" />
            <text x="20" y="21" textAnchor="middle" fontSize="7" fill="hsl(var(--background))" fontWeight="bold">Ξ</text>
            {/* Flame */}
            <rect x="14" y="36" width="12" height="8" fill="hsl(var(--primary))" className={isLaunching ? 'animate-pulse' : 'opacity-0'} />
            <rect x="16" y="44" width="8" height="6" fill="hsl(30 100% 55%)" className={isLaunching ? 'animate-pulse' : 'opacity-0'} />
            <rect x="18" y="50" width="4" height="4" fill="hsl(40 100% 60%)" className={isLaunching ? 'animate-pulse' : 'opacity-0'} />
          </svg>
        </div>
      </button>

      {/* Launch trail effect - much bigger rocket */}
      {isLaunching && (
        <div className="fixed bottom-0 right-12 z-50 animate-rocket-launch">
          <svg width="80" height="140" viewBox="0 0 80 140" className="pixel-art">
            {/* Large rocket */}
            <rect x="24" y="16" width="32" height="56" fill="hsl(var(--foreground))" />
            <rect x="32" y="24" width="16" height="16" fill="hsl(var(--primary))" />
            <rect x="32" y="0" width="16" height="16" fill="hsl(var(--foreground))" />
            <rect x="8" y="56" width="16" height="16" fill="hsl(var(--foreground))" />
            <rect x="56" y="56" width="16" height="16" fill="hsl(var(--foreground))" />
            {/* ETH coin */}
            <circle cx="40" cy="36" r="10" fill="hsl(var(--primary))" />
            <text x="40" y="41" textAnchor="middle" fontSize="14" fill="hsl(var(--background))" fontWeight="bold">Ξ</text>
            {/* Flames */}
            <rect x="28" y="72" width="24" height="20" fill="hsl(var(--primary))" className="animate-pulse" />
            <rect x="32" y="92" width="16" height="16" fill="hsl(30 100% 55%)" className="animate-pulse" />
            <rect x="36" y="108" width="8" height="16" fill="hsl(40 100% 60%)" className="animate-pulse" />
            <rect x="38" y="124" width="4" height="12" fill="hsl(45 100% 70%)" className="animate-pulse" />
          </svg>
        </div>
      )}
    </div>
  );
};
