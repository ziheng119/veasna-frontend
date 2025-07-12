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
        onUpdatePatient({ [field]: value });
    };

    {/* pretty sure there is a more efficient way of this */}
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
                        className="text-black w-64 px-3 py-2  border-gray-300 border-width-10 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                        className="text-black w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className='flex items-center gap-4'>
                  <label className='min-w-[120px] text-sm font-medium text-gray-700'>
                        Phone Number
                    </label>
                    <input
                        type='text'
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
