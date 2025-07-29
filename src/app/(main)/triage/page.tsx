import SearchBar from "@/components/shared/SearchBar";
import TraigeTabs from "../../../components/triage/Tabs";
import PatientDetails from "@/components/shared/read-only/patient-container/PatientDetails";

const sample_patients = [
  "Alice Lee",
  "Amy Teo",
  "Amy Wee",
  "Bella",
  "Charmaine"
]


export default function Traige() {

  return (
    <div className="flex justify-between">
      <div className="flex-1 mr-[30px] w-[30%]">
        <SearchBar 
          label='Search Patient...'
          options={sample_patients}
        />
        <div className="bg-beige-default p-7 mt-[30px]">
          <PatientDetails />
        </div>
      </div>
      
      <div className="w-[65%]">
        <TraigeTabs />
      </div>
    </div>
  )
}