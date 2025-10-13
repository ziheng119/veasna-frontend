interface Props {
  label?: string
  bolded?: boolean
  value?: string
  readOnly?: boolean
  onChangeFunction?: (newValue: string) => void
}

export default function VerticalLabelInputPair({ label, bolded=true, value="", readOnly=false, onChangeFunction=undefined }: Props) {
  return (
    <div className="flex flex-col gap-2 w-full">
      { label && 
      <div>
        <p className={`${bolded ? "font-semibold" : ""}`}>{label}</p>
      </div> }
      
      <div className="flex-1 flex items-center">
        <textarea 
          className={`bg-white-default border-[1px] rounded-sm w-full h-full item p-2 text-black`}
          {...(readOnly
            ? { value, readOnly: true }
            : { defaultValue: value })}
          onChange={e => {
            if (onChangeFunction) onChangeFunction(e.target.value);
          }}
        />
      </div>
    </div>
  )
}