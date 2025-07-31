"use client";

import React, { useState, useMemo } from 'react';
import { FullSearchBar } from '@/components/patient-list/FullSearchBar';
import { PatientTable } from '@/components/patient-list/PatientTable';
import { useRouter } from 'next/navigation';
// import { getAllPatients } from '@/lib/api/patient/getAllPatients';
// import { addPatient } from '@/lib/api/patient/addPatient';
import { Patient } from '@/lib/types/patient';
import { PlusIcon } from '@/assets/icons';
import { PatientPageHeader } from '@/components/patient-list/PageHeader';

/*************** MOCK DATA ********************/
const SAMPLE_PATIENTS: Patient[] = [
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
  }
];

  
export default function PatientListPage() {

  const router = useRouter();
  const [patients, setPatients] = useState<Patient[]>(SAMPLE_PATIENTS);
  const [searchTerm, setSearchTerm] = useState<string>("");

    const filteredPatients = useMemo(() => {
      if (!searchTerm.trim()) {
        return patients;
      }

      // is there a toLowerCase for khmer strings?
      const searchLower = searchTerm.toLowerCase()

      return patients.filter((patient) =>
      patient.englishName.toLowerCase().includes(searchLower) ||
      patient.khmerName.toLowerCase().includes(searchLower) 
      )
    }, [patients, searchTerm])

    const handleSearchChange = (term: string) => {
      setSearchTerm(term);
    }
    
    // to edit with backend  
    const handleAddPatient = () => {
      console.log('Add new patient Clicked');
      router.push('/patient-list/patient-form');
    };
  
    // to edit with backend
    const handleEditPatient = (patientId: number) => {
      console.log('Edit patient Clicked:', patientId);
      router.push(`/patient-list/patient-form?id=${patientId}`);
    };
  
    // to edit with backend
    const handleDeletePatient = (patientId: number) => {
      if (window.confirm('Are you sure you want to delete this patient?')){
        setPatients(prevPatients => prevPatients.filter(patient => patient.id !== patientId))
        console.log('Delete patient Clicked:', patientId);      
      }
    };
  
    return (
      <div className="min-h-screen p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">

            {/* Page Header */}
            <PatientPageHeader/>

            <div className='flex items-center justify-between'>
              <FullSearchBar
                placeholder= "Search for Patient..."
                onSearchChange={handleSearchChange}
              />

              <button
                onClick={handleAddPatient}
                className="ml-4 bg-green-500 hover:bg-green-600 text-white p-2 rounded-full transition"
              >
                <PlusIcon className="w-5 h-5"/>
              </button>

            </div>
          </div>

          <PatientTable
            patients={filteredPatients}
            onEditPatient={handleEditPatient}
            onDeletePatient={handleDeletePatient}
          />
        </div>
      </div>
    );
}