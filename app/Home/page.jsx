import { redirect } from 'next/navigation'
import { logout } from './action'
import { createClient } from '@/utils/supabase/server'
import Sidebar from './sidebar'
export default async function PrivatePage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  return (
    <div>
      <Sidebar user={data.user}></Sidebar>
      
    </div>
  );
}