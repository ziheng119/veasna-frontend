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
import { SAMPLE_PATIENTS } from '@/sampleData/SAMPLE_PATIENTS';

  
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

      return patients.filter((patient) => {
        const searchNum = parseInt(searchLower, 10);
        const queueMatch = (() => {
          const numMatch = patient.queueNumber.match(/^\d+/); // Extract leading digits
          if (!numMatch) return false;
          const queueNum = parseInt(numMatch[0], 10);
          return !isNaN(searchNum) && queueNum >= searchNum;
        })();
      
        return (
          patient.englishName.toLowerCase().includes(searchLower) ||
          patient.khmerName.toLowerCase().includes(searchLower) ||
          queueMatch
        );
      });
    }, [patients, searchTerm])

    const handleSearchChange = (term: string) => {
      setSearchTerm(term);
    }
    
    // to edit with backend  
    const handleAddPatient = () => {
      console.log('Add new patient Clicked');
      router.push('/patient-list/patient-form?mode=new');
    };

    // to edit with backend
    const handleViewPatient = (patientId: number) => {
      console.log('Viewing Patient, ', patientId);
      router.push(`/patient-list/patient-form?mode=view&id=${patientId}`);
    }
  
    // to edit with backend
    const handleEditPatient = (patientId: number) => {
      console.log('Edit patient Clicked:', patientId);
      router.push(`/patient-list/patient-form?mode=edit&id=${patientId}`);
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
                placeholder= "Search for Patient by English Name or Khmer Name"
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
            onViewPatient={handleViewPatient}
            onEditPatient={handleEditPatient}
            onDeletePatient={handleDeletePatient}
          />
        </div>
      </div>
    );
}