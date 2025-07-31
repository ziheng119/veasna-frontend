import React from 'react';
// import { EditIcon, PlusIcon, TrashIcon } from '../../assets/icons';
import { Patient } from '@/lib/types/patient';
import { PatientTableRow } from './PatientTableRow';

interface PatientTableProps {
    patients: Patient[];
    onEditPatient?: (patientId: number) => void
    onDeletePatient?: (patientId: number) => void;
}

export function PatientTable({ patients, onEditPatient, onDeletePatient}: PatientTableProps) {
    return (
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">

        <div className="overflow-x-auto">
          <table className="w-full table-fixed">
            <thead className="bg-green-default">
              <tr>
                <th className="w-1/20 px-4 py-3 text-left text-xs text-black tracking-wider">S/N</th>
                <th className="w-1/20 px-4 py-3 text-left text-xs text-black tracking-wider">Queue No.</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-black tracking-wider">English Name</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-black tracking-wider">Khmer Name</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-black tracking-wider">Date of Birth</th>
                <th className="w-1/20 px-4 py-3 text-left text-xs font-bold text-black tracking-wider">Age</th>
                <th className="w-1/20 px-4 py-3 text-left text-xs font-bold text-black tracking-wider">Sex</th>
                <th className="w-3/20 px-4 py-3 text-left text-xs font-bold text-black tracking-wider">Phone No.</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-black tracking-wider">Address</th>
                <th className="w-1/20 px-4 py-3 text-left text-xs font-bold text-black tracking-wider">Face ID</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-black tracking-wider">Last Updated</th>
                <th className="py-3 text-left text-xs font-bold text-black tracking-wider">Actions</th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {patients.map((patient)=> (
                <PatientTableRow
                  key={patient.id}
                  patient={patient}
                  onEditPatient={onEditPatient}
                  onDeletePatient={onDeletePatient}
                />
              ))}
            </tbody>
          </table>

          {patients.length === 0 && (
            <div className="text-center py-12">
              <h3 className="mt-4 text-lg font-mediu, text-gray-900">No Patients Found</h3>
              <p className="mt-2 text-gray-500">
                Try adjusting your search criteria or check your spelling.
              </p>
            </div>
          )}
        </div>
      </div>
    )
}

        