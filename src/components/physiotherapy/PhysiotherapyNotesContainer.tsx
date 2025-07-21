"use client"

import VerticalLabelInputPair from '../shared/VerticalLabelInputPair'
import SaveButton from '../shared/SaveButton'
import DottedImage from './DottedImage'

export default function PhysiotherapyNotesContainer() {

  return (
    <div className="flex flex-col gap-4 bg-beige-default px-4 py-2 rounded-md border-[1px] lg:w-[30%]">
      <h2 className="text-[20px] font-semibold">Physiotherapy Notes</h2>
      <div className="flex w-full h-[40%]">
        <VerticalLabelInputPair />
      </div>

      <h2 className="text-[20px] font-semibold">Body Chart Indication</h2>
      <div className="flex flex-row w-full">
        <DottedImage 
          imageUrl="/bodychart_front.jpg"
        />
        <DottedImage 
          imageUrl="/bodychart_back.jpg"
        />
      </div>

      <div className="flex items-center justify-end">
        <SaveButton />
      </div>
    </div>
  )
}
