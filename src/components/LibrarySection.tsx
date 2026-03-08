import { useState, useEffect } from "react";
import { Search, ShoppingCart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAccount, useSendTransaction } from "wagmi";
import { sepolia } from "wagmi/chains";
import { parseEther } from "viem";
import { useToast } from "@/hooks/use-toast";

interface Book {
  id: string;
  token_id: string;
  title: string;
  author: string;
  price_eth: number;
  description: string | null;
  cover_image_url: string | null;
  owner_address: string;
}

export const LibrarySection = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const { address, isConnected } = useAccount();
  const { sendTransaction, isPending } = useSendTransaction();
  const { toast } = useToast();
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const { data, error } = await supabase
        .from("books")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setBooks(data || []);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async (book: Book) => {
    if (!isConnected || !address) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your MetaMask wallet to purchase books",
        variant: "destructive",
      });
      return;
    }

    try {
      const to = book.owner_address;
      toast({
        title: "Confirm in MetaMask",
        description: `Sending ${book.price_eth} SepoliaETH to ${to.slice(0, 6)}...${to.slice(-4)}`,
      });

      // Send ETH to book owner
      sendTransaction({
        to: to as `0x${string}`,
        value: parseEther(book.price_eth.toString()),
        chainId: sepolia.id,
      });

      // Record in database
      await supabase.from("user_books").insert({
        user_wallet: address.toLowerCase(),
        book_id: book.id,
      });

      toast({
        title: "Purchase successful!",
        description: `You now own ${book.title} NFT`,
      });
    } catch (error) {
      console.error("Error purchasing book:", error);
      toast({
        title: "Purchase failed",
        description: "There was an error processing your purchase",
        variant: "destructive",
      });
    }
  };

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const colors = [
    "from-primary to-secondary",
    "from-secondary to-accent",
    "from-accent to-primary",
    "from-primary to-accent",
    "from-secondary to-primary",
    "from-accent to-secondary",
  ];

  return (
    <section id="library" className="min-h-screen py-20 px-4 relative">
      <div className="dot-pattern absolute inset-0 opacity-30" />
      
      <div className="container mx-auto relative z-10 max-w-7xl">
        <div className="space-y-12 animate-slide-up">
          <div className="space-y-6">
            <h2 className="text-6xl md:text-7xl font-black text-foreground">NFT LIBRARY</h2>
            <p className="text-muted-foreground text-lg">Decentralized books secured on Ethereum blockchain</p>
            
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search books..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-14 bg-input border-2 border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="cyber-card p-6 space-y-4 animate-pulse">
                  <div className="aspect-square bg-muted rounded-lg"></div>
                  <div className="h-6 bg-muted rounded"></div>
                  <div className="h-4 bg-muted rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : filteredBooks.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">No books found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredBooks.map((book, index) => (
                <div
                  key={book.id}
                  className="cyber-card p-6 space-y-4 group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-foreground">{book.title}</h3>
                    <p className="text-sm text-muted-foreground">BY {book.author}</p>
                  </div>
                  
                  <div className={`aspect-square rounded-lg bg-gradient-to-br ${colors[index % colors.length]} pixel-art flex items-center justify-center border-2 border-border group-hover:scale-105 transition-transform duration-300`}>
                    {book.cover_image_url ? (
                      <img src={book.cover_image_url} alt={book.title} className="w-full h-full object-cover rounded-lg" />
                    ) : (
                      <span className="text-4xl font-black text-primary-foreground drop-shadow-lg">{book.title.slice(0, 4)}</span>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    {book.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2">{book.description}</p>
                    )}
<div className="flex items-center justify-between">
                      <p className="text-xl font-bold text-teal-500">{book.price_eth} ETH</p>
                      <Button 
                        className="bg-primary hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-teal-500 text-primary-foreground transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30"
                        onClick={() => handlePurchase(book)}
                        disabled={isPending}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        {isPending ? "..." : "Buy"}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
