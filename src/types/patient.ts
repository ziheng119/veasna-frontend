export interface Patient {
    id: number;
    englishName: string;
    khmerName: string;
    dateOfBirth: string;
    age: number;
    sex: 'M' | 'F';
    phoneNumber: string;
    address: string;
    faceId: number;
}