import { useEffect, useRef } from "react";

interface EthCoin {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
}

export const FloatingEthCoins = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 3;
    };
    
    updateCanvasSize();

    const coins: EthCoin[] = [];
    const numCoins = 40;

    // Colorful palette - pink, orange, teal
    const colors = [
      { primary: "#EC4899", secondary: "#F472B6", glow: "#EC4899" }, // Pink
      { primary: "#FF8C00", secondary: "#FFA500", glow: "#FF8C00" }, // Orange
      { primary: "#14B8A6", secondary: "#2DD4BF", glow: "#14B8A6" }, // Teal
    ];

    // Initialize coins
    for (let i = 0; i < numCoins; i++) {
      coins.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 6 + 3,
        speedY: Math.random() * 0.4 + 0.15,
        speedX: Math.random() * 0.3 - 0.15,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: Math.random() * 0.02 - 0.01,
        opacity: Math.random() * 0.4 + 0.2,
      });
    }

    const drawEthSymbol = (x: number, y: number, size: number, rotation: number, opacity: number, colorIndex: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = opacity;

      const color = colors[colorIndex % colors.length];

      // Draw diamond/ETH shape
      ctx.beginPath();
      ctx.moveTo(0, -size);
      ctx.lineTo(size * 0.6, 0);
      ctx.lineTo(0, size * 0.4);
      ctx.lineTo(-size * 0.6, 0);
      ctx.closePath();

      // Gradient fill
      const gradient = ctx.createLinearGradient(0, -size, 0, size);
      gradient.addColorStop(0, color.primary);
      gradient.addColorStop(0.5, color.secondary);
      gradient.addColorStop(1, color.primary);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Bottom part
      ctx.beginPath();
      ctx.moveTo(0, size * 0.4);
      ctx.lineTo(size * 0.6, 0);
      ctx.lineTo(0, size);
      ctx.lineTo(-size * 0.6, 0);
      ctx.closePath();
      
      const gradient2 = ctx.createLinearGradient(0, 0, 0, size);
      gradient2.addColorStop(0, color.secondary);
      gradient2.addColorStop(1, color.primary);
      ctx.fillStyle = gradient2;
      ctx.fill();

      // Glow effect
      ctx.shadowColor = color.glow;
      ctx.shadowBlur = size * 2;

      ctx.restore();
    };

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      coins.forEach((coin, index) => {
        drawEthSymbol(coin.x, coin.y, coin.size, coin.rotation, coin.opacity, index);

        // Update position
        coin.y -= coin.speedY;
        coin.x += coin.speedX;
        coin.rotation += coin.rotationSpeed;

        // Reset when off screen
        if (coin.y < -20) {
          coin.y = canvas.height + 20;
          coin.x = Math.random() * canvas.width;
        }
        if (coin.x < -20) coin.x = canvas.width + 20;
        if (coin.x > canvas.width + 20) coin.x = -20;
      });

      requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener("resize", updateCanvasSize);
    return () => window.removeEventListener("resize", updateCanvasSize);
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 opacity-40 pointer-events-none z-0" 
    />
  );
};