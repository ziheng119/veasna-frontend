export interface PatientData {
    // Patient Info
    englishName: string;
    khmerName: string;
    dateOfBirth: string;
    age: string;
    sex: string;
    phoneNumber: string;
    address: string;
    faceId: string;
    // Vitals
    height: string;
    weight: string;
    bmi: string;
    category: string;
    isBelow3rdPercentile: boolean;
    bloodPressureSystolic: string;
    bloodPressureDiastolic: string;
    temperature: string;
    additionalNotes: string;
    // HEF
    knowsAboutHEF: string;
    hasHEF: string;
    useHEFReason: string;
}
