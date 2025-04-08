// "use client";
// import { useRouter } from "next/navigation";
// //add suspense
// import PageSection from "../components/ui/NavBar/PageSection";
// import { useContext, useEffect, useState } from "react";
// import { BoardDetailsContext , UserIdContext } from "../Home/AllContext";
// import supabase from "../supabaseclient";

// export default function DisplayBoards({ state, stateChange, newElem }) {
//   const [board, setBoard] = useState();
//   const [boardDetails, setBoardDetails] = useContext(BoardDetailsContext);
//   const [userId, setUserId] = useContext(UserIdContext);
  

//   const router = useRouter();
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const { data: BoardData, error: BoardError } = await supabase
//           .from("boards")
//           .select("*")
//           .eq("userid", userId);

//         if (BoardError) {
//           throw new Error("failed to fetch board");
//         }
//         setBoard(BoardData);
//         setBoardDetails((prevBoard) => ({
//           ...prevBoard,
//           name: BoardData[0]?.boardname,
//           id: BoardData[0]?.boardid,
//         }));
//       } catch (error) {
//         throw new Error("Error fetching boards:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   useEffect(()=>{
//     console.log("run boards again");
//     const fetchData = async()=>{
//     const { data: BoardData, error: BoardError } = await supabase
//     .from("boards")
//     .select("*")
//     .eq("userid", userId);

//   if (BoardError) {
//     throw new Error("failed to fetch board");
//   }
  
//   setBoard(BoardData);
// }
// fetchData();
//   }, [boardDetails?.change])

//   useEffect(() => {
//     console.log("pushing to the new boardid");
//     if (boardDetails?.id) {
//       router.push(`/Boards/${boardDetails.id}`);
//     }
//   }, [boardDetails?.id]);




//   function callAnotherBoard(param) {
//     setBoardDetails((prev) => ({
//       ...prev,
//       name: param[1],
//       id: param[0],
//       change: !prev.change,
//     }));

//     router.push(`/Boards/${param[0]}`);
//   }

//   return (
//     <div>
//       <div className="text-heading-s text-medium-grey p-4">
//         ALL BOARDS({board?.length})
//       </div>
//       {board?.map((board) => (
//         <PageSection
//           styles={"text-medium-grey w-full "}
//           key={board.boardid}
//           param={[board.boardid, board.boardname]}
//           onChange={callAnotherBoard}
//         >
//           {board.boardname}
//         </PageSection>
//       ))}
//       <PageSection
//         styles={"text-main-purple"}
//         param={!state}
//         onChange={stateChange}
//       >
//         +Create New Board
//       </PageSection>
//     </div>
//   );
// }

"use client";
import { useRouter } from "next/navigation";
import PageSection from "../components/ui/NavBar/PageSection";
import { useContext, useEffect, useState } from "react";
import { BoardDetailsContext, UserIdContext } from "../Home/AllContext";
import supabase from "../supabaseclient";

export default function DisplayBoards({ state, stateChange }) {
  const [board, setBoard] = useState();
  const [boardDetails, setBoardDetails] = useContext(BoardDetailsContext);
  const [userId] = useContext(UserIdContext);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: BoardData, error: BoardError } = await supabase
          .from("boards")
          .select("*")
          .eq("userid", userId);

        if (BoardError) throw new Error("Failed to fetch board");

        setBoard(BoardData);
        if (BoardData?.length > 0) {
          setBoardDetails((prevBoard) => ({
            ...prevBoard,
            name: BoardData[0]?.boardname,
            id: BoardData[0]?.boardid,
          }));
        }
      } catch (error) {
        console.error("Error fetching boards:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const { data: BoardData, error: BoardError } = await supabase
        .from("boards")
        .select("*")
        .eq("userid", userId);

      if (BoardError) {
        console.error("Failed to fetch board");
        return;
      }

      setBoard(BoardData);
    };

    fetchData();
  }, [boardDetails?.change]);

  useEffect(() => {
    if (boardDetails?.id) {
      router.push(`/Boards/${boardDetails.id}`);
    }
  }, [boardDetails?.id]);

  function callAnotherBoard(param) {
    setBoardDetails((prev) => ({
      ...prev,
      name: param[1],
      id: param[0],
      change: !prev.change,
    }));
    router.push(`/Boards/${param[0]}`);
  }

  return (
    <div className="w-full max-w-md mx-auto px-4 sm:px-6 md:px-8">
      <div className="text-heading-s text-medium-grey py-4 text-center sm:text-left">
        ALL BOARDS ({board?.length})
      </div>

      <div className="space-y-2">
        {board?.map((b) => {
          const isActive = boardDetails.id === b.boardid;
          return (
            <PageSection
              key={b.boardid}
              param={[b.boardid, b.boardname]}
              onChange={callAnotherBoard}
              styles={`w-full px-4 py-3 rounded-lg text-sm sm:text-base cursor-pointer transition-colors duration-200 
                ${
                  isActive
                    ? "bg-purple-800 text-white"
                    : "text-medium-grey"
                }`}
            >
              {b.boardname}
            </PageSection>
          );
        })}

        <PageSection
          styles="text-main-purple w-full px-4 py-3 rounded-lg text-sm sm:text-base cursor-pointer bg-purple-800 hover:bg-white/10 transition-colors duration-200"
          param={!state}
          onChange={stateChange}
        >
          + Create New Board
        </PageSection>
      </div>
    </div>
  );
}

