import HorizontalLabelInputPair from "../shared/HorizontalLabelInputPair";

export default function PresentingComplaints() {
  return (
    <div className="flex flex-col gap-2 min-h-[70vh] items-stretch">
      <HorizontalLabelInputPair 
        label="History of Presenting Symptoms"
      />
      <HorizontalLabelInputPair 
        label="Red Flags"
      />
      <HorizontalLabelInputPair 
        label="Systems Review"
      />
      <HorizontalLabelInputPair 
        label="Drug Allergies"
      />
    </div>
  )
}