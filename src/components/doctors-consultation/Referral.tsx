"use client"

interface Props {
  onClose: () => void; // Add this prop
}

export default function Referral({ onClose }: Props) {
  return (
    <div className="px-6 py-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Referral</h2>

      <form className="flex flex-col space-y-6">
        {/* Date */}
        <div>
          <label className="flex items-center gap-x-4 font-medium">
            Date of Referral:
            <input
              type="date"
              className="border p-2 rounded flex-1 bg-white-default"
            />
          </label>
        </div>

        {/* Referral Types */}
        <div>
          <p className="font-medium mb-2">Referral Type Needed:</p>
          <div className="grid grid-cols-2 gap-2">
            {[
              "MongKol Borey Hospital",
              "Poipett Referral Hospital",
              "SEVA",
              "Optometrist",
              "Dentist",
              "Bong Bondol",
            ].map((referral) => (
              <label key={referral} className="flex items-center gap-x-2">
                <input type="checkbox" name="referral" value={referral} />
                {referral}
              </label>
            ))}
          </div>
        </div>

        {/* Patient Info */}
        <div>
          <p className="mb-2 font-medium">To whomever it may concern</p>
          <div className="grid grid-cols-2 gap-4">
            <label className="flex items-center gap-x-2"> {/* row layout */}
              <span>Patient Name</span>
              <input
                type="text"
                className="border bg-white-default rounded p-2 flex-1"
              />
            </label>
            <label className="flex items-center gap-x-2">
              <span>Patient Gender</span>
              <input
                type="text"
                className="border bg-white-default rounded p-2 flex-1"
              />
            </label>
            <label className="flex items-center gap-x-2">
              <span>Patient Age</span>
              <input
                type="text"
                className="border bg-white-default rounded p-2 flex-1"
              />
            </label>
            <label className="flex items-center gap-x-2">
              <span>Patient Address</span>
              <input
                type="text"
                className="border bg-white-default rounded p-2 flex-1"
              />
            </label>
          </div>
        </div>

        {/* Condition */}
        <div>
          <p>
            The patient above has been suffering from{" "}
            <input
              className="bg-white-default border rounded p-1"
              placeholder="illness"
            />{" "}
            for{" "}
            <input
              className="bg-white-default border rounded p-1"
              placeholder="duration"
            />
          </p>
        </div>

        {/* Reason */}
        <div>
          <p className="font-medium mb-2">Reason for referral:</p>
          <textarea className="bg-white-default border rounded p-2 w-full h-24" />
        </div>

        {/* Closing */}
        <p className="italic">Thank you.</p>
        <input
          placeholder="Your name"
          className="border rounded p-2 bg-white-default"
        />

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={e => onClose()}
          >
            Save
          </button>
          <button
            type="button"
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            onClick={e => onClose()}
          >
            Print
          </button>
        </div>
      </form>
    </div>
  );
}
