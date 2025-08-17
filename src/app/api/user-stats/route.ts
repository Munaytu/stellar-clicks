import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { RedisService } from '@/lib/redis'; // Assuming RedisService is implemented here
import { Database } from '@/types/supabase'; // Assuming you have a supabase types file

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const typedSupabase = supabase as SupabaseClient<Database>; // Replace any with SupabaseClient<Database> once types are generated

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'User ID required' }, { status: 400 });
  }

  try {
    // 1. Obtener stats básicas desde Supabase
    const { data: userStats } = await typedSupabase
      .from('user_stats')
      .select(
        `
        *,
        profiles!inner(
          country_code,
          country_name,
          username,
          avatar_url
        )
      `
      )
      .eq('user_id', userId)
      .single();

    if (!userStats) {
        return NextResponse.json({ error: 'User stats not found' }, { status: 404 });
    }

    // 2. Obtener rankings desde Redis
    // Replace with actual RedisService calls once implemented
    const [globalRank, countryRank] = await Promise.all([
      Promise.resolve(0), // Placeholder for RedisService.getUserGlobalRank(userId)
      Promise.resolve(0)  // Placeholder for RedisService.getUserCountryRank(userId, userStats.profiles.country_code)
    ]);

    // 3. Combinar datos
    const enrichedStats = {
      ...userStats,
      globalRank,
      countryRank,
      country: userStats.profiles,
    };

    return NextResponse.json(enrichedStats);
  } catch (error) {
    console.error('Error fetching user stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user stats' },
      { status: 500 }
    );
  }
}