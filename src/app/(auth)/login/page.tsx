// app/login/page.tsx (server component)
import Login from '@/components/login/login';
import { getUsers } from '@/lib/api/user/getUsers';

export default async function LoginPage() {
  const usersData = await getUsers(); // server-side, 1 request
  return <Login initialUsers={usersData} />;
}
