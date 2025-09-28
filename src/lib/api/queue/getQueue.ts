import { backend_url } from "@/constants/env_variable";

export async function getQueue(locationId: number, date: string, token: string) {
    try {
        const res = await fetch(`${backend_url}/api/queue?location_id=${locationId}&date=${date}`, {
            headers: { 'Authorization': `Bearer ${token}` },
        });

        if (!res.ok) throw new Error(`Failed to fetch queue: ${res.statusText}`);
        return await res.json();
    } catch (err) {
        console.error('GET Queue (Error):', err);
        throw err;
    }
}

