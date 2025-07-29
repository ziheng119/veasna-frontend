import PhysiotherapyNotesContainer from "@/components/physiotherapy/PhysiotherapyNotesContainer";
import PatientContainer from "@/components/shared/read-only/patient-container/PatientContainer";
import TriageContainer from "@/components/shared/read-only/triage-container/TriageContainer";
import SearchBar from "@/components/shared/SearchBar";

const sample_patients = [
  "Alice Lee",
  "Amy Teo",
  "Amy Wee",
  "Bella",
  "Charmaine"
]

export default function Physiotherapy() {
  return (
    <div className="flex flex-col gap-2 lg:min-h-[70vh]">
      <SearchBar 
        label='Search Patient...'
        options={sample_patients}
      />
      <div className="flex flex-col gap-2 mt-3 lg:w-full lg:flex-row lg:gap-4 lg:justify-evenly">
        <PatientContainer />
        <TriageContainer />
        <PhysiotherapyNotesContainer />
      </div>
    </div>
  )
}