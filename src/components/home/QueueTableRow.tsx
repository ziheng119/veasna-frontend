import { QueuePatient } from "@/lib/types/queue_patient"

interface Prop {
  patient: QueuePatient
}

export default function QueueTableRow({ patient } : Prop) {
  return (
    <tr className="align-middle hover:bg-blue-50 tansition-colors duration-150 h-10 text-sm">
        <td className="px-4 py-3 text-center text-blue-500">{patient.queue_no}</td>
        <td className="px-4 py-3 text-gray-900">{patient.english_name}</td>
        <td className="px-4 py-3 text-gray-900">{patient.khmer_name}</td>
    </tr>
  )
}