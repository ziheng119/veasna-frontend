"use client"

import { PlusIcon } from "@/assets/icons";
import { FullSearchBar } from "@/components/patient-list/FullSearchBar";
import { PatientPageHeader } from "@/components/patient-list/PageHeader";
import { PatientTable } from "@/components/patient-list/PatientTable";
import { Location } from "@/lib/types/location";
import { PatientInfo } from "@/lib/types/patient";
import { useLocationStore } from "@/stores/useLocationStore";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useDataStore } from "@/stores/useLocationDataStore";

export default function PatientListPage() {

  const router = useRouter();

  const location: Location | null = useLocationStore((state) => state.currentLocation)
  const date : Date = new Date();
  const dateOnly: string = date.toISOString().slice(0, 10);

  const [patients, setPatients] = useState<PatientInfo[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const location_patients = useDataStore((state) => state.all_patients)
  const fetchData = useDataStore((state) => state.fetchData)

  const filteredPatients: PatientInfo[] = useMemo(() => {
    if (!searchTerm.trim()) {
      return patients;
    }

    const searchLower = searchTerm.toLowerCase();

    return patients.filter((patient) => {
      const engName = patient.english_name?.toLowerCase() || "";
      const khmerName = patient.khmer_name?.toLowerCase() || "";

      return engName.includes(searchLower) || khmerName.includes(searchLower);
    });
  }, [patients, searchTerm]);


  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  }
  
  const handleAddPatient = () => {
    console.log('Add new patient Clicked');
    router.push('/patient-form?mode=new');
  };

  const handleViewPatient = (patientId: number) => {
    console.log('Viewing Patient, ', patientId);
    router.push(`/patient-details?id=${patientId}`);
  }

  const handleDeletePatient = (patientId: number) => {
    if (window.confirm('Are you sure you want to delete this patient?')){
      // temporarily show that it was deleted here
      setPatients(prevPatients => prevPatients.filter(patient => patient.id !== patientId))
      console.log('Delete patient Clicked:', patientId);      
    }
  };

  useEffect(() => {
    if (!location) return; // Only fetch if location is set
    fetchData();
  }, [location]);

  useEffect(() => {
    setPatients(location_patients)
    // call API according to locationId and dateOnly
  }, [location_patients])

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
        onDeletePatient={handleDeletePatient}
      />  
    </div>
  )
}