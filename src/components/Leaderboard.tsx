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

// Mock data for the leaderboard
const leaderboardData = [
  { rank: 1, user: "GDQJ...L5XN", clicks: 1234567 },
  { rank: 2, user: "GAI3...T7B4", clicks: 1198765 },
  { rank: 3, user: "GC2B...QWXY", clicks: 1054321 },
  { rank: 4, user: "GDRS...PK7A", clicks: 987654 },
  { rank: 5, user: "GB7C...Z2K3", clicks: 950123 },
  { rank: 6, user: "GABZ...LMNP", clicks: 888888 },
  { rank: 7, user: "GFKH...RSTV", clicks: 812345 },
  { rank: 8, user: "GCEY...WXYZ", clicks: 777777 },
];

export function Leaderboard() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Trophy className="w-6 h-6 text-primary" />
          <CardTitle className="font-headline text-2xl">Leaderboard</CardTitle>
        </div>
        <CardDescription>
          Top clickers on the Stellar network! Updated every 5 minutes.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Rank</TableHead>
              <TableHead>User</TableHead>
              <TableHead className="text-right">Clicks</TableHead>
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
