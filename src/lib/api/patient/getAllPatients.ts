import { backend_url } from '@/constants/env_variable';
import { Patient } from '@/lib/types/patient';

export async function getAllPatients(): Promise<Patient[]> {
    try {
        console.log('Getting all patients data');
        const response = await fetch(`${backend_url}/api/patients`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP Error! status: ${response.status}`);
        }

        const patients = await response.json();
        return patients;
    } catch (error) {
        console.error('Error fetching patients:', error);
        throw error;
    }
}