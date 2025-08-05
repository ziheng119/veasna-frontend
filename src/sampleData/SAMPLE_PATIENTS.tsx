import { Patient } from "@/lib/types/patient";

/*************** MOCK DATA ********************/
export const SAMPLE_PATIENTS: Patient[] = [
    {
      id: 1,
      queueNumber: "2A",
      englishName: "Sovannary",
      khmerName: "សុវណ្ណារី",
      dateOfBirth: "01/01/2011",
      age: 14,
      sex: "F" as const,
      phoneNumber: "+855 12 345 678",
      address: "Phnom Penh, Cambodia",
      faceId: 1,
      lastUpdated: "13-07-2025"
    },
    {
      id: 2,
      queueNumber: "3B",
      englishName: "Piseth",
      khmerName: "ពិសិដ្ឋ",
      dateOfBirth: "12/05/2002",
      age: 23,
      sex: "M" as const,
      phoneNumber: "+855 98 765 432",
      address: "Battambang, Cambodia",
      faceId: 2,
      lastUpdated: "29-07-2025"
    },
    {
      id: 3,
      queueNumber: "4C",
      englishName: "Sopheap",
      khmerName: "សុភាព",
      dateOfBirth: "20/11/1995",
      age: 29,
      sex: "F" as const,
      phoneNumber: "+855 97 111 222",
      address: "Siem Reap, Cambodia",
      faceId: 3,
      lastUpdated: "28-07-2025"
    },
    {
      id: 4,
      queueNumber: "1D",
      englishName: "Ratanak",
      khmerName: "រតនៈ",
      dateOfBirth: "15/03/1988",
      age: 37,
      sex: "M" as const,
      phoneNumber: "+855 88 999 333",
      address: "Kampot, Cambodia",
      faceId: 4,
      lastUpdated: "30-07-2025"
    },
    {
      id: 5,
      queueNumber: "5E",
      englishName: "Chanthy",
      khmerName: "ចន្ធី",
      dateOfBirth: "08/08/2010",
      age: 15,
      sex: "F" as const,
      phoneNumber: "+855 11 123 456",
      address: "Takeo, Cambodia",
      faceId: 5,
      lastUpdated: "30-07-2025"
    },
    {
      id: 6,
      queueNumber: "12A",
      englishName: "Kosal",
      khmerName: "កុសល",
      dateOfBirth: "01/01/1970",
      age: 55,
      sex: "M" as const,
      phoneNumber: "+855 85 111 111",
      address: "Kandal, Cambodia",
      faceId: 6,
      lastUpdated: "20-07-2025"
    },
    {
      id: 7,
      queueNumber: "6F",
      englishName: "Dara",
      khmerName: "ដារ៉ា",
      dateOfBirth: "22/02/2000",
      age: 25,
      sex: "F" as const,
      phoneNumber: "+855 95 222 222",
      address: "Prey Veng, Cambodia",
      faceId: 7,
      lastUpdated: "25-07-2025"
    },
    {
      id: 8,
      queueNumber: "10B",
      englishName: "Vichea",
      khmerName: "វិជ្ជា",
      dateOfBirth: "09/09/1999",
      age: 25,
      sex: "M" as const,
      phoneNumber: "+855 16 888 999",
      address: "Kampong Cham, Cambodia",
      faceId: 8,
      lastUpdated: "27-07-2025"
    },
    {
      id: 9,
      queueNumber: "3A",
      englishName: "Sreypov",
      khmerName: "ស្រីពៅ",
      dateOfBirth: "03/03/1985",
      age: 40,
      sex: "F" as const,
      phoneNumber: "+855 93 777 444",
      address: "Banteay Meanchey, Cambodia",
      faceId: 9,
      lastUpdated: "22-07-2025"
    },
    {
      id: 10,
      queueNumber: "2B",
      englishName: "Borey",
      khmerName: "បូរី",
      dateOfBirth: "11/11/2015",
      age: 9,
      sex: "M" as const,
      phoneNumber: "+855 17 555 000",
      address: "Pursat, Cambodia",
      faceId: 10,
      lastUpdated: "19-07-2025"
    }
];
  