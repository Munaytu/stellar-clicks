import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase'; // Assuming you have a supabase client
import { RedisService } from '@/lib/redis'; // Assuming you have a Redis service
import { useAuth } from './useAuth'; // Assuming you have an auth hook

// Placeholder for Country type
interface Country {
  code: string;
  name: string | null;
}

export const useGeolocation = () => {
  const [country, setCountry] = useState<Country | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useAuth();

  useEffect(() => {
    const detectAndSaveCountry = async () => {
      if (!user) {
        setIsLoading(false);
        return; // Do not proceed if user is not authenticated
      }
      try {
        // 1. Verificar si ya tenemos el país en Supabase
        const { data: profile } = await supabase
          .from('profiles')
          .select('country_code, country_name')
          .eq('id', user.id)
          .single();

        if (profile?.country_code) {
          setCountry({
            code: profile.country_code,
            name: profile.country_name,
          } as Country); // Cast to Country type
          setIsLoading(false);
          return;
        }

        // 2. Detectar país por IP y timezone
        // This will call your Next.js API route for geolocation
        const response = await fetch('/api/geolocation');
         if (!response.ok) {
             // Handle cases where the geolocation API fails
             console.error('Geolocation API failed', response.status);
             setCountry({ code: 'XX', name: 'Unknown' }); // Set a default unknown country
             setIsLoading(false);
             return;
         }
        const geoData = await response.json();

        const detectedCountry = {
          code: geoData.country_code,
          name: geoData.country_name,
        };

        // 3. Guardar en Supabase para futuras sesiones
        // Ensure the user object has the country_code property before updating
        if (user.id) {
            await supabase
              .from('profiles')
              .update({
                country_code: detectedCountry.code,
                country_name: detectedCountry.name,
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
              })
              .eq('id', user.id);
        }

        // 4. Actualizar cache Redis (Placeholder)
        // await RedisService.updateCountryStats(detectedCountry.code, 0);
         console.log('Updating country stats in Redis (placeholder)');

        setCountry(detectedCountry as Country); // Cast to Country type
      } catch (error) {
        console.error('Error detecting country:', error);
        setCountry({ code: 'XX', name: 'Unknown' });
      } finally {
        setIsLoading(false);
      }
    };

    detectAndSaveCountry();
  }, [user]); // Added user to dependencies

  return { country, isLoading };
};
