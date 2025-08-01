"use client"

import { useState } from "react"
import SaveButton from "../shared/SaveButton"
import VerticalLabelInputPair from "../shared/VerticalLabelInputPair"
import SevaSnellensTest from "./SevaSnellensTest"

export default function SevaNotesContainer() {

    return (
        <div className="flex flex-col gap-4 bg-beige-default px-4 py-2 rounded-md border-[1px] lg:w-[30%]">

            <h2 className="text-[20px] font-semibold">New Snellen's Test</h2>
            <div className="flex w-full h-[30%]">
                <SevaSnellensTest />
            </div>

            <h2 className="text-[20px] font-semibold">Diagnosis</h2>
            <div className="flex w-full h-[20%]">
                <VerticalLabelInputPair />
            </div>

        <div className="flex flex-col gap-2 w-full">
            <h2 className="text-[20px] font-semibold">Date of Referral</h2>
            <input
            type="date"
            placeholder="DD/MM/YYYY"
            className="bg-white border-[1px] rounded-sm p-2 w-32 text-black"
            />
        </div>

            <h2 className="text-[20px] font-semibold">Additional Notes</h2>
            <div className="flex w-full h-[40%]">
                <VerticalLabelInputPair />
            </div>


            <div className="flex items-center justify-end">
                <SaveButton />
            </div>
        </div>
    


    )
}