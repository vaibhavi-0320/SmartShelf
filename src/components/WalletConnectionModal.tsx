import { useEffect, useState } from "react";
import { useAccount, useConnect } from "wagmi";
import { useAuth } from "@/contexts/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MetaMaskIcon } from "./MetaMaskIcon";
import { Wallet, Sparkles, BookOpen, Shield, Gift } from "lucide-react";

interface WalletConnectionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isFirstTime?: boolean;
}

export const WalletConnectionModal = ({
  open,
  onOpenChange,
  isFirstTime = false,
}: WalletConnectionModalProps) => {
  const { connect, connectors, isPending } = useConnect();
  const { isConnected } = useAccount();

  const handleConnect = () => {
    const injectedConnector = connectors.find((c) => c.id === "injected");
    if (injectedConnector) {
      connect({ connector: injectedConnector });
    }
  };

  // Close modal when wallet gets connected
  useEffect(() => {
    if (isConnected && open) {
      onOpenChange(false);
    }
  }, [isConnected, open, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md border-primary/20 bg-background/95 backdrop-blur-xl">
        <DialogHeader className="text-center space-y-4">
          {isFirstTime ? (
            <>
              <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center animate-pulse">
                <Sparkles className="w-10 h-10 text-primary-foreground" />
              </div>
              <DialogTitle className="text-2xl font-black">
                Welcome to <span className="text-primary">SmartShelf!</span>
              </DialogTitle>
              <DialogDescription className="text-base">
                Your account is ready! Connect your MetaMask wallet to start exploring and purchasing NFT books.
              </DialogDescription>
            </>
          ) : (
            <>
              <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border-2 border-primary/30">
                <Wallet className="w-10 h-10 text-primary" />
              </div>
              <DialogTitle className="text-2xl font-black">
                Connect Your Wallet
              </DialogTitle>
              <DialogDescription className="text-base">
                Connect your MetaMask wallet to access all features and purchase NFT books.
              </DialogDescription>
            </>
          )}
        </DialogHeader>

        {isFirstTime && (
          <div className="grid grid-cols-3 gap-3 my-4">
            <div className="text-center p-3 rounded-lg bg-muted/50 border border-border">
              <BookOpen className="w-6 h-6 mx-auto mb-2 text-pink-500" />
              <p className="text-xs text-muted-foreground">Collect NFT Books</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted/50 border border-border">
              <Shield className="w-6 h-6 mx-auto mb-2 text-teal-500" />
              <p className="text-xs text-muted-foreground">True Ownership</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted/50 border border-border">
              <Gift className="w-6 h-6 mx-auto mb-2 text-amber-500" />
              <p className="text-xs text-muted-foreground">Earn Rewards</p>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <Button
            onClick={handleConnect}
            className="w-full h-14 text-lg font-semibold group"
            disabled={isPending}
          >
            {isPending ? (
              <span className="animate-pulse">Connecting...</span>
            ) : (
              <>
                <MetaMaskIcon className="w-6 h-6 mr-3" />
                Connect MetaMask
              </>
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            Don't have MetaMask?{" "}
            <a
              href="https://metamask.io/download/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Download here
            </a>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};