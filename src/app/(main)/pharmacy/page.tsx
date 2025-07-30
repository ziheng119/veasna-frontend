"use client"

import React, { useMemo, useState } from "react"
import { DrugTable } from "@/components/pharmacy/DrugTable"
import { Drug } from "@/lib/types/drug"
import { PageHeader } from "@/components/pharmacy/PageHeader"
import { DrugSearchBar } from "@/components/pharmacy/DrugSearchBar"
import { PlusIcon } from "@/assets/icons"
import { useRouter } from "next/navigation"

const SAMPLE_DRUGS: Drug[] = [
    { drug_id: "D001", drug_name: "Aspirin", drug_stockLevel: "high" },
    { drug_id: "D002", drug_name: "Ibuprofen", drug_stockLevel: "medium" },
    { drug_id: "D003", drug_name: "Acetaminophen", drug_stockLevel: "low" },
    { drug_id: "D004", drug_name: "Amoxicillin", drug_stockLevel: "high" },
    { drug_id: "D005", drug_name: "Lisinopril", drug_stockLevel: "low" },
    { drug_id: "D006", drug_name: "Metformin", drug_stockLevel: "medium" },
    { drug_id: "D007", drug_name: "Atorvastatin", drug_stockLevel: "high" },
    { drug_id: "D008", drug_name: "Levothyroxine", drug_stockLevel: "medium" },
    { drug_id: "D009", drug_name: "Omeprazole", drug_stockLevel: "low" },
    { drug_id: "D010", drug_name: "Hydrochlorothiazide", drug_stockLevel: "high" },
    { drug_id: "D011", drug_name: "Amlodipine", drug_stockLevel: "medium" },
    { drug_id: "D012", drug_name: "Metoprolol", drug_stockLevel: "high" },
    { drug_id: "D013", drug_name: "Losartan", drug_stockLevel: "low" },
    { drug_id: "D014", drug_name: "Simvastatin", drug_stockLevel: "medium" },
    { drug_id: "D015", drug_name: "Prednisone", drug_stockLevel: "high" }
]
  


export default function Pharmacy(): React.ReactElement {
    const router = useRouter();
    const [drugs, setDrugs] = useState<Drug[]>(SAMPLE_DRUGS)
    const [searchTerm, setSearchTerm] = useState<string>("")

    // if there is a change in the searchTerm or drug, filteredDrugs is recalculated
    const filteredDrugs = useMemo(() => {
        if (!searchTerm.trim()) {
            return drugs
        }

        const searchLower = searchTerm.toLowerCase()
        return drugs.filter((drug) =>
        drug.drug_name.toLowerCase().includes(searchLower) ||
        drug.drug_id.toLowerCase().includes(searchLower) ||
        drug.drug_stockLevel.toLowerCase().includes(searchLower)
        )
    }, [drugs, searchTerm])

    const handleSearchChange = (term: string) => {
        setSearchTerm(term)
    }

    const handleStockLevelChange = (drugId: string, newLevel: "low" | "medium" | "high") => {
        setDrugs(prevDrugs =>
            prevDrugs.map((drug) => 
                drug.drug_id === drugId ? { ...drug, drug_stockLevel: newLevel} : drug
            )
        )
    }
    
    const handleDeleteDrug = (drugId: string) => {
        if (window.confirm('Are you sure you want to delete this drug?')) {
            setDrugs(prevDrugs => prevDrugs.filter(drug => drug.drug_id !== drugId))
        }
    }

    const onAddDrug = () => {
        router.push("/pharmacy/pharmacy-form");
    }
  
    return (
      <div className="min-h-screen p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <PageHeader />
          
            <div className="flex items-center justify-between">
              <DrugSearchBar
                onSearchChange={handleSearchChange}
              />

              <button
                onClick={onAddDrug}
                className="ml-4 bg-green-500 hover:bg-green-600 text-white p-2 rounded-full transition" 
              >
                <PlusIcon className='w-5 h-5'/>
              </button>
            </div>
          </div>
  
          <DrugTable 
            drugs={filteredDrugs}
            onStockLevelChange={handleStockLevelChange}
            onDeleteDrug={handleDeleteDrug}
          />
        </div>
      </div>
    )
  }