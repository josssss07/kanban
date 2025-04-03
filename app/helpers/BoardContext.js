// "use client";
// import { createContext, useContext, useEffect, useState } from "react";
// import supabase from "../supabaseclient";
// // import { useUserid } from "../home/Userid";
// // import { createClient } from "@/utils/supabase/server";

// export const BoardContext = createContext();
// // const supabaseClient = createClient(); 


// export default function AllBoards({children }) {
//   const [boards, setBoards] = useState();
  
//   const [userId, setUserId] = useState(null);
//   // const userid = useUserid(); 
//   // console.log("calling rootlayout", { userid });

//   useEffect(() => {
//     async function callInitialBoard() {
//       try {
//           console.log("running");
//           console.log("Fetching user...");
//           const { data, error } = await supabaseClient.auth.getUser();
  
//           if (error || !data?.user) {
//             console.log("User not found, redirecting...");
//             router.push("/login");
//             return;
//           }
  
//           const fetchedUserId = data.user.id;
//           setUserId(fetchedUserId);
  

//         const {data:boardData , error:boardError} = await supabase.from("boards").select("*").eq("userid" , fetchedUserId);
//         if (boardError) {
//           throw new Error("failed to fetch board");
//         }
//         console.log(boardData);
//         setBoards(boardData);
//       } catch (error) {
//         console.error("Error fetching boards:", error);
//         return null;
//       }
//     }

//     callInitialBoard();
//   }, []);

//   let boardid;
//     if (boards) {
//       boardid = boards[0].boardid;
//     }
//     if (boardid) {
//       redirect(`/home/board/${boardid}`);
//     } else {
//       console.log("Loading");
//     }
//   return (
//     <BoardContext.Provider value={[boards, setBoards]}>
//       {children}
//     </BoardContext.Provider>
//   );
// }



"use client";
import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export const BoardContext = createContext();
export const UserIdContext = createContext();

export default function AllBoards({ userId,  initialBoards, children }) {
  console.log("from all boards");
  console.log(initialBoards);
  const [boards, setBoards] = useState(initialBoards);
  const [userid , setUserid] = useState(userId);
  const router = useRouter();

  useEffect(() => {
    if (boards?.length > 0) {
      router.push(`/home/board/${boards[0].boardid}`);
    }
  }, [boards, router]);

  return (
    <BoardContext.Provider value={[boards, setBoards]}>
      <UserIdContext.Provider value ={[userid , setUserid]}>
      {children}
      </UserIdContext.Provider>
    </BoardContext.Provider>
  );
}
