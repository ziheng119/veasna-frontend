"use client"

import SaveButton from "../shared/SaveButton"
import VerticalLabelInputPair from "../shared/VerticalLabelInputPair"
import Input from "../shared/react-components/Input"

export default function SevaNotesContainer() {

    return (
        <div className="flex flex-col gap-4 bg-beige-default px-4 py-2 rounded-md border-[1px] lg:w-[30%]">

            <h2 className="text-[20px] font-semibold">New Snellen&apos;s Test</h2>
            <div className="min-h-70 flex flex-col">
                <div className="grid grid-cols-3 gap-x-4 gap-y-2 mb-[30px] items-center">
                    {/* Header Row */}
                    <p className="font-semibold text-start">Visual Acuity</p>
                    <p className="text-center">Left (OS)</p>
                    <p className="text-center">Right (OD)</p>

                    {/* With Pinhole Row */}
                    <p className="text-start">With Pinhole</p>
                    <Input />
                    <Input />

                    {/* Without Pinhole Row */}
                    <p className="text-start" >Without Pinhole</p>
                    <Input />
                    <Input />
                </div>

                <VerticalLabelInputPair label="Diagnosis"/>

            </div>

        <div className="flex flex-col gap-2 w-full">
            <h2 className="text-[15px] font-semibold">Date of Referral</h2>
            <input
            type="date"
            placeholder="DD/MM/YYYY"
            className="bg-white border-[1px] rounded-sm p-2 w-32 text-black"
            />
        </div>

            <div className="flex w-full h-[40%]">
                <VerticalLabelInputPair label="Additional Notes"/>
            </div>


            <div className="flex items-center justify-end">
                <SaveButton />
            </div>
        </div>
    


    )
}