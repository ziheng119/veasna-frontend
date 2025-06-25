export default function Login() {
  return (
    <div className="bg-beige-default px-[30px] py-[30px] rounded-md border-[1px]">
      <h2 className="font-bold text-[30px] mb-[30px] text-center">Sign Up</h2>

      <div className="flex items-center gap-2 mb-[30px]">
        <p className="w-40">First Name</p>
        <input className="bg-white border-[1px]"></input>
      </div>

      <div className="flex items-center gap-2 mb-[30px]">
        <p className="w-40">Last Name</p>
        <input className="bg-white border-[1px]"></input>
      </div>

      <div className="flex items-center gap-2 mb-[30px]">
        <p className="w-40">Username</p>
        <input className="bg-white border-[1px]"></input>
      </div>

      <div className="flex items-center gap-2 mb-[30px]">
        <p className="w-40">Password</p>
        <input className="bg-white border-[1px]"></input>
      </div>

      <div className="flex items-center gap-2 mb-[30px]">
        <p className="w-40">Confirm Password</p>
        <input className="bg-white border-[1px]"></input>
      </div>

      <button 
        className="bg-green-default px-[10px] py-[5px] rounded-md border-[1px] block hover:cursor-pointer mx-auto block"
      >
        Sign Up
      </button>
    </div>
  )
}