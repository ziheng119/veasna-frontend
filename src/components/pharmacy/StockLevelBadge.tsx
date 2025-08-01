interface StockLevelBadgeProps {
    level: "low" | "medium" | "high"
}

export function StockLevelBadge({ level }: StockLevelBadgeProps) {
    const getStockLevelColor = (level: "low" | "medium" | "high"): string => {
      switch (level) {
        case "low": return "bg-red-500"
        case "medium": return "bg-yellow-500"
        case "high": return "bg-green-500"
        default: return "bg-gray-500"
      }
    }
  
    return (
      <span className={`inline-flex items-center justify-center h-8 w-24 px-3 py-1 rounded-full text-xs font-medium text-white ${getStockLevelColor(level)}`}>
        {level.charAt(0).toUpperCase() + level.slice(1)}
      </span>
    )
}