import { backend_url } from "@/constants/env_variable";
import { VisualAcuity } from "@/lib/types/visualAcuity";
import formatDate from "@/helper/format_date";

export async function getVisualAcuity(patientId: number, visitId: number): Promise<VisualAcuity | null> {
  try {
    const res = await fetch(`${backend_url}/api/visual-acuity/${patientId}/${visitId}`);

    if (!res.ok) {
      if (res.status === 404) return null; // no data found
      throw new Error(`Network response was not ok: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();

    const data: VisualAcuity = {
      ...json,
      last_updated_at: formatDate(json.last_updated_at),
      created_at: formatDate(json.created_at),
    };

    return data;

  } catch (err) {
    console.error("GET Visual Acuity (Error):", err);
    return null;
  }
}
