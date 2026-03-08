import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount, useDisconnect } from "wagmi";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { FloatingEthCoins } from "@/components/FloatingEthCoins";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

import { useAuth } from "@/contexts/AuthContext";
import { 
  User, 
  Wallet, 
  Mail, 
  BookOpen, 
  Coins, 
  Edit3, 
  Save,
  ExternalLink,
  Copy,
  CheckCircle,
  LogOut,
  Trash2,
  AlertTriangle,
  Loader2
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Profile = () => {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [stats, setStats] = useState({ booksOwned: 0, totalSpent: 0 });
  const [copied, setCopied] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (address) {
      fetchProfile();
      fetchStats();
    }
  }, [address]);

  const fetchProfile = async () => {
    if (!address) return;
    
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("wallet_address", address.toLowerCase())
      .single();
    
    if (data) {
      setDisplayName(data.display_name || "");
    }
  };

  const fetchStats = async () => {
    if (!address) return;

    const { data: userBooks } = await supabase
      .from("user_books")
      .select("books(price_eth)")
      .eq("user_wallet", address.toLowerCase());

    if (userBooks) {
      const totalSpent = userBooks.reduce((acc, item) => {
        return acc + (item.books?.price_eth || 0);
      }, 0);
      setStats({
        booksOwned: userBooks.length,
        totalSpent,
      });
    }
  };

  const handleSaveProfile = async () => {
    if (!address) return;

    const { error } = await supabase
      .from("profiles")
      .upsert({
        wallet_address: address.toLowerCase(),
        display_name: displayName,
        email: user?.email,
      });

    if (error) {
      toast({
        title: "Error saving profile",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Profile saved!",
        description: "Your profile has been updated.",
      });
      setIsEditing(false);
    }
  };

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "Address copied!",
        description: "Wallet address copied to clipboard.",
      });
    }
  };

  const truncateAddress = (addr: string) => {
    return `${addr.slice(0, 10)}...${addr.slice(-8)}`;
  };

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      // Disconnect wallet first to ensure clean state for next user
      if (isConnected) {
        disconnect();
      }
      await signOut();
      toast({
        title: "Signed out",
        description: "You have been signed out successfully.",
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Error signing out",
        description: "There was an error signing out. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSigningOut(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      // Delete user's profile data
      if (address) {
        await supabase.from("profiles").delete().eq("wallet_address", address.toLowerCase());
        await supabase.from("user_books").delete().eq("user_wallet", address.toLowerCase());
      }
      
      // Sign out the user (this effectively "deletes" their session)
      await signOut();
      
      toast({
        title: "Account deleted",
        description: "Your account and data have been removed.",
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Error deleting account",
        description: "There was an error deleting your account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  if (!isConnected && !user) {
    return (
      <div className="min-h-screen bg-background relative">
        <AnimatedBackground />
        <FloatingEthCoins />
        <div className="blue-glow fixed inset-0 pointer-events-none z-0" />
        <Header />
        <div className="pt-24 flex flex-col items-center justify-center min-h-[70vh] px-4 relative z-10">
          <User className="w-20 h-20 text-muted-foreground mb-6 animate-float" />
          <h2 className="text-3xl font-bold mb-4">Sign In Required</h2>
          <p className="text-muted-foreground text-center max-w-md">
            Please sign in and connect your wallet to view your profile.
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
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center space-y-4 mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-black">
              My <span className="text-primary glow-text">Profile</span>
            </h1>
          </div>

          <div className="grid gap-6">
            {/* Profile Card */}
            <div className="cyber-card animate-fade-in">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <User className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">
                      {displayName || "Anonymous User"}
                    </h2>
                    {user?.email && (
                      <p className="text-muted-foreground flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        {user.email}
                      </p>
                    )}
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                >
                  {isEditing ? (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </>
                  ) : (
                    <>
                      <Edit3 className="w-4 h-4 mr-2" />
                      Edit
                    </>
                  )}
                </Button>
              </div>

              {isEditing && (
                <div className="space-y-4 mb-6 p-4 bg-muted/50 rounded-lg">
                  <div className="space-y-2">
                    <Label htmlFor="displayName">Display Name</Label>
                    <Input
                      id="displayName"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="Enter your display name"
                    />
                  </div>
                </div>
              )}

              {/* Wallet Info */}
              {address && (
                <div className="p-4 bg-muted/30 rounded-lg border border-border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Wallet className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Connected Wallet</p>
                        <p className="font-mono font-bold">{truncateAddress(address)}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={copyAddress}>
                        {copied ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(`https://sepolia.etherscan.io/address/${address}`, "_blank")}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>

{/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="cyber-card text-center animate-fade-in hover:border-pink-500 transition-colors hover:shadow-lg hover:shadow-pink-500/20" style={{ animationDelay: '100ms' }}>
                <div className="w-14 h-14 rounded-full bg-pink-500/20 flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-7 h-7 text-pink-500" />
                </div>
                <div className="text-4xl font-black text-pink-500 mb-2">{stats.booksOwned}</div>
                <div className="text-muted-foreground">Books Owned</div>
              </div>
              <div className="cyber-card text-center animate-fade-in hover:border-teal-500 transition-colors hover:shadow-lg hover:shadow-teal-500/20" style={{ animationDelay: '200ms' }}>
                <div className="w-14 h-14 rounded-full bg-teal-500/20 flex items-center justify-center mx-auto mb-4">
                  <Coins className="w-7 h-7 text-teal-500" />
                </div>
                <div className="text-4xl font-black text-teal-500 mb-2">
                  {stats.totalSpent.toFixed(3)}
                </div>
                <div className="text-muted-foreground">ETH Spent</div>
              </div>
            </div>

            {/* Actions */}
            <div className="cyber-card animate-fade-in" style={{ animationDelay: '300ms' }}>
              <h3 className="text-lg font-bold mb-4 font-pixel">Account Actions</h3>
              <div className="flex flex-wrap gap-4">
                <Button 
                  variant="outline" 
                  className="border-border hover:border-primary"
                  onClick={handleSignOut}
                  disabled={isSigningOut}
                >
                  {isSigningOut ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Signing Out...
                    </>
                  ) : (
                    <>
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </>
                  )}
                </Button>
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="border-destructive/50 text-destructive hover:bg-destructive/10 hover:border-destructive"
                      disabled={isDeleting}
                    >
                      {isDeleting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Deleting...
                        </>
                      ) : (
                        <>
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Account
                        </>
                      )}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-destructive" />
                        Delete Account
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account 
                        and remove your data from our servers. Your NFTs will remain in your wallet.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction 
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        onClick={handleDeleteAccount}
                      >
                        Delete Account
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
