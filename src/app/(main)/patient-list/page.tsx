"use client";
import TopNav from  '@/components/TopNav';
import React, { useState } from 'react';
import { PatientSearch } from '@/components/patient-list/PatientSearchBar';
import { PatientTable } from '@/components/patient-list/PatientTable';

/***************MOCK DATA ********************/
const mockPatients = [
    {
      id: 1,
      englishName: 'Sovannary',
      khmerName: 'សុវណ្ណារី',
      dateOfBirth: '01/01/2011',
      age: 14,
      sex: 'F' as const,
      phoneNumber: '+855 XX XXX XXXX',
      address: '',
      faceId: 1,
    },
];
  
  export default function PatientListPage() {
    const [patients, setPatients] = useState(mockPatients);
    const [searchQuery, setSearchQuery] = useState('');
  
    const handleSearch = (query: string) => {
      setSearchQuery(query);
      console.log('Searching for:', query);
    };
  
    const handleAddPatient = () => {
      console.log('Add new patient');
    };
  
    const handleEditPatient = (patientId: number) => {
      console.log('Edit patient:', patientId);
    };
  
    const handleDeletePatient = (patientId: number) => {
      console.log('Add to patient:', patientId);
    };
  
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Patient List</h1>
          </div>
          
          <PatientSearch 
            onSearch={handleSearch}
            onAddPatient={handleAddPatient}
          />
          
          <div className="mt-6">
            <PatientTable 
              patients={patients}
              onEditPatient={handleEditPatient}
              onDeletePatient={handleDeletePatient}
            />
          </div>
        </div>
      </div>
    );
  }