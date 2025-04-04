"use client"; 
import { useEffect } from "react"; 
import LayoutStructure from "../helpers/LayoutStructure"; 
import AllContext from "../Home/AllContext"; 
import useStore from "@/app/global"; 
import AppHeader from "../appheader/AppHeader"; 
import UnitElemDisplay from "../components/ui/UnitElemDisplay";  

export default function RootLayoutClient({ children }) {
  console.log("run layout");
  const { user, loadUser } = useStore();
  
  useEffect(() => {
    loadUser(); // load from localStorage on mount
  }, []);
  
  if (!user) return <p>Loading...</p>;
  
  return (
    <AllContext user={user}>
      <div className="min-h-full p-0 m-0 box-border">
        <div className="box-border font-sans min-h-screen p-0 m-0 text-white bg-gray-900 overflow-y-hidden">
          <div className="flex">
            <UnitElemDisplay
              styles={
                "text-heading-xl font-extrabold  align-text-bottom p-4"
              }
            >
              Kanban
            </UnitElemDisplay>
            <AppHeader />
          </div>
          <LayoutStructure>{children}</LayoutStructure>
        </div>
      </div>
    </AllContext>
  ); 
}