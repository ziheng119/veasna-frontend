"use client";

import PatientTabs from "@/components/patient-form/PatientTabs";
import { useSearchParams } from "next/navigation";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";

export default function PatientForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const patientId = searchParams.get('id');
    const isEdit = !!patientId;

    const [patient, setPatient] = useState({
        // Patient's Info
        englishName: '',
        khmerName: '',
        dateOfBirth: '',
        age: '',
        sex: '',
        phoneNumber: '',
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
    })

    useEffect(() => {
        if (isEdit) {
            console.log('Loading patient data for ID:', patientId);
        }
    }, [isEdit, patientId]);

    const handleSave = () => {
        if (isEdit) {
            console.log('Updating patient: ', patient);
        } else {
            console.log('Creating new patient:', patient);
        }
        router.push('/patient-list');
    };

    const handleCancel = () => {
        router.push('/patient-list');
    }

    const updatePatient = (updates: Partial<typeof patient>) => {
        setPatient(prev => ({ ...prev, ...updates }));
    };


    return (
        <div className='min-h-screen bg-gray-100'>
            <div className='max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:pxuct-8'>
                <div className='mb-6'>
                    <h1 className='text-2xl font-bold text-gray-900'>
                        {isEdit ? 'Edit Patient' : 'Add Patient'}
                    </h1>
                </div>

                <div className='bg-white rounded-lg shadow'>
                    <PatientTabs
                        patient={patient}
                        onUpdatePatient={updatePatient}
                        onSave={handleSave}
                        onCancel={handleCancel}
                    />
                </div>
            </div>
        </div>
    )
}
