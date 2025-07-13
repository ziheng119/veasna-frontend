interface Props {
  onClick ?: () => void;
}

export default function SaveButton({ onClick }: Props) {
  return (
    <button 
      className="bg-green-default rounded-md p-2 hover:cursor-pointer text-white"
      onClick={onClick}
    >
      Save
    </button>
  )
}
