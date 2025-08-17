"use client";

import { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Award, Zap, Users, Star } from 'lucide-react';
import { Leaderboard } from '@/components/Leaderboard';
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [userClicks, setUserClicks] = useState(0);
  const [globalClicks, setGlobalClicks] = useState(123456789);
  const [clicksPerSecond, setClicksPerSecond] = useState(0);
  const { toast } = useToast();

  const handleSlothClick = useCallback(() => {
    setUserClicks(prev => prev + 1);
    setGlobalClicks(prev => prev + 1);
  }, []);

  const handleUpgrade = () => {
    toast({
      title: "Próximamente",
      description: "Las mejoras con NFTs y tokens estarán disponibles pronto.",
    });
  };

  useEffect(() => {
    const globalClicker = setInterval(() => {
      setGlobalClicks(prev => prev + Math.floor(Math.random() * 10) + 5);
    }, 1000);

    let lastClicks = userClicks;
    const cpsTracker = setInterval(() => {
        setClicksPerSecond(userClicks - lastClicks);
        lastClicks = userClicks;
    }, 1000);

    return () => {
      clearInterval(globalClicker);
      clearInterval(cpsTracker);
    };
  }, [userClicks]);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 w-full bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto flex justify-between items-center p-4">
          <div className="flex items-center gap-3">
            <Star className="w-8 h-8 text-primary" />
            <h1 className="font-headline text-2xl md:text-3xl font-bold">Stellar Clicker</h1>
          </div>
          <Button variant="outline">Conectar Wallet</Button>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center gap-8">
        
        <div className="text-center">
            <h2 className="text-5xl md:text-7xl font-bold font-headline bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              {userClicks.toLocaleString()}
            </h2>
            <p className="text-muted-foreground font-code mt-2">Tus Clics</p>
        </div>
        
        <div className="w-full max-w-md flex flex-col items-center justify-center gap-4 my-4">
            <Button
              onClick={handleSlothClick}
              className="group rounded-full shadow-lg w-48 h-48 sm:w-64 sm:h-64 flex items-center justify-center transition-transform duration-150 ease-in-out active:scale-90 focus:outline-none focus:ring-4 focus:ring-primary/50 text-2xl font-bold"
              aria-label="Click to earn"
              size="lg"
              variant="default"
            >
              ¡Haz Clic!
            </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl">
          <Card className="shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="font-headline text-lg">Clics Globales</CardTitle>
              <Users className="w-5 h-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold font-code text-primary">{globalClicks.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground pt-1">Total de clics de la comunidad.</p>
            </CardContent>
          </Card>
          <Card className="shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="font-headline text-lg">Clics por Segundo</CardTitle>
              <Zap className="w-5 h-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold font-code text-accent">{clicksPerSecond}</p>
              <p className="text-xs text-muted-foreground pt-1">Tu velocidad de clic actual.</p>
            </CardContent>
          </Card>
        </div>

        <Card className="w-full max-w-4xl shadow-md">
          <CardHeader>
            <CardTitle className="font-headline">Próxima Mejora</CardTitle>
            <CardDescription>Aumenta tu poder de clic con mejoras únicas.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-full sm:w-auto flex-grow">
               <Progress value={(userClicks % 500) / 5} />
               <p className="text-sm text-muted-foreground mt-2 font-code">Siguiente recompensa en {500 - (userClicks % 500)} clics.</p>
            </div>
            <Button onClick={handleUpgrade} className="w-full sm:w-auto bg-accent hover:bg-accent/90">
              <Zap className="mr-2 h-4 w-4" />
              Ver Mejoras
            </Button>
          </CardContent>
        </Card>

        <div className="w-full max-w-4xl pt-8">
            <Leaderboard />
        </div>
      </main>

      <footer className="w-full bg-secondary/50 mt-12">
        <div className="container mx-auto py-4 text-center text-muted-foreground text-sm">
            Construido en la blockchain de Sonic | Juego Click-to-Earn
        </div>
      </footer>
    </div>
  );
}