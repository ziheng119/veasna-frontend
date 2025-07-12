"use client";

import { PatientListTab, PATIENTINFO_TAB, VITALS_TAB, HEF_TAB } from '@/models/patient-list/patientlist_tab';
import Tab from '@/components/shared/Tab';
import PatientInfo from './PatientInfo';
import Vitals from './Vitals';
import HEF from './HEF';
import { useState, useEffect } from 'react';

interface PatientData {
    // Patient Info
    englishName: string;
    khmerName: string;
    dateOfBirth: string;
    age: string;
    sex: string;
    phoneNumber: string;
    faceId: string;
    // Vitals
    height: string;
    weight: string;
    bmi: string;
    category: string;
    isBelow3rdPercentile: boolean;
    bloodPressureSystolic: string;
    bloodPressureDiastolic: string;
    temperature: string;
    additionalNotes: string;
    // HEF
    knowsAboutHEF: string;
    hasHEF: string;
    useHEFReason: string;
}

interface Props {
    patient: PatientData;
    onUpdatePatient: (updates: Partial<PatientData>) => void;
    onSave: () => void;
    onCancel: () => void;
}

export default function PatientTabs({ patient, onUpdatePatient, onSave, onCancel }: Props) {
    const [activeTab, setActiveTab] = useState<PatientListTab>(PATIENTINFO_TAB);

    const applyTab = (activeTab: PatientListTab) => {
        switch (activeTab) {
            case PATIENTINFO_TAB:
                return <PatientInfo patient={patient} onUpdatePatient={onUpdatePatient}/>
            case VITALS_TAB:
                return <Vitals patient={patient} onUpdatePatient={onUpdatePatient} />
            case HEF_TAB:
                return <HEF patient={patient} onUpdatePatient={onUpdatePatient} />
            default:
                return <PatientInfo patient={patient} onUpdatePatient={onUpdatePatient} />
        }
    }

    useEffect(() => {
        applyTab(activeTab)
    }, [activeTab])

    return (
        <div>
            <div className='flex'>
                <Tab
                    label="Patient Info"
                    isActive={activeTab === PATIENTINFO_TAB}
                    onClick={() => setActiveTab(PATIENTINFO_TAB)}
                />
                <Tab
                    label="Vitals"
                    isActive={activeTab === VITALS_TAB}
                    onClick={() => setActiveTab(VITALS_TAB)}
                />
                <Tab
                    label="HEF"
                    isActive={activeTab === HEF_TAB}
                    onClick={() => setActiveTab(HEF_TAB)}
                />
            </div>

            <div className='bg-beige-default p-7'>
                {applyTab(activeTab)}
            </div>

            <div className='flex justify-end space-x-3 mt-6'>
                <button
                    onClick={onCancel}
                    className='px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300'
                >
                    Cancel
                </button>
                <button
                    onClick={onSave}
                    className='px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700'
                >
                    Save
                </button>
            </div>
        </div>
    )
}
