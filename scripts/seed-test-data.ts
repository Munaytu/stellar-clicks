import { supabase } from '@/lib/supabase'; // Assuming you have a supabase client
// import { RedisService } from '@/lib/redis'; // Assuming you have a Redis service

export async function seedTestData() {
  try {
    console.log('🌱 Creando datos de prueba...');

    const countries = [
      { code: 'US', name: 'United States' },
      { code: 'BR', name: 'Brazil' },
      { code: 'IN', name: 'India' },
      { code: 'MX', name: 'Mexico' },
      { code: 'JP', name: 'Japan' },
    ];

    // Create country_stats entries first if they don't exist
    for (const country of countries) {
        await supabase.from('country_stats').upsert({
            country_code: country.code,
            country_name: country.name,
             // Provide default values for other fields
             total_clicks: 0,
             active_users: 0,
             total_users: 0,
             avg_clicks_per_user: 0,
        });
    }

    // Crear usuarios de prueba
    for (let i = 0; i < 100; i++) {
      const country = countries[Math.floor(Math.random() * countries.length)];
      const clicks = Math.floor(Math.random() * 10000) + 100;
      const userId = `test-user-${i}-${Date.now()}` // Generate a unique user ID

      // Create profile
      await supabase.from('profiles').insert({
        id: userId,
        wallet_address: `0x${Math.random().toString(16).substr(2, 40)}`,
        username: `TestUser${i}`,
        country_code: country.code,
        country_name: country.name,
        created_at: new Date().toISOString(),
         last_active: new Date().toISOString(),
          is_verified: true,
      });

      // Create user_stats
      await supabase.from('user_stats').insert({
        user_id: userId,
        total_clicks: clicks,
        pending_tokens: clicks * 1.0,
        clicks_today: Math.floor(clicks / 7), // Example daily clicks
        clicks_this_week: Math.floor(clicks / 4), // Example weekly clicks
        clicks_this_month: clicks,
        claimed_tokens: 0,
        last_click_at: new Date().toISOString(),
        streak_days: Math.floor(Math.random() * 30), // Example streak
        best_day_clicks: Math.floor(clicks / 5), // Example best day clicks
        best_day_date: new Date().toISOString().split('T')[0], // Example best day date
         updated_at: new Date().toISOString(),
      });

      // Actualizar Redis (Placeholder)
      // await RedisService.updateGlobalRanking(userId, clicks);
       console.log(`Updating global ranking for user ${userId} in Redis (placeholder)`);
    }

    console.log('✅ Datos de prueba creados');
  } catch (error) {
    console.error('❌ Error al crear datos de prueba:', error);
  }
}