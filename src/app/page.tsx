"use client";

import { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Zap, Users, Star, Waves } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [userEnergy, setUserEnergy] = useState(0);
  const [globalEnergy, setGlobalEnergy] = useState(123456789);
  const { toast } = useToast();

  const handleFlowClick = useCallback(() => {
    setUserEnergy(prev => prev + 1);
    setGlobalEnergy(prev => prev + 1);
  }, []);

  const handleUpgrade = () => {
    toast({
      title: "Próximamente",
      description: "Los Ecos (NFTs) y las mejoras de flujo estarán disponibles pronto.",
    });
  };

  useEffect(() => {
    const globalEnergyGenerator = setInterval(() => {
      setGlobalEnergy(prev => prev + Math.floor(Math.random() * 10) + 5);
    }, 1000);

    return () => {
      clearInterval(globalEnergyGenerator);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 w-full bg-background/80 backdrop-blur-sm border-b border-primary/20">
        <div className="container mx-auto flex justify-between items-center p-4">
          <div className="flex items-center gap-3">
            <Waves className="w-8 h-8 text-primary" />
            <h1 className="font-headline text-2xl md:text-3xl font-bold">Sonic Flow</h1>
          </div>
          <Button variant="outline">Conectar Wallet</Button>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center gap-8">
        
        <div className="relative flex flex-col items-center justify-center w-full max-w-md my-8">
            <div className="text-center mb-4">
                <h2 className="text-7xl md:text-8xl font-bold font-headline bg-clip-text text-transparent bg-gradient-to-br from-primary to-accent">
                {userEnergy.toLocaleString()}
                </h2>
                <p className="text-muted-foreground font-code mt-2">Energía Acumulada</p>
            </div>
            
            <Button
              onClick={handleFlowClick}
              className="group rounded-full shadow-lg w-48 h-48 sm:w-64 sm:h-64 flex items-center justify-center transition-all duration-200 ease-in-out active:scale-90 focus:outline-none focus:ring-4 focus:ring-primary/50 text-2xl font-bold bg-primary/10 hover:bg-primary/20 border-2 border-primary/30 text-primary-foreground hover:shadow-primary/20 hover:shadow-2xl"
              aria-label="Click to generate energy"
              size="lg"
            >
              Generar Flujo
            </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 w-full max-w-2xl">
            <Card className="shadow-md bg-card/50">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="font-headline text-lg">Flujo Global</CardTitle>
                <Users className="w-5 h-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                <div className="w-full bg-secondary rounded-full h-2.5 my-2">
                    <div className="bg-gradient-to-r from-primary to-accent h-2.5 rounded-full" style={{ width: `${(globalEnergy % 10000) / 100}%` }}></div>
                </div>
                <p className="text-xs text-muted-foreground pt-1">Energía total de la comunidad fluyendo.</p>
                </CardContent>
            </Card>

            <Card className="w-full max-w-2xl shadow-md bg-card/50">
                <CardHeader>
                    <CardTitle className="font-headline">Sincronización de Flujo</CardTitle>
                    <CardDescription>Acumula energía para sincronizarla con la red y obtener recompensas.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="w-full sm:w-auto flex-grow">
                        <Progress value={(userEnergy % 1000) / 10} />
                        <p className="text-sm text-muted-foreground mt-2 font-code">Siguiente sincronización en {1000 - (userEnergy % 1000)} de energía.</p>
                    </div>
                    <Button onClick={() => {}} className="w-full sm:w-auto bg-accent hover:bg-accent/90" disabled={userEnergy < 1000}>
                    <Zap className="mr-2 h-4 w-4" />
                    Sincronizar Flujo
                    </Button>
                </CardContent>
            </Card>
        </div>

        <div className="fixed bottom-4 left-4">
            <Button onClick={handleUpgrade} variant="ghost">
              <Star className="mr-2 h-4 w-4" />
              Ver Ecos
            </Button>
        </div>
      </main>

      <footer className="w-full bg-secondary/50 mt-12">
        <div className="container mx-auto py-4 text-center text-muted-foreground text-sm">
            Construido en la blockchain de Sonic | Encuentra tu ritmo, evoluciona sin prisa.
        </div>
      </footer>
    </div>
  );
}
