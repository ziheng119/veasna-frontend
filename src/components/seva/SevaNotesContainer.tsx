"use client"

import { useState } from "react"
import SaveButton from "../shared/SaveButton"
import VerticalLabelInputPair from "../shared/VerticalLabelInputPair"

export default function SevaNotesContainer() {

    const [diagnosis, setDiagnosis] = useState<string>("");
    const [dateOfReferral, setDateOfReferral] = useState<string>("");
    const [additionalNotes, setAdditionalNotes] = useState<string>("");

    return (
        <div className="flex flex-col gap-4 bg-beige-default px-4 py-2 rounded-md border-[1px] lg:w-[30%]">

            <h2 className="text-[20px] font-semibold">Diagnosis</h2>
            <div className="flex w-full h-[40%]">
                <VerticalLabelInputPair />
            </div>

        <div className="flex flex-col gap-2 w-full">
            <h2 className="text-[20px] font-semibold">Date of Referral</h2>
            <input
            type="date"
            placeholder="DD/MM/YYYY"
            value={dateOfReferral}
            onChange={(e) => {                
                setDateOfReferral(e.target.value);
            }}
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