import { redirect } from 'next/navigation'
import { logout } from './action';
import { createClient } from '@/utils/supabase/server'
import Sidebar from './sidebar';
import AllContext from './AllContext';
import useStore from '../global';


export default async function PrivatePage() {
  console.log("running");
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  console.log(data);
  if (error || !data?.user) {
    redirect('/login')
  }
  
  // const setUser = useStore((state) => state.setUser);
  
  // setUser({id: data.user.id});

  return (
    <div>
      <AllContext user = {data.user}>
      <Sidebar user={data.user}></Sidebar>
      </AllContext>
    </div>


  );
}
