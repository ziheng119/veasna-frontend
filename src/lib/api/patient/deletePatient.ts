import { backend_url } from "@/constants/env_variable";
import { PatientData } from "@/lib/types/PatientData";

export async function deletePatient(patientId: number) {
    try {
        console.log('Deleting Patient:', `${patientId}`)
        const response = await fetch(`/api/patients/${patientId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error deleting patient:', error);
        throw error;
    }
};