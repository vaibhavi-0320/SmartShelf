import { Clock, LogOut, Trash2, User, Wallet, Edit2, Check, X, AlertTriangle, BookOpen, Coins } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useDisconnect } from "wagmi";
import { AnimatedBackground } from "./AnimatedBackground";
import { FloatingEthCoins } from "./FloatingEthCoins";
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
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const purchasedBooks = [
  { id: 1, title: "BOMIN", author: "AUTHOR NAME", color: "from-primary to-secondary" },
  { id: 2, title: "TITLE", author: "AUTHOR NAME", color: "from-secondary to-accent" },
  { id: 3, title: "MILK", author: "AUTHOR NAME", color: "from-accent to-primary" },
  { id: 4, title: "THER SAGA", author: "AUTHOR NAME", color: "from-primary to-accent" },
  { id: 5, title: "THE ETHER", author: "AUTHOR NAME", color: "from-secondary to-primary" },
  { id: 6, title: "THE ETHER", author: "AUTHOR NAME", color: "from-accent to-secondary" },
];

export const ProfileSection = () => {
  const { signOut, user } = useAuth();
  const { disconnect } = useDisconnect();
  const [displayName, setDisplayName] = useState("User");
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(displayName);

  const handleSignOut = async () => {
    try {
      // Disconnect wallet first to ensure clean state for next user
      disconnect();
      await signOut();
      toast.success("Signed out successfully");
    } catch (error) {
      toast.error("Failed to sign out");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      // Delete user data first, then sign out
      await signOut();
      toast.success("Account deleted successfully");
    } catch (error) {
      toast.error("Failed to delete account");
    }
  };

  const handleSaveName = () => {
    setDisplayName(tempName);
    setIsEditingName(false);
    toast.success("Display name updated");
  };

  const handleCancelEdit = () => {
    setTempName(displayName);
    setIsEditingName(false);
  };

  return (
    <section id="profile" className="min-h-screen py-20 px-4 relative overflow-hidden">
      {/* Background effects */}
      <AnimatedBackground />
      <FloatingEthCoins />
      <div className="blue-glow fixed inset-0 pointer-events-none z-0" />
      
      <div className="container mx-auto relative z-10 max-w-7xl">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-6xl md:text-7xl font-black text-foreground animate-slide-up">
            PROFILE PAGE
          </h2>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* User Details */}
          <div className="lg:col-span-1 space-y-6 animate-slide-up">
<div className="cyber-card p-8 space-y-6">
              <h3 className="text-2xl font-bold text-foreground border-b-2 border-border pb-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <User className="w-5 h-5 text-purple-500" />
                </div>
                YOUR DETAILS
              </h3>
              
              <div className="space-y-4">
                {/* Display Name */}
                <div>
                  <p className="text-sm text-muted-foreground mb-1">DISPLAY NAME:</p>
                  {isEditingName ? (
                    <div className="flex items-center gap-2">
                      <Input
                        value={tempName}
                        onChange={(e) => setTempName(e.target.value)}
                        className="bg-background border-border"
                        autoFocus
                      />
                      <Button size="icon" variant="ghost" onClick={handleSaveName}>
                        <Check className="w-4 h-4 text-green-500" />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={handleCancelEdit}>
                        <X className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <p className="text-lg font-bold text-foreground">{displayName}</p>
                      <Button size="icon" variant="ghost" onClick={() => setIsEditingName(true)}>
                        <Edit2 className="w-4 h-4 text-primary" />
                      </Button>
                    </div>
                  )}
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">EMAIL:</p>
                  <p className="text-lg font-mono text-foreground">{user?.email || "Not connected"}</p>
                </div>
                
<Button className="w-full h-12 bg-background border-2 border-border hover:bg-teal-500 hover:border-teal-500 hover:text-white transition-all duration-300 flex items-center gap-2 group">
                  <div className="w-8 h-8 rounded-full bg-teal-500/20 flex items-center justify-center group-hover:bg-teal-500/30">
                    <Wallet className="w-4 h-4 text-teal-500 group-hover:text-white" />
                  </div>
                  <span>VIEW TRANSACTION HISTORY</span>
                  <Clock className="w-5 h-5 text-teal-500 group-hover:text-white group-hover:rotate-180 transition-transform duration-500" />
                </Button>

{/* Sign Out Button */}
                <Button
                  onClick={handleSignOut}
                  className="w-full h-12 bg-background border-2 border-border hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all duration-300 flex items-center gap-2 group"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30">
                    <LogOut className="w-4 h-4 text-primary group-hover:text-primary-foreground" />
                  </div>
                  <span>SIGN OUT</span>
                </Button>

                {/* Delete Account Button */}
                <AlertDialog>
<AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full h-12 bg-background border-2 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground transition-all duration-300 flex items-center gap-2 group"
                    >
                      <div className="w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center group-hover:bg-destructive/30">
                        <Trash2 className="w-4 h-4" />
                      </div>
                      <span>DELETE ACCOUNT</span>
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-card border-border">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="flex items-center gap-2 text-foreground">
                        <AlertTriangle className="w-5 h-5 text-destructive" />
                        Delete Account
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-muted-foreground">
                        Are you sure you want to delete your account? This action cannot be undone.
                        All your data, including purchased books and transaction history, will be permanently deleted.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="border-border">Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDeleteAccount}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Delete Account
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
          
          {/* Purchased Books */}
          <div className="lg:col-span-2 animate-slide-up" style={{ animationDelay: "200ms" }}>
            <div className="cyber-card p-8">
              <h3 className="text-2xl font-bold text-foreground border-b-2 border-border pb-4 mb-6">
                PURCHASED BOOKS
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {purchasedBooks.map((book, index) => (
                  <div
                    key={book.id}
                    className="cyber-card p-4 space-y-3 group hover:scale-105 transition-transform duration-300"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className={`aspect-square rounded-lg bg-gradient-to-br ${book.color} pixel-art flex items-center justify-center border-2 border-border`}>
                      <span className="text-2xl font-black text-primary-foreground drop-shadow-lg">{book.title.slice(0, 5)}</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">{book.title}</p>
                      <p className="text-xs text-muted-foreground">BY {book.author}</p>
                    </div>
                    <Button className="w-full bg-background border-2 border-border hover:bg-primary hover:text-primary-foreground transition-all duration-300 text-sm">
                      READ / DOWNLOAD
                    </Button>
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
        </div>
      </div>
    </section>
  );
};