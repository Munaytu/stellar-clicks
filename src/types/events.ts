// Define event-related types here

export interface EventRule { // Assuming EventRule is a separate interface
    type: string; // e.g., 'min_clicks', 'allowed_countries'
    value: any;
    // Add other rule properties
}

export interface EventReward { // Assuming EventReward is a separate interface
    type: string; // e.g., 'tokens', 'badge', 'multiplier'
    value: any;
    // Add other reward properties
}

export interface Event {
  id: string;
  name: string;
  description: string;
  type: 'country_battle' | 'global_challenge' | 'weekly_contest';
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  rewards: EventReward[];
  participants: number; // Consider if this is the best place for participant count
  rules: EventRule[];
  // Add other event properties as needed
}

export interface CountryBattle extends Event {
  type: 'country_battle'; // Narrow down the type
  participatingCountries: string[];
  countryScores: Record<string, number>; // Use Record for key-value pairs
  winningCountry?: string; // Optional winning country
}

// Add other event-related types as needed

console.log('Event types file created');