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
        <div className="box-border font-sans min-h-screen p-0 m-0 text-[var(--color-text)] bg-[var(--color-dialog)] overflow-y-hidden border-2 border-red-500">
        <div className="flex">
        <UnitElemDisplay
          styles={
            "text-heading-xl font-extrabold border-r-2 border-r-[var(--color-lineborder)] align-text-bottom p-4"
          }
        >
          kanban
        </UnitElemDisplay>
        <AppHeader />
      </div>
          <LayoutStructure>{children}</LayoutStructure>
        </div>
      </div>
    </AllContext>
  );
}
