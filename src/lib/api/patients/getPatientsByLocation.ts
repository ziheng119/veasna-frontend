import { backend_url } from "@/constants/env_variable";
import { PatientInfo } from "@/lib/types/patient";

export async function getPatientsByLocation(locationId: number, token: string): Promise<PatientInfo[]> {
    try {
        const res = await fetch(`${backend_url}/api/patients?location_id=${locationId}`, {
            headers: { 'Authorization': `Bearer ${token}`},
        });
        if (!res.ok) throw new Error(`Failed to fetch patients: ${res.statusText}`);
        return await res.json();
    } catch (err) {
        console.error('GET Patients (Error):', err);
        throw err
    }
}