interface Props {
  label: string
}

export default function VerticalLabelInputPair({ label }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <p className="font-semibold">{label}</p>
      </div>
      <div className="flex-1 flex items-center">
        <textarea 
          className="bg-white-default border-[1px] rounded-sm w-full h-full item p-2"
        />
      </div>
    </div>
  )
}