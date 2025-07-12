import React from 'react';

interface PatientData {
    height: string;
    weight: string;
    bmi: string;
    category: string;
    isBelow3rdPercentile: boolean;
    bloodPressureSystolic: string;
    bloodPressureDiastolic: string;
    temperature: string;
    additionalNotes: string;
}

interface Props {
    patient: PatientData;
    onUpdatePatient: (updates: Partial<PatientData>) => void;
}

export default function Vitals({patient, onUpdatePatient }: Props) {
    const handleChange = (field: keyof PatientData, value: string | boolean) => {
        onUpdatePatient({ [field]: value });
    };

    return (
        <div className='space-y-6'>
            <div className='space-y-4 w-full max-w-md'>
                <div className='flex items-center justify-between mb-2'>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Height (cm)
                    </label>
                    <input
                        type='number'
                        step='0.1'
                        value={patient.height}
                        onChange={(e) => handleChange('height', e.target.value)}
                        className='text-black w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                </div>

                <div className='flex items-center justify-between mb-2'>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Weight (kg)
                    </label>
                    <input
                        type='number'
                        step='0.1'
                        value={patient.weight}
                        onChange={(e) => handleChange('weight', e.target.value)}
                        className='text-black w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                </div>

                <div className='flex items-center justify-between mb-2'>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                        BMI
                    </label>
                    <input
                        type='number'
                        step='0.1'
                        value={patient.bmi}
                        onChange={(e) => handleChange('bmi', e.target.value)}
                        className=' text-black w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                </div>

                <div className='flex items-center justify-between mb-2'>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Category
                    </label>
                    <input
                        type='text'
                        value={patient.category}
                        onChange={(e) => handleChange('category', e.target.value)}
                        className='text-black w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                </div>

                {/* TODO: put 2 inputs */}
                <div className='flex items-center justify-between mb-2'>
                    <label className='text-sm font-medium text-gray-700 w-1/3'>
                        Blood Pressure (Systolic / Diastolic)
                    </label>
                    <div className='flex gap-2'>
                    <input
                        type='number'
                        value={patient.bloodPressureSystolic}
                        onChange={(e) => handleChange('bloodPressureSystolic', e.target.value)}
                        className='text-black w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        placeholder='S'
                    />
                    <text className='text-black'> / </text>
                    <input
                        type='number'
                        value={patient.bloodPressureDiastolic}
                        onChange={(e) => handleChange('bloodPressureDiastolic', e.target.value)}
                        className='text-black w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        placeholder='D'
                    />
                    </div>
                    
                </div>

                <div className='flex items-center justify-between mb-2'>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Temperature
                    </label>
                    <input
                        type='number'
                        step='0.1'
                        value={patient.temperature}
                        onChange={(e) => handleChange('temperature', e.target.value)}
                        className='text-black w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                </div>

                <div className='mt-6'>
                    <div className='flex items-center mb-4'>
                        <input
                            type='checkbox'
                            id='below3rdPercentile'
                            checked={patient.isBelow3rdPercentile}
                            onChange={(e) => handleChange('isBelow3rdPercentile', e.target.checked)}
                            className='text-black h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
                        />

                        <label htmlFor='below3rdPercentile' className='ml-2 text-sm font-medium text-gray-700'>
                            Child is below 3rd percentile BMI by age?
                        </label>
                    </div>
                </div>

                <div className='flex items-center justify-between mb-2'>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Additional Notes
                    </label>
                    <textarea
                        value={patient.additionalNotes}
                        onChange={(e) => handleChange('additionalNotes', e.target.value)}
                        rows={4}
                        className='text-black w-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        placeholder='Enter any additional notes...'
                    />
                </div>

            </div>
        </div>
    )
}