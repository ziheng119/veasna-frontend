import { PackageIcon } from "@/assets/icons"
import { Drug } from "@/lib/types/drug"
import { DrugTableRow } from "./DrugTableRow"

interface DrugTableProps {
    drugs: Drug[]
    onStockLevelChange: (drugId: string, newLevel: "low" | "medium" | "high") => void
}


// Drug Table Component
export function DrugTable({ drugs, onStockLevelChange }: DrugTableProps) {
    return (
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-green-default">
          <h2 className="text-lg font-semibold text-white">
            Drug Inventory ({drugs.length} items)
          </h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Drug ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Drug Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {drugs.map((drug: Drug) => (
                <DrugTableRow 
                  key={drug.drug_id}
                  drug={drug}
                  onStockLevelChange={onStockLevelChange}
                />
              ))}
            </tbody>
          </table>
          
          {drugs.length === 0 && (
            <div className="text-center py-8">
              <PackageIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No drugs found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    )
  }