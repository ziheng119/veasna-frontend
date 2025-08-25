export default function QueuePatient() {
  return (
    <div className="bg-white-default p-6 rounded-lg border border-gray-200 shadow-sm max-w-xl mx-auto text-sm">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Queue Patient</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700">Face ID:</label>
          <input
            type="text"
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-200 focus:outline-none"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700">English Name:</label>
          <input
            type="text"
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-200 focus:outline-none"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700">Khmer Name:</label>
          <input
            type="text"
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-200 focus:outline-none"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700">Date of Birth:</label>
          <input
            type="date"
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-200 focus:outline-none"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700">Age:</label>
          <input
            type="number"
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-200 focus:outline-none"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700">Sex:</label>
          <select defaultValue="" className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-200 focus:outline-none">
            <option value="" disabled>Please Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className="flex flex-col sm:col-span-2">
          <label className="mb-1 font-medium text-gray-700">Address:</label>
          <input
            type="text"
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-200 focus:outline-none"
          />
        </div>

        <div className="flex flex-col sm:col-span-2">
          <label className="mb-1 font-medium text-gray-700">Phone Number:</label>
          <input
            type="tel"
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-200 focus:outline-none"
          />
        </div>
      </div>

      <button className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow">
        Add Patient
      </button>
    </div>
  )
}
