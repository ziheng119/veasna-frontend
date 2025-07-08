interface Props {
  label?: string
  bolded?: boolean
  value?: string
  readOnly?: boolean
}

export default function VerticalLabelInputPair({ label, bolded=true, value="", readOnly=false }: Props) {
  return (
    <div className="flex flex-col gap-2 w-full">
      { label && 
      <div>
        <p className={`${bolded ? "font-semibold" : ""} text-black`}>{label}</p>
      </div> }
      
      <div className="flex-1 flex items-center">
        <textarea 
          className={`bg-white-default border-[1px] rounded-sm w-full h-full item p-2}`}
          {...(readOnly
            ? { value, readOnly: true }
            : { defaultValue: value })}
        />
      </div>
    </div>
  )
}