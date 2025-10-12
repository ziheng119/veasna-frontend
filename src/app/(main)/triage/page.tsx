"use client"

import SearchBar from "@/components/shared/SearchBar";
import TraigeTabs from "../../../components/triage/Tabs";
import PatientDetails from "@/components/shared/read-only/patient-container/PatientDetails";
import { QueuedPatient } from "@/lib/types/patient";
import { useState } from "react";
import NoPatientSelected from "@/components/shared/NoPatientSelected";
import { TriageTabs } from "@/components/triage/TriageTabs";

export default function Traige() {

const [selectedPatient, setSelectedPatient] = useState<QueuedPatient | null>(null);

if (!selectedPatient) {
  return (
    <div>
      <SearchBar onSelectPatient={setSelectedPatient} />
      <NoPatientSelected/>
    </div>
  )
}

  return (
    <div className="flex justify-between">
      <div className="flex-1 mr-[30px] w-[30%]">
        <SearchBar onSelectPatient={setSelectedPatient} />
        <div className="bg-beige-default p-7 mt-[30px]">
          <PatientDetails patient={selectedPatient} />
        </div>
      </div>
      
      <div className="w-[65%]">
        <TriageTabs visit_id={selectedPatient.visit_id}/>
      </div>
    </div>
  )
}