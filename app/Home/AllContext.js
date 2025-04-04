"use client";

import { createContext, useEffect, useState } from "react";
import supabase from "../supabaseclient";

export const UserIdContext = createContext();
export const BoardsContext = createContext();
export const BoardDetailsContext = createContext();
export const DisplayNavContext = createContext();

export default function AllContext({user, children }) {
  const [userId, setUserId] = useState(user?.id || null);
  const [boards, setBoards] = useState([]);
  const [boardDetails, setBoardDetails] = useState({
    name: "Loading",
    id: 0,
    change: true,
    newBoard: false,
  });
  const [displayNav, setDisplayNav] = useState(false);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: boardData, error: boardError } = await supabase
        .from("boards")
        .select("*")
        .eq("userid", userId);
  
      if (boardError) {
        return Response.json({ error: "Failed to fetch boards" }, { status: 500 });
      }
          // Set board details if boards exist
          setBoards(boardData);
          if (boardData?.length > 0) {
            setBoardDetails({
              name: boardData[0].boardname,
              id: boardData[0].boardid,
              change: true,
              newBoard: false,
            });
          }
        
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, [userId]); // ✅ Fetch on mount

  return (
    <UserIdContext.Provider value={[userId, setUserId]}>
      <BoardsContext.Provider value={[boards, setBoards]}>
        <BoardDetailsContext.Provider value={[boardDetails, setBoardDetails]}>
          <DisplayNavContext.Provider value={[displayNav, setDisplayNav]}>
            {children}
          </DisplayNavContext.Provider>
        </BoardDetailsContext.Provider>
      </BoardsContext.Provider>
    </UserIdContext.Provider>
  );
}
