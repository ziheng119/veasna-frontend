import HorizontalLabelInputPair from "../shared/HorizontalLabelInputPair"

export default function History() {
  return (
    <div className="flex flex-col gap-y-4 min-h-[70vh]">
      <HorizontalLabelInputPair 
        label="Past History"
      />
      <HorizontalLabelInputPair 
        label="Drug and Treatment History"
      />
      <HorizontalLabelInputPair 
        label="Family History"
      />
      <HorizontalLabelInputPair 
        label="Social History"
      />
    </div>
  )
}