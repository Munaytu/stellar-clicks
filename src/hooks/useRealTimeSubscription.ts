import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase'; // Assuming you have a supabase client

export const useRealTimeSubscription = (
  table: string,
  callback: (payload: any) => void,
  filter?: string
) => {
  useEffect(() => {
    let subscription: any; // Use a more specific type if available

    const setupSubscription = async () => {
      subscription = supabase
        .channel(`realtime-${table}`)
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: table,
            filter: filter
          },
          callback
        )
        .subscribe();
    };

    setupSubscription();

    return () => {
      if (subscription) {
        supabase.removeChannel(subscription);
      }
    };
  }, [table, callback, filter]); // Added dependencies
};

// Hook específico para rankings globales
export const useGlobalRankingsRealTime = () => {
  const [rankings, setRankings] = useState<any[]>([]); // Use a more specific type for rankings
  const [isConnected, setIsConnected] = useState(false);

  useRealTimeSubscription('country_stats', (payload) => {
    if (payload.eventType === 'UPDATE') {
      setRankings(prev =>
        prev.map(country =>
          country.country_code === payload.new.country_code
            ? { ...country, ...payload.new }
            : country
        )
      );
    }
  });

  // Indicador de conexión
  useEffect(() => {
    const channel = supabase.channel('connection-status')
      .on('system', {}, (status: any) => { // Use a more specific type for status
        setIsConnected(status === 'ONLINE');
      })
      .subscribe();

    return () => {
        supabase.removeChannel(channel)
    };
  }, []);

  return { rankings, isConnected };
};
