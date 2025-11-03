import { ScrollText, Shield, Scale } from "lucide-react";

export const TermsSection = () => {
  return (
    <section id="terms" className="min-h-screen py-20 px-4 relative">
      <div className="dot-pattern absolute inset-0 opacity-30" />
      
      <div className="container mx-auto relative z-10 max-w-4xl">
        <div className="space-y-12 animate-slide-up">
          <div className="text-center space-y-4">
            <ScrollText className="w-16 h-16 mx-auto text-primary animate-pulse-glow" />
            <h2 className="text-6xl md:text-7xl font-black text-foreground">
              TERMS & CONDITIONS
            </h2>
            <p className="text-xl text-muted-foreground">Last Updated: October 2025</p>
          </div>
          
          <div className="cyber-card p-8 space-y-8">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Shield className="w-8 h-8 text-secondary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">1. Platform Usage</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    SmartShelf is a decentralized platform for digital book distribution. By connecting your wallet and using this platform, you agree to conduct all transactions through blockchain technology. All purchases are final and non-refundable once the smart contract is executed.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Scale className="w-8 h-8 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">2. Content Rights & Piracy</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    All content uploaded to SmartShelf must be original work or properly licensed. Authors retain full ownership rights to their content. SmartShelf employs blockchain verification to combat piracy. Unauthorized distribution or copying of purchased content is strictly prohibited and may result in legal action.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Shield className="w-8 h-8 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">3. Author Responsibilities</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Authors are responsible for the accuracy of book information, pricing, and file quality. SmartShelf takes a 5% platform fee on all transactions. Authors must maintain the availability of their content for purchased users indefinitely or provide appropriate refunds.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Scale className="w-8 h-8 text-secondary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">4. Wallet & Transactions</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Users are solely responsible for maintaining the security of their cryptocurrency wallets. SmartShelf cannot recover lost funds or reverse transactions. Always verify transaction details before confirming. Gas fees are the responsibility of the transaction initiator.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Shield className="w-8 h-8 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">5. Privacy & Data</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    SmartShelf operates on public blockchain technology. Transaction data is publicly visible on the blockchain. We do not collect personal information beyond your wallet address. Users should understand the transparent nature of blockchain transactions.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Scale className="w-8 h-8 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">6. Limitation of Liability</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    SmartShelf is provided "as is" without warranties. We are not liable for any losses resulting from platform use, smart contract bugs, or blockchain network issues. Users should conduct their own research before any transaction.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="border-t-2 border-border pt-6 mt-8">
              <p className="text-sm text-muted-foreground text-center">
                By using SmartShelf, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. SmartShelf reserves the right to modify these terms at any time.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 right-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span>LAST UPDATED: OCT 2025</span>
        </div>
      </div>
    </section>
  );
};
