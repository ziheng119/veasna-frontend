import { backend_url } from "@/constants/env_variable";
import { User } from "../../types/user";

export async function getUsers(): Promise<User[]> {
  try {
    const res = await fetch(`${backend_url}/api/users`);

    if (!res.ok) {
      throw new Error(`Network response was not ok: ${res.status} ${res.statusText}`);
    }

    const data: User[] = await res.json();
    console.log('Users:', data);
    return data;

  } catch (err) {
    console.error('Fetch error:', err);
    // You might want to rethrow or return an empty array on error:
    throw err; // or: return [];
  }
}
