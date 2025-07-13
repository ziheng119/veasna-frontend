import React from 'react';

interface PatientData {
    englishName: string;
    khmerName: string;
    dateOfBirth: string;
    age: string;
    sex: string;
    phoneNumber: string;
    faceId: string;
}

interface Props {
    patient: PatientData;
    onUpdatePatient: (updates: Partial<PatientData>) => void;
}

export default function PatientInfo({ patient, onUpdatePatient}: Props) {
    const handleChange = (field: keyof PatientData, value: string) => {
        if (field === 'age' || field === 'phoneNumber') {
            const regex = /^\d*$/; // only Integers
            if (value === '' || regex.test(value)) {
                onUpdatePatient({ [field]: value });
            }
        } else if (field === 'dateOfBirth') {
            const regex = /^(\d{0,2})(\/?)(\d{0,2})(\/?)(\d{0,4})$/; // Allow DD/MM/YYYY format with slashes
            if (value === '' || regex.test(value)) {
                onUpdatePatient({ [field]: value });
            }
        } else if (field === 'sex') {
            const upperValue = value.toUpperCase();
            if (value === '' || upperValue === 'M' || upperValue === 'F') {
                onUpdatePatient({ [field]: upperValue });
            }
        } else {
            onUpdatePatient({ [field]: value });
        };
    }

    return (
        <div>
        <div className='space-y-4 w-full max-w-md'>
                <div className='flex items-center gap-4'>
                    <label className='min-w-[120px] text-sm font-medium text-gray-700'>
                        English Name
                    </label>
                    <input
                        type='text'
                        value={patient.englishName}
                        onChange={(e) => handleChange('englishName', e.target.value)}
                        className="text-black w-64 px-3 py-2 border border-gray-300 border-width-10 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className='flex items-center gap-4'>
                <label className='min-w-[120px] text-sm font-medium text-gray-700'>
                        Khmer Name
                    </label>
                    <input
                        type='text'
                        value={patient.khmerName}
                        onChange={(e) => handleChange('khmerName', e.target.value)}
                        className="text-black w-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className='flex items-center gap-4'>
                    <label className='min-w-[120px] text-sm font-medium text-gray-700'>
                        Date of Birth
                    </label>
                    <input
                        type='text'
                        value={patient.dateOfBirth}
                        onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                        placeholder='Format: DD/MM/YYYY'
                        className="text-black w-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className='flex items-center gap-4'>
                    <label className='min-w-[120px] text-sm font-medium text-gray-700'>
                        Age
                    </label>
                    <input
                        type='text'
                        inputMode='numeric'
                        pattern='[0-9]*'
                        value={patient.age}
                        onChange={(e) => handleChange('age', e.target.value)}
                        className="text-black w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className='flex items-center gap-4'>
                    <label className='min-w-[120px] text-sm font-medium text-gray-700'>
                        Sex
                    </label>
                    <input
                        type='text'
                        value={patient.sex}
                        onChange={(e) => handleChange('sex', e.target.value)}
                        placeholder='M/F'
                        className="text-black w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className='flex items-center gap-4'>
                  <label className='min-w-[120px] text-sm font-medium text-gray-700'>
                        Phone Number
                    </label>
                    <input
                        type='text'
                        inputMode='numeric'
                        pattern='[0-9]*'
                        value={patient.phoneNumber}
                        onChange={(e) => handleChange('phoneNumber', e.target.value)}
                        className="text-black w-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className='flex items-center gap-4'>
                  <label className='min-w-[120px] text-sm font-medium text-gray-700'>
                        Face ID
                    </label>
                    <input
                        type='text'
                        value={patient.faceId}
                        onChange={(e) => handleChange('faceId', e.target.value)}
                        className="text-black w-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

            </div>
        </div>
    );
}
