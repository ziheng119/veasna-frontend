"use client"

import { PlusIcon } from "@/assets/icons";
import { FullSearchBar } from "@/components/patient-list/FullSearchBar";
import { PatientPageHeader } from "@/components/patient-list/PageHeader";
import { PatientTable } from "@/components/patient-list/PatientTable";
import { Location } from "@/lib/types/location";
import { Patient } from "@/lib/types/patient";
import { SAMPLE_PATIENTS } from "@/sample_data/sample_patients";
import { useLocationStore } from "@/stores/useLocationStore";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function PatientListPage() {

  const router = useRouter();

  const location: Location | null = useLocationStore((state) => state.currentLocation)
  const date : Date = new Date(); // local time
  const dateOnly: string = date.toISOString().slice(0, 10);

  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredPatients: Patient[] = useMemo(() => {
    if (!searchTerm.trim()) {
      return patients;
    }

    const searchLower: string = searchTerm.toLowerCase()

    // filters list of patients by english name, khmer name or queue Number 
    return patients.filter((patient) => {
      // const searchNum = parseInt(searchLower, 10);
      // const queueMatch = (() => {
      //   const numMatch = patient.queueNumber.match(/^\d+/); // Extract leading digits
      //   if (!numMatch) return false;
      //   const queueNum = parseInt(numMatch[0], 10);
      //   return !isNaN(searchNum) && queueNum >= searchNum;
      // })();
    
      return (
        patient.englishName.toLowerCase().includes(searchLower) ||
        patient.khmerName.toLowerCase().includes(searchLower)
        // queueMatch
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

  useEffect(() => {
    setPatients(SAMPLE_PATIENTS)
    // call API according to locationId and dateOnly
  }, [location, dateOnly])

  return (
    <div>
      <PatientPageHeader/>

      <div className='flex items-center justify-between mb-4.5'>
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

      <PatientTable
        patients={filteredPatients}
        onViewPatient={handleViewPatient}
        onEditPatient={handleEditPatient}
        onDeletePatient={handleDeletePatient}
      />  
    </div>
  )
}