import SaveButton from "../shared/SaveButton";
import VerticalLabelInputPair from "../shared/VerticalLabelInputPair";

export default function DoctorsNotesContainer() {
  return (
    <div className="flex flex-col gap-4 bg-beige-default px-4 py-2 rounded-md border-[1px] lg:w-[30%]">
      <h2 className="text-[20px] font-semibold">Consultation Notes</h2>
      <div className="flex w-full h-[40%]">
        <VerticalLabelInputPair />
      </div>

      <h2 className="text-[20px] font-semibold">Prescription</h2>
      <div className="flex w-full h-[40%]">
        <VerticalLabelInputPair />
      </div>

      <div className="flex gap-4">
        <h2 className="text-[20px] font-semibold">Referral Needed</h2>
        <div className="flex gap-2">
          <input type="radio"/>
          <p>Yes</p>
        </div>
        <div className="flex gap-2">
          <input type="radio"/>
          <p>No</p>
        </div>
      </div>
      <div className="flex items-center justify-end">
        <SaveButton />
      </div>
    </div>
  )
}