export default function SnellensTestDetails() {
  return (
    <div>
      <h2 className="text-[20px] font-semibold">Snellen&apos;s Test</h2>
      <div className="grid grid-cols-3 gap-x-4 gap-y-2 mb-[30px] items-center">
        <p className="text-start">Visual Acuity</p>
        <p className="text-center">Left (OS)</p>
        <p className="text-center">Right (OD)</p>

        <p className="text-start">With Pinhole</p>
        <p className="text-center">XXX</p>
        <p className="text-center">XXX</p>

        <p className="text-start">Without Pinhole</p>
        <p className="text-center">XXX</p>
        <p className="text-center">XXX</p>
      </div>
    </div>
  )
}