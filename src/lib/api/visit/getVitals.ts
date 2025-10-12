import { backend_url } from "@/constants/env_variable";
import { Vitals } from "@/lib/types/vitals";
import formatDate from "@/helper/format_date"; // optional if you want to format dates

export async function getVitals(patientId: number, visitId: number): Promise<Vitals | null> {
  try {
    const res = await fetch(`${backend_url}/api/visit/vitals/${patientId}/${visitId}`);

    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error(`Network response was not ok: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();

    // Format dates for frontend display if needed
    const data: Vitals = {
      ...json,
      last_updated_at: formatDate(json.last_updated_at),
      created_at: formatDate(json.created_at),
    };

    return data;

  } catch (err) {
    console.error("GET Vitals (Error):", err);
    return null;
  }
}
