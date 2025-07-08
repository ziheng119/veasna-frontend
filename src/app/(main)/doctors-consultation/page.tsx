import PatientContainer from "@/components/shared/read-only/patient-container/PatientContainer";
import TriageContainer from "@/components/shared/read-only/triage-container/TriageContainer";
import DoctorsNotesContainer from "@/components/doctors-consultation/DoctorsNotesContainer";
import SearchBar from "@/components/shared/SearchBar";

export default function DoctorsConsultation() {
  return (
    <div className="flex flex-col gap-2 lg:min-h-[70vh]">
      <SearchBar 
        placeholder="Search Patient"
      />
      <div className="flex flex-col gap-2 mt-3 lg:w-full lg:flex-row lg:gap-4 lg:justify-evenly">
        <PatientContainer />
        <TriageContainer />
        <DoctorsNotesContainer />
      </div>
    </div>
  )
}