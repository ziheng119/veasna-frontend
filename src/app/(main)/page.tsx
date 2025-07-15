"use client"

import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const { user } = useUser();
  const router = useRouter()
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !user) {
      router.push("/login");
    }
  }, [mounted, user, router]);

  if (!mounted || !user) {
    return null; // or a loading spinner
  }

  return (
    <div>
      <h1 className="text-[30px] font-bold mb-4">Welcome {user?.username}!</h1>

      <div className="flex justify-between h-full items-stretch min-h-[70vh]">
        <div className="w-[55%] px-[30px] py-[30px] bg-beige-default border-[1px] rounded-md">
          <h2 className="text-[20px] font-bold text-black">Details</h2>
          <div className="flex mt-[30px] text-black">
            <div className="w-[50%]">
              <p className="mb-[10px]">Name</p>
              <p className="mb-[10px]">Staff ID</p>
              <p className="mb-[10px]">Current Location</p>
            </div>
            <div className="w-[50%] text-black"> 
              <p className="mb-[10px]">XXX</p>
              <p className="mb-[10px]">XXX</p>
              <p className="mb-[10px]">XXX</p>
            </div>
          </div>
        </div>

        <div className="w-[40%] px-[30px] py-[30px] bg-beige-default border-[1px] rounded-md text-black">
          <h2 className="text-[20px] font-bold">About</h2>
          <div className="flex mt-[30px]">
            <div className="w-[50%]">
              <p className="mb-[10px]">Version</p>
              <p className="mb-[10px]">Release</p>
              <p className="mb-[10px]">User Guide</p>
            </div>
            <div className="w-[50%]">
              <p className="mb-[10px]">XXX</p>
              <p className="mb-[10px]">XXX</p>
              <p className="mb-[2%]">XXX</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}