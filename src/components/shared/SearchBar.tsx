import Input from "./react-components/Input"

interface Props {
  placeholder?: string
  classname?: string
}

export default function SearchBar({ placeholder, classname }: Props) {
  return (
    <div>
      <Input 
        placeholder={ placeholder? placeholder : "" }
        classname={ classname ? classname : "" }
      />
    </div>
  )
}