import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { LibrarySection } from "@/components/LibrarySection";
import { AuthorPanel } from "@/components/AuthorPanel";
import { ProfileSection } from "@/components/ProfileSection";
import { TermsSection } from "@/components/TermsSection";

const Index = () => {
  return (
    <div className="bg-background text-foreground">
      <Header />
      <main className="pt-16">
        <HeroSection />
        <LibrarySection />
        <AuthorPanel />
        <ProfileSection />
        <TermsSection />
      </main>
    </div>
  );
};

export default Index;
