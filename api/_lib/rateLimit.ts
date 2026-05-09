import { Redis } from "@upstash/redis";

const RATE_LIMIT_PER_HOUR = 5;
const TTL_SECONDS = 3600; // 1h

// Lazy-init: only construct on first call to avoid eager env-var reads at module load
let redis: Redis | null = null;
function getRedis(): Redis {
  if (!redis) {
    redis = new Redis({
      url: process.env.KV_REST_API_URL!,
      token: process.env.KV_REST_API_TOKEN!,
    });
  }
  return redis;
}

/**
 * IP-based rate-limit via Upstash Redis (Vercel Marketplace).
 * FAIL-OPEN: bei Redis-Outage wird die Anfrage durchgelassen.
 * Begründung: Lead-Verlust ist teurer als kurzes Spam-Risiko.
 * Honeypot bleibt als primärer Schutz aktiv.
 */
export async function checkRateLimit(
  ip: string,
): Promise<{ allowed: boolean; remaining: number }> {
  try {
    const key = `ratelimit:contact:${ip}`;
    const count = await getRedis().incr(key);
    if (count === 1) {
      await getRedis().expire(key, TTL_SECONDS);
    }
    return {
      allowed: count <= RATE_LIMIT_PER_HOUR,
      remaining: Math.max(0, RATE_LIMIT_PER_HOUR - count),
    };
  } catch (err) {
    console.error("[rateLimit] Redis-Error, failing open:", err);
    return { allowed: true, remaining: -1 };
  }
}
