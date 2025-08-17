import { useUserStats } from '@/hooks/useUserStats'; // Assuming you have a user stats hook
import { useGeolocation } from '@/hooks/useGeolocation'; // Assuming you have a geolocation hook
import { Card } from '@/components/ui/card'; // Assuming you have a Card component

// Placeholder for formatNumber utility
const formatNumber = (num: number): string => {
  // Implement number formatting logic
  return num.toLocaleString();
};

// Placeholder for getCountryFlag utility
const getCountryFlag = (countryCode?: string | null): string => {
  if (!countryCode || countryCode === 'XX') return '❓';
  // Implement logic to get country flag emoji
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127359 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

export const StatsOverview = () => {
  const { userStats } = useUserStats();
  const { country } = useGeolocation();

  const stats = [
    {
      title: "Total de Clicks",
      value: userStats.totalClicks,
      icon: "👆",
      change: "+12% vs ayer" // This is a placeholder, implement actual calculation later
    },
    {
      title: "Tokens Pendientes",
      value: userStats.pendingTokens,
      icon: "⏳",
      suffix: "$FLOW"
    },
    {
      title: "Tokens Reclamados",
      value: userStats.claimedTokens,
      icon: "💰",
      suffix: "$FLOW"
    },
    {
      title: "Ranking País",
      value: userStats.countryRank,
      icon: getCountryFlag(country?.code),
      suffix: `de ${formatNumber(userStats.countryTotal || 0)}` // Use optional chaining and provide a default value
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">{stat.title}</p>
              <p className="text-2xl font-bold">
                {formatNumber(stat.value)} {stat.suffix}
              </p>
              {stat.change && (
                <p className="text-sm text-green-600">{stat.change}</p>
              )}
            </div>
            <span className="text-3xl">{stat.icon}</span>
          </div>
        </Card>
      ))}
    </div>
  );
};