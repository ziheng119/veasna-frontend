import { Drug } from "@/lib/types/drug"
import { StockLevelBadge } from "./StockLevelBadge"
import { StockLevelSelector } from "./StockLevelSelector"

interface DrugTableRowProps {
    drug: Drug
    onStockLevelChange: (drugId: string, newLevel: "low" | "medium" | "high") => void
}

export const DrugTableRow: React.FC<DrugTableRowProps> = ({ drug, onStockLevelChange }) => {
    return (
      <tr className="hover:bg-gray-50">
        <td className="px-6 py-4 text-sm font-medium text-gray-900">
          {drug.drug_id}
        </td>
        <td className="px-6 py-4 text-sm text-gray-900">
          {drug.drug_name}
        </td>
        <td className="px-6 py-4">
          <StockLevelBadge level={drug.drug_stockLevel} />
        </td>
        <td className="px-6 py-4 text-sm text-gray-500">
          <StockLevelSelector 
            currentLevel={drug.drug_stockLevel}
            drugId={drug.drug_id}
            onStockLevelChange={onStockLevelChange}
          />
        </td>
      </tr>
    )
}