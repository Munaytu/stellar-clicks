// Define user-related types here

export interface User {
  id: string;
  wallet_address: string | null;
  username: string | null;
  country_code: string | null;
  country_name: string | null;
  avatar_url: string | null;
  created_at: string;
  last_active: string;
  is_verified: boolean;
  // Add other user properties as needed
}

export interface UserStats {
  id: string;
  user_id: string;
  total_clicks: number;
  clicks_today: number;
  clicks_this_week: number;
  clicks_this_month: number;
  pending_tokens: number;
  claimed_tokens: number;
  last_click_at: string | null;
  streak_days: number;
  best_day_clicks: number;
  best_day_date: string | null;
  updated_at: string;
  // Add other user stats properties as needed
}

// Add other user-related types like session info, etc.

console.log('User types file created (placeholder)');