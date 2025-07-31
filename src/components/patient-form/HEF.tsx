import React from 'react';

interface PatientData {
    knowsAboutHEF: string;
    hasHEF: string;
    useHEFReason: string;
}

interface Props {
    patient: PatientData;
    onUpdatePatient: (updates: Partial<PatientData>) => void;
}

export default function HEF({patient, onUpdatePatient }: Props) {
    const handleChange = (field: keyof PatientData, value: string) => {
        onUpdatePatient({ [field]: value});
    }


    return (
        <div className='space-y-6'>
            <div>
                <label className='block text-sm font-medium mb-3'>
                    Does patient know about HEF?
                </label>
                <div className='flex space-x-6'>
                    <div className='flex items-center'>
                        <input
                            type='radio'
                            id='knowsHEF-yes'
                            name='knowsAboutHEF'
                            value='yes'
                            checked={patient.knowsAboutHEF === 'yes'}
                            onChange={(e) => handleChange('knowsAboutHEF', e.target.value)}
                            className='h-4 w-4 text-blue-600 focus: ring-blue-500 border-gray-300'
                        />
                        <label htmlFor='knowsHEF-yes' className='ml-2 text-sm'>
                            Yes
                        </label>
                    </div>

                    <div className='flex items-center'>
                        <input
                            type='radio'
                            id='knowsHEF-no'
                            name='knowsAboutHEF'
                            value='no'
                            checked={patient.knowsAboutHEF === 'no'}
                            onChange={(e) => handleChange('knowsAboutHEF', e.target.value)}
                            className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300'
                        />
                        <label htmlFor='knowsHEF-no' className='ml-2 text-sm'>
                            No
                        </label>
                    </div>
                </div>
            </div>

            <div>
                <label className='block text-sm font-medium mb-3'>
                    Does patient have HEF?
                </label>
                <div className='flex space-x-6'>
                    <div className='flex items-center'>
                        <input
                            type='radio'
                            id='hasHEF-yes'
                            name='hasHEF'
                            value='yes'
                            checked={patient.hasHEF === 'yes'}
                            onChange={(e) => handleChange('hasHEF', e.target.value)}
                            className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300'
                        />
                        <label htmlFor='hasHEF-yes' className='ml-2 text-sm'>
                            Yes
                        </label>
                    </div>
                    <div className='flex items-center'>
                        <input
                            type='radio'
                            id='hasHEF-no'
                            name='hasHEF'
                            value='no'
                            checked={patient.hasHEF === 'no'}
                            onChange={(e) => handleChange('hasHEF', e.target.value)}
                            className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300'
                        />
                        <label htmlFor='hasHEF-no' className='ml-2 text-sm'>
                            No
                        </label> 
                    </div>
                </div>
            </div>

            <div>
                <label className='block text-sm font-medium mb-2'>
                    Does patient use HEF? why or why not?
                </label>
                <textarea
                    value={patient.useHEFReason}
                    onChange={(e) => handleChange('useHEFReason', e.target.value)}
                    rows= {6}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outine-none focus:ring-2 focus:ring-blue-500 bg-white text-black'
                    placeholder='Insert Text'
                />
            </div>
        </div>
    );
}