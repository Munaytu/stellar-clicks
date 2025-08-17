import { CountryRankings } from '@/components/dashboard/CountryRankings'; // Assuming this component exists
// import { CountryChart } from '@/components/charts/CountryChart'; // Assuming you will create this component

export default function CountryRankingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Rankings por Países</h1>
        <p className="text-gray-600">Compara el progreso entre naciones</p>
      </div>

      {/* The CountryRankings component created earlier can be used here */}
      <CountryRankings />

      {/* You might want to include a CountryChart here later */}
      {/* <CountryChart /> */}
    </div>
  );
}