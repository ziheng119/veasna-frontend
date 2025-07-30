"use client";

import PatientTabs from "@/components/patient-form/patientTabs";
import { useSearchParams } from "next/navigation";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";
import { PatientData } from "@/lib/types/PatientData";

// Create an empty PatientData for every create ot edit request
const intitialPatientData: PatientData = {
    // Patient's Info
    englishName: '',
    khmerName: '',
    dateOfBirth: '',
    age: '',
    sex: '',
    phoneNumber: '',
    address: '',
    faceId: '',
    // Vitals
    height: '',
    weight: '',
    bmi: '',
    category: '',
    isBelow3rdPercentile: false,
    bloodPressureSystolic: '',
    bloodPressureDiastolic: '',
    temperature: '',
    additionalNotes: '',
    // HEF
    knowsAboutHEF: '',
    hasHEF: '',
    useHEFReason: ''
}

export default async function PatientForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const patientId = searchParams.get('id');
    const isEdit = !!patientId;

    // Local state that accumulates changes from all tabs
    const [localPatient, setLocalPatient] = useState<PatientData>(intitialPatientData);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // useEffect(() => {
    //     if (isEdit && patientId) {
    //         // insert loadPatientData logic here
    //         console.log('Loading patient data for ID:', patientId);
    //         loadPatientData(patientId);
    //     }
    // }, [isEdit, patientId]);

    // const loadPatientData = await (id: string) => {
    //     setIsLoading(true);
    //     // try {
    //     //     // API Call for patientID calling
    //     //     // const resnponse = await fetch(`/api/patients/${id}`);
    //     //     // if (response.ok) {
    //     //         const patientData = await response.json();
    //     //         setLocalPatient(patientData);
    //     //     } else {
    //     //         console.error('Failed to load patient data');
    //     //         // handle error by showing a toast notificaiton
    //     //     }
        
    //     // } catch (error) {
    //     //     console.error('Error loading patient Data: ', error);
    //     //     // handle the erorr by showing toast notificaiton
    //     // } finally {
    //     //     setIsLoading(false);
    //     // }
    // };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            if (isEdit) {
                // Case 1 : Updating existing patient

            } else {
                // Case 2 : Creating a new patient
                
            }
        } catch (error) {
            console.error('Error saving patient:', error);
        } finally {
            setIsSaving(false);
        }
    }

    const handleCancel = () => {
        // Case 3: Cancel - no chnages made to database
        // Optionally show confirmation dialog if there are unsaved changes if possible
        router.push('/patient-list');
    }

    const updateLocalPatient = (updates: Partial<PatientData>) => {
        setLocalPatient(prev => ({ ...prev, ...updates}));
    };


    return (
        <div className='min-h-screen'>
            <div className='max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:pxuct-8'>
                <div className='mb-6'>
                    <h1 className='text-2xl font-bold'>
                        {isEdit ? 'Edit Patient' : 'Add Patient'}
                    </h1>
                </div>

                <div className='rounded-lg shadow'>
                    <PatientTabs
                        patient={localPatient}
                        onUpdatePatient={updateLocalPatient}
                        onSave={handleSave}
                        onCancel={handleCancel}
                        isSaving={isSaving}
                    />
                </div>
            </div>
        </div>
    )
}
