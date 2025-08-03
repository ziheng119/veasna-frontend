"use client";

import { useState } from 'react';
import { PatientTable } from '@/components/patient-list/PatientTable';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/stores/useUserStore';
import SearchBar from '@/components/shared/SearchBar';
import { LocationIcon, PlusIcon } from '@/assets/icons';


/*************** MOCK DATA ********************/
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
      lastUpdated: '13-07-2025' // Requires implementation of last-updates
    },
];
  
  export default function Home() {
    const router = useRouter();
    const [patients, setPatients] = useState(mockPatients);
    const [searchQuery, setSearchQuery] = useState('');
    const user = useUserStore((state) => state.user);

    const handleSearch = (query: string) => {
      setSearchQuery(query);
      console.log('Searching for:', query);
    };
  
    const handleAddPatient = () => {
      console.log('Add new patient Clicked');
      console.log('[DEBUG] Routing to /patient-list/patient-form');
      router.push('/patient-list/patient-form');
    };
  
    const handleEditPatient = (patientId: number) => {
      console.log('Edit patient Clicked:', patientId);
      router.push(`/patient-list/patient-form?id=${patientId}`);
    };
  
    const handleDeletePatient = (patientId: number) => {
      console.log('Delete patient Clicked:', patientId);      
    };
  
    return (
      <div className='flex flex-col gap-4'>
        <h1 className="text-[30px] font-bold">Welcome {user?.username}!</h1>

        <div className='flex'>
          <SearchBar />
          <button
              onClick={handleAddPatient}
              className='bg-green-500 hover:bg-green-600 text-white p-2 rounded-full transition-colors'
          > 
              <PlusIcon className='w-5 h-5'/>
          </button>
        </div>

        <div className='flex flex-col gap-2'>
          <div className='flex'>
            <LocationIcon 
              width={24}
              height={24}
            />
            <div className='flex gap-4'>
              <p className='ml-2'>XXX</p>
              <p className='text-blue-default hover:cursor-pointer'>(Change Location)</p>
            </div>
          </div>
          
          <PatientTable 
            patients={patients}
            onEditPatient={handleEditPatient}
            onDeletePatient={handleDeletePatient}
          />
        </div>
      </div>
    );
  }