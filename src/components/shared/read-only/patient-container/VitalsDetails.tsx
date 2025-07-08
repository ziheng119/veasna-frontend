import LabelDescriptionPair from "../../LabelDescPair";

export default function VitalsDetails() {
  return (
    <div>
      <h2 className="text-[20px] font-semibold">Vitals</h2>
      <div className="flex flex-col gap-2 justify-between">
        <LabelDescriptionPair 
          label="Height"
          description="XXX"
        />
        <LabelDescriptionPair 
          label="Weight"
          description="XXX"
        />
        <LabelDescriptionPair 
          label="BMI"
          description="XXX"
        />
        <LabelDescriptionPair 
          label="Child is below 3rd Precentile"
          description="XXX"
        />
        <LabelDescriptionPair 
          label="Blood Pressure"
          description="XXX"
        />
        <LabelDescriptionPair 
          label="Temperature"
          description="XXX"
        />
      </div>
    </div>
  )
}