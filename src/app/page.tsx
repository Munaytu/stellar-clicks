"use client";

import { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy, Zap } from 'lucide-react';
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
      description: "Las mejoras estarán disponibles en una futura actualización. ¡Sigue haciendo clic!",
    });
  };

  useEffect(() => {
    const globalClicker = setInterval(() => {
      setGlobalClicks(prev => prev + Math.floor(Math.random() * 10) + 5);
    }, 1000);

    const cpsTracker = setInterval(() => {
      const lastClicks = userClicks;
      setTimeout(() => {
        setClicksPerSecond(userClicks - lastClicks);
      }, 990);
    }, 1000);

    return () => {
      clearInterval(globalClicker);
      clearInterval(cpsTracker);
    };
  }, [userClicks]);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground p-4 sm:p-6 md:p-8">
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <Trophy className="w-8 h-8 text-primary" />
          <h1 className="font-headline text-2xl md:text-3xl font-bold">Sloth Clicker</h1>
        </div>
        <div className="flex items-center gap-2">
           <p className="font-code text-lg"><span className="font-bold">{clicksPerSecond}</span> clics/s</p>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-xl">Clics Globales</CardTitle>
              <CardDescription>Total de clics de todos los jugadores.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold font-headline text-primary">{globalClicks.toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-xl">Tus Clics</CardTitle>
              <CardDescription>¡Tu contribución a la pereza!</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold font-headline text-accent-foreground">{userClicks.toLocaleString()}</p>
            </CardContent>
          </Card>
        </div>

        <div className="w-full max-w-md flex flex-col items-center justify-center gap-4 my-8">
            <Button
              onClick={handleSlothClick}
              className="group rounded-full shadow-lg w-48 h-48 sm:w-64 sm:h-64 flex items-center justify-center transition-transform duration-150 ease-in-out active:scale-90 focus:outline-none focus:ring-4 focus:ring-primary/50 text-2xl font-bold"
              aria-label="Click al perezoso"
              size="lg"
              variant="default"
            >
              ¡Haz Clic!
            </Button>
        </div>

        <Card className="w-full max-w-4xl">
          <CardHeader>
            <CardTitle className="font-headline">Mejoras</CardTitle>
            <CardDescription>Aumenta tu poder de clic.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-full sm:w-auto flex-grow">
               <Progress value={(userClicks % 500) / 5} />
               <p className="text-sm text-muted-foreground mt-2">Siguiente mejora desbloqueada en {500 - (userClicks % 500)} clics.</p>
            </div>
            <Button onClick={handleUpgrade} className="w-full sm:w-auto bg-accent hover:bg-accent/90">
              <Zap className="mr-2 h-4 w-4" />
              Ver Mejoras
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
