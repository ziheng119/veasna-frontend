export default function DoctorsNotes() {
  return (
    <div className="bg-beige-default px-4 py-2">
      <h2 className="text-[20px] font-semibold">Consultation Notes</h2>
      <textarea />

      <h2 className="text-[20px] font-semibold">Prescription</h2>
      <textarea />

      <div className="flex gap-4">
        <h2 className="text-[20px] font-semibold">Referral Needed</h2>
        <div className="flex gap-2">
          <input type="radio"/>
          <p>Yes</p>
        </div>
        <div className="flex gap-2">
          <input type="radio"/>
          <p>No</p>
        </div>
      </div>
    </div>
  )
}