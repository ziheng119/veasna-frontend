export type PatientInfo = {
    id?: number;
    face_id: number;
    location_id?: number;
    english_name: string;
    khmer_name: string;
    date_of_birth: string;
    sex: "M" | "F" | "";
    address?: string | null;
    phone_number?: string | null;
    lastUpdated?: string;
}

export type QueuedPatient = {
    visit_id?: number;
    patient_id?: number;
    queue_no: string;
    english_name: string;
    khmer_name: string;
    age?: number;
    sex: "M" | "F";
    timestamp: string;
}

export type PatientFormData = PatientInfo & {
    queue_no ?: string;
    age ?: number;
};