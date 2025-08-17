import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Placeholder for Supabase Database type (replace with generated type from supabase CLI)
export type Database = {
 public: {
 Tables: {
 profiles: {
 Row: {
 id: string;
 wallet_address: string | null;
 username: string | null;
 country_code: string | null;
 country_name: string | null;
 created_at: string;
 last_active: string;
 is_verified: boolean; // Added is_verified based on schema
 avatar_url: string | null; // Added avatar_url based on schema
 timezone: string | null; // Added timezone based on schema
 };
 Insert: {
 id: string;
 wallet_address?: string | null;
 username?: string | null;
 country_code?: string | null;
 country_name?: string | null;
 is_verified?: boolean;
 avatar_url?: string | null;
 timezone?: string | null;
 created_at?: string; // Allow optional insert for created_at
 last_active?: string; // Allow optional insert for last_active
 };
 Update: {
 wallet_address?: string | null;
 username?: string | null;
 country_code?: string | null;
 last_active?: string;
 is_verified?: boolean;
 avatar_url?: string | null;
 timezone?: string | null;
 };
 };
 user_stats: { // Added user_stats table type
 Row: {
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
 };
 Insert: {
 user_id: string;
 total_clicks?: number;
 clicks_today?: number;
 clicks_this_week?: number;
 clicks_this_month?: number;
 pending_tokens?: number;
 claimed_tokens?: number;
 last_click_at?: string | null;
 streak_days?: number;
 best_day_clicks?: number;
 best_day_date?: string | null;
 updated_at?: string;
 };
 Update: {
 total_clicks?: number;
 clicks_today?: number;
 clicks_this_week?: number;
 clicks_this_month?: number;
 pending_tokens?: number;
 claimed_tokens?: number;
 last_click_at?: string | null;
 streak_days?: number;
 best_day_clicks?: number;
 best_day_date?: string | null;
 updated_at?: string;
 };
 };
 clicks_history: { // Added clicks_history table type
 Row: {
 id: string;
 user_id: string;
 clicks_amount: number;
 timestamp: string;
 country_code: string | null;
 session_id: string | null; // Assuming session_id can be null
 ip_hash: string | null; // Assuming ip_hash can be null
 };
 Insert: {
 user_id: string;
 clicks_amount: number;
 timestamp?: string;
 country_code?: string | null;
 session_id?: string | null;
 ip_hash?: string | null;
 };
 Update: {
 clicks_amount?: number;
 timestamp?: string;
 country_code?: string | null;
 session_id?: string | null;
 ip_hash?: string | null;
 };
 };
 token_claims: { // Added token_claims table type
 Row: {
 id: string;
 user_id: string;
 amount: number;
 transaction_hash: string | null;
 status: string; // Use a union type if possible: 'pending' | 'completed' | 'failed'
 claimed_at: string;
 blockchain_confirmed_at: string | null;
 };
 Insert: {
 user_id: string;
 amount: number;
 transaction_hash?: string | null;
 status: string; // Use a union type if possible
 claimed_at?: string;
 blockchain_confirmed_at?: string | null;
 };
 Update: {
 amount?: number;
 transaction_hash?: string | null;
 status?: string; // Use a union type if possible
 claimed_at?: string;
 blockchain_confirmed_at?: string | null;
 };
 };
 country_stats: { // Added country_stats table type
 Row: {
 country_code: string;
 country_name: string;
 total_clicks: number;
 active_users: number;
 total_users: number;
 avg_clicks_per_user: number;
 last_updated: string;
 };
 Insert: {
 country_code: string;
 country_name: string;
 total_clicks?: number;
 active_users?: number;
 total_users?: number;
 avg_clicks_per_user?: number;
 last_updated?: string;
 };
 Update: {
 country_code?: string;
 country_name?: string;
 total_clicks?: number;
 active_users?: number;
 total_users?: number;
 avg_clicks_per_user?: number;
 last_updated?: string;
 };
 };
 events: { // Added events table type
 Row: {
 id: string;
 name: string;
 description: string | null;
 type: string; // Use a union type if possible: 'country_battle' | 'global_challenge' | 'weekly_contest'
 start_date: string | null;
 end_date: string | null;
 is_active: boolean;
 rules: any | null; // Use a more specific type if possible (JSONB)
 rewards: any | null; // Use a more specific type if possible (JSONB)
 created_at: string;
 };
 Insert: {
 name: string;
 description?: string | null;
 type: string; // Use a union type if possible
 start_date?: string | null;
 end_date?: string | null;
 is_active?: boolean;
 rules?: any | null;
 rewards?: any | null;
 created_at?: string;
 };
 Update: {
 name?: string;
 description?: string | null;
 type?: string; // Use a union type if possible
 start_date?: string | null;
 end_date?: string | null;
 is_active?: boolean;
 rules?: any | null;
 rewards?: any | null;
 created_at?: string;
 };
 };
 event_participations: { // Added event_participations table type
 Row: {
 id: string;
 event_id: string;
 user_id: string;
 country_code: string | null;
 score: number;
 joined_at: string;
 };
 Insert: {
 event_id: string;
 user_id: string;
 country_code?: string | null;
 score?: number;
 joined_at?: string;
 };
 Update: {
 event_id?: string;
 user_id?: string;
 country_code?: string | null;
 score?: number;
 joined_at?: string;
 };
 };
 };
 Views: { // Added Views based on schema (country_stats_view)
 country_stats_view: { // Assuming this view exists
 Row: {
 country_code: string | null;
 country_name: string | null;
 total_clicks: number | null;
 active_users: number | null;
 total_users: number | null;
 avg_clicks_per_user: number | null;
 last_updated: string | null;
 };
 };
 };
 Functions: { // Added Functions placeholder
 [_ in never]: never;
 };
 Enums: { // Added Enums placeholder
 [_ in never]: never;
 };
 CompositeTypes: { // Added CompositeTypes placeholder
 [_ in never]: never;
 };
 };
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
 realtime: {
 params: {
 eventsPerSecond: 10 // Limitar eventos real-time
 }
 }
});

// Cliente tipado
export const typedSupabase = supabase as SupabaseClient<Database>;
"use client";
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  realtime: {
    params: {
      eventsPerSecond: 10 // Limitar eventos real-time
    }
  }
});
