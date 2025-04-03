"use client";

import { redirect } from "next/navigation";
import { useEffect, useContext } from "react";
import { BoardContext } from "../helpers/BoardContext";

export default function Home() {
  const [Boards, setBoards] = useContext(BoardContext);
  console.log(Boards);
  let boardid;
  useEffect(() => {
    if (Boards) {
      boardid = Boards[0]?.boardid;
    }
    if (boardid) {
      redirect(`/home/board/${boardid}`);
    } else {
      console.log("Loading");
    }
  }, [Boards]);
}
