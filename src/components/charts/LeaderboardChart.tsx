import { Card } from '@/components/ui/card'; // Assuming you have a Card component
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'; // Assuming you have table components
// import { useRankings } from '@/hooks/useRankings'; // Assuming you have a hook for rankings

export const LeaderboardChart = () => {
  // const { globalRankings } = useRankings(); // Assuming global rankings are available

  // Placeholder data for the leaderboard
  const rankings = [
    { rank: 1, username: 'PlayerOne', clicks: 15000 },
    { rank: 2, username: 'PlayerTwo', clicks: 12000 },
    { rank: 3, username: 'PlayerThree', clicks: 10000 },
    { rank: 4, username: 'PlayerFour', clicks: 9000 },
    { rank: 5, username: 'PlayerFive', clicks: 8000 },
  ];

  return (
    <Card className="p-6">
      <h3 className="text-xl font-bold mb-4">Tabla de Líderes Global</h3>
      <div className="h-64 overflow-y-auto">
        <Table>
          <TableCaption>Top jugadores globales por clicks</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">Rank</TableHead>
              <TableHead>Usuario</TableHead>
              <TableHead className="text-right">Clicks</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rankings.map((player) => (
              <TableRow key={player.rank}>
                <TableCell className="font-medium">{player.rank}</TableCell>
                <TableCell>{player.username}</TableCell>
                <TableCell className="text-right">{player.clicks.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};