"use client"

import VerticalLabelInputPair from '../shared/VerticalLabelInputPair'
import SaveButton from '../shared/SaveButton'
import Image from 'next/image'

export default function PhysiotherapyNotesContainer() {

  return (
    <div className="flex flex-col gap-4 bg-beige-default px-4 py-2 rounded-md border-[1px] lg:w-[30%]">
      <h2 className="text-[20px] font-semibold">Consultation Notes</h2>
      <div className="flex w-full h-[40%]">
        <VerticalLabelInputPair />
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-[20px] font-semibold">Body Chart Indication</h2>
        <div className="flex flex-row w-full">
          <Image
            src="/bodychart_front.jpg"
            alt="Body Chart Front"
            className="w-1/2 h-auto object-contain"
            width={300}
            height={500}
          />
          <Image
            src="/bodychart_back.jpg"
            alt="Body Chart Back"
            className="w-1/2 h-auto object-contain"
            width={300}
            height={500}
          />
        </div>
      </div>

      <div className="flex items-center justify-end">
        <SaveButton />
      </div>
    </div>
  )
}
