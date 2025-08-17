import { useCountryData } from '@/hooks/useCountryData'; // Assuming you have a hook for country data
import { useRealTimeSubscription } from '@/hooks/useRealTimeSubscription'; // Assuming you have a hook for real-time subscriptions
import { Card } from '@/components/ui/card'; // Assuming you have a Card component
import { Badge } from '@/components/ui/badge'; // Assuming you have a Badge component

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

export const CountryRankings = () => {
  const { countryStats, isLoading, refreshCountryStats } = useCountryData(); // Added refreshCountryStats

  // Suscripción en tiempo real para actualizaciones
  useRealTimeSubscription('country_stats', (payload) => {
    // Actualizar rankings cuando hay cambios
    if (payload.eventType === 'UPDATE') {
      refreshCountryStats(); // Call refresh function
    }
  });

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">🌍 Rankings Globales</h3>
        <Badge variant="outline" className="text-green-600">
          🔴 En vivo
        </Badge>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          <p>Cargando rankings...</p>
        ) : (
          countryStats.map((country, index) => (
            <div
              key={country.country_code} // Use country_code as key
              className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-8 h-8 bg-yellow-400 text-yellow-900 rounded-full font-bold text-sm">
                  {index + 1}
                </div>
                <span className="text-3xl">{getCountryFlag(country.country_code)}</span> {/* Use country_code */}
                <div>
                  <p className="font-semibold">{country.country_name}</p> {/* Use country_name */}
                  <p className="text-sm text-gray-600">
                    👥 {formatNumber(country.active_users || 0)} usuarios activos {/* Use active_users */}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-blue-600">
                  {formatNumber(country.total_clicks)} {/* Use total_clicks */}
                </p>
                <p className="text-sm text-gray-600">clicks totales</p>
                <p className="text-xs text-green-600">
                  +{formatNumber(country.clicksToday || 0)} hoy {/* Use clicksToday */}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Indicador de actualización en tiempo real */}
      <div className="mt-4 text-center">
        <div className="inline-flex items-center space-x-2 text-sm text-gray-500">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Actualizándose en tiempo real</span>
        </div>
      </div>
    </Card>
  );
};
