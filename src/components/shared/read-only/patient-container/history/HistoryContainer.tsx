import { PopUpIcon } from "@/assets/icons/PopUpIcon";

export default function HistoryContainer() {
  return (
    <div className="flex justify-between">
      <h2 className="text-[20px] font-semibold">History</h2>
      <div className="flex items-center justify-center hover:cursor-pointer">
        <PopUpIcon width={20} height={20}/>
      </div>
    </div>
  )
}