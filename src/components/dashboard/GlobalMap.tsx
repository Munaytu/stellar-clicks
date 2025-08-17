import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { Card } from '@/components/ui/card'; // Assuming you have a Card component
import { useCountryData } from '@/hooks/useCountryData'; // Assuming you have a hook for country data

// Placeholder for world-110m.json - you'll need to ensure this file is in your public directory
const geoUrl = "/world-110m.json";

export const GlobalMap = () => {
  const { countryStats } = useCountryData();

  const getCountryColor = (countryCode: string) => {
    const country = countryStats.find(c => c.country_code === countryCode); // Use country_code
    if (!country) return '#f0f0f0';

    // Ensure countryStats is not empty to avoid division by zero
    const maxClicks = Math.max(...countryStats.map(c => c.total_clicks || 0)); // Use total_clicks and handle potential undefined
    if (maxClicks === 0) return '#f0f0f0';

    const intensity = (country.total_clicks || 0) / maxClicks; // Use total_clicks and handle potential undefined
    return `hsl(120, 70%, ${90 - intensity * 40}%)`;
  };

  return (
    <Card className="p-6">
      <h3 className="text-xl font-bold mb-4">🌍 Actividad Global</h3>
      <div className="h-96">
        <ComposableMap data-tip="">
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={getCountryColor(geo.properties.ISO_A2)}
                  stroke="#fff"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: "none" }, // Add default style to remove outline
                    hover: { fill: "#FF5722", cursor: "pointer", outline: "none" }, // Add outline: none to hover style
                    pressed: { outline: "none" }, // Add pressed style
                  }}
                  onMouseEnter={() => {
                    // Mostrar tooltip con datos del país (Implement tooltip logic later)
                    console.log('Mouse entered', geo.properties.ISO_A2);
                  }}
                   onMouseLeave={() => {
                    // Hide tooltip
                     console.log('Mouse left', geo.properties.ISO_A2);
                  }}
                />
              ))
            }
          </Geographies>
        </ComposableMap>
      </div>

      {/* Leyenda */}
      <div className="mt-4 flex items-center justify-center space-x-4 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-200 rounded"></div>
          <span>Baja actividad</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span>Media actividad</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-800 rounded"></div>
          <span>Alta actividad</span>
        </div>
      </div>
    </Card>
  );
};