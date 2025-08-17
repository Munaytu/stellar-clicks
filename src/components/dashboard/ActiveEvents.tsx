import { Card } from '@/components/ui/card'; // Assuming you have a Card component
import { Badge } from '@/components/ui/badge'; // Assuming you have a Badge component
// import { useEvents } from '@/hooks/useEvents'; // Assuming you have an events hook
// import { CountryBattleProgress } from './CountryBattleProgress'; // Assuming you will create this component
// import { Event } from '@/types/events'; // Assuming you have event types

// Placeholder for useEvents hook
const useEvents = () => ({
    activeEvents: [ // Placeholder data
        {
            id: 'event-1',
            name: 'Batalla de Países Semanal',
            description: '¡Compite con tu país para ganar recompensas!',
            type: 'country_battle',
            startDate: new Date(),
            endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Ends in 7 days
            isActive: true,
            rewards: [],
            participants: 10000,
            rules: [],
            participatingCountries: ['US', 'BR', 'MX'],
            countryScores: { US: 100000, BR: 80000, MX: 60000 },
        },
         {
            id: 'event-2',
            name: 'Desafío Global de Clicks',
            description: 'Alcanza hitos de clicks globales para premios individuales.',
            type: 'global_challenge',
            startDate: new Date(),
            endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // Ends in 3 days
            isActive: true,
            rewards: [],
            participants: 50000,
            rules: [],
        },
    ],
    isLoading: false,
});

// Placeholder for getEventTypeLabel utility
const getEventTypeLabel = (type: string): string => {
  if (type === 'country_battle') return 'Batalla de País';
  if (type === 'global_challenge') return 'Desafío Global';
  if (type === 'weekly_contest') return 'Concurso Semanal';
  return 'Evento';
};

// Placeholder for getTimeRemaining utility
const getTimeRemaining = (endDate: Date): string => {
  const now = new Date().getTime();
  const end = endDate.getTime();
  const distance = end - now;

  if (distance < 0) return 'Terminado';

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
};

// Placeholder component for CountryBattleProgress
const CountryBattleProgress = ({ event }: { event: any }) => {
     console.log('Rendering CountryBattleProgress (placeholder)', event);
    // Implement progress bar or visual for country battle
    return <div className="text-sm text-gray-600">Progreso de batalla de país va aquí</div>;
};

export const ActiveEvents = () => {
  const { activeEvents } = useEvents();

  return (
    <Card className="p-6">
      <h3 className="text-xl font-bold mb-4">🏆 Eventos Activos</h3>

      {activeEvents.map(event => (
        <div key={event.id} className="border rounded-lg p-4 mb-4">
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-semibold">{event.name}</h4>
            <Badge variant={event.type === 'country_battle' ? 'destructive' : 'default'}>
              {getEventTypeLabel(event.type)}
            </Badge>
          </div>

          <p className="text-sm text-gray-600 mb-3">{event.description}</p>

          {event.type === 'country_battle' && (
            <CountryBattleProgress event={event} /> // Use the placeholder component
          )}

          <div className="flex justify-between items-center mt-3">
            <span className="text-sm">
              ⏱️ Termina en: {getTimeRemaining(new Date(event.endDate))} {/* Convert endDate string to Date */}
            </span>
            <span className="text-sm">
              👥 {event.participants} participantes
            </span>
          </div>
        </div>
      ))}
       {activeEvents.length === 0 && (
          <p className="text-center text-gray-500">No hay eventos activos en este momento.</p>
       )}
    </Card>
  );
};