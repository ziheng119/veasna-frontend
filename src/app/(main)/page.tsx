"use client";
import { useEffect, useState } from 'react';
import { useUserStore } from '@/stores/useUserStore';
import { useLocationStore } from '@/stores/useLocationStore';

import { PatientQueue } from '@/components/home/PatientQueue';
import { PatientForm } from '@/components/home/PatientForm';

import { QueuedPatient, PatientInfo } from '@/lib/types/patient';  

import { getQueue } from '@/lib/api/queue/getQueue';
import { getPatientsByLocation } from '@/lib/api/patients/getPatients';

export default function HomePage() {

  const user = useUserStore((state) => state.user);
  const token = user?.token;
  const username = user?.username;
  const location = useLocationStore((state) => state.currentLocation);
  
  const date = new Date(); // local time
  const dateOnly = date.toISOString().slice(0, 10);

  const [locationPatients, setLocationPatients] = useState<PatientInfo[]>([])
  const [queuedPatients, setQueuedPatients] = useState<QueuedPatient[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handlePatientSubmit = (patient: QueuedPatient) => {
    // add patient returned from successful api call to queue
    setQueuedPatients(prev => [...prev, patient]);
  }

  useEffect(() => {
    const fetchData = async () => {
      if (location && token) {
        setIsLoading(true);
        try {
          // fetch both existing patients and today's queue in parallel
          const [patientsData, queueData] = await Promise.all([
            getPatientsByLocation(location.id, token),
            getQueue(location.id, dateOnly, token)
          ]);
          setLocationPatients(patientsData);
          setQueuedPatients(queueData);
        } catch (error) {
          console.error("Failed to fetch page data:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [location, token, dateOnly]) // Rerun when location, token, or date changes
  
  return (
    <div className="min-h-screen w-screen flex flex-col bg-background overflow-hidden">
      {/* Header with gradient */}
      <header className="bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 border-b border-border/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
              <h1 className="text-2xl text-black font-bold text-foreground">
                Welcome, {username} !
              </h1>
          </div>
        </div>
      </header>

      <main className="flex-1 p-6 overflow-hidden bg-background max-w-screen-2xl mx-auto">

        <div className="flex gap-6 h-full">
          <div className="w-1/3">
            {isLoading ? (
              <p className="text-muted-foreground text-center py-8">Loading Queue....</p>
            ): (
              <PatientQueue patients={queuedPatients} />
            )}

          </div>
          <div className="flex-1">
            <PatientForm
              existingPatients={locationPatients}
              onSubmit={handlePatientSubmit}
              locationId={location?.id}
              />
          </div>
        </div>
      </main>
    </div>
  )
}
