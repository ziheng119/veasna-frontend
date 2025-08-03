import Link from "next/link";

export default function TopNav() {
  return (
    <nav className="flex-grow bg-blue-default text-base font-bold py-[13px]">
      <div className="flex mx-10">
        <div>
          <Link href='/' className="mr-[20px]">Home</Link>
          <Link href="/triage" className="mr-[20px]">Traige</Link>
          <Link href='/seva' className="mr-[20px]">Seva</Link>
          <Link href='/doctors-consultation' className="mr-[20px]">Consult</Link>
          <Link href='/physiotherapy' className="mr-[20px]">Physiotherapy</Link>
          <Link href='/pharmacy' className="mr-[20px]">Pharmacy</Link>
        </div>
      </div>
    </nav>
  )
}