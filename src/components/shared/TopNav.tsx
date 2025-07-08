import Link from "next/link";
import { LocationIcon } from "@/assets/icons/LocationIcon";

export default function TopNav() {
  return (
    <nav className="flex-grow bg-blue-default text-base font-bold py-[13px]">
      <div className="flex mx-10">
        <div>
          <Link href='/' className="mr-[20px]">Home</Link>
          <Link href='/patient-list' className="mr-[20px]">Patient List</Link>
          <Link href="/triage" className="mr-[20px]">Traige</Link>
          <Link href='/seva' className="mr-[20px]">Seva</Link>
          <Link href='/doctors-consult' className="mr-[20px]">Consult</Link>
          <Link href='/physiotherapy' className="mr-[20px]">Physiotherapy</Link>
          <Link href='/pharmacy' className="mr-[20px]">Pharmacy</Link>
        </div>
        <div className="flex ml-auto items-center">
          <LocationIcon 
            width={24}
            height={24}
            color="black"  
          />
          <p className="ml-2">Location</p>
        </div>
      </div>
    </nav>
  )
}