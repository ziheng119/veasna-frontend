import LabelDescriptionPair from "../../LabelDescPair";

export default function PatientDetails() {
  return (
    <div className="flex flex-col gap-2 w-full">
      <h1 className="font-semibold text-[20px]">Patient Details</h1>
      <div className="flex flex-col gap-2 justify-between">
        <LabelDescriptionPair 
          label="English Name"
          description="XXX"
        />
        <LabelDescriptionPair 
          label="Khmer Name"
          description="XXX"
        />
        <LabelDescriptionPair 
          label="Date of Birth"
          description="XXX"
        />
        <LabelDescriptionPair 
          label="Age"
          description="XXX"
        />
        <LabelDescriptionPair 
          label="Sex"
          description="XXX"
        />
        <LabelDescriptionPair 
          label="Phone Number"
          description="XXX"
        />
      </div>
    </div>
  )
}