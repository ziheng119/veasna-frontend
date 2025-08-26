export interface Patient {
    id: number;
    englishName: string;
    khmerName: string;
    dateOfBirth: string;
    age: string;
    sex: 'Male' | 'Female';
    phoneNumber: string;
    address: string;
    faceId: string;
    lastUpdated: string;
}