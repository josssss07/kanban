"use client";
import { redirect } from "next/navigation";
import { useContext, useEffect } from "react";
import { BoardContext } from "../helpers/BoardContext";
import supabase from "../supabaseclient";

export default function Home() {
  //   const taskObject = [
  //     {
  //         Currentstatus: "ToDo",
  //         taskNSubtask: [
  //             {
  //                 task: "Build UI for onboarding flow",
  //                 description: "We know what we are planning for version one. Now we need to finalize the first pricing model we will use. Keep iterating the subtasks until we have a coherent position.",
  //                 subtasks: ["task1", "task2", "task3"],
  //                 taskCompleted: [],
  //             },
  //             {
  //                 task: "Build UI for search",
  //                 description: "We know what we are planning for version one. Now we need to finalize the first pricing model we will use. Keep iterating the subtasks until we have a coherent position.",
  //                 subtasks: ["task1", "task2", "task3"],
  //                 taskCompleted: [],
  //             },
  //             {
  //                 task: "Build settings UI",
  //                 description: "We know what we are planning for version one. Now we need to finalize the first pricing model we will use. Keep iterating the subtasks until we have a coherent position.",
  //                 subtasks: ["task1", "task2", "task3"],
  //                 taskCompleted: [],
  //             },
  //             {
  //                 task: "QA and test all major user journeys",
  //                 description: "We know what we are planning for version one. Now we need to finalize the first pricing model we will use. Keep iterating the subtasks until we have a coherent position.",
  //                 subtasks: ["task1", "task2", "task3"],
  //                 taskCompleted: [],
  //             }
  //         ]
  //     }];
  //  redirect('/Board/1');

  const [Boards, setBoards] = useContext(BoardContext);
  console.log(Boards);
  let boardid;
  useEffect(() => {
    if (Boards) {
      boardid = Boards[0].boardid;
    }
    if (boardid) {
      redirect(`/home/board/${boardid}`);
    } else {
      console.log("Loading");
    }
  }, [Boards]);
}
