import { backend_url } from "@/constants/env_variable";
import { Location } from "@/lib/types/location";

let cachedLocations: Location[] | null = null;
let lastFetchTime = 0;

// Cache duration in ms (e.g., 1 hour)
const CACHE_TTL = 60 * 60 * 1000;

export async function getLocations(): Promise<Location[]> {
  const now = Date.now();

  // ✅ Use cached data if it's still valid
  if (cachedLocations && now - lastFetchTime < CACHE_TTL) {
    return cachedLocations;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const res = await fetch(`${backend_url}/api/locations`, {
      method: "GET",
      // ✅ Use 'force-cache' or `next.revalidate` in Next.js for built-in caching
      next: { revalidate: 3600 }, // cache for 1 hour on server
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`Failed to fetch locations: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();

    // Validate and extract data safely
    const data: Location[] = Array.isArray(json.locations) ? json.locations : [];
    console.log("✅ GET Locations (Success):", data.length);

    // ✅ Cache the result in memory
    cachedLocations = data;
    lastFetchTime = now;

    return data;
  } catch (err: any) {
    console.error("❌ GET Locations (Error):", err?.message || err);

    // ✅ Graceful fallback
    if (cachedLocations) {
      console.warn("⚠️ Returning cached locations due to fetch failure.");
      return cachedLocations;
    }

    return [];
  }
}
