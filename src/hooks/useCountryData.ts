import { useState, useEffect } from 'react';
// Assuming you will have a type for country stats
interface CountryStats {
  country_code: string;
  country_name: string;
  total_clicks: number;
  active_users: number;
  total_users: number;
  avg_clicks_per_user: number;
  last_updated: string;
  activeUsersNow?: number; // Optional, for real-time
  clicksToday?: number; // Optional, for real-time
}

export const useCountryData = () => {
  const [countryStats, setCountryStats] = useState<CountryStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Fetch data from your API route
        const response = await fetch('/api/country-data');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCountryStats(data.countries);
      } catch (err: any) {
        setError(err.message);
        console.error('Error fetching country data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    // Potentially set up real-time subscription here later

  }, []);

  // Placeholder for refreshing stats (if needed by real-time hook)
  const refreshCountryStats = async () => {
     const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/country-data');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCountryStats(data.countries);
      } catch (err: any) {
        setError(err.message);
        console.error('Error fetching country data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }


  return { countryStats, isLoading, error, refreshCountryStats };
};
