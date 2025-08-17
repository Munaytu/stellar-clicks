"use server";
import { createClient } from 'redis';

let redis: ReturnType<typeof createClient>;

if (process.env.NODE_ENV === 'production') {
    redis = createClient({
        url: process.env.REDIS_URL,
        socket: {
            keepAlive: true,
            reconnectStrategy: retries => Math.min(retries * 50, 500)
        }
    });
} else {
    // Avoid creating multiple connections in development
    if (!global.redis) {
        global.redis = createClient({
            url: process.env.REDIS_URL,
        });
        global.redis.connect().catch(console.error);
    }
    redis = global.redis;
}

redis.on('error', (err) => console.log('Redis Client Error', err));


// Estructuras de datos en Redis
export const REDIS_KEYS = {
  // Rankings en tiempo real (Sorted Sets)
  GLOBAL_RANKING: 'rankings:global',
  COUNTRY_RANKING: (country: string) => `rankings:country:${country}`,
  DAILY_RANKING: (date: string) => `rankings:daily:${date}`,
  
  // Contadores globales (Strings)
  GLOBAL_CLICKS: 'counters:global_clicks',
  COUNTRY_CLICKS: (country: string) => `counters:country:${country}`,
  ACTIVE_USERS: 'counters:active_users',
  
  // Rate limiting (Strings con TTL)
  RATE_LIMIT: (userId: string) => `rate_limit:${userId}`,
  
  // Sessions activas (Sets)
  ACTIVE_SESSIONS: 'sessions:active',
  COUNTRY_ACTIVE: (country: string) => `sessions:country:${country}`,
  
  // Cache de estadísticas (Hashes)
  USER_CACHE: (userId: string) => `cache:user:${userId}`,
  COUNTRY_CACHE: 'cache:countries',
  
  // Real-time events (Pub/Sub channels)
  CLICK_EVENTS: 'events:clicks',
  RANKING_UPDATES: 'events:rankings'
} as const;

// Funciones de cache optimizadas
export class RedisService {
  // Actualizar ranking global
  static async updateGlobalRanking(userId: string, totalClicks: number) {
    if (!redis.isOpen) await redis.connect();
    await redis.zAdd(REDIS_KEYS.GLOBAL_RANKING, { score: totalClicks, value: userId });
  }
  
  // Obtener top usuarios globales
  static async getGlobalLeaderboard(limit: number = 100) {
    if (!redis.isOpen) await redis.connect();
    return await redis.zRangeWithScores(REDIS_KEYS.GLOBAL_RANKING, 0, limit - 1, { REV: true });
  }
  
  // Rate limiting por usuario
  static async checkRateLimit(userId: string, maxClicks: number = 10, windowSecs: number = 60) {
    if (!redis.isOpen) await redis.connect();
    const key = REDIS_KEYS.RATE_LIMIT(userId);
    const current = await redis.get(key);
    
    if (!current) {
      await redis.set(key, '1', { EX: windowSecs });
      return true;
    }
    
    if (parseInt(current) >= maxClicks) {
      return false;
    }
    
    await redis.incr(key);
    return true;
  }
  
  // Actualizar contadores de país
  static async updateCountryStats(countryCode: string, clicksToAdd: number) {
    if (!redis.isOpen) await redis.connect();
    const multi = redis.multi();
    multi.incrBy(REDIS_KEYS.GLOBAL_CLICKS, clicksToAdd);
    multi.incrBy(REDIS_KEYS.COUNTRY_CLICKS(countryCode), clicksToAdd);
    multi.sAdd(REDIS_KEYS.COUNTRY_ACTIVE(countryCode), Date.now().toString());
    await multi.exec();
  }
}

export { redis };
