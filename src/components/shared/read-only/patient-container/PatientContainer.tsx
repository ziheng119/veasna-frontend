import PatientDetails from "./PatientDetails";
import VitalsDetails from "./VitalsDetails";
import PastScreeningsContainer from "./past-screenings/PastScreeningsContainer";
import HistoryContainer from "./history/HistoryContainer";

export default function PatientContainer() {
  return (
    <div className="flex flex-col gap-4 bg-beige-default px-4 py-2 rounded-md border-[1px] lg:w-[30%]">
      <PatientDetails />
      <VitalsDetails />
      <PastScreeningsContainer />
      <HistoryContainer />
    </div>
  )
}