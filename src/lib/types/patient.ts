export interface Patient {
    id: number;
    queueNumber: string;
    englishName: string;
    khmerName: string;
    dateOfBirth: string;
    age: number;
    sex: 'M' | 'F';
    phoneNumber: string;
    address: string;
    faceId: number;
    lastUpdated: string;
}