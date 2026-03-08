import { useState } from "react";
import { ShoppingCart, BookOpen, Download, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InteractiveBookProps {
  title: string;
  author: string;
  coverUrl?: string;
  pdfUrl?: string;
  price: number;
  description?: string;
  authorNote?: string;
  onPurchase?: () => void;
  isPurchasing?: boolean;
  isOwned?: boolean;
}

export const InteractiveBook = ({
  title,
  author,
  coverUrl,
  pdfUrl,
  price,
  description,
  authorNote,
  onPurchase,
  isPurchasing = false,
  isOwned = false,
}: InteractiveBookProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDownload = () => {
    if (pdfUrl) {
      window.open(pdfUrl, "_blank");
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* 3D Book Container */}
      <div
        className="relative cursor-pointer group"
        style={{ perspective: "1200px" }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Book Wrapper */}
        <div
          className="relative transition-transform duration-700 ease-in-out"
          style={{
            transformStyle: "preserve-3d",
            width: "220px",
            height: "320px",
          }}
        >
          {/* Front Cover */}
          <div
            className="absolute inset-0 rounded-r-md shadow-2xl transition-all duration-700 ease-in-out"
            style={{
              transformStyle: "preserve-3d",
              transformOrigin: "left center",
              transform: isOpen ? "rotateY(-160deg)" : "rotateY(0deg)",
              backfaceVisibility: "hidden",
              zIndex: isOpen ? 0 : 10,
            }}
          >
            {/* Cover Image */}
            <div
              className="w-full h-full rounded-r-md overflow-hidden border-2 border-border/50"
              style={{
                boxShadow: isOpen
                  ? "none"
                  : "4px 4px 20px rgba(0,0,0,0.5), inset -2px 0 5px rgba(255,255,255,0.1)",
              }}
            >
              <img
                src={coverUrl}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Spine effect */}
            <div
              className="absolute left-0 top-0 w-3 h-full bg-gradient-to-r from-background/80 to-transparent"
              style={{
                transform: "translateZ(-1px)",
              }}
            />
          </div>

          {/* Back of Front Cover (visible when open) */}
          <div
            className="absolute inset-0 rounded-l-md bg-gradient-to-br from-muted to-muted/80 transition-all duration-700"
            style={{
              transformStyle: "preserve-3d",
              transformOrigin: "left center",
              backfaceVisibility: "hidden",
              transform: isOpen ? "rotateY(20deg)" : "rotateY(180deg)",
              zIndex: isOpen ? 10 : 0,
            }}
          >
            <div className="w-full h-full p-4 flex flex-col justify-center items-center text-center">
              <BookOpen className="w-12 h-12 text-primary mb-4" />
              <p className="text-sm text-muted-foreground">Tap to close</p>
            </div>
          </div>

          {/* Pages (visible when book is open) */}
          <div
            className="absolute rounded-r-md bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-100 dark:to-amber-200 transition-opacity duration-500"
            style={{
              left: "6px",
              top: "4px",
              width: "calc(100% - 6px)",
              height: "calc(100% - 8px)",
              opacity: isOpen ? 1 : 0,
              boxShadow: "inset 2px 0 5px rgba(0,0,0,0.1)",
            }}
          >
            <div className="p-3 h-full flex flex-col overflow-hidden">
              <h4 className="font-bold text-foreground/90 text-sm mb-1 line-clamp-2">{title}</h4>
              <p className="text-xs text-muted-foreground mb-2">by {author}</p>
              
              {/* Price Display */}
              <div className="flex items-center gap-1 mb-2 py-1 px-2 bg-primary/10 rounded-md">
                <span className="text-sm font-black text-primary">{price} ETH</span>
              </div>
              
              <div className="flex-1 overflow-y-auto space-y-2 text-foreground/80">
                {description && (
                  <p className="text-[10px] leading-relaxed">
                    {description}
                  </p>
                )}
                
                {/* Author's Note */}
                {authorNote && (
                  <div className="mt-2 p-2 bg-amber-200/50 rounded-md border-l-2 border-primary">
                    <div className="flex items-center gap-1 mb-1">
                      <Sparkles className="w-3 h-3 text-amber-600" />
                      <span className="text-[10px] font-bold text-amber-800">Author&apos;s Note</span>
                    </div>
                    <p className="text-[9px] text-amber-900 leading-relaxed italic">
                      {authorNote}
                    </p>
                  </div>
                )}
              </div>
              
              {isOwned && pdfUrl && (
                <Button
                  size="sm"
                  variant="outline"
                  className="mt-2 w-full text-xs"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownload();
                  }}
                >
                  <Download className="w-3 h-3 mr-1" />
                  Read PDF
                </Button>
              )}
            </div>
          </div>

          {/* Back Cover */}
          <div
            className="absolute inset-0 rounded-l-md bg-gradient-to-br from-primary/80 to-secondary/80 shadow-xl"
            style={{
              transform: "translateZ(-20px)",
              boxShadow: "-4px 4px 15px rgba(0,0,0,0.3)",
            }}
          >
            <div className="w-full h-full p-4 flex flex-col justify-end">
              <p className="text-xs text-primary-foreground/80">NFT Book</p>
            </div>
          </div>

          {/* Page edges effect */}
          <div
            className="absolute bg-gradient-to-r from-amber-100 to-amber-200 transition-opacity duration-500"
            style={{
              right: "-4px",
              top: "8px",
              width: "8px",
              height: "calc(100% - 16px)",
              borderRadius: "0 2px 2px 0",
              opacity: isOpen ? 1 : 0.3,
              boxShadow: "2px 0 4px rgba(0,0,0,0.1)",
            }}
          />
        </div>

        {/* Hover instruction */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Click to {isOpen ? "close" : "open"}
        </div>
      </div>

      {/* Book Info */}
      <div className="text-center space-y-2 max-w-[250px]">
        <h3 className="font-bold text-lg leading-tight">{title}</h3>
        <p className="text-sm text-muted-foreground">by {author}</p>
        
        {!isOwned && (
          <div className="flex items-center justify-center gap-4 pt-2">
            <span className="text-2xl font-black text-primary">{price} ETH</span>
            <Button
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onPurchase?.();
              }}
              disabled={isPurchasing}
              className="group/btn"
            >
              {isPurchasing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4 mr-1 group-hover/btn:scale-110 transition-transform" />
                  Buy NFT
                </>
              )}
            </Button>
          </div>
        )}

        {isOwned && (
          <div className="flex items-center justify-center gap-2 text-emerald-500">
            <BookOpen className="w-4 h-4" />
            <span className="text-sm font-medium">Owned</span>
          </div>
        )}
      </div>
    </div>
  );
};
