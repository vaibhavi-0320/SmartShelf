import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Coins } from "lucide-react";

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  price: number;
  coverColor: string;
  description: string;
  onClick?: () => void;
}

export const BookCard = ({
  title,
  author,
  price,
  coverColor,
  description,
  onClick,
}: BookCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group cursor-pointer perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* 3D Book Container */}
      <div
        className={`relative w-full h-64 transition-all duration-500 preserve-3d ${
          isHovered ? "rotate-y-[-15deg] translate-x-2" : ""
        }`}
        style={{
          transformStyle: "preserve-3d",
          transform: isHovered ? "rotateY(-15deg) translateX(8px)" : "rotateY(0deg)",
        }}
      >
        {/* Book Cover (Front) */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${coverColor} rounded-r-lg rounded-l-sm border-l-8 border-foreground/20 shadow-xl`}
          style={{
            transform: "translateZ(20px)",
            backfaceVisibility: "hidden",
          }}
        >
          <div className="absolute inset-0 p-4 flex flex-col justify-between">
            <div className="space-y-2">
              <h3 className="font-pixel text-xs text-foreground line-clamp-2 leading-relaxed">
                {title}
              </h3>
              <p className="font-retro text-sm text-foreground/80">{author}</p>
            </div>
            
            <div className="space-y-2">
              <p className="font-retro text-xs text-foreground/70 line-clamp-2">
                {description}
              </p>
              <div className="flex items-center gap-1 text-foreground font-pixel text-xs">
                <Coins className="w-4 h-4" />
                <span>{price} ETH</span>
              </div>
            </div>
          </div>
          
          {/* Spine highlight */}
          <div className="absolute left-0 top-0 bottom-0 w-2 bg-foreground/10 rounded-l-sm" />
        </div>

        {/* Book Spine */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r ${coverColor} border-y border-foreground/20`}
          style={{
            transform: "rotateY(90deg) translateZ(-3px) translateX(-12px)",
            transformOrigin: "left",
          }}
        />

        {/* Book Pages (Side) */}
        <div
          className="absolute right-0 top-1 bottom-1 w-4 bg-gradient-to-b from-foreground/90 via-foreground/80 to-foreground/70 rounded-r-sm"
          style={{
            transform: "translateZ(0px)",
          }}
        >
          {/* Page lines */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="w-full h-px bg-muted/50"
              style={{ marginTop: `${i * 12 + 10}%` }}
            />
          ))}
        </div>
      </div>

      {/* Buy Button */}
      <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Button
          size="sm"
          className="w-full font-pixel text-xs"
          onClick={(e) => {
            e.stopPropagation();
            onClick?.();
          }}
        >
          View Book
        </Button>
      </div>
    </div>
  );
};
