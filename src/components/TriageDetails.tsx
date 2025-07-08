import PresentingComplaintsDetails from "./PresentingComplaintsDetails";
import SnellensTestDetails from "./SnellensTestDetails";

export default function TriageDetails() {
  return (
    <div className="bg-beige-default px-4 py-2">
      <SnellensTestDetails />
      <PresentingComplaintsDetails />
    </div>
  )
}