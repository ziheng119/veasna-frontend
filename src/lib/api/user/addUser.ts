import { backend_url } from "@/constants/env_variable";
import { User } from "../../types/user";

export async function addUser(newUser: User): Promise<User> {
  try {
    console.log("adding user")
    const res = await fetch(`${backend_url}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    if (!res.ok) {
      throw new Error(`Failed to add user: ${res.status} ${res.statusText}`);
    }

    const createdUser: User = await res.json();
    return createdUser;

  } catch (error) {
    console.error("Add user error:", error);
    throw error;
  }
}
