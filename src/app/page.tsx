"use client";

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Wallet, Bot, Trophy } from 'lucide-react';
import { Leaderboard } from '@/components/Leaderboard';
import { useToast } from "@/hooks/use-toast";
import { handleUserClick } from './actions';
import type { AnalyzeClickPatternsOutput } from '@/ai/flows/analyze-click-patterns';

const slothImage1 = "https://i.imgur.com/eA2z6I1.png";
const slothImage2 = "https://i.imgur.com/gTciTEs.png";

export default function Home() {
  const [userClicks, setUserClicks] = useState(0);
  const [globalClicks, setGlobalClicks] = useState(123456789);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [publicKey, setPublicKey] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [clickTimestamps, setClickTimestamps] = useState<number[]>([]);
  const [currentSlothImage, setCurrentSlothImage] = useState(slothImage1);
  const { toast } = useToast();

  const handleConnectWallet = () => {
    setIsConnecting(true);
    setTimeout(() => {
      const pk = `G${Array(55).fill(0).map(() => 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'[Math.floor(Math.random() * 36)]).join('')}`;
      setPublicKey(pk);
      setIsWalletConnected(true);
      setIsConnecting(false);
      toast({
        title: "Wallet Connected",
        description: `Your wallet ${pk.substring(0, 4)}...${pk.substring(pk.length - 4)} is now connected.`,
      });
    }, 1500);
  };

  const handleDisconnectWallet = () => {
    setIsWalletConnected(false);
    setPublicKey("");
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected.",
    });
  };

  const handleClaimRewards = () => {
    toast({
      title: "Claim Rewards",
      description: "Reward distribution is handled automatically by scheduled jobs every 10 minutes. Happy clicking!",
    });
  };

  const onUserClick = useCallback(async () => {
    setUserClicks(prev => prev + 1);
    setGlobalClicks(prev => prev + 1);
    setCurrentSlothImage(prev => prev === slothImage1 ? slothImage2 : slothImage1);
    
    const now = Date.now();
    const updatedTimestamps = [...clickTimestamps, now].slice(-20); // Keep last 20 clicks for analysis
    setClickTimestamps(updatedTimestamps);

    if (updatedTimestamps.length > 5) {
      try {
        const result: AnalyzeClickPatternsOutput = await handleUserClick(updatedTimestamps);
        if (result.isBotLikely) {
          toast({
            variant: "destructive",
            title: "Bot Activity Suspected",
            description: `Confidence: ${(result.confidenceScore * 100).toFixed(0)}%. ${result.reasoning}`,
          });
        }
      } catch (error) {
        console.error("Error analyzing clicks:", error);
      }
    }
  }, [clickTimestamps, toast]);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlobalClicks(prev => prev + Math.floor(Math.random() * 10) + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground p-4 sm:p-6 md:p-8">
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <Trophy className="w-8 h-8 text-primary" />
          <h1 className="font-headline text-2xl md:text-3xl font-bold">Stellar Clicker</h1>
        </div>
        {isWalletConnected ? (
          <div className="flex items-center gap-2">
            <span className="font-code text-sm hidden sm:inline">{`${publicKey.substring(0, 4)}...${publicKey.substring(publicKey.length - 4)}`}</span>
            <Button variant="outline" onClick={handleDisconnectWallet}>Disconnect</Button>
          </div>
        ) : (
          <Button onClick={handleConnectWallet} disabled={isConnecting}>
            <Wallet className="mr-2 h-4 w-4" />
            {isConnecting ? "Connecting..." : "Connect Wallet"}
          </Button>
        )}
      </header>

      <main className="flex-grow flex flex-col items-center justify-center gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-xl">Global Clicks</CardTitle>
              <CardDescription>Total clicks from everyone on the network.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold font-headline text-primary">{globalClicks.toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-xl">Your Clicks</CardTitle>
              <CardDescription>Your contribution to the cause!</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold font-headline text-accent-foreground">{userClicks.toLocaleString()}</p>
            </CardContent>
          </Card>
        </div>

        <div className="w-full max-w-md flex flex-col items-center justify-center gap-4 my-8">
            <button 
              onClick={onUserClick} 
              className="group rounded-full bg-card shadow-lg w-48 h-48 sm:w-64 sm:h-64 flex items-center justify-center transition-transform duration-150 ease-in-out active:scale-90 focus:outline-none focus:ring-4 focus:ring-primary/50"
              aria-label="Click to increment score"
            >
              <Image src={currentSlothImage} alt="Sloth" width={128} height={128} className="w-24 h-24 sm:w-32 sm:h-32 transition-transform duration-300 ease-in-out group-hover:scale-110" />
            </button>
        </div>

        <Card className="w-full max-w-4xl">
          <CardHeader>
            <CardTitle className="font-headline">Reward Progress</CardTitle>
            <CardDescription>Rewards are distributed automatically by cron jobs.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-full sm:w-auto flex-grow">
              <Progress value={(userClicks % 1000) / 10} />
              <p className="text-sm text-muted-foreground mt-2">{userClicks % 1000} / 1,000 clicks to next reward cycle.</p>
            </div>
            <Button onClick={handleClaimRewards} disabled={!isWalletConnected} className="w-full sm:w-auto bg-accent hover:bg-accent/90">
              <Bot className="mr-2 h-4 w-4" />
              Claim Info
            </Button>
          </CardContent>
        </Card>
      </main>

      <footer className="w-full max-w-5xl mx-auto mt-12">
        <Leaderboard />
      </footer>
    </div>
  );
}
