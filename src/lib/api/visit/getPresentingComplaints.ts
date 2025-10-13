import { backend_url } from "@/constants/env_variable";
import { PresentingComplaint } from "@/lib/types/medicalHistory";

export async function getPresentingComplaint(patientId: number, visitId: number): Promise<PresentingComplaint | null> {
  try {
    const res = await fetch(`${backend_url}/api/presenting-complaint/${patientId}/${visitId}`);

    if (!res.ok) {
      if (res.status === 404) return null; // no data found
      throw new Error(`Network response was not ok: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();

    const data: PresentingComplaint = {
      history: json.history || "N/A",
      red_flags: json.red_flags || "N/A",
      systems_review: json.systems_review || "N/A",
      drug_allergies: json.drug_allergies || "N/A",
    };

    return data;

  } catch (err) {
    console.error("GET Presenting Complaint (Error):", err);
    return null;
  }
}
