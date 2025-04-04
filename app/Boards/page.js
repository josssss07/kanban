"use client";

import { redirect } from "next/navigation";
import { useEffect, useContext } from "react";
import { BoardsContext } from "../Home/AllContext";

export default function BoardContent() {
  const [Boards, setBoards] = useContext(BoardsContext);
  console.log(Boards);
  let boardid;
  useEffect(() => {
    if (Boards) {
      boardid = Boards[0]?.boardid;
    }
    if (boardid) {
      redirect(`/Boards/${boardid}`);
    } else {
      redirect(`/Boards/0`);
    }
  }, [Boards]);
}
