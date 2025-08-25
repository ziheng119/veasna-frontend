import { SAMPLE_PATIENTS_IN_QUEUE } from "@/sample_data/sample_patients_in_queue";
import QueueTableRow from "./QueueTableRow"

export default function QueueTable() {
  function sortQueueNumber(a: string, b: string): number {
    const extractParts = (q: string): [number, string] => {
      const match = q.match(/^(\d+)([A-Za-z]*)$/);
      if (!match) return [0, '']; // fallback
      return [parseInt(match[1], 10), match[2]];
    };
  
    const [numA, letterA] = extractParts(a);
    const [numB, letterB] = extractParts(b);
  
    if (numA !== numB) return numA - numB;
    return letterA.localeCompare(letterB);
  }

  return (
    <div className="w-3/4 bg-white-default rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
       <table className="min-w-full table-auto bg-green-default text-left text-sm">
          <thead>
            <tr>
              <th className="w-30 px-4 py-3 uppercase text-center font-medium text-gray-900 tracking-wider">
                Queue No.
              </th>
              <th className="px-4 py-3 uppercase font-medium text-gray-900 tracking-wider">
                English Name
              </th>
              <th className="px-4 py-3 uppercase font-medium text-gray-900 tracking-wider">
                Khmer Name
              </th>
            </tr>
          </thead>

          <tbody className="bg-white-default divide-y divide-gray-200">
            {SAMPLE_PATIENTS_IN_QUEUE
              .sort((patient_a, patient_b) => sortQueueNumber(patient_a.queue_no, patient_b.queue_no))
              .map((patient, i)  => (
                <QueueTableRow 
                  key={i}
                  patient={patient}
                />
              ))}

          </tbody>

          {/* <tbody className="bg-white divide-y divide-gray-200">
            {patients
              .sort((a, b) => sortQueueNumber(a.queueNumber, b.queueNumber))
              .map((patient)=> (
              <PatientTableRow
                key={patient.id}
                patient={patient}
                onViewPatient={onViewPatient}
                onEditPatient={onEditPatient}
                onDeletePatient={onDeletePatient}
              />
            ))}
          </tbody> */}
        </table>

        {/* {patients.length === 0 && (
          <div className="text-center py-12">
            <PersonIcon className="mx-auto h-16 w-16 text-gray-300"/>
            <h3 className="mt-4 text-lg font-mediu, text-gray-900">No Patients Found</h3>
            <p className="mt-2 text-gray-500">
              Try adjusting your search criteria or check your spelling.
            </p>
          </div>
        )} */}
      </div>
    </div>
  )
}