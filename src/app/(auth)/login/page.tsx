export default function Login() {
  return (
    <div 
      className="bg-beige-default px-[30px] py-[30px] rounded-md border-[1px]"
    >
      <h2 className="font-bold text-[30px] mb-[30px] text-center">Log In</h2>

      <div className="flex items-center gap-2 mb-[30px]">
        <p className="w-24">Username</p>
        <input className="bg-white border-[1px] flex-1"></input>
      </div>

      <div className="flex items-center gap-2 mb-[30px]">
        <p className="w-24">Password</p>
        <input className="bg-white border-[1px] flex-1"></input>
      </div>

      <button 
        className="bg-green-default px-[10px] py-[5px] rounded-md border-[1px] block hover:cursor-pointer items-center mx-auto block"
      >
        Login
      </button>

    </div>
  )
}