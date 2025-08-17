"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Star, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ClaimPanelProps {
  userEnergy: number;
}

export function ClaimPanel({ userEnergy }: ClaimPanelProps) {
    const { toast } = useToast();
    const handleUpgrade = () => {
        toast({
        title: "Próximamente",
        description: "Los Ecos (NFTs) y las mejoras de flujo estarán disponibles pronto.",
        });
    };
  
  return (
    <>
      <Card className="w-full max-w-2xl shadow-md bg-card/50">
        <CardHeader>
          <CardTitle className="font-headline">Sincronización de Flujo</CardTitle>
          <CardDescription>Acumula energía para sincronizarla con la red y obtener recompensas.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row items-center gap-4">
          <div className="w-full sm:w-auto flex-grow">
            <Progress value={(userEnergy % 1000) / 10} />
            <p className="text-sm text-muted-foreground mt-2 font-code">Siguiente sincronización en {1000 - Math.floor(userEnergy % 1000)} de energía.</p>
          </div>
          <Button onClick={() => {}} className="w-full sm:w-auto bg-accent hover:bg-accent/90" disabled={userEnergy < 1000}>
            <Zap className="mr-2 h-4 w-4" />
            Sincronizar Flujo
          </Button>
        </CardContent>
      </Card>
      <div className="fixed bottom-4 left-4">
        <Button onClick={handleUpgrade} variant="ghost">
          <Star className="mr-2 h-4 w-4" />
          Ver Ecos
        </Button>
      </div>
    </>
  );
}
