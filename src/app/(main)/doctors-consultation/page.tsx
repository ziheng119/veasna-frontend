import DoctorsNotes from "@/components/DoctorsNotes";
import PatientDetails from "@/components/PatientDetails";
import TriageDetails from "@/components/TriageDetails";

export default function DoctorsConsultation() {
  return (
    <div className="flex flex-col gap-2 lg:flex-row lg:gap-4">
      {/* Patient Info */}
      <PatientDetails />

      {/* Triage Details */}
      <TriageDetails />

      {/* Consultation Notes */}
      <DoctorsNotes />
    </div>
  )
}