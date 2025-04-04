"use client";

import { createContext, React, useContext, useEffect, useState } from "react";
import UnitElemDisplay from "../components/ui/UnitElemDisplay";
import AppHeader from "../appheader/AppHeader";
import { BoardContext } from "./BoardContext.js";
import BoardContent from "../Home/BoardContent";

export const DisplayNavContext = createContext();
export const BoardNameContext = createContext();

export default function DisplayContext({ children }) {
  const [displayNav, setDisplayNav] = useState(false);
  const [Board, setBoard] = useContext(BoardContext);
  const [boardDetails, setBoardDetails] = useState({
    name: "Loading",
    id: 0,
    change: true,
    newBoard: false,
  });
  useEffect(() => {
    console.log(Board[0].boardname);
    if (Board) {
      setBoardDetails((prevBoard) => ({
        ...prevBoard,
        name: Board[0].boardname,
        id: Board[0].boardid,
      }));
      
    console.log(boardDetails);
    }
  }, [Board]);


  useEffect(()=>{
    console.log(boardDetails)
  },[boardDetails])

  return (
    <DisplayNavContext.Provider value={[displayNav, setDisplayNav]}>
      <BoardNameContext.Provider value={[boardDetails, setBoardDetails]}>
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
        {children}
      </BoardNameContext.Provider>
    </DisplayNavContext.Provider>
  );
}
