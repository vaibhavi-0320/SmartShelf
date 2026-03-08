import { useState } from "react";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseEther } from "viem";
import { sepolia } from "wagmi/chains";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { BOOK_NFT_ABI, BOOK_NFT_CONTRACT_ADDRESS } from "@/contracts/contractABI";
import { useNavigate } from "react-router-dom";
import { Upload, Image, X, Loader2 } from "lucide-react";

export default function PublishBook() {
  const { address, isConnected } = useAccount();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    ipfsHash: "",
    price: "",
    royalty: "10",
  });

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

  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected || !address) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to publish a book",
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

      // Publish to blockchain
      writeContract({
        address: BOOK_NFT_CONTRACT_ADDRESS as `0x${string}`,
        abi: BOOK_NFT_ABI,
        functionName: "publishBook",
        args: [
          formData.title,
          formData.author,
          `ipfs://${formData.ipfsHash}`,
          parseEther(formData.price),
          BigInt(formData.royalty),
        ],
        account: address,
        chain: sepolia,
      });

      // Save to database
      const { error } = await supabase.from("books").insert({
        token_id: Date.now().toString(),
        title: formData.title,
        author: formData.author,
        description: formData.description,
        ipfs_hash: formData.ipfsHash,
        cover_image_url: coverUrl,
        price_eth: parseFloat(formData.price),
        royalty_percentage: parseInt(formData.royalty),
        owner_address: address.toLowerCase(),
        contract_address: BOOK_NFT_CONTRACT_ADDRESS,
      });

      if (error) throw error;

      toast({
        title: "Book published successfully!",
        description: "Your book is now available as an NFT",
      });

      navigate("/");
    } catch (error) {
      console.error("Error publishing book:", error);
      toast({
        title: "Publishing failed",
        description: "There was an error publishing your book",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Header />
      <main className="pt-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="space-y-8 animate-slide-up">
            <div>
              <h1 className="text-6xl md:text-7xl font-black text-foreground mb-2">PUBLISH BOOK</h1>
              <p className="text-muted-foreground">Create your book as an NFT on the blockchain</p>
            </div>

            <form onSubmit={handlePublish} className="cyber-card p-8 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Book Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter book title"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="author">Author Name</Label>
                <Input
                  id="author"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  placeholder="Enter author name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter book description"
                  rows={4}
                />
              </div>

              {/* Cover Image Upload */}
              <div className="space-y-2">
                <Label htmlFor="coverImage">Cover Image</Label>
                <Input
                  id="coverImage"
                  type="file"
                  accept="image/*"
                  onChange={handleCoverImageChange}
                  className="cursor-pointer"
                />
                <p className="text-xs text-muted-foreground">
                  Upload a cover image for your book (JPG, PNG, etc.)
                </p>
              </div>

              {/* Cover Image Preview */}
              <div className="space-y-2">
                <Label>Cover Image Preview</Label>
                {coverImagePreview ? (
                  <div className="relative w-48 h-64 border border-border rounded-lg overflow-hidden">
                    <img 
                      src={coverImagePreview} 
                      alt="Cover preview" 
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={removeCoverImage}
                      className="absolute top-2 right-2 p-1 bg-destructive rounded-full text-destructive-foreground"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="w-48 h-64 border-2 border-dashed border-muted-foreground/30 rounded-lg flex flex-col items-center justify-center text-muted-foreground">
                    <Image className="w-12 h-12 mb-2 opacity-50" />
                    <span className="text-sm">No cover image</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="ipfsHash">Book PDF IPFS Hash</Label>
                <Input
                  id="ipfsHash"
                  value={formData.ipfsHash}
                  onChange={(e) => setFormData({ ...formData, ipfsHash: e.target.value })}
                  placeholder="bafyxxxx... (Pinata CID for book PDF)"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Upload your book PDF to Pinata/IPFS and paste the hash here
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price (ETH)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.001"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="0.05"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="royalty">Royalty (%)</Label>
                  <Input
                    id="royalty"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.royalty}
                    onChange={(e) => setFormData({ ...formData, royalty: e.target.value })}
                    placeholder="10"
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                size="lg"
                disabled={!isConnected || isPending || isConfirming || isUploading}
              >
                {isUploading ? (
                  <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Uploading...</>
                ) : isPending ? (
                  <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Confirming...</>
                ) : isConfirming ? (
                  <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Publishing...</>
                ) : (
                  <><Upload className="w-5 h-5 mr-2" /> PUBLISH AS NFT</>
                )}
              </Button>

              {!isConnected && (
                <p className="text-center text-sm text-muted-foreground">
                  Please connect your wallet to publish a book
                </p>
              )}
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
