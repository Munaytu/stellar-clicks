export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      clicks_history: {
        Row: {
          clicks_amount: number
          country_code: string | null
          id: string
          ip_hash: string | null
          session_id: string | null
          timestamp: string
          user_id: string | null
        }
        Insert: {
          clicks_amount: number
          country_code?: string | null
          id?: string
          ip_hash?: string | null
          session_id?: string | null
          timestamp?: string
          user_id?: string | null
        }
        Update: {
          clicks_amount?: number
          country_code?: string | null
          id?: string
          ip_hash?: string | null
          session_id?: string | null
          timestamp?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "clicks_history_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      country_stats: {
        Row: {
          active_users: number | null
          avg_clicks_per_user: number | null
          country_code: string
          country_name: string
          last_updated: string | null
          total_clicks: number | null
          total_users: number | null
        }
        Insert: {
          active_users?: number | null
          avg_clicks_per_user?: number | null
          country_code: string
          country_name: string
          last_updated?: string | null
          total_clicks?: number | null
          total_users?: number | null
        }
        Update: {
          active_users?: number | null
          avg_clicks_per_user?: number | null
          country_code?: string
          country_name?: string
          last_updated?: string | null
          total_clicks?: number | null
          total_users?: number | null
        }
        Relationships: []
      }
      event_participations: {
        Row: {
          country_code: string | null
          event_id: string | null
          id: string
          joined_at: string
          score: number | null
          user_id: string | null
        }
        Insert: {
          country_code?: string | null
          event_id?: string | null
          id?: string
          joined_at?: string
          score?: number | null
          user_id?: string | null
        }
        Update: {
          country_code?: string | null
          event_id?: string | null
          id?: string
          joined_at?: string
          score?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "event_participations_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_participations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      events: {
        Row: {
          created_at: string
          description: string | null
          end_date: string | null
          id: string
          is_active: boolean | null
          name: string
          rewards: Json | null
          rules: Json | null
          start_date: string | null
          type: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          rewards?: Json | null
          rules?: Json | null
          start_date?: string | null
          type?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          rewards?: Json | null
          rules?: Json | null
          start_date?: string | null
          type?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          country_code: string | null
          country_name: string | null
          created_at: string
          id: string
          is_verified: boolean | null
          last_active: string
          timezone: string | null
          username: string | null
          wallet_address: string | null
        }
        Insert: {
          avatar_url?: string | null
          country_code?: string | null
          country_name?: string | null
          created_at?: string
          id: string
          is_verified?: boolean | null
          last_active?: string
          timezone?: string | null
          username?: string | null
          wallet_address?: string | null
        }
        Update: {
          avatar_url?: string | null
          country_code?: string | null
          country_name?: string | null
          created_at?: string
          id?: string
          is_verified?: boolean | null
          last_active?: string
          timezone?: string | null
          username?: string | null
          wallet_address?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      token_claims: {
        Row: {
          amount: number
          blockchain_confirmed_at: string | null
          claimed_at: string
          id: string
          status: string | null
          transaction_hash: string | null
          user_id: string | null
        }
        Insert: {
          amount: number
          blockchain_confirmed_at?: string | null
          claimed_at?: string
          id?: string
          status?: string | null
          transaction_hash?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number
          blockchain_confirmed_at?: string | null
          claimed_at?: string
          id?: string
          status?: string | null
          transaction_hash?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "token_claims_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      user_stats: {
        Row: {
          best_day_clicks: number | null
          best_day_date: string | null
          claimed_tokens: number | null
          clicks_this_month: number | null
          clicks_this_week: number | null
          clicks_today: number | null
          id: string
          last_click_at: string | null
          pending_tokens: number | null
          streak_days: number | null
          total_clicks: number | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          best_day_clicks?: number | null
          best_day_date?: string | null
          claimed_tokens?: number | null
          clicks_this_month?: number | null
          clicks_this_week?: number | null
          clicks_today?: number | null
          id?: string
          last_click_at?: string | null
          pending_tokens?: number | null
          streak_days?: number | null
          total_clicks?: number | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          best_day_clicks?: number | null
          best_day_date?: string | null
          claimed_tokens?: number | null
          clicks_this_month?: number | null
          clicks_this_week?: number | null
          clicks_today?: number | null
          id?: string
          last_click_at?: string | null
          pending_tokens?: number | null
          streak_days?: number | null
          total_clicks?: number | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_stats_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
