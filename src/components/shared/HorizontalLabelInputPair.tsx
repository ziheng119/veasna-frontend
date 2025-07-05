interface Props {
  label: string
}

export default function HorizontalLabelInputPair({ label }: Props) {
  return (
    <div className="flex flex-1 flex-col lg:flex-row w-full">
      <div className="w-fit lg:w-[250px]">
        <p className="font-semibold text-black">{label}</p>
      </div>
      <div className="w-full h-full">
        <textarea 
          className="bg-white-default border-[1px] rounded-sm w-full h-full p-2"
        />
      </div>
    </div>
  )
}