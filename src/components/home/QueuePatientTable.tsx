import { Patient } from "@/lib/types/patient"
import { useState } from "react";
import toast from "react-hot-toast";

interface Prop {
  patients: Patient[];
}

export default function QueuePatientTable({ patients }: Prop) {

  const [faceId, setFaceId] = useState<string>("");
  const [englishName, setEnglishName] = useState<string>("");
  const [khmerName, setKhmerName] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [sex, setSex] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [queueNumber, setQueueNumber] = useState<string>("");

  const handleCheck = () => {
    const patient: Patient | undefined = patients.find(patient => patient.faceId === faceId);
    if (!patient) {
      toast("No patient found.");
      return
    }
    setEnglishName(patient.englishName)
    setKhmerName(patient.khmerName)
    setDateOfBirth(patient.dateOfBirth)
    setAge(patient.age)
    setSex(patient.sex)
    setAddress(patient.address)
    setPhoneNumber(patient.phoneNumber)
  }

  const handleSubmit = () => {
    const incomplete = !faceId || !englishName || !khmerName || !dateOfBirth || !age || !sex || !address || !phoneNumber || !queueNumber
    
    if (incomplete) {
      toast.error("Incomplete fields!", {
        position: "bottom-center"
      })
      return
    }

    // TODO: post information to backend (ADD TO QUEUE)
    toast.success("Queued Patient", {
        position: "bottom-center"
      })
    setFaceId("")
    setEnglishName("")
    setKhmerName("")
    setDateOfBirth("")
    setAge("")
    setSex("")
    setAddress("")
    setPhoneNumber("")
    setQueueNumber("")
  }

  return (
    <div className="bg-white-default p-6 rounded-lg border border-gray-200 shadow-sm max-w-xl mx-auto text-sm">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Queue Patient</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label 
            className="mb-1 font-medium text-gray-700">Face ID:
          </label>
          <input
            type="number"
            value={faceId}
            onChange={e => setFaceId(e.target.value)}
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-200 focus:outline-none"
          />
        </div>

        <div className="flex items-end"> {/* align to bottom of column */}
          <button 
            className="bg-green-default px-3 py-2 rounded shadow hover:cursor-pointer"
            onClick={handleCheck}
          >
            Check
          </button>
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700">English Name:</label>
          <input
            type="text"
            value={englishName}
            onChange={e => setEnglishName(e.target.value)}
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-200 focus:outline-none"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700">Khmer Name:</label>
          <input
            type="text"
            value={khmerName}
            onChange={e => setKhmerName(e.target.value)}
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-200 focus:outline-none"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700">Date of Birth:</label>
          <input
            type="date"
            value={dateOfBirth}
            onChange={e => setDateOfBirth(e.target.value)}
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-200 focus:outline-none"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700">Age:</label>
          <input
            type="number"
            value={age}
            onChange={e => setAge(e.target.value)}
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-200 focus:outline-none"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700">Sex:</label>
          <select 
            value={sex}
            onChange={e => setSex(e.target.value)}
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-200 focus:outline-none"
          >
            <option value="" disabled>Please Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className="flex flex-col sm:col-span-2">
          <label className="mb-1 font-medium text-gray-700">Address:</label>
          <input
            type="text"
            value={address}
            onChange={e => setAddress(e.target.value)}
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-200 focus:outline-none"
          />
        </div>

        <div className="flex flex-col sm:col-span-2">
          <label className="mb-1 font-medium text-gray-700">Phone Number:</label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={e => setPhoneNumber(e.target.value)}
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-200 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1 font-medium text-gray-700">Queue Number:</label>
          <input
            type="number"
            value={queueNumber}
            onChange={e => setQueueNumber(e.target.value)}
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-200 focus:outline-none"
          />
        </div>
        
      </div>

      <button 
        className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow"
        onClick={handleSubmit}
      >
        Add Patient
      </button>
    </div>
  )
}
