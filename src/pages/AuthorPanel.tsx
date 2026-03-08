import { useState, useEffect } from "react";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseEther } from "viem";
import { sepolia } from "wagmi/chains";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Header } from "@/components/Header";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { FloatingEthCoins } from "@/components/FloatingEthCoins";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { BOOK_NFT_ABI, BOOK_NFT_CONTRACT_ADDRESS } from "@/contracts/contractABI";
import { 
  Upload, 
  BookOpen, 
  Coins, 
  TrendingUp,
  FileText,
  Image as ImageIcon,
  DollarSign,
  Percent,
  Sparkles,
  X,
  Loader2
} from "lucide-react";

interface PublishedBook {
  id: string;
  title: string;
  author: string;
  price_eth: number;
  token_id: string;
  cover_image_url: string | null;
  created_at: string;
}

const AuthorPanel = () => {
  const { address, isConnected } = useAccount();
  const { user } = useAuth();
  const { writeContract, data: hash } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });
  const { toast } = useToast();
  
  const [publishedBooks, setPublishedBooks] = useState<PublishedBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    fileUrl: "",
    price: "",
    royalty: "10",
  });

  useEffect(() => {
    if (address) {
      fetchPublishedBooks();
    }
  }, [address]);

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Book published!",
        description: "Your book NFT has been minted successfully.",
      });
      setFormData({ title: "", description: "", fileUrl: "", price: "", royalty: "10" });
      setCoverImageFile(null);
      setCoverImagePreview("");
      fetchPublishedBooks();
    }
  }, [isSuccess]);

  const fetchPublishedBooks = async () => {
    if (!address) return;

    const { data, error } = await supabase
      .from("books")
      .select("*")
      .eq("owner_address", address.toLowerCase())
      .order("created_at", { ascending: false });

    if (!error && data) {
      setPublishedBooks(data);
    }
    setLoading(false);
  };

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeCoverImage = () => {
    setCoverImageFile(null);
    setCoverImagePreview("");
  };

  const uploadCoverImage = async (): Promise<string | null> => {
    if (!coverImageFile) return null;
    
    const fileExt = coverImageFile.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from('book-covers')
      .upload(fileName, coverImageFile);
    
    if (error) {
      console.error('Upload error:', error);
      throw error;
    }
    
    const { data: urlData } = supabase.storage
      .from('book-covers')
      .getPublicUrl(fileName);
    
    return urlData.publicUrl;
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isConnected || !address) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to publish books",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsUploading(true);
      
      // Upload cover image to storage
      let coverUrl: string | null = null;
      if (coverImageFile) {
        coverUrl = await uploadCoverImage();
      }

      // Generate token ID
      const tokenId = Date.now().toString();

      // Save to database first
      const { error: dbError } = await supabase.from("books").insert({
        title: formData.title,
        author: address,
        description: formData.description,
        cover_image_url: coverUrl,
        ipfs_hash: formData.fileUrl,
        price_eth: parseFloat(formData.price),
        token_id: tokenId,
        owner_address: address.toLowerCase(),
        royalty_percentage: parseInt(formData.royalty),
      });

      if (dbError) throw dbError;

      // Mint NFT on blockchain
      writeContract({
        address: BOOK_NFT_CONTRACT_ADDRESS as `0x${string}`,
        abi: BOOK_NFT_ABI,
        functionName: "publishBook",
        args: [
          formData.title,
          address, // author address as string
          formData.fileUrl,
          parseEther(formData.price),
          BigInt(formData.royalty),
        ],
        account: address,
        chain: sepolia,
      });

      toast({
        title: "Book publishing!",
        description: "Please confirm the transaction in MetaMask.",
      });
      setFormData({ title: "", description: "", fileUrl: "", price: "", royalty: "10" });
      setCoverImageFile(null);
      setCoverImagePreview("");
      fetchPublishedBooks();
    } catch (error) {
      toast({
        title: "Publishing failed",
        description: "There was an error publishing your book",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const totalEarnings = publishedBooks.reduce((acc, book) => acc + book.price_eth, 0);

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background relative">
        <AnimatedBackground />
        <FloatingEthCoins />
        <div className="blue-glow fixed inset-0 pointer-events-none z-0" />
        <Header />
        <div className="pt-24 flex flex-col items-center justify-center min-h-[70vh] px-4 relative z-10">
          <Upload className="w-20 h-20 text-muted-foreground mb-6 animate-float" />
          <h2 className="text-3xl font-bold mb-4">Connect Your Wallet</h2>
          <p className="text-muted-foreground text-center max-w-md">
            Connect your wallet to start publishing books and earning royalties.
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
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center space-y-4 mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-black">
              Author <span className="text-primary glow-text">Panel</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Publish your books as NFTs and earn royalties
            </p>
          </div>

{/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="cyber-card text-center animate-fade-in hover:border-pink-500 transition-colors hover:shadow-lg hover:shadow-pink-500/20">
              <div className="w-14 h-14 rounded-full bg-pink-500/20 flex items-center justify-center mx-auto mb-3">
                <BookOpen className="w-7 h-7 text-pink-500" />
              </div>
              <div className="text-3xl font-black text-pink-500">{publishedBooks.length}</div>
              <div className="text-muted-foreground text-sm">Books Published</div>
            </div>
            <div className="cyber-card text-center animate-fade-in hover:border-primary transition-colors hover:shadow-lg hover:shadow-primary/20" style={{ animationDelay: '100ms' }}>
              <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
                <Coins className="w-7 h-7 text-primary" />
              </div>
              <div className="text-3xl font-black text-primary">{totalEarnings.toFixed(3)}</div>
              <div className="text-muted-foreground text-sm">Total ETH Listed</div>
            </div>
            <div className="cyber-card text-center animate-fade-in hover:border-teal-500 transition-colors hover:shadow-lg hover:shadow-teal-500/20" style={{ animationDelay: '200ms' }}>
              <div className="w-14 h-14 rounded-full bg-teal-500/20 flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-7 h-7 text-teal-500" />
              </div>
              <div className="text-3xl font-black text-teal-500">10%</div>
              <div className="text-muted-foreground text-sm">Avg Royalty</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Publish Form */}
<div className="cyber-card animate-fade-in hover:border-amber-500 transition-colors" style={{ animationDelay: '300ms' }}>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                </div>
                Publish New Book
              </h2>
              
              <form onSubmit={handlePublish} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Book Title
                  </Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Enter book title"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe your book..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="coverImage" className="flex items-center gap-2">
                    <ImageIcon className="w-4 h-4" />
                    Cover Image
                  </Label>
                  <Input
                    id="coverImage"
                    type="file"
                    accept="image/*"
                    onChange={handleCoverImageChange}
                    className="cursor-pointer"
                  />
                  {coverImagePreview && (
                    <div className="relative w-24 h-32 mt-2">
                      <img 
                        src={coverImagePreview} 
                        alt="Cover preview" 
                        className="w-full h-full object-cover rounded border border-border"
                      />
                      <button
                        type="button"
                        onClick={removeCoverImage}
                        className="absolute -top-2 -right-2 p-1 bg-destructive rounded-full text-destructive-foreground"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fileUrl">Book File URL (IPFS)</Label>
                  <Input
                    id="fileUrl"
                    value={formData.fileUrl}
                    onChange={(e) => setFormData({ ...formData, fileUrl: e.target.value })}
                    placeholder="ipfs://..."
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price" className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      Price (ETH)
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.001"
                      min="0"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="0.01"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="royalty" className="flex items-center gap-2">
                      <Percent className="w-4 h-4" />
                      Royalty %
                    </Label>
                    <Input
                      id="royalty"
                      type="number"
                      min="0"
                      max="50"
                      value={formData.royalty}
                      onChange={(e) => setFormData({ ...formData, royalty: e.target.value })}
                      placeholder="10"
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full h-12" disabled={isConfirming || isUploading}>
                  {isUploading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Uploading...
                    </>
                  ) : isConfirming ? (
                    <span className="animate-pulse">Publishing...</span>
                  ) : (
                    <>
                      <Upload className="w-5 h-5 mr-2" />
                      Publish Book NFT
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Published Books */}
<div className="cyber-card animate-fade-in hover:border-purple-500 transition-colors" style={{ animationDelay: '400ms' }}>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-purple-500" />
                </div>
                Your Published Books
              </h2>

              {loading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-20 bg-muted rounded-lg animate-pulse" />
                  ))}
                </div>
              ) : publishedBooks.length === 0 ? (
                <div className="text-center py-12">
                  <BookOpen className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No books published yet</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {publishedBooks.map((book, index) => (
                    <div
                      key={book.id}
                      className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg border border-border hover:border-primary/50 transition-colors"
                    >
                      <div className="w-16 h-20 rounded bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center overflow-hidden">
                        {book.cover_image_url ? (
                          <img src={book.cover_image_url} alt={book.title} className="w-full h-full object-cover" />
                        ) : (
                          <BookOpen className="w-6 h-6 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold truncate">{book.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          Token #{book.token_id}
                        </p>
                        <p className="text-sm text-primary font-bold">
                          {book.price_eth} ETH
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AuthorPanel;
