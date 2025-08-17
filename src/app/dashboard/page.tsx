import { StatsOverview } from '@/components/dashboard/StatsOverview'; // Assuming this component exists
import { TokenManager } from '@/components/dashboard/TokenManager'; // Assuming this component exists
import { ActiveEvents } from '@/components/dashboard/ActiveEvents'; // Assuming this component exists
import { GlobalMap } from '@/components/dashboard/GlobalMap'; // Assuming this component exists
import { CountryRankings } from '@/components/dashboard/CountryRankings'; // Assuming this component exists
import { ClaimHistory } from '@/components/dashboard/ClaimHistory'; // Assuming this component exists

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-600">Gestiona tu progreso en Sonic Flow</p>
      </div>

      <StatsOverview />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Placeholder components - replace with actual implementations */}
        <TokenManager />
        {/* <ActiveEvents /> */}
         <div className="border rounded-lg p-4"><h3 className="text-xl font-bold mb-4">🏆 Active Events</h3><p>Event component goes here</p></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <GlobalMap />
        </div>
        <CountryRankings />
      </div>

      {/* Placeholder component - replace with actual implementation */}
      {/* <ClaimHistory /> */}
       <div className="border rounded-lg p-4"><h3 className="text-xl font-bold mb-4">📜 Claim History</h3><p>Claim history component goes here</p></div>
    </div>
  );
}
