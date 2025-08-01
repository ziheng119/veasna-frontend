import React, { useState } from "react";
import { Drug } from "@/lib/types/drug";
import { StockLevelSelector } from "./StockLevelSelector";
import { StockLevelBadge } from "./StockLevelBadge";

interface AddDrugSidebarProps {
  onSubmit: (newDrug: Drug) => void;
}

export function AddDrugSidebar({
  onSubmit,
}: AddDrugSidebarProps) {
  const [drugName, setDrugName] = useState("");
  const [stockLevel, setStockLevel] = useState<"low" | "medium" | "high">("high");

  const handleStockLevelChange = (drugId: string, newLevel: "low" | "medium" | "high") => {
    setStockLevel(newLevel);
  };

  {/* for random example */}
  const generateTempId = (): string => {
    return `D${Math.random()}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!drugName.trim()) {
      alert("Please enter a drug name");
      return;
    }

    const newDrug: Drug = {
      drug_id: generateTempId(),
      drug_name: drugName.trim(),
      drug_stockLevel: stockLevel
    };

    onSubmit(newDrug);
    
    setDrugName("");
    setStockLevel("medium");
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Add New Drug</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="drugName" className="block text-sm font-medium text-gray-700 mb-1">
            Drug Name *
          </label>
          <input
            type="text"
            id="drugName"
            value={drugName}
            onChange={(e) => setDrugName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 text-black bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., Paracetamol"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Stock Level
          </label>
          <div className="flex items-center gap-3">

            <div className="flex items-center gap-2">
              <StockLevelBadge level={stockLevel} />
            </div>

            <div className="flex-1">
              <StockLevelSelector
                currentLevel={stockLevel}
                drugId="new-drug-temp"
                onStockLevelChange={handleStockLevelChange}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors font-medium"
          >
            Add Drug
          </button>
        </div>

      </form>
    </div>
  );
}