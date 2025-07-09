"use client";

import React, {useState} from 'react';
import Tab from '@/components/shared/Tab';
import PatientInfo from './patientInfo';
import Vitals from './Vitals';
import HEF from './HEF';

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
    isBelow3rdpercentile: string;
    bloodPressure: string;
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
    const [activeTab, setActiveTab] = useState<PatientTabType>(PATIENT_INFO);

    const apply
}
