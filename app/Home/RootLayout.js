// "use client";
// import DisplayContext from "../helpers/DisplayNavContext";
// import LayoutStructure from "../helpers/LayoutStructure";
// import AllBoards from "../helpers/BoardContext";
// import { useState, useEffect } from "react";

// export default function RootLayoutClient({ userId, children }) {
// const [boards , setBoards] = useState([]);
//   useEffect(()=>{
//     const fetchDate = async()=>{
//       try{
//     const { data: board, error: BoardError } = await supabase
//     .from("boards")
//     .select("*")
//     .eq("userid", userId);
//   if (BoardError) {
//     throw new Error("Failed to fetch board", BoardError);
//   }
//   console.log(board);
//   setBoards(board);}
//   catch(error){
//     throw new Error("Failed to run useEffect", error);
//   }}

//   fetchDate();
//   },[]);

//   return (
//     <div className="min-h-full p-0 m-0 box-border">
//       <div
//         className={`box-border font-sans min-h-screen p-0 m-0 text-[var(--color-text)] bg-[var(--color-dialog)]  overflow-y-hidden`}
//       >
//         {boards?(
//         <AllBoards userId={userId} initialBoards={boards}>
//           <DisplayContext>
//             <LayoutStructure>{children}</LayoutStructure>
//           </DisplayContext>
//         </AllBoards>):<div>Loading</div>}
//       </div>
//     </div>
//   );
// }


"use client";
import { useState, useEffect } from "react";
import supabase from "../supabaseclient";
import DisplayContext from "../helpers/DisplayNavContext";
import LayoutStructure from "../helpers/LayoutStructure";
import AllBoards from "../helpers/BoardContext";

export default function RootLayoutClient({ children }) {
  // const [boards, setBoards] = useState([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   if (!userId) return; // Ensure userId is available before fetching

  //   const fetchData = async () => {
  //     try {
  //       const { data: board, error } = await supabase
  //         .from("boards")
  //         .select("*")
  //         .eq("userid", userId);

  //       if (error) {
  //         console.error("Failed to fetch board:", error);
  //         return;
  //       }

  //       setBoards(board);
  //     } catch (error) {
  //       console.error("Error fetching boards:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [userId]); // Depend on userId

  return (
    <div className="min-h-full p-0 m-0 box-border">
      <div className="box-border font-sans min-h-screen p-0 m-0 text-[var(--color-text)] bg-[var(--color-dialog)] overflow-y-hidden border-2 border-red-500">
{/*         
          // <AllBoards userId={userId} initialBoards={boards}>
          //   <DisplayContext> */}
              <LayoutStructure>{children}</LayoutStructure>
          {/* //   </DisplayContext>
          // </AllBoards> */}
        
      </div>
    </div>
  );
}
