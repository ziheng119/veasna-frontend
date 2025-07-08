import VitalsDetails from "./VitalsDetails";

export default function PatientDetails() {
  return (
    <div className="bg-beige-default px-4 py-2">
      {/* Patient Info */}
      <VitalsDetails />
      <h2>Past Screenings</h2>
      <h2>History</h2> 
    </div>
  )
}