import { redirect } from 'next/navigation'
import { logout } from './action'
import { createClient } from '@/utils/supabase/server'

export default async function PrivatePage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  return (
    <div>
      <p>Hello {data.user.email}</p>
      <form action={logout}>
        <button type="submit">Sign out</button>
      </form>
    </div>
  );
}