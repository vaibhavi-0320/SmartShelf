import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAccount } from "wagmi";
import { useAuth } from "@/contexts/AuthContext";
import { Header } from "@/components/Header";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { FloatingEthCoins } from "@/components/FloatingEthCoins";
import { Button } from "@/components/ui/button";
import { BookOpen, Trash2, Library, Clock, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface OwnedBook {
  id: string;
  title: string;
  author: string;
  cover_image_url: string | null;
  purchased_at: string;
  token_id: string;
  description: string | null;
  ipfs_hash: string | null;
}

const ReaderPage = () => {
  const [ownedBooks, setOwnedBooks] = useState<OwnedBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState<OwnedBook | null>(null);
  const { address, isConnected } = useAccount();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (isConnected && address) {
      fetchOwnedBooks();
    } else {
      setLoading(false);
    }
  }, [isConnected, address]);

  const fetchOwnedBooks = async () => {
    if (!address) return;

    const { data, error } = await supabase
      .from("user_books")
      .select(`
        id,
        purchased_at,
        books (
          id,
          title,
          author,
          cover_image_url,
          token_id,
          description,
          ipfs_hash
        )
      `)
      .eq("user_wallet", address.toLowerCase());

    if (!error && data) {
      const formattedBooks = data
        .filter((item) => item.books)
        .map((item) => ({
          id: item.books!.id,
          title: item.books!.title,
          author: item.books!.author,
          cover_image_url: item.books!.cover_image_url,
          purchased_at: item.purchased_at,
          token_id: item.books!.token_id,
          description: item.books!.description,
          ipfs_hash: item.books!.ipfs_hash,
        }));
      setOwnedBooks(formattedBooks);
    }
    setLoading(false);
  };

  const gradients = [
    "from-primary/30 via-secondary/20 to-accent/30",
    "from-secondary/30 via-accent/20 to-primary/30",
    "from-accent/30 via-primary/20 to-secondary/30",
  ];

  const handleRead = (book: OwnedBook, e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    
    console.log("handleRead called for:", book.title);
    console.log("IPFS hash:", book.ipfs_hash);
    
    if (book.ipfs_hash) {
      const url = `https://ipfs.io/ipfs/${book.ipfs_hash}`;
      console.log("Opening URL:", url);
      
      const link = document.createElement("a");
      link.href = url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.log("No IPFS hash available for this book");
    }
  };

  const handleDelete = async (book: OwnedBook, e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    
    if (!address) return;

    const { error } = await supabase
      .from("user_books")
      .delete()
      .eq("book_id", book.id)
      .eq("user_wallet", address.toLowerCase());

    if (error) {
      toast({
        title: "Delete Failed",
        description: "Could not remove book from your library",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Book Removed",
        description: `"${book.title}" removed. You can now repurchase it!`,
      });
      // Refresh the list
      fetchOwnedBooks();
    }
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background relative">
        <AnimatedBackground />
        <FloatingEthCoins />
        <div className="blue-glow fixed inset-0 pointer-events-none z-0" />
        <Header />
        <div className="pt-24 flex flex-col items-center justify-center min-h-[70vh] px-4 relative z-10">
          <BookOpen className="w-20 h-20 text-muted-foreground mb-6 animate-float" />
          <h2 className="text-3xl font-bold mb-4">Connect Your Wallet</h2>
          <p className="text-muted-foreground text-center max-w-md mb-6">
            Connect your wallet to view your purchased books and start reading.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedBackground />
      <FloatingEthCoins />
      <div className="blue-glow fixed inset-0 pointer-events-none z-0" />
      <Header />
      
      <main className="pt-24 pb-12 px-4 relative z-10">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center space-y-4 mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-black">
              My <span className="text-primary glow-text">Reading</span> Room
            </h1>
            <p className="text-muted-foreground text-lg">
              Your personal collection of NFT books
            </p>
          </div>

{/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="cyber-card text-center hover:border-pink-500 transition-colors hover:shadow-lg hover:shadow-pink-500/20">
              <div className="w-14 h-14 rounded-full bg-pink-500/20 flex items-center justify-center mx-auto mb-3">
                <Library className="w-7 h-7 text-pink-500" />
              </div>
              <div className="text-3xl font-black text-pink-500">{ownedBooks.length}</div>
              <div className="text-muted-foreground text-sm">Books Owned</div>
            </div>
            <div className="cyber-card text-center hover:border-purple-500 transition-colors hover:shadow-lg hover:shadow-purple-500/20">
              <div className="w-14 h-14 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-3">
                <Clock className="w-7 h-7 text-purple-500" />
              </div>
              <div className="text-3xl font-black text-purple-500">0</div>
              <div className="text-muted-foreground text-sm">Hours Read</div>
            </div>
            <div className="cyber-card text-center hover:border-amber-500 transition-colors hover:shadow-lg hover:shadow-amber-500/20">
              <div className="w-14 h-14 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto mb-3">
                <Sparkles className="w-7 h-7 text-amber-500" />
              </div>
              <div className="text-3xl font-black text-amber-500">{ownedBooks.length}</div>
              <div className="text-muted-foreground text-sm">NFTs Collected</div>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="cyber-card h-80 animate-pulse">
                  <div className="h-40 bg-muted rounded-lg mb-4" />
                  <div className="space-y-2">
                    <div className="h-6 bg-muted rounded w-3/4" />
                    <div className="h-4 bg-muted rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : ownedBooks.length === 0 ? (
            <div className="text-center py-20">
              <BookOpen className="w-20 h-20 mx-auto text-muted-foreground mb-6 animate-float" />
              <h3 className="text-2xl font-bold mb-2">Your library is empty</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Start your collection by exploring our NFT library and purchasing your first book.
              </p>
              <Button size="lg" onClick={() => navigate("/library")}>
                <Library className="mr-2 w-5 h-5" />
                Browse Library
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ownedBooks.map((book, index) => (
                <div
                  key={book.id}
                  className="cyber-card group cursor-pointer animate-fade-in hover:-translate-y-2 transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => setSelectedBook(book)}
                >
                  {/* Book Cover */}
                  <div className={`relative h-48 rounded-lg mb-4 overflow-hidden bg-gradient-to-br ${gradients[index % gradients.length]}`}>
                    {book.cover_image_url ? (
                      <img
                        src={book.cover_image_url}
                        alt={book.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <BookOpen className="w-16 h-16 text-foreground/30" />
                      </div>
                    )}
                    
                    {/* NFT Badge */}
                    <div className="absolute top-2 right-2 bg-primary/90 text-primary-foreground text-xs px-2 py-1 rounded-full font-bold">
                      NFT #{book.token_id}
                    </div>
                  </div>

                  {/* Book Info */}
                  <div className="space-y-2">
                    <h3 className="font-bold text-lg line-clamp-1 group-hover:text-primary transition-colors">
                      {book.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">by {book.author}</p>
                    <p className="text-xs text-muted-foreground">
                      Purchased: {new Date(book.purchased_at).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 mt-4">
                    <Button 
                      className="flex-1" 
                      size="sm"
                      onClick={(e) => handleRead(book, e)}
                      disabled={!book.ipfs_hash}
                    >
                      <BookOpen className="w-4 h-4 mr-1" />
                      Read
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-red-500/50 text-red-500 hover:bg-red-500/10 hover:text-red-400"
                      onClick={(e) => handleDelete(book, e)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ReaderPage;
