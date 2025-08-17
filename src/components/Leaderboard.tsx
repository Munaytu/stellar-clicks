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
import { Trophy } from "lucide-react";

// Datos simulados para la tabla de clasificación
const leaderboardData = [
  { rank: 1, user: "Perezoso Alfa", clicks: 1234567 },
  { rank: 2, user: "Clickeador Cósmico", clicks: 1198765 },
  { rank: 3, user: "Maestro de la Siesta", clicks: 1054321 },
  { rank: 4, user: "Soñador Supremo", clicks: 987654 },
  { rank: 5, user: "Perezoso Veloz", clicks: 950123 },
];

export function Leaderboard() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Trophy className="w-6 h-6 text-primary" />
          <CardTitle className="font-headline text-2xl">Tabla de Clasificación</CardTitle>
        </div>
        <CardDescription>
          Los mejores clickeadores del reino de los perezosos.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Rango</TableHead>
              <TableHead>Usuario</TableHead>
              <TableHead className="text-right">Clics</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaderboardData.map((entry) => (
              <TableRow key={entry.rank}>
                <TableCell className="font-medium">{entry.rank}</TableCell>
                <TableCell className="font-code">{entry.user}</TableCell>
                <TableCell className="text-right font-medium">
                  {entry.clicks.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
