import React from 'react';
import { EditIcon, PlusIcon, TrashIcon } from '../../assets/icons';
import { Patient } from '@/types/patient';

interface PatientTableProps {
    patients: Patient[];
    onEditPatient?: (patientId: number) => void
    onDeletePatient?: (patientId: number) => void;
}

export const PatientTable: React.FC<PatientTableProps> = ({ 
    patients, 
    onEditPatient, 
    onDeletePatient 
  }) => {
    return (
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">S/N</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">English Name</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Khmer Name</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Date of Birth</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Age</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Sex</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Phone Number</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Address</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Face ID</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {patients.map((patient, index) => (
              <tr key={patient.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-900">{index + 1}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{patient.englishName}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{patient.khmerName}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{patient.dateOfBirth}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{patient.age}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{patient.sex}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{patient.phoneNumber}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{patient.address}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{patient.faceId}</td>
                <td className="px-4 py-3 text-sm text-gray-900">
                <div className="flex items-center gap-2">
            

                    {/* Edit patient */}
                    <button
                    onClick={() => onEditPatient?.(patient.id)}
                    className="text-blue-600 hover:text-blue-800"
                    title="Edit Patient"
                    >
                    <EditIcon className="w-4 h-4" />
                    </button>

                    {/* Delete Patient*/}
                    <button
                    onClick={() => onDeletePatient?.(patient.id)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete Patient"
                    >
                    <TrashIcon className="w-4 h-4" />
                    </button>
                </div>
                </td>
              </tr>
            ))}
          </tbody>
          
        </table>
      </div>
    );
  };