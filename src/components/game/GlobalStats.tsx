"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

interface GlobalStatsProps {
  globalEnergy: number;
}

export function GlobalStats({ globalEnergy }: GlobalStatsProps) {
  return (
    <Card className="shadow-md bg-card/50">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="font-headline text-lg">Flujo Global</CardTitle>
        <Users className="w-5 h-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{Math.floor(globalEnergy).toLocaleString()}</div>
        <p className="text-xs text-muted-foreground pt-1">Energía total de la comunidad fluyendo.</p>
      </CardContent>
    </Card>
  );
}
