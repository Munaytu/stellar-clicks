// import { GlobalRankings } from '@/components/dashboard/GlobalRankings'; // Assuming you will create this component
import { LeaderboardChart } from '@/components/charts/LeaderboardChart'; // Assuming you will create this component

export default function GlobalRankingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Rankings Globales</h1>
        <p className="text-gray-600">Descubre a los mejores jugadores</p>
      </div>

      {/* Placeholder for GlobalRankings component or LeaderboardChart */}
      <div className="border rounded-lg p-4"><h3 className="text-xl font-bold mb-4">Global Leaderboard</h3><p>Global rankings component or chart goes here</p></div>

      {/* You might want to include the LeaderboardChart here later */}
      {/* <LeaderboardChart /> */}
    </div>
  );
}
