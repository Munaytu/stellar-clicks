// import NodeCache from 'node-cache'; // Example memory cache library
import { NextResponse } from 'next/server';
// import { redis } from './redis'; // Assuming you have a redis client

// Placeholder for a simple in-memory cache
const memoryCache = new Map();

// Placeholder for redis client (replace with actual redis client)
const redis = {
    get: async (key: string) => { console.log(`Getting from redis: ${key} (placeholder)`); return null; },
    setex: async (key: string, ttl: number, value: string) => { console.log(`Setting in redis: ${key} with TTL ${ttl} (placeholder)`); },
    keys: async (pattern: string) => { console.log(`Getting keys from redis with pattern: ${pattern} (placeholder)`); return []; },
    del: async (...keys: string[]) => { console.log(`Deleting keys from redis: ${keys.join(', ')} (placeholder)`); },
};

export class CacheManager {
  // Cache de múltiples niveles
  static async get<T>(key: string): Promise<T | null> {
    try {
      // Nivel 1: Memory cache (más rápido)
      const memoryResult = memoryCache.get(key);
      if (memoryResult) return memoryResult as T; // Cast to T

      // Nivel 2: Redis cache
      const redisResult = await redis.get(key);
      if (redisResult) {
        const parsed = JSON.parse(redisResult);
        memoryCache.set(key, parsed, 60000); // Cache en memoria por 1min
        return parsed as T; // Cast to T
      }

      // Nivel 3: Database fallback se maneja en cada hook específico
      return null;
    } catch (error) {
      console.error('Cache get error:', error);
      return null;
    }
  }

  static async set<T>(key: string, value: T, ttlSeconds: number = 3600): Promise<void> {
    try {
      // Guardar en ambos caches
      memoryCache.set(key, value, ttlSeconds * 1000);
      await redis.setex(key, ttlSeconds, JSON.stringify(value));
    } catch (error) {
      console.error('Cache set error:', error);
    }
  }

  // Invalidación inteligente
  static async invalidate(pattern: string): Promise<void> {
    try {
      // Limpiar memory cache
      memoryCache.clear(); // Use clear() for Map

      // Limpiar Redis con pattern (Placeholder)
      // const keys = await redis.keys(pattern);
      // if (keys.length > 0) {
      //   await redis.del(...keys);
      // }
      console.log(`Invalidating redis cache with pattern: ${pattern} (placeholder)`);

    } catch (error) {
      console.error('Cache invalidation error:', error);
    }
  }

  // Pre-warming de cache para datos críticos (Placeholders for fetch functions)
  static async warmUpCache(): Promise<void> {
    try {
      console.log('Warming up cache (placeholder)');
      // Pre-cargar rankings globales (Placeholder)
      // const globalRankings = await this.fetchGlobalRankings();
      // await this.set('rankings:global', globalRankings, 300); // 5min TTL

      // Pre-cargar stats de países top 10 (Placeholder)
      // const topCountries = await this.fetchTopCountries(10);
      // await this.set('countries:top', topCountries, 600); // 10min TTL

    } catch (error) {
      console.error('Cache warm-up error:', error);
    }
  }

  // Placeholder fetch functions (replace with actual data fetching logic)
   private static async fetchGlobalRankings(): Promise<any[]> {
        console.log('Fetching global rankings for warm-up (placeholder)');
        return [];
   }

   private static async fetchTopCountries(limit: number): Promise<any[]> {
        console.log(`Fetching top ${limit} countries for warm-up (placeholder)`);
        return [];
   }

}

// Middleware para Next.js API routes
export const withCache = (handler: any, ttl: number = 300) => {
  return async (req: Request, ...args: any[]) => {
    const cacheKey = `api:${req.url}:${JSON.stringify(req.body || {})}`; // Consider a more robust key generation

    // Intentar obtener desde cache
    const cached = await CacheManager.get(cacheKey);
    if (cached) {
      return NextResponse.json(cached, {
        headers: { 'X-Cache': 'HIT' }
      });
    }

    // Ejecutar handler original
    const response = await handler(req, ...args);

    // Check if the response is valid before attempting to clone and cache
    if (!response || !response.json) {
        console.error('Invalid response from handler, cannot cache');
        return response;
    }

    // Clone the response to be able to read the body twice (once for caching, once for returning)
    const responseToCache = response.clone();
    const data = await responseToCache.json();

    // Guardar en cache
    await CacheManager.set(cacheKey, data, ttl);

    return response; // Return the original response
  };
};
