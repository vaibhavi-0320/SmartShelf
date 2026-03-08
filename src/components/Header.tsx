import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Menu, X, BookOpen, Upload, User, Library, Home } from "lucide-react";
import { MetaMaskIcon } from "./MetaMaskIcon";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleConnect = () => {
    const injectedConnector = connectors.find((c) => c.id === "injected");
    if (injectedConnector) {
      connect({ connector: injectedConnector });
    }
  };

  const truncateAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/library", label: "Library", icon: Library },
    { path: "/reader", label: "My Books", icon: BookOpen, requiresAuth: true },
    { path: "/author", label: "Publish", icon: Upload, requiresAuth: true },
    { path: "/profile", label: "Profile", icon: User, requiresAuth: true },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate("/")}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-lg font-black">SMARTSHELF</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              if (item.requiresAuth && !isConnected) return null;
              return (
                <Button
                  key={item.path}
                  variant={isActive(item.path) ? "default" : "ghost"}
                  size="sm"
                  onClick={() => navigate(item.path)}
                  className={`transition-all ${isActive(item.path) ? "" : "hover:bg-primary/10"}`}
                >
                  <item.icon className={`w-4 h-4 mr-1.5 ${isActive(item.path) ? "" : "text-primary"}`} />
                  {item.label}
                </Button>
              );
            })}
          </nav>

          {/* Wallet/Auth */}
          <div className="hidden md:flex items-center gap-3">
            {!isConnected ? (
              <Button 
                variant="outline" 
                size="sm"
                className="rounded-full border-2 hover:bg-primary hover:text-primary-foreground transition-all"
                onClick={handleConnect}
              >
                Connect Wallet
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-full border border-border">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <MetaMaskIcon className="w-5 h-5" />
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => disconnect()}
                  className="text-xs hover:bg-destructive/10 hover:text-destructive"
                >
                  Disconnect
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-primary" /> : <Menu className="w-6 h-6 text-primary" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2 animate-fade-in">
            {navItems.map((item) => {
              if (item.requiresAuth && !isConnected) return null;
              return (
                <Button
                  key={item.path}
                  variant={isActive(item.path) ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => {
                    navigate(item.path);
                    setMobileMenuOpen(false);
                  }}
                >
                  <item.icon className={`w-4 h-4 mr-2 ${isActive(item.path) ? "" : "text-primary"}`} />
                  {item.label}
                </Button>
              );
            })}
            
            <div className="pt-4 border-t border-border">
              {!isConnected ? (
                <Button className="w-full" onClick={handleConnect}>
                  Connect Wallet
                </Button>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-full border border-border">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <MetaMaskIcon className="w-5 h-5" />
                    <span className="text-sm">Connected</span>
                  </div>
                  <Button 
                    variant="destructive" 
                    className="w-full"
                    onClick={() => {
                      disconnect();
                      setMobileMenuOpen(false);
                    }}
                  >
                    Disconnect
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
