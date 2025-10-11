import { backend_url } from "@/constants/env_variable";
import formatDate from "@/helper/format_date";
import { MedicalHistory } from "@/lib/types/medicalHistory";

export async function getHistory(patientId: number, visitId: number): Promise<MedicalHistory | null> {
  try {
    const res = await fetch(`${backend_url}/api/history/${patientId}/${visitId}`);

    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error(`Network response was not ok: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();

    const data: MedicalHistory = {
      ...json,
      last_updated_at: formatDate(json.last_updated_at),
      created_at: formatDate(json.created_at),
    };

    return data;

  } catch (err) {
    console.error("GET History (Error):", err);
    return null;
  }
}
