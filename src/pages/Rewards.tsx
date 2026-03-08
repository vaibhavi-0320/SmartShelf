import { Header } from "@/components/Header";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { FloatingEthCoins } from "@/components/FloatingEthCoins";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Trophy, Star, BookOpen, Coins, Gift, Zap } from "lucide-react";

const achievements = [
  {
    id: 1,
    title: "First Read",
    description: "Complete your first book",
    icon: BookOpen,
    progress: 100,
    completed: true,
    reward: "50 Points",
  },
  {
    id: 2,
    title: "Collector",
    description: "Own 5 different NFT books",
    icon: Gift,
    progress: 60,
    completed: false,
    reward: "100 Points",
  },
  {
    id: 3,
    title: "Bookworm",
    description: "Read for 10 hours total",
    icon: Zap,
    progress: 45,
    completed: false,
    reward: "200 Points",
  },
  {
    id: 4,
    title: "Supporter",
    description: "Support 3 different authors",
    icon: Star,
    progress: 33,
    completed: false,
    reward: "150 Points",
  },
];

const leaderboard = [
  { rank: 1, name: "CryptoReader", points: 5420, avatar: "🏆" },
  { rank: 2, name: "BookLover42", points: 4850, avatar: "🥈" },
  { rank: 3, name: "NFTCollector", points: 4200, avatar: "🥉" },
  { rank: 4, name: "PixelMaster", points: 3800, avatar: "📚" },
  { rank: 5, name: "You", points: 1250, avatar: "⭐" },
];

const Rewards = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedBackground />
      <FloatingEthCoins />
      <div className="blue-glow fixed inset-0 pointer-events-none z-0" />
      <Header />

      <main className="container mx-auto px-4 py-8 relative z-10">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-black font-pixel">
              <span className="text-primary glow-text">Rewards</span> Center
            </h1>
            <p className="text-lg text-muted-foreground font-retro">
              Earn points, unlock achievements, climb the leaderboard
            </p>
          </div>

{/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-card p-6 rounded-lg border border-border text-center space-y-3 hover:border-amber-500 transition-colors hover:shadow-lg hover:shadow-amber-500/20">
              <div className="w-14 h-14 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto">
                <Trophy className="w-7 h-7 text-amber-500" />
              </div>
              <p className="font-pixel text-2xl text-amber-500">1,250</p>
              <p className="font-retro text-muted-foreground">Total Points</p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border text-center space-y-3 hover:border-purple-500 transition-colors hover:shadow-lg hover:shadow-purple-500/20">
              <div className="w-14 h-14 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto">
                <Star className="w-7 h-7 text-purple-500" />
              </div>
              <p className="font-pixel text-2xl text-purple-500">5</p>
              <p className="font-retro text-muted-foreground">Achievements</p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border text-center space-y-3 hover:border-teal-500 transition-colors hover:shadow-lg hover:shadow-teal-500/20">
              <div className="w-14 h-14 rounded-full bg-teal-500/20 flex items-center justify-center mx-auto">
                <BookOpen className="w-7 h-7 text-teal-500" />
              </div>
              <p className="font-pixel text-2xl text-teal-500">3</p>
              <p className="font-retro text-muted-foreground">Books Read</p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border text-center space-y-3 hover:border-primary transition-colors hover:shadow-lg hover:shadow-primary/20">
              <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                <Coins className="w-7 h-7 text-primary" />
              </div>
              <p className="font-pixel text-2xl text-primary">0.02</p>
              <p className="font-retro text-muted-foreground">ETH Earned</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Achievements */}
            <div className="space-y-4">
              <h2 className="text-2xl font-pixel">Achievements</h2>
              <div className="space-y-4">
                {achievements.map((achievement) => {
                  const Icon = achievement.icon;
                  return (
                    <div
                      key={achievement.id}
                      className={`bg-card p-4 rounded-lg border ${
                        achievement.completed
                          ? "border-primary"
                          : "border-border"
                      } transition-all hover:border-primary/50`}
                    >
<div className="flex items-start gap-4">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            achievement.completed
                              ? "bg-teal-500/20"
                              : "bg-muted"
                          }`}
                        >
                          <Icon
                            className={`w-6 h-6 ${
                              achievement.completed
                                ? "text-teal-500"
                                : "text-muted-foreground"
                            }`}
                          />
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <h3 className="font-pixel text-sm">
                              {achievement.title}
                            </h3>
                            <span className="font-retro text-sm text-primary">
                              {achievement.reward}
                            </span>
                          </div>
                          <p className="font-retro text-sm text-muted-foreground">
                            {achievement.description}
                          </p>
                          <Progress value={achievement.progress} className="h-2" />
                          <p className="font-retro text-xs text-muted-foreground">
                            {achievement.progress}% complete
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Leaderboard */}
            <div className="space-y-4">
              <h2 className="text-2xl font-pixel">Leaderboard</h2>
              <div className="bg-card rounded-lg border border-border overflow-hidden">
                <div className="p-4 border-b border-border bg-muted/50">
                  <div className="grid grid-cols-3 font-pixel text-xs text-muted-foreground">
                    <span>Rank</span>
                    <span>Reader</span>
                    <span className="text-right">Points</span>
                  </div>
                </div>
                <div className="divide-y divide-border">
                  {leaderboard.map((entry) => (
                    <div
                      key={entry.rank}
                      className={`p-4 ${
                        entry.name === "You" ? "bg-primary/10" : ""
                      } hover:bg-muted/50 transition-colors`}
                    >
                      <div className="grid grid-cols-3 items-center">
                        <span className="font-pixel text-lg">{entry.avatar}</span>
                        <span className="font-retro">{entry.name}</span>
                        <span className="font-pixel text-primary text-right">
                          {entry.points.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Claim Rewards */}
<div className="bg-card p-6 rounded-lg border border-rose-500 space-y-4 hover:shadow-lg hover:shadow-rose-500/20 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-rose-500/20 flex items-center justify-center">
                    <Gift className="w-6 h-6 text-rose-500" />
                  </div>
                  <div>
                    <h3 className="font-pixel text-sm">Claim Your Rewards</h3>
                    <p className="font-retro text-sm text-muted-foreground">
                      You have 250 unclaimed points!
                    </p>
                  </div>
                </div>
                <Button className="w-full font-pixel bg-rose-500 hover:bg-rose-600">
                  Claim 250 Points
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Rewards;
