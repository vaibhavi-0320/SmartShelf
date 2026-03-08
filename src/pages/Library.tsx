import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAccount, useSendTransaction, useWaitForTransactionReceipt, useBalance } from "wagmi";
import { sepolia } from "wagmi/chains";
import { parseEther, formatEther } from "viem";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/Header";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { FloatingEthCoins } from "@/components/FloatingEthCoins";
import { InteractiveBook } from "@/components/InteractiveBook";
import { WalletConnectionModal } from "@/components/WalletConnectionModal";
import { Search, BookOpen, ShoppingCart, Sparkles, Loader2 } from "lucide-react";

interface Book {
  id: string;
  token_id: string;
  title: string;
  author: string;
  price_eth: number;
  description: string | null;
  cover_image_url: string | null;
  owner_address: string;
  royalty_percentage: number | null;
  ipfs_hash: string | null;
}

const Library = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [purchasingBookId, setPurchasingBookId] = useState<string | null>(null);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(false);
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address, chainId: sepolia.id });
  const { sendTransaction, data: hash, isPending } = useSendTransaction();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Check if user is logged in but wallet not connected
  useEffect(() => {
    if (user && !isConnected) {
      // Always show wallet modal for new sessions (localStorage is cleared on sign out)
      const hasConnectedBefore = localStorage.getItem(`wallet_connected_${user.id}`);
      setIsFirstTimeUser(!hasConnectedBefore);
      setShowWalletModal(true);
    }
  }, [user, isConnected]);

  // Mark user as having connected before
  useEffect(() => {
    if (user && isConnected) {
      localStorage.setItem(`wallet_connected_${user.id}`, "true");
    }
  }, [user, isConnected]);

  useEffect(() => {
    fetchBooks();
  }, []);

  // Handle successful transaction confirmation
  useEffect(() => {
    if (isSuccess && hash && purchasingBookId) {
      completePurchase(purchasingBookId, hash);
    }
  }, [isSuccess, hash, purchasingBookId]);

  const fetchBooks = async () => {
    const { data, error } = await supabase
      .from("books")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error fetching books",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setBooks(data || []);
    }
    setLoading(false);
  };

  const completePurchase = async (bookId: string, transactionHash: string) => {
    const book = books.find(b => b.id === bookId);
    if (!book || !address) return;

    try {
      // Calculate royalty amount
      const royaltyPercentage = book.royalty_percentage || 10;
      const royaltyAmount = (book.price_eth * royaltyPercentage) / 100;
      const sellerAmount = book.price_eth - royaltyAmount;

      // Record transaction in database
      const { error: txError } = await supabase.from("transactions").insert({
        book_id: book.id,
        buyer_address: address.toLowerCase(),
        seller_address: book.owner_address.toLowerCase(),
        price_eth: book.price_eth,
        transaction_hash: transactionHash,
        status: "completed",
      });

      if (txError) {
        console.error("Error recording transaction:", txError);
      }

      // Add book to user's collection
      const { error: ownershipError } = await supabase.from("user_books").insert({
        user_wallet: address.toLowerCase(),
        book_id: book.id,
      });

      if (ownershipError) {
        console.error("Error recording ownership:", ownershipError);
      }

      // Update book owner in database
      await supabase
        .from("books")
        .update({ owner_address: address.toLowerCase() })
        .eq("id", book.id);

      toast({
        title: "Purchase successful!",
        description: `You now own "${book.title}". Royalty of ${royaltyAmount.toFixed(4)} ETH sent to original author.`,
      });

      // Refresh books list
      fetchBooks();
    } catch (error) {
      console.error("Error completing purchase:", error);
    } finally {
      setPurchasingBookId(null);
    }
  };

  const handlePurchase = async (book: Book) => {
    if (!isConnected || !address) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to purchase books",
        variant: "destructive",
      });
      return;
    }

    // Check balance before purchase
    const priceInWei = parseEther(book.price_eth.toString());
    if (!balance || balance.value < priceInWei) {
      const currentBalance = balance ? formatEther(balance.value) : "0";
      toast({
        title: "Insufficient Balance",
        description: `You need ${book.price_eth} SepoliaETH but only have ${parseFloat(currentBalance).toFixed(4)} SepoliaETH. Get test ETH from a Sepolia faucet.`,
        variant: "destructive",
      });
      return;
    }

    // Check if user already owns this book
    const { data: existingOwnership } = await supabase
      .from("user_books")
      .select("id")
      .eq("user_wallet", address.toLowerCase())
      .eq("book_id", book.id)
      .maybeSingle();

    if (existingOwnership) {
      toast({
        title: "Already owned",
        description: "You already own this book!",
        variant: "destructive",
      });
      return;
    }

    setPurchasingBookId(book.id);

    try {
      // Create pending transaction record
      await supabase.from("transactions").insert({
        book_id: book.id,
        buyer_address: address.toLowerCase(),
        seller_address: book.owner_address.toLowerCase(),
        price_eth: book.price_eth,
        transaction_hash: `pending-${Date.now()}`,
        status: "pending",
      });

      const to = book.owner_address;
      toast({
        title: "Confirm in MetaMask",
        description: `Sending ${book.price_eth} SepoliaETH to ${to.slice(0, 6)}...${to.slice(-4)}`,
      });

      // Execute ETH transfer to book owner
      sendTransaction({
        to: to as `0x${string}`,
        value: parseEther(book.price_eth.toString()),
        chainId: sepolia.id,
      });
    } catch (error) {
      console.error("Purchase error:", error);
      toast({
        title: "Purchase failed",
        description: "There was an error processing your purchase",
        variant: "destructive",
      });
      setPurchasingBookId(null);
    }
  };

  const isPurchasing = (bookId: string) => {
    return purchasingBookId === bookId && (isPending || isConfirming);
  };

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const gradients = [
    "from-primary/30 via-secondary/20 to-accent/30",
    "from-secondary/30 via-accent/20 to-primary/30",
    "from-accent/30 via-primary/20 to-secondary/30",
    "from-primary/40 via-amber-500/20 to-orange-500/30",
  ];

  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedBackground />
      <FloatingEthCoins />
      <div className="blue-glow fixed inset-0 pointer-events-none z-0" />
      <Header />
      
      <main className="pt-24 pb-12 px-4 relative z-10">
      
      {/* Wallet Connection Modal */}
      <WalletConnectionModal
        open={showWalletModal}
        onOpenChange={setShowWalletModal}
        isFirstTime={isFirstTimeUser}
      />
        <div className="container mx-auto max-w-7xl">
          {/* Search Header */}
          <div className="text-center space-y-6 mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-black">
              NFT <span className="text-primary glow-text">Library</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Discover and own unique literary NFTs from talented authors worldwide
            </p>
            
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by title or author..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 text-lg bg-background/50 border-border"
              />
            </div>
          </div>

          {/* Featured Interactive Books */}
          {filteredBooks.some(b => b.title === "Blockchain Revolution" || b.title === "Blockchain for Beginners Study Guide") && (
            <div className="mb-16 animate-fade-in">
              <h2 className="text-2xl font-bold text-center mb-8">
                <Sparkles className="inline-block w-6 h-6 mr-2 text-amber-400" />
                Featured NFT Books
              </h2>
              <div className="flex flex-wrap justify-center gap-12">
                {filteredBooks
                  .filter(b => b.title === "Blockchain Revolution")
                  .map(book => (
                    <InteractiveBook
                      key={book.id}
                      title={book.title}
                      author={book.author}
                      coverUrl={book.cover_image_url || undefined}
                      pdfUrl={book.ipfs_hash ? `https://ipfs.io/ipfs/${book.ipfs_hash}` : undefined}
                      price={book.price_eth}
                      description={book.description || undefined}
                      authorNote="This book represents years of research into how blockchain is reshaping our world. At 0.003 ETH, you're not just buying a book—you're investing in understanding the technology that will define the next decade of finance and society."
                      onPurchase={() => handlePurchase(book)}
                      isPurchasing={isPurchasing(book.id)}
                      isOwned={false}
                    />
                  ))}
                {filteredBooks
                  .filter(b => b.title === "Blockchain for Beginners Study Guide")
                  .map(book => (
                    <InteractiveBook
                      key={book.id}
                      title={book.title}
                      author={book.author}
                      coverUrl={book.cover_image_url || undefined}
                      pdfUrl={book.ipfs_hash ? `https://ipfs.io/ipfs/${book.ipfs_hash}` : undefined}
                      price={book.price_eth}
                      description={book.description || undefined}
                      authorNote="I wrote this guide to make blockchain accessible to everyone. At just 0.005 ETH, this is your gateway to understanding crypto, smart contracts, and decentralized systems—knowledge that will be invaluable in the years to come."
                      onPurchase={() => handlePurchase(book)}
                      isPurchasing={isPurchasing(book.id)}
                      isOwned={false}
                    />
                  ))}
              </div>
            </div>
          )}

          {/* Books Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="cyber-card h-96 animate-pulse">
                  <div className="h-48 bg-muted rounded-lg mb-4" />
                  <div className="space-y-2">
                    <div className="h-6 bg-muted rounded w-3/4" />
                    <div className="h-4 bg-muted rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredBooks.length === 0 ? (
            <div className="text-center py-20">
              <BookOpen className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-bold mb-2">No books found</h3>
              <p className="text-muted-foreground">
                {searchTerm ? "Try a different search term" : "Be the first to publish!"}
              </p>
              <Button className="mt-4" onClick={() => navigate("/author")}>
                <Sparkles className="mr-2 w-4 h-4" />
                Publish a Book
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredBooks.map((book, index) => (
                <div
                  key={book.id}
                  className="cyber-card group cursor-pointer animate-fade-in hover:-translate-y-2 transition-all duration-300"
                  style={{ animationDelay: `${index * 50}ms` }}
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
                        <div className="text-center">
                          <BookOpen className="w-12 h-12 mx-auto text-foreground/50 mb-2" />
                          <span className="text-xs text-foreground/50">No Cover</span>
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Book Info */}
                  <div className="space-y-2">
                    <h3 className="font-bold text-lg line-clamp-1 group-hover:text-primary transition-colors">
                      {book.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">by {book.author}</p>
                    {book.description && (
                      <p className="text-muted-foreground text-sm line-clamp-2">
                        {book.description}
                      </p>
                    )}
                  </div>

                  {/* Price & Buy */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-black text-primary">{book.price_eth}</span>
                      <span className="text-sm text-muted-foreground">ETH</span>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handlePurchase(book)}
                      className="group/btn"
                      disabled={isPurchasing(book.id)}
                    >
                      {isPurchasing(book.id) ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                          {isPending ? "Confirm..." : "Processing..."}
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4 mr-1 group-hover/btn:scale-110 transition-transform" />
                          Buy
                        </>
                      )}
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

export default Library;
