import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { Header } from "@/components/Header";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { FloatingEthCoins } from "@/components/FloatingEthCoins";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Book, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface OwnedBook {
  id: string;
  title: string;
  author: string;
  cover_image_url: string | null;
  purchased_at: string;
  token_id: string;
}

export default function MyLibrary() {
  const { address, isConnected } = useAccount();
  const navigate = useNavigate();
  const [ownedBooks, setOwnedBooks] = useState<OwnedBook[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isConnected) {
      navigate("/");
      return;
    }
    fetchOwnedBooks();
  }, [address, isConnected]);

  const fetchOwnedBooks = async () => {
    if (!address) return;
    
    try {
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
            token_id
          )
        `)
        .eq("user_wallet", address.toLowerCase());

      if (error) throw error;

      const formattedBooks = data?.map((item: any) => ({
        id: item.books.id,
        title: item.books.title,
        author: item.books.author,
        cover_image_url: item.books.cover_image_url,
        purchased_at: item.purchased_at,
        token_id: item.books.token_id,
      })) || [];

      setOwnedBooks(formattedBooks);
    } catch (error) {
      console.error("Error fetching owned books:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background text-foreground min-h-screen relative">
      <AnimatedBackground />
      <FloatingEthCoins />
      <div className="blue-glow fixed inset-0 pointer-events-none z-0" />
      <Header />
      <main className="pt-20 px-4 relative z-10">
        <div className="container mx-auto max-w-7xl">
          <div className="space-y-8 animate-slide-up">
            <div>
              <h1 className="text-6xl md:text-7xl font-black text-foreground mb-2">MY LIBRARY</h1>
              <p className="text-muted-foreground">Your owned NFT books collection</p>
            </div>

            {!isConnected ? (
              <div className="text-center py-20">
                <Book className="w-20 h-20 mx-auto mb-4 text-muted-foreground" />
                <p className="text-xl text-muted-foreground">Please connect your wallet to view your library</p>
              </div>
            ) : loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="cyber-card p-6 space-y-4 animate-pulse">
                    <div className="aspect-square bg-muted rounded-lg"></div>
                    <div className="h-6 bg-muted rounded"></div>
                    <div className="h-4 bg-muted rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : ownedBooks.length === 0 ? (
              <div className="text-center py-20">
                <Book className="w-20 h-20 mx-auto mb-4 text-muted-foreground" />
                <p className="text-xl text-muted-foreground mb-4">You don't own any books yet</p>
                <Button onClick={() => navigate("/")}>Browse Library</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {ownedBooks.map((book) => (
                  <div key={book.id} className="cyber-card p-6 space-y-4 group">
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-foreground">{book.title}</h3>
                      <p className="text-sm text-muted-foreground">BY {book.author}</p>
                    </div>
                    
                    <div className="aspect-square rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center border-2 border-border group-hover:scale-105 transition-transform duration-300">
                      {book.cover_image_url ? (
                        <img src={book.cover_image_url} alt={book.title} className="w-full h-full object-cover rounded-lg" />
                      ) : (
                        <span className="text-4xl font-black text-white drop-shadow-lg">{book.title.slice(0, 4)}</span>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        NFT #{book.token_id}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Purchased: {new Date(book.purchased_at).toLocaleDateString()}
                      </p>
                      <Button className="w-full" variant="default">
                        <Download className="w-4 h-4 mr-2" />
                        READ / DOWNLOAD
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
