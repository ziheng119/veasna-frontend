import React from 'react';

interface PatientData {
    englishName: string;
    khmerName: string;
    dateOfBirth: string;
    age: string;
    sex: string;
    phoneNumber: string;
    address: string;
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

    const calculateAge = () => {
        if (!patient.dateOfBirth) return;

        const parts = patient.dateOfBirth.split('/');
        if (parts.length === 3) {
            const day = parseInt(parts[0]);
            const month = parseInt(parts[1]);
            const year = parseInt(parts[2]);

            if (day && month && year && year > 1900) {
                // javascript months are 0 index (ie January = 0)
                const birthDate = new Date(year, month - 1, day);
                const today = new Date();
                let age = today.getFullYear() - birthDate.getFullYear();
                const monthDiff = today.getMonth() - birthDate.getMonth();

                // handle age if birthday yet to pass
                if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                    age--;
                }

                if (age >= 0 && age < 150) {
                    onUpdatePatient({age: age.toString() });
                }
            }
        }
    }

    const handleDateChange = (value: string) => {
        handleChange('dateOfBirth', value);
    };

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
                    <div className='flex items-center gap-2'>
                        <input
                            type='date'
                            value={patient.dateOfBirth ?
                                patient.dateOfBirth.split('/').reverse().join('-') : ''
                            }
                            onChange={(e) => {
                                if (e.target.value) {
                                    const formatted = e.target.value.split('-').reverse().join('/');
                                    handleDateChange(formatted)
                                } else {
                                    handleDateChange('');
                                }
                            }}
                            className="text-black w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button 
                            type='button'
                            onClick={calculateAge}
                            className='px-3 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        >
                            Calculate Age
                        </button>
                    </div>
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
                        Address
                    </label>
                    <input
                        type='text'
                        value={patient.address}
                        onChange={(e) => handleChange('address', e.target.value)}
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
