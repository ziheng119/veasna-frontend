import PatientDetails from "./PatientDetails";
import VitalsDetails from "./VitalsDetails";
import HistoryContainer from "./history/HistoryContainer";

export default function PatientContainer() {
  return (
    <div className="flex flex-col gap-4 bg-beige-default px-4 py-2 rounded-md border-[1px] lg:w-[30%]">
      <PatientDetails />
      <VitalsDetails />
      <HistoryContainer />
    </div>
  )
}