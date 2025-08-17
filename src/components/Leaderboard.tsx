"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Award } from "lucide-react";

// Datos simulados para la tabla de clasificación
const leaderboardData = [
  { rank: 1, user: "Maestro Zenon", energy: 1234567, reward: "🏆 Eco Raro" },
  { rank: 2, user: "Viajero Astral", energy: 1198765, reward: "500 $FLOW" },
  { rank: 3, user: "Susurro Cósmico", energy: 1054321, reward: "250 $FLOW" },
  { rank: 4, user: "Navegante Estelar", energy: 987654, reward: "100 $FLOW" },
  { rank: 5, user: "Oráculo del Flujo", energy: 950123, reward: "50 $FLOW" },
];

export function Leaderboard() {
  return (
    <Card className="shadow-lg bg-card/50">
      <CardHeader>
          <div className="flex items-center gap-2">
            <Award className="w-6 h-6 text-primary" />
            <CardTitle className="font-headline text-2xl">Maestros del Flujo</CardTitle>
          </div>
          <CardDescription>
            Los jugadores con más energía recibirán recompensas on-chain.
          </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Rango</TableHead>
              <TableHead>Maestro (Wallet)</TableHead>
              <TableHead>Recompensa</TableHead>
              <TableHead className="text-right">Energía</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaderboardData.map((entry) => (
              <TableRow key={entry.rank}>
                <TableCell className="font-medium text-lg">{entry.rank}</TableCell>
                <TableCell className="font-code">{entry.user}</TableCell>
                <TableCell className="font-medium text-accent">{entry.reward}</TableCell>
                <TableCell className="text-right font-bold font-code text-lg text-primary">
                  {entry.energy.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
