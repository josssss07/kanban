"use client";
import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export const BoardContext = createContext();
export const UserIdContext = createContext();

export default function AllBoards({ userId, initialBoards, children }) {
  const [boards, setBoards] = useState(initialBoards);
  const [userid, setUserid] = useState(userId);
  const router = useRouter();

  useEffect(() => {
    if (boards?.length > 0) {
      router.push(`/Boards/${boards[0].boardid}`);
    }
  }, [boards, router]);

  return (
    <BoardContext.Provider value={[boards, setBoards]}>
      <UserIdContext.Provider value={[userid, setUserid]}>
        {children}
      </UserIdContext.Provider>
    </BoardContext.Provider>
  );
}
