import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const books = [
  { id: 1, title: "THE ETHER SAGA", author: "ANNA KAI", price: "0.05 ETH", color: "from-pink-500 to-purple-500" },
  { id: 2, title: "THE ETHER SAGA", author: "ANNA KAI", price: "0.05 ETH", color: "from-cyan-500 to-blue-500" },
  { id: 3, title: "FRCAL", author: "ANNA KAI", price: "0.05 ETH", color: "from-pink-500 to-pink-600" },
  { id: 4, title: "THE TITLE", author: "ANNA KAI", price: "0.05 ETH", color: "from-pink-500 to-rose-500" },
  { id: 5, title: "MILK", author: "ANNA KAI", price: "0.05 ETH", color: "from-cyan-400 to-cyan-500" },
  { id: 6, title: "STER1€CS", author: "ANNA KAI", price: "0.05 ETH", color: "from-purple-500 to-blue-500" },
];

export const LibrarySection = () => {
  return (
    <section id="library" className="min-h-screen py-20 px-4 relative">
      <div className="dot-pattern absolute inset-0 opacity-30" />
      
      <div className="container mx-auto relative z-10 max-w-7xl">
        <div className="space-y-12 animate-slide-up">
          <div className="space-y-6">
            <h2 className="text-6xl md:text-7xl font-black text-foreground">LIBRARY</h2>
            
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search books..."
                className="pl-12 h-14 bg-input border-2 border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {books.map((book, index) => (
              <div
                key={book.id}
                className="cyber-card p-6 space-y-4 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-foreground">{book.title}</h3>
                  <p className="text-sm text-muted-foreground">BY {book.author}</p>
                </div>
                
                <div className={`aspect-square rounded-lg bg-gradient-to-br ${book.color} pixel-art flex items-center justify-center border-2 border-border group-hover:scale-105 transition-transform duration-300`}>
                  <span className="text-4xl font-black text-white drop-shadow-lg">{book.title.slice(0, 4)}</span>
                </div>
                
                <div className="space-y-2">
                  <p className="text-xl font-bold text-foreground">{book.price}</p>
                  <Button className="w-full bg-background border-2 border-border hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                    Buy / Access
                  </Button>
                </div>
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
    </section>
  );
};
