import SevaNotesContainer from "@/components/seva/SevaNotesContainer";
import PatientContainer from "@/components/shared/read-only/patient-container/PatientContainer";
import TriageContainer from "@/components/shared/read-only/triage-container/TriageContainer";
import SearchBar from "@/components/shared/SearchBar";
import SevaSnellenTest from "@/components/seva/SevaSnellensTest";

export default function Seva() {
    return (
        <div className="flex flex-col gap-2 lg:min-h-[70vh]">
            <SearchBar />
            <div className="flex flex-col gap-2 mt-3 lg:w-full lg:flex-row lg:gap-4 lg:justify-evenly">
            <PatientContainer />
            <TriageContainer />
            <SevaNotesContainer />
            </div>


        </div>
    )
}