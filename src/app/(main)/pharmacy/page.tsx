"use client"

import React, { useState } from "react"
import SearchBar from "@/components/shared/SearchBar"
import { DrugTable } from "@/components/pharmacy/DrugTable"
import { Drug } from "@/lib/types/drug"
import { PageHeader } from "@/components/pharmacy/PageHeader"

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
    const [drugs, setDrugs] = useState<Drug[]>(SAMPLE_DRUGS)
  
    const [searchQuery, setSearchQuery] = useState<string>("")
    const [filteredDrugs, setFilteredDrugs] = useState<Drug[]>(drugs)
  
    const drugNames: string[] = drugs.map((drug: Drug) => drug.drug_name)
  
    const handleSearch = (query: string): void => {
      setSearchQuery(query)
      if (query.trim() === "") {
        setFilteredDrugs(drugs)
      } else {
        const filtered = drugs.filter((drug: Drug) =>
          drug.drug_name.toLowerCase().includes(query.toLowerCase()) ||
          drug.drug_id.toLowerCase().includes(query.toLowerCase())
        )
        setFilteredDrugs(filtered)
      }
    }
  
    const handleStockLevelChange = (drugId: string, newLevel: "low" | "medium" | "high"): void => {
      const updatedDrugs = drugs.map((drug: Drug) =>
        drug.drug_id === drugId ? { ...drug, drug_stockLevel: newLevel } : drug
      )
      setDrugs(updatedDrugs)
      
      // Update filtered drugs as well
      if (searchQuery.trim() === "") {
        setFilteredDrugs(updatedDrugs)
      } else {
        const filtered = updatedDrugs.filter((drug: Drug) =>
          drug.drug_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          drug.drug_id.toLowerCase().includes(searchQuery.toLowerCase())
        )
        setFilteredDrugs(filtered)
      }
    }
  
    return (
      <div className="min-h-screen p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <PageHeader />
          
            <div className="max-w-md">
              <SearchBar
                label="Search drugs by name or ID..."
                options={drugNames}
                // onSearch={handleSearch}
              />
            </div>
          </div>
  
          <DrugTable 
            drugs={filteredDrugs}
            onStockLevelChange={handleStockLevelChange}
          />
        </div>
      </div>
    )
  }