"use client";
import { useRouter } from "next/navigation";
//add suspense
import PageSection from "../components/ui/NavBar/PageSection";
import { useContext, useEffect, useState } from "react";
import { BoardDetailsContext , UserIdContext } from "../Home/AllContext";
import supabase from "../supabaseclient";

export default function DisplayBoards({ state, stateChange, newElem }) {
  const [board, setBoard] = useState();
  const [boardDetails, setBoardDetails] = useContext(BoardDetailsContext);
  const [userId, setUserId] = useContext(UserIdContext);

  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: BoardData, error: BoardError } = await supabase
          .from("boards")
          .select("*")
          .eq("userid", userId);

        if (BoardError) {
          throw new Error("failed to fetch board");
        }
        setBoard(BoardData);
        setBoardDetails((prevBoard) => ({
          ...prevBoard,
          name: BoardData[0].boardname,
          id: BoardData[0].boardid,
        }));
      } catch (error) {
        throw new Error("Error fetching boards:", error);
      }
    };
    fetchData();
  }, [newElem, boardDetails.newBoard]);

  useEffect(() => {
    if (boardDetails?.id) {
      router.push(`/Boards/${boardDetails.id}`);
    }
  }, [boardDetails.id]);

  function callAnotherBoard(param) {
    setBoardDetails((prev) => ({
      ...prev,
      name: param[1],
      id: param[0],
      chnage: false,
    }));

    router.push(`/Boards/${param[0]}`);
  }

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
