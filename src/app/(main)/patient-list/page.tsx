import TopNav from  '@/components/TopNav';
import React, { useState, useMemo } from 'react';

interface Patient {
    id: number;
    englishName: string;
    khmerName: string;
    dateOfBirth: string;
    age: number;
    sex: 'M' | 'F';
    phoneNumber: string;
    address: string;
    faceId: number;
}

interface PatientFormData {
    englishName: string;
    khmername: string;
    dateOfBirth: string;
    sex: 'M' | 'F';
    phoneNumber: string;
    address: string;
}

const samplePatient: Patient[] = [
    {
        id: 1,
        englishName: 'Sovannary',
        khmerName: 'សុវណ្ណារី',
        dateOfBirth: '2011-01-01',
        age: 14,
        sex: 'F',
        phoneNumber: '+855 XX XXX XXXX',
        address: '',
        faceId: 1
  }
];

const [patients, setPatients] = useState<Patient[]>(initialPatients);
const [searchTerm, setSearchTerm] = useState<string>('');

const filteredPatients = useMemo(() => {
    if (!searchTerm) return patients;

    return patients.filter(patient =>
        patient.englishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.khmerName.includes(searchTerm) ||
        patient.phoneNumber.includes(searchTerm) ||
        patient.address.toLowerCase().includes(searchTerm.toLowerCase())
    );
}, [patients,searchTerm]);

return (
    <div className='p-6'>
        <div className='flex items-center gap-4 mb-6'>
            <div className='flex-1 relative'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' size={20} />
                <input
                    type='text'
                    placeholder='Search Patient'
                />
            </div>
            <button className='bg-green-500 hover:bg-green-600 text-white p-3 rounded-full transition-colors'
            >
                <Plus size={24}/>
            </button>
        </div>

        {/* Patient Table */}
        <div className='bg-white rounded-lg shadow-md overflow-hidden'>
            <div className='overflow-x-auto'>
                <table className='w-full'>
                    <thead className='bg-green-100'>
                        <tr>
                            <th className='px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r'>S/N</th>
                            <th className='px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r'>English Name</th>
                            <th className='px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r'>Khmer Name</th>
                            <th className='px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r'>Date of Birth</th>
                            <th className='px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r'>Age</th>
                            <th className='px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r'>Sex</th>
                            <th className='px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r'>Phone Number</th>
                            <th className='px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r'>Address</th>
                            <th className='px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r'>Face ID</th>
                            <th className='px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r'>Actions</th>                            
                        </tr>
                    </thead>

                    <tbody>
                        {filteredPatients.map((patient, index) => (
                            <tr key={patient.id} className = 'border-b hover: bg-gray-50'>
                                <td className='px-4 py-3 border-r'>{index + 1}</td>
                                <td className='px-4 py-3 border-r font-medium'>{patient.englishName}</td>
                                <td className='px-4 py-3 border-r'>{patient.khmerName}</td>
                                <td className='px-4 py-3 border-r'>{patient.dateOfBirth}</td>
                                <td className='px-4 py-3 border-r'>{patient.age}</td>
                                <td className='px-4 py-3 border-r'>{patient.sex}</td>
                                <td className='px-4 py-3 border-r'>{patient.phoneNumber}</td>
                                <td className='px-4 py-3 border-r'>{patient.address}</td>
                                <td className='px-4 py-3 border-r'>{patient.faceId}</td>

                                <td className='px-4 py-3'>

                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    </div>
)