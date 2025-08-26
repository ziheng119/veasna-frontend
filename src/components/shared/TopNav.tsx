'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import LocationDropdown from "./LocationDropdown";

export default function TopNav() {
  const pathname = usePathname();
  
  const isActive = (path: string) => {
    return pathname === path;
  };

  const linkBaseClass = "mr-[20px] pb-2 border-b-2 transition-colors duration-200";
  const activeLinkClass = "border-white";
  const inactiveLinkClass = "border-transparent hover:border-white/50";

  return (
    <nav className="flex-grow bg-blue-default text-white font-bold py-[13px]">
      <div className="flex justify-between items-center mx-10">
        {/* Navigation Links */}
        <div className="flex">
          <Link
            href="/"
            className={`${linkBaseClass} ${isActive('/') ? activeLinkClass : inactiveLinkClass}`}
          >
            Home
          </Link>
          <Link
            href="/patient-list"
            className={`${linkBaseClass} ${isActive('/patient-list') ? activeLinkClass : inactiveLinkClass}`}
          >
            Patient List
          </Link>
          <Link
            href="/triage"
            className={`${linkBaseClass} ${isActive('/triage') ? activeLinkClass : inactiveLinkClass}`}
          >
            Triage
          </Link>
          <Link
            href="/seva"
            className={`${linkBaseClass} ${isActive('/seva') ? activeLinkClass : inactiveLinkClass}`}
          >
            Seva
          </Link>
          <Link
            href="/physiotherapy"
            className={`${linkBaseClass} ${isActive('/physiotherapy') ? activeLinkClass : inactiveLinkClass}`}
          >
            Physiotherapy
          </Link>
          <Link
            href="/doctors-consultation"
            className={`${linkBaseClass} ${isActive('/doctors-consultation') ? activeLinkClass : inactiveLinkClass}`}
          >
            Consult
          </Link>
          
          <Link
            href="/pharmacy"
            className={`${linkBaseClass} ${isActive('/pharmacy') ? activeLinkClass : inactiveLinkClass}`}
          >
            Pharmacy
          </Link>
        </div>

        {/* Location Dropdown */}
        <div className="flex items-center">
          <LocationDropdown />
        </div>
      </div>
    </nav>
  );
}