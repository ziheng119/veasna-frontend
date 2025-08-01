"use client";
import React, { useState } from 'react'

export default function PharmacyForm() {
    const [drug, setDrug] = useState({
        drugName: '',
        stockLevel: "high" as "low" | "medium" | "high",
    })

    const [submittedDrugs, setSubmittedDrugs] = useState<Array<{id: string, drugName: string, stockLevel: "low" | "medium" | "high"}>>([])
    

    return (
        <div className='min-h-screen'>
            <div className='max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:pxuct-8'>
                <div className='mb-6'>
                    <h1 className='text-2xl font-bold text-white-900'>
                        Add Drug
                    </h1>
                </div>

                <div className='bg-white rounded-lg shadow'>

                </div>
            </div>
        </div>
    )
}