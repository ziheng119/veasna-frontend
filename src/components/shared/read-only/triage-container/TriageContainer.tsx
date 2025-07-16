import PresentingComplaintsDetails from "./PresentingComplaintsDetails";
import SnellensTestDetails from "./SnellensTestDetails";

export default function TriageContainer() {
  return (
    <div className="bg-beige-default px-4 py-2 rounded-md border-[1px] lg:w-[40%]">
      <SnellensTestDetails />
      <PresentingComplaintsDetails />
    </div>
  )
}