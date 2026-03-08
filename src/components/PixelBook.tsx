import { useState, useEffect } from "react";

export const PixelBook = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [showCoin, setShowCoin] = useState(false);
  const [initialAnimation, setInitialAnimation] = useState(true);

  // Trigger coin animation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCoin(true);
    }, 500);
    
    // Reset initial animation state after it completes
    const resetTimer = setTimeout(() => {
      setInitialAnimation(false);
      setShowCoin(false);
    }, 3000);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(resetTimer);
    };
  }, []);

  // Show coin on hover
  useEffect(() => {
    if (isHovered && !initialAnimation) {
      setShowCoin(true);
    } else if (!isHovered && !initialAnimation) {
      const timer = setTimeout(() => setShowCoin(false), 800);
      return () => clearTimeout(timer);
    }
  }, [isHovered, initialAnimation]);

  return (
    <div 
      className="relative w-full h-full flex items-center justify-center cursor-pointer animate-float"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated Ethereum Coin */}
      <div 
        className={`absolute z-10 transition-all duration-700 ease-out ${
          showCoin 
            ? 'opacity-100 scale-100' 
            : 'opacity-0 scale-50'
        }`}
        style={{
          top: showCoin ? '5%' : '30%',
          left: '50%',
          transform: `translateX(-50%) ${showCoin ? 'translateY(0) rotateY(360deg)' : 'translateY(50px) rotateY(0deg)'}`,
          transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        <svg 
          width="80" 
          height="80" 
          viewBox="0 0 100 100"
          className="drop-shadow-2xl"
          style={{
            filter: 'drop-shadow(0 10px 30px rgba(255, 140, 0, 0.6))',
            animation: showCoin ? 'ethSpin 2s ease-in-out infinite, ethFloat 1.5s ease-in-out infinite' : 'none',
          }}
        >
          {/* Coin outer ring - 3D effect */}
          <ellipse cx="50" cy="50" rx="45" ry="45" fill="url(#coinGradient)" />
          <ellipse cx="50" cy="50" rx="40" ry="40" fill="url(#coinInnerGradient)" />
          
          {/* Ethereum diamond logo */}
          <g transform="translate(50, 50) scale(0.8)">
            {/* Top half of diamond */}
            <polygon 
              points="0,-35 -20,0 0,-10 20,0" 
              fill="#fff"
              opacity="0.95"
            />
            {/* Bottom half of diamond */}
            <polygon 
              points="0,35 -20,0 0,10 20,0" 
              fill="#fff"
              opacity="0.75"
            />
            {/* Left shadow */}
            <polygon 
              points="-20,0 0,-10 0,10" 
              fill="#ddd"
              opacity="0.9"
            />
            {/* Right highlight */}
            <polygon 
              points="20,0 0,-10 0,10" 
              fill="#fff"
              opacity="1"
            />
          </g>
          
          {/* Shine effect */}
          <ellipse cx="35" cy="35" rx="15" ry="10" fill="white" opacity="0.3" transform="rotate(-30 35 35)" />
          
          <defs>
            <linearGradient id="coinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFD700" />
              <stop offset="30%" stopColor="#FFA500" />
              <stop offset="70%" stopColor="#FF8C00" />
              <stop offset="100%" stopColor="#FF6B00" />
            </linearGradient>
            <linearGradient id="coinInnerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF9500" />
              <stop offset="50%" stopColor="#FF7B00" />
              <stop offset="100%" stopColor="#E66A00" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Sparkles around coin */}
        {showCoin && (
          <div className="absolute inset-0 pointer-events-none">
            <span className="absolute -top-2 -left-2 w-2 h-2 bg-yellow-400 rounded-full animate-ping" style={{ animationDelay: '0s' }} />
            <span className="absolute -top-2 -right-2 w-2 h-2 bg-orange-400 rounded-full animate-ping" style={{ animationDelay: '0.2s' }} />
            <span className="absolute -bottom-2 -left-2 w-2 h-2 bg-amber-400 rounded-full animate-ping" style={{ animationDelay: '0.4s' }} />
            <span className="absolute -bottom-2 -right-2 w-2 h-2 bg-yellow-300 rounded-full animate-ping" style={{ animationDelay: '0.6s' }} />
          </div>
        )}
      </div>

      <svg 
        viewBox="0 0 200 160" 
        className="w-full h-full pixel-art drop-shadow-2xl"
        style={{
          filter: "drop-shadow(0 20px 40px rgba(255, 140, 0, 0.4))",
          transform: isHovered ? 'scale(1.08)' : 'scale(1)',
          transition: 'transform 0.4s ease-out'
        }}
      >
        {/* Floating particles - colorful theme */}
        <g className="animate-pulse">
          <rect x="30" y="15" width="6" height="6" fill="#9B59B6" opacity="1" />
          <rect x="170" y="25" width="6" height="6" fill="#14B8A6" opacity="1" />
          <rect x="25" y="80" width="6" height="6" fill="#F472B6" opacity="1" />
          <rect x="175" y="90" width="6" height="6" fill="#FBBF24" opacity="1" />
          <rect x="50" y="140" width="6" height="6" fill="#22D3EE" opacity="1" />
          <rect x="150" y="145" width="6" height="6" fill="#E879F9" opacity="1" />
          <rect x="15" y="50" width="5" height="5" fill="#FF8C00" opacity="1" />
          <rect x="185" y="60" width="5" height="5" fill="#10B981" opacity="1" />
          <rect x="40" y="110" width="5" height="5" fill="#EC4899" opacity="1" />
          <rect x="160" y="120" width="5" height="5" fill="#8E44AD" opacity="1" />
        </g>

        {/* Book base/cover - dark brown */}
        <g style={{ 
          transform: isHovered ? 'translateY(-10px)' : 'translateY(0)', 
          transition: 'transform 0.5s ease-in-out' 
        }}>
          {/* Bottom cover shadow */}
          <polygon 
            points="35,130 100,125 165,130 165,135 100,140 35,135" 
            fill="#2A1507"
          />
          
          {/* Book spine base */}
          <rect x="96" y="45" width="8" height="85" fill="#3D2817" />
          
          {/* Left page stack (multiple pages effect) */}
          <polygon 
            points="35,50 96,45 96,125 35,130" 
            fill="#4A3828"
          />
          
          {/* Right page stack */}
          <polygon 
            points="104,45 165,50 165,130 104,125" 
            fill="#4A3828"
          />
          
          {/* Left open page - cream/beige with curve - ANIMATED */}
          <path 
            d={isHovered 
              ? "M 30,50 Q 55,40 96,48 L 96,120 Q 55,108 30,122 Z"
              : "M 40,52 Q 68,48 96,50 L 96,120 Q 68,118 40,122 Z"
            }
            fill="#F5E6D3"
            style={{
              transition: 'd 0.6s ease-in-out, transform 0.6s ease-in-out',
              transform: isHovered ? 'rotateY(-25deg)' : 'rotateY(0deg)',
              transformOrigin: '96px 85px'
            }}
          />
          
          {/* Right open page - cream/beige with curve - ANIMATED */}
          <path 
            d={isHovered 
              ? "M 104,48 Q 145,40 170,50 L 170,122 Q 145,108 104,120 Z"
              : "M 104,50 Q 132,48 160,52 L 160,122 Q 132,118 104,120 Z"
            }
            fill="#F5E6D3"
            style={{
              transition: 'd 0.6s ease-in-out, transform 0.6s ease-in-out',
              transform: isHovered ? 'rotateY(25deg)' : 'rotateY(0deg)',
              transformOrigin: '104px 85px'
            }}
          />
          
          {/* Animated flipping pages */}
          {isHovered && (
            <>
              {/* Page 1 - flipping left */}
              <path 
                d="M 34,51 Q 60,43 96,49 L 96,119 Q 60,110 34,121 Z" 
                fill="#EBE0D0"
                className="page-flip-1"
              />
              {/* Page 2 - flipping right */}
              <path 
                d="M 104,49 Q 140,43 166,51 L 166,121 Q 140,110 104,119 Z" 
                fill="#EBE0D0"
                className="page-flip-2"
              />
              {/* Page 3 - inner left */}
              <path 
                d="M 38,52 Q 65,45 96,50 L 96,118 Q 65,112 38,120 Z" 
                fill="#E5DAC8"
                className="page-flip-3"
              />
              {/* Page 4 - inner right */}
              <path 
                d="M 104,50 Q 135,45 162,52 L 162,120 Q 135,112 104,118 Z" 
                fill="#E5DAC8"
                className="page-flip-4"
              />
              {/* Page 5 - extra depth */}
              <path 
                d="M 42,53 Q 68,47 96,51 L 96,117 Q 68,113 42,119 Z" 
                fill="#DFD4C2"
                className="page-flip-5"
              />
              <path 
                d="M 104,51 Q 132,47 158,53 L 158,119 Q 132,113 104,117 Z" 
                fill="#DFD4C2"
                className="page-flip-6"
              />
            </>
          )}
          
          {/* Page inner shadow - left */}
          <path 
            d="M 96,50 Q 85,55 85,85 Q 85,115 96,120" 
            fill="none"
            stroke="#D4C4B0"
            strokeWidth="2"
          />
          
          {/* Page inner shadow - right */}
          <path 
            d="M 104,50 Q 115,55 115,85 Q 115,115 104,120" 
            fill="none"
            stroke="#D4C4B0"
            strokeWidth="2"
          />
          
          {/* Text lines on left page - move with page */}
          <g 
            opacity={isHovered ? "0.9" : "0.6"} 
            style={{ 
              transition: 'all 0.5s ease-out',
              transform: isHovered ? 'translateX(-8px)' : 'translateX(0)'
            }}
          >
            <line x1="48" y1="58" x2="85" y2="56" stroke="#8B7355" strokeWidth="2" strokeLinecap="round" />
            <line x1="46" y1="68" x2="88" y2="66" stroke="#8B7355" strokeWidth="2" strokeLinecap="round" />
            <line x1="44" y1="78" x2="90" y2="76" stroke="#8B7355" strokeWidth="2" strokeLinecap="round" />
            <line x1="46" y1="88" x2="88" y2="86" stroke="#8B7355" strokeWidth="2" strokeLinecap="round" />
            <line x1="48" y1="98" x2="82" y2="96" stroke="#8B7355" strokeWidth="2" strokeLinecap="round" />
            <line x1="50" y1="108" x2="75" y2="106" stroke="#8B7355" strokeWidth="2" strokeLinecap="round" />
          </g>
          
          {/* Text lines on right page - move with page */}
          <g 
            opacity={isHovered ? "0.9" : "0.6"} 
            style={{ 
              transition: 'all 0.5s ease-out',
              transform: isHovered ? 'translateX(8px)' : 'translateX(0)'
            }}
          >
            <line x1="112" y1="56" x2="152" y2="58" stroke="#8B7355" strokeWidth="2" strokeLinecap="round" />
            <line x1="110" y1="66" x2="154" y2="68" stroke="#8B7355" strokeWidth="2" strokeLinecap="round" />
            <line x1="108" y1="76" x2="156" y2="78" stroke="#8B7355" strokeWidth="2" strokeLinecap="round" />
            <line x1="110" y1="86" x2="154" y2="88" stroke="#8B7355" strokeWidth="2" strokeLinecap="round" />
            <line x1="112" y1="96" x2="150" y2="98" stroke="#8B7355" strokeWidth="2" strokeLinecap="round" />
            <line x1="114" y1="106" x2="140" y2="108" stroke="#8B7355" strokeWidth="2" strokeLinecap="round" />
          </g>
          
          {/* Page edges detail - stacked pages effect */}
          <g opacity="0.4">
            <line x1="38" y1="128" x2="96" y2="123" stroke="#C4B49A" strokeWidth="1" />
            <line x1="37" y1="126" x2="96" y2="121" stroke="#C4B49A" strokeWidth="1" />
            <line x1="104" y1="123" x2="162" y2="128" stroke="#C4B49A" strokeWidth="1" />
            <line x1="104" y1="121" x2="163" y2="126" stroke="#C4B49A" strokeWidth="1" />
          </g>
          
          {/* Book binding detail */}
          <line x1="100" y1="45" x2="100" y2="125" stroke="#2A1507" strokeWidth="2" />
          
          {/* Highlight on spine */}
          <line x1="98" y1="48" x2="98" y2="122" stroke="#5A4837" strokeWidth="1" opacity="0.5" />
        </g>
        
        {/* Glow effect - orange */}
        <ellipse cx="100" cy="140" rx="70" ry="10" fill="url(#bookGlow)" opacity={isHovered ? "0.9" : "0.5"} style={{ transition: 'opacity 0.3s' }} />
        
        <defs>
          <radialGradient id="bookGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FF8C00" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#FF8C00" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
      
      <style>{`
        @keyframes ethSpin {
          0%, 100% { transform: rotateY(0deg); }
          50% { transform: rotateY(15deg); }
        }
        @keyframes ethFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .page-flip-1 {
          animation: pageFlipLeft 1.2s ease-in-out infinite;
          transform-origin: 96px 85px;
        }
        .page-flip-2 {
          animation: pageFlipRight 1.2s ease-in-out infinite;
          animation-delay: 0.1s;
          transform-origin: 104px 85px;
        }
        .page-flip-3 {
          animation: pageFlipLeft 1.2s ease-in-out infinite;
          animation-delay: 0.2s;
          transform-origin: 96px 85px;
        }
        .page-flip-4 {
          animation: pageFlipRight 1.2s ease-in-out infinite;
          animation-delay: 0.3s;
          transform-origin: 104px 85px;
        }
        .page-flip-5 {
          animation: pageFlipLeft 1.2s ease-in-out infinite;
          animation-delay: 0.4s;
          transform-origin: 96px 85px;
        }
        .page-flip-6 {
          animation: pageFlipRight 1.2s ease-in-out infinite;
          animation-delay: 0.5s;
          transform-origin: 104px 85px;
        }
        @keyframes pageFlipLeft {
          0%, 100% { opacity: 0.6; transform: rotateY(0deg) translateX(0); }
          50% { opacity: 1; transform: rotateY(-20deg) translateX(-5px); }
        }
        @keyframes pageFlipRight {
          0%, 100% { opacity: 0.6; transform: rotateY(0deg) translateX(0); }
          50% { opacity: 1; transform: rotateY(20deg) translateX(5px); }
        }
      `}</style>
    </div>
  );
};