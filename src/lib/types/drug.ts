export interface Drug {
    drug_id: string
    drug_name: string
    drug_stockLevel: "low" | "medium" | "high"
}

export interface Stats {
    total: number
    low: number
    medium: number
    high: number
}
  