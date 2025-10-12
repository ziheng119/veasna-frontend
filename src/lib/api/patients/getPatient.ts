import { backend_url } from "@/constants/env_variable";
import { PatientInfo } from "@/lib/types/patient";
import formatDate from "@/helper/format_date"

export async function getPatient(id: number): Promise<PatientInfo | null> {
  try {
    const res = await fetch(`${backend_url}/api/patients/${id}`);

    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error(`Network response was not ok: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();

    const data: PatientInfo = {
      ...json,
      date_of_birth: formatDate(json.date_of_birth),
      lastUpdated: json.lastUpdated ? new Date(json.lastUpdated).toISOString() : "",
    };

    return data;

  } catch (err) {
    console.error("GET Patient (Error):", err);
    return null;
  }
}
