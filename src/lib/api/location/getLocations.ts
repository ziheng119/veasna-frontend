import { backend_url } from "@/constants/env_variable";
import { Location } from "@/lib/types/location";

export async function getLocations(): Promise<Location[]> {
  try {
    const res = await fetch(`${backend_url}/api/locations`, {
      cache: 'no-store',
      signal: AbortSignal.timeout(5000),
    });

    if (!res.ok) {
      throw new Error(`Network response was not ok: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();
    const data: Location[] = json.locations;
    console.log('GET Locations (Success):', data)

    return data;

  } catch (err) {
    console.error('GET Locations (Error):', err);
    return [];
  }
}
