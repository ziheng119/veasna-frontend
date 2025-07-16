import VerticalLabelInputPair from "../../VerticalLabelInputPair"

export default function PresentingComplaintsDetails() {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-[20px] font-semibold">Presenting Complaints</h2>
      <VerticalLabelInputPair 
        label="History of Presenting Illness"
        bolded={false}
        value="XXX"
        readOnly={true}
      />

      <VerticalLabelInputPair 
        label="Red Flags"
        bolded={false}
        value="XXX"
        readOnly={true}
      />

      <VerticalLabelInputPair 
        label="Systems Review"
        bolded={false}
        value="XXX"
        readOnly={true}
      />
      
      <VerticalLabelInputPair 
        label="Drug Allergies"
        bolded={false}
        value="XXX"
        readOnly={true}
      />
    </div>
  )
}