"use client"

import { addUser } from "@/lib/api/user/addUser"
import { getUsers } from "@/lib/api/user/getUsers"
import { User } from "@/lib/types/user"
import { useUserStore } from "@/stores/useUserStore"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import CreatableSelect from 'react-select/creatable'

export default function Login() {

  const setUser = useUserStore((state) => state.setUser)
  const router = useRouter();

  const [users, setUsers] = useState<User[]>([])
  const [options, setOptions] = useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState<User>({ username: "" })

  console.log("user:", useUserStore((state) => state.user))

  useEffect(() => {
    async function fetchUsers() {
      try {
        const usersData = await getUsers();
        setUsers(usersData);
        setOptions(usersData)
      } catch (err) {
        console.error(err);
      }
    }

    fetchUsers();
  }, []);

  const handleCreateUser = async (user: User) => {
    const createdUser = await addUser(user);
    toast.success(`Login Success: User ${createdUser.username} created`)

    // Optionally update your state or UI here, e.g.:
    // setUsers(prev => [...prev, createdUser]);
    // show success message/toast
  };

  const handleLogin = async () => {
    if (!selectedUser) {
      toast("Please select a user!");
      return;
    }

    if (selectedUser.username.trim() === "") {
      toast("Username cannot be empty!");
      return
    }

    try {
      if (!users.some(user => user.username === selectedUser.username)) {
        await handleCreateUser(selectedUser);
      }

      setUser(selectedUser)
      router.push('/')

    } catch (error) {
      console.log(error)
      toast.error("An error has occurred, please try again")
      return
    }
  }

  return (
    <div
      className="bg-beige-default px-[30px] py-[30px] rounded-md border-[1px]"
    >
      <h2 className="font-bold text-[30px] mb-[30px] text-center">Log In</h2>

      <div className="flex items-center mb-[30px]">
        <p className="w-24">User</p>
        <CreatableSelect
          instanceId="my-creatable-select"
          isClearable
          className="w-[200px] text-black"
          onChange={(newValue) => setSelectedUser({ username: (newValue?.value || '') })}
          onCreateOption={(newUsername) => {
            setOptions((prev) => [...prev, { username: newUsername }])
            setSelectedUser({ username: newUsername })
          }}
          options={options.map(user => {
            return { label: user.username, value: user.username };
          })}
        />
      </div>

      <button
        className="bg-green-default px-[10px] py-[5px] rounded-md border-[1px] block hover:cursor-pointer items-center mx-auto"
        onClick={handleLogin}
      >
        Login
      </button>

    </div>
  )
}