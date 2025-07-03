interface Props {
  label: string
  description: string
}

export default function LabelDescriptionPair({ label, description }: Props) {
  return (
    <div className="flex flex-col lg:flex-row justify-between">
      <div>
        <p>{label}</p>
      </div>
      <div>
        <p>{description}</p>
      </div>
    </div>
  )
}