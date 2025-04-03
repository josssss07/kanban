import { redirect } from 'next/navigation'
import { logout } from './action'
import { createClient } from '@/utils/supabase/server'
import Sidebar from './sidebar';
import RootLayout from '../layout';



export default async function PrivatePage() {
  console.log("running");
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  console.log(data);
  if (error || !data?.user) {
    redirect('/login')
  }


  return (
    // <div>
    //   <Sidebar user={data.user}></Sidebar>
      
    // </div>
    <>
    <RootLayout userid={data.user.id}/>
    </>

  );
}