"use client";
import { useRouter } from "next/navigation";
//add suspense
import PageSection from "../components/ui/NavBar/PageSection";
import { useContext, useEffect, useState } from "react";
import { BoardNameContext } from "./DisplayNavContext";
import supabase from "../supabaseclient";

export default function DisplayBoards({ state, stateChange, newElem }) {
  const [board, setBoard] = useState();
  const [boardDetails, setBoardDetails] = useContext(BoardNameContext);

  const router = useRouter();
  useEffect(() => {
    console.log("render again to fetch boards");
    const fetchData = async () => {
      try {
        const {data:BoardData , error:BoardError} = await supabase.from("boards").select("*").eq("userid" , 1);
        //fetch("/api/routes", { cache: "no-store" });
        if (BoardError) {
          throw new Error("failed to fetch board");
        }
        console.log("calling boards");
        console.log(BoardData);
        setBoard(BoardData);
        setBoardDetails((prevBoard) => ({
          ...prevBoard,
          name: BoardData[0].boardname,
          id: BoardData[0].boardid,
        }));
      } catch (error) {
        console.error("Error fetching boards:", error);
      }
    };
    fetchData();
  }, [newElem, boardDetails.change]);

  useEffect(() => {
    if (boardDetails?.id) {
      router.push(`/home/board/${boardDetails.id}`);
    }
  }, [boardDetails.id]);

  // useEffect(()=>{
  //     if(board!= undefined){
  //         console.log(newElem);
  //     const newArray = [...board , {boardid:board.length+1 , boardname: newElem , userid:1}];
  //     console.log(newArray);
  //     setBoard(newArray);}
  // },[newElem]);
  //one doubt

  function callAnotherBoard(param) {
    console.log("redirect");
    console.log(param[1] + "board");

    // setBoardDetails({...BoardNameContext,
    //     name:param[1],
    //     id: param[0]
    // });
    setBoardDetails((prev) => ({
      ...prev,
      name: param[1],
      id: param[0],
      chnage: false,
    }));

    router.push(`/home/board/${param[0]}`);
  }
  console.log(state + " prev state");
  return (
    <div>
      <div className="text-heading-s text-medium-grey p-4">
        ALL BOARDS({board?.length})
      </div>
      {board?.map((board) => (
        <PageSection
          styles={"text-medium-grey"}
          key={board.boardid}
          param={[board.boardid, board.boardname]}
          onChange={callAnotherBoard}
        >
          {board.boardname}
        </PageSection>
      ))}
      <PageSection
        styles={"text-main-purple"}
        param={!state}
        onChange={stateChange}
      >
        +Create New Board
      </PageSection>
    </div>
  );
}
