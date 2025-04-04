'use client';

import AllContext from "../../AllContext";
import useStore from "@/app/global";
import Dashboard from "../../sidebar";


export default function RootLayout({children}){
    const { user } = useStore();
        console.log(user);
  if (!user) return <p>Loading...</p>; 
    return(

        <AllContext user={user}>
            <Dashboard user={user}>
            {children}
            </Dashboard>
            </AllContext>
    )
}