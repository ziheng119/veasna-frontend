"use client";

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
// import { getAllPatients } from '@/lib/api/patient/getAllPatients';
// import { addPatient } from '@/lib/api/patient/addPatient';
import { Patient } from '@/lib/types/patient';
import { useUserStore } from '@/stores/useUserStore';
import QueueTable from '@/components/home/QueueTable';
import QueuePatient from '@/components/home/QueuePatient';
import { SAMPLE_PATIENTS } from '@/sample_data/sample_patients';

  
export default function HomePage() {

  const username = useUserStore((state) => state.user)?.username

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
      router.push('/patient-form?mode=new');
    };

    // to edit with backend
    const handleViewPatient = (patientId: number) => {
      console.log('Viewing Patient, ', patientId);
      router.push(`/patient-form?mode=view&id=${patientId}`);
    }
  
    // to edit with backend
    const handleEditPatient = (patientId: number) => {
      console.log('Edit patient Clicked:', patientId);
      router.push(`/patient-form?mode=edit&id=${patientId}`);
    };
  
    // to edit with backend
    const handleDeletePatient = (patientId: number) => {
      if (window.confirm('Are you sure you want to delete this patient?')){
        // temporarily show that it was deleted here
        setPatients(prevPatients => prevPatients.filter(patient => patient.id !== patientId))
        console.log('Delete patient Clicked:', patientId);      
      }
    };
  
    return (
      <div className="min-h-screen flex flex-col gap-y-2.5">

        <h1 className='text-3xl font-bold mb-4.5'>Welcome {username}!</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Overall Summary Card */}
          <div className="bg-beige-default p-4 rounded-lg shadow flex flex-col gap-3">
            <h3 className="text-xl font-semibold border-b pb-2">Overall Summary</h3>
            <div className="flex justify-between">
              <span>Location A:</span>
              <span className="font-medium">100</span>
            </div>
            <div className="flex justify-between">
              <span>Location B:</span>
              <span className="font-medium">200</span>
            </div>
          </div>

          {/* Today's Summary Card */}
          <div className="bg-beige-default p-4 rounded-lg shadow flex flex-col gap-3">
            <h3 className="text-xl font-semibold border-b pb-2">Today's Summary</h3>
            <div className="flex justify-between">
              <span>Number of Patients:</span>
              <span className="font-medium">100</span>
            </div>
            <div className="flex justify-between">
              <span>Location:</span>
              <span className="font-medium">BLAHBLAHBLAH</span>
            </div>
          </div>
        </div>

        <h2 className='text-2xl font-semibold mt-4.5'>Today&apos;s Patients</h2>

      <div className="flex flex-col lg:flex-row max-w-full">
        {/* QueueTable takes less space */}
        <div className="flex-[7] min-w-0">
          <QueueTable />
        </div>

        {/* QueuePatient takes more space */}
        <div className="flex-[3] min-w-0">
          <QueuePatient />
        </div>
      </div>



        {/* <PatientTable
          patients={filteredPatients}
          onViewPatient={handleViewPatient}
          onEditPatient={handleEditPatient}
          onDeletePatient={handleDeletePatient}
        /> */}

      </div>
    )
}
