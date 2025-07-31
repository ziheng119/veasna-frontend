import { EditIcon, EyeIcon, TrashIcon } from "@/assets/icons";
import { Patient } from "@/lib/types/patient";

interface PatientTableRowProps {
    patient: Patient
    onEditPatient?: (patientId: number) => void
    onDeletePatient?: (patientId: number) => void;
}

export function PatientTableRow({ patient, onEditPatient, onDeletePatient}: PatientTableRowProps) {
    return (
        <tr className="hover:bg-blue-50 tansition-colors duration-150">
                <td className="px-4 py-3 text-sm text-gray-900">{patient.id}</td>
                <td className="px-4 py-3 text-sm text-blue-500">{patient.queueNumber}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{patient.englishName}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{patient.khmerName}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{patient.dateOfBirth}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{patient.age}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{patient.sex}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{patient.phoneNumber}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{patient.address}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{patient.faceId}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{patient.lastUpdated.toLocaleString()}</td>
                <td className="px-4 py-3 text-sm text-gray-900">
                    <div className="flex items-center gap-2">

                        {/* View Patient */}
                        <button
                        onClick={() => console.log('View Patient clicked')}
                        className="text-green-600 hover:text-green-800"
                        title="View patient"
                        >
                            <EyeIcon className="w-4- h-4"/>
                        </button>

                        {/* Edit patient */}
                        <button
                        onClick={() => onEditPatient?.(patient.id)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Edit Patient"
                        >
                            <EditIcon className="w-4 h-4"/>
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
    )
}