import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

let ratelimit: Ratelimit | null = null;

export function getRatelimit(): Ratelimit | null {
  const url = process.env.UPSTASH_REDIS_REST_URL ?? "";
  const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? "";
  if (!url || !token || url.includes("placeholder") || token.includes("placeholder")) {
    return null;
  }
  if (!ratelimit) {
    ratelimit = new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(3, "10 m"),
      analytics: false,
      prefix: "lexus:lead",
    });
  }
  return ratelimit;
}
