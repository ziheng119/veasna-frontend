import { backend_url } from "@/constants/env_variable";
import { PatientData } from "@/lib/types/PatientData";

export async function addPatient(patientData: PatientData): Promise<PatientData> {
    try {
        console.log('Adding Patient')
        const response = await fetch(`${backend_url}/api/patients/complete`, {
            method: 'POST',
            headers: {
                'Content-Type':"application/json",
            },
            body: JSON.stringify(patientData),
        });

        if (!response.ok) {
            throw new Error('Failed to create patient');
        }

        const result = await response.json();
        console.log('Created patient with all data', result);
        return result;
    } catch (error) {
        console.error('Error creating patient:', error);
        throw error;
    }
};