export const PixelBook = () => {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full pixel-art">
      {/* Floating colored pixels around the book */}
      <rect x="85" y="15" width="3" height="3" fill="#00CED1" opacity="0.8" />
      <rect x="110" y="20" width="3" height="3" fill="#FF6B35" opacity="0.8" />
      <rect x="165" y="30" width="3" height="3" fill="#00CED1" opacity="0.8" />
      <rect x="30" y="35" width="3" height="3" fill="#FF1493" opacity="0.8" />
      <rect x="170" y="45" width="3" height="3" fill="#FF6B35" opacity="0.8" />
      
      <rect x="25" y="75" width="3" height="3" fill="#00CED1" opacity="0.8" />
      <rect x="175" y="85" width="3" height="3" fill="#FF1493" opacity="0.8" />
      <rect x="20" y="120" width="3" height="3" fill="#FF6B35" opacity="0.8" />
      <rect x="180" y="130" width="3" height="3" fill="#00CED1" opacity="0.8" />
      
      <rect x="35" y="165" width="3" height="3" fill="#FF1493" opacity="0.8" />
      <rect x="90" y="175" width="3" height="3" fill="#00CED1" opacity="0.8" />
      <rect x="115" y="180" width="3" height="3" fill="#FF6B35" opacity="0.8" />
      <rect x="160" y="170" width="3" height="3" fill="#FF1493" opacity="0.8" />

      {/* Cyan glow border */}
      <rect x="52" y="52" width="96" height="96" fill="none" stroke="#00CED1" strokeWidth="3" />
      <rect x="56" y="56" width="88" height="88" fill="none" stroke="#00CED1" strokeWidth="2" opacity="0.5" />
      
      {/* Orange inner glow */}
      <rect x="60" y="60" width="80" height="80" fill="none" stroke="#FF6B35" strokeWidth="2" opacity="0.6" />
      
      {/* Book spine - dark brown */}
      <rect x="98" y="68" width="4" height="64" fill="#4A2511" />
      
      {/* Left page - beige/tan */}
      <rect x="68" y="68" width="30" height="64" fill="#D4A574" />
      <rect x="70" y="70" width="26" height="60" fill="#F5DEB3" />
      
      {/* Right page - beige/tan */}
      <rect x="102" y="68" width="30" height="64" fill="#D4A574" />
      <rect x="104" y="70" width="26" height="60" fill="#F5DEB3" />
      
      {/* Text lines on left page */}
      <rect x="74" y="76" width="16" height="1" fill="#8B4513" />
      <rect x="74" y="82" width="16" height="1" fill="#8B4513" />
      <rect x="74" y="88" width="16" height="1" fill="#8B4513" />
      <rect x="74" y="94" width="16" height="1" fill="#8B4513" />
      <rect x="74" y="100" width="16" height="1" fill="#8B4513" />
      <rect x="74" y="106" width="16" height="1" fill="#8B4513" />
      <rect x="74" y="112" width="16" height="1" fill="#8B4513" />
      <rect x="74" y="118" width="16" height="1" fill="#8B4513" />
      <rect x="74" y="124" width="12" height="1" fill="#8B4513" />
      
      {/* Text lines on right page */}
      <rect x="108" y="76" width="16" height="1" fill="#8B4513" />
      <rect x="108" y="82" width="16" height="1" fill="#8B4513" />
      <rect x="108" y="88" width="16" height="1" fill="#8B4513" />
      <rect x="108" y="94" width="16" height="1" fill="#8B4513" />
      <rect x="108" y="100" width="16" height="1" fill="#8B4513" />
      <rect x="108" y="106" width="16" height="1" fill="#8B4513" />
      <rect x="108" y="112" width="16" height="1" fill="#8B4513" />
      <rect x="108" y="118" width="16" height="1" fill="#8B4513" />
      <rect x="108" y="124" width="12" height="1" fill="#8B4513" />
      
      {/* Book shadow/depth on spine */}
      <rect x="98" y="68" width="2" height="64" fill="#2A1507" opacity="0.5" />
      <rect x="100" y="68" width="2" height="64" fill="#2A1507" opacity="0.3" />
    </svg>
  );
};
