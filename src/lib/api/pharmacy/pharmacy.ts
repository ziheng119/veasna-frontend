import { backend_url } from "@/constants/env_variable";
import { useUserStore } from "@/stores/useUserStore";
import { Drug } from "@/lib/types/drug";

type AddDrugPayload = Omit<Drug, 'id' | 'last_updated_at' | 'last_updated_by' | 'created_at'>;

/**
 * Fetches all drugs for a given location.
 */
export async function getDrugsByLocation(locationId: number): Promise<Drug[]> {
    const token = useUserStore.getState().user?.token;
    const res = await fetch(`${backend_url}/api/pharmacy?location_id=${locationId}`, {
        headers: { 'Authorization': `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Failed to fetch pharmacy stock');
    return res.json();
}

/**
 * Adds a new drug to the pharmacy stock.
 */
export async function addDrug(drugData: AddDrugPayload): Promise<Drug> {
    const token = useUserStore.getState().user?.token;
    const res = await fetch(`${backend_url}/api/pharmacy`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(drugData),
    });
    if (!res.ok) throw new Error('Failed to add drug');
    return res.json();
}

/**
 * Updates the stock level of an existing drug.
 */
export async function updateDrugStock(
    drugId: number, 
    stockLevel: Drug['stock_level']
): Promise<Drug> {
    const token = useUserStore.getState().user?.token;
    const res = await fetch(`${backend_url}/api/pharmacy/${drugId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ stock_level: stockLevel }),
    });
    if (!res.ok) throw new Error('Failed to update drug stock');
    return res.json();
}

/**
 * Deletes a drug from the pharmacy stock.
 */
export async function deleteDrug(drugId: number): Promise<void> {
    const token = useUserStore.getState().user?.token;
    const res = await fetch(`${backend_url}/api/pharmacy/${drugId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Failed to delete drug');
}