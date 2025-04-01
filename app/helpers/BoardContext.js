"use client";
import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../supabaseclient";

export const BoardContext = createContext();

export default function AllBoards({ children }) {
  const [boards, setBoards] = useState();

  useEffect(() => {
    async function callInitialBoard() {
      try {
        const {data:boardData , error:boardError} = await supabase.from("boards").select("*").eq("userid" , 1);
        //(
          //`${process.env.NEXT_PUBLIC_API_URL}/api/routes`,
          //{ cache: "no-store" }
        //);
        if (boardError) {
          throw new Error("failed to fetch board");
        }
        console.log(boardData);
        setBoards(boardData);
      } catch (error) {
        console.error("Error fetching boards:", error);
        return null;
      }
    }

    callInitialBoard();
  }, []);

  return (
    <BoardContext.Provider value={[boards, setBoards]}>
      {children}
    </BoardContext.Provider>
  );
}
