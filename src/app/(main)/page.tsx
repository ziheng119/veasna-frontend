"use client";

import { useUserStore } from '@/stores/useUserStore';
import QueueTable from '@/components/home/QueueTable';
import { useLocationStore } from '@/stores/useLocationStore';
import { useEffect, useState } from 'react';
import { SAMPLE_PATIENTS_IN_QUEUE } from '@/sample_data/sample_patients_in_queue';
import QueuePatientTable from '@/components/home/QueuePatientTable';
import { QueuePatientData } from '@/lib/types/queue_patient_data';
import { Patient } from '@/lib/types/patient';
import { SAMPLE_PATIENTS } from '@/sample_data/sample_patients';
  
export default function HomePage() {

  const username = useUserStore((state) => state.user)?.username
  const location = useLocationStore((state) => state.currentLocation)
  const date = new Date(); // local time
  const dateOnly = date.toISOString().slice(0, 10);

  const [locationPatients, setLocationPatients] = useState<Patient[]>([])
  const [queuePatients, setQueuePatients] = useState<QueuePatientData[]>([])

  useEffect(() => {
    setQueuePatients(SAMPLE_PATIENTS_IN_QUEUE)
    // TODO: call api by today's date and location  
  }, [location, dateOnly])

  useEffect(() => {
    setLocationPatients(SAMPLE_PATIENTS)
    // TODO: call api by location 
  }, [location])
  
  return (
    <div className="min-h-screen flex flex-col gap-y-2.5">

      <h1 className='text-3xl font-bold mb-4.5'>Welcome {username}!</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Overall Summary Card */}
        <div className="bg-beige-default p-4 rounded-lg shadow flex flex-col gap-3">
          <h3 className="text-xl font-semibold border-b pb-2">Overall Summary</h3>
          <div className="flex justify-between">
            <span>Location A:</span>
            <span className="font-medium">100</span>
          </div>
          <div className="flex justify-between">
            <span>Location B:</span>
            <span className="font-medium">200</span>
          </div>
        </div>

        {/* Today's Summary Card */}
        <div className="bg-beige-default p-4 rounded-lg shadow flex flex-col gap-3">
          <h3 className="text-xl font-semibold border-b pb-2">Today&apos;s Summary</h3>
          <div className="flex justify-between">
            <span>Number of Patients:</span>
            <span className="font-medium">100</span>
          </div>
          <div className="flex justify-between">
            <span>Location:</span>
            <span className="font-medium">BLAHBLAHBLAH</span>
          </div>
        </div>
      </div>

      <h2 className='text-2xl font-semibold mt-4.5'>Today&apos;s Patients</h2>

      <div className="flex flex-col lg:flex-row max-w-full">
        <div className="flex-[7] min-w-0">
          <QueueTable
            patients={queuePatients}
          />
        </div>
        
        <div className="flex-[3] min-w-0">
          <QueuePatientTable 
            patients={locationPatients}
          />
        </div>
      </div>
    </div>
  )
}
