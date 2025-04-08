// "use client";
// import IndividualTask from "@/app/helpers/IndividualTask";
// import AddColumns from "../AddColum";
// import { useState, useEffect, useContext } from "react";
// import supabase from "@/app/supabaseclient";
// import { useParams } from "next/navigation";
// import { BoardDetailsContext , DisplayNavContext } from "@/app/Home/AllContext";
// import useStore from "@/app/global";

// export default function Board() {
//   const params = useParams();

//   const [headers, setHeaders] = useState();
//   const [tasks, setTasks] = useState();
  
//   const [id, setId] = useContext(DisplayNavContext);
//   const [boardDetails, setBoardDetails] = useContext(BoardDetailsContext);
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const { data: headerData, error: headerError } = await supabase
//           .from("headers")
//           .select("*")
//           .eq("boardid", params.boardid);
//         if (headerError) {
//           throw new Error("failed to fetch headers");
//         }
//         setHeaders(headerData);
//         console.log(headerData);

//         const promise = headerData.map(async (header) => {
//           const { data: taskData, error: taskError } = await supabase
//             .from("tasks")
//             .select("*")
//             .eq("headerid", header.headerid);

//           if (taskError) {
//             throw new Error(
//               `Error fetching tasks for header ${header.headerid}:`,
//               taskError
//             );
//             return { data: [] }; 
//           }
//           console.log(taskData);
//           return { data: taskData || [] };
//         });

//         const taskdata = await Promise.all(promise);
//         setTasks(taskdata);
//       } catch (error) {
//         throw new Error("Error fetching headers: ", error);
//       }
//     };
//     fetchData();
//   }, [params.boardid, boardDetails.change]);


//   return (
//     <div className="flex">{params.boardid==0?(<div className="">Dummy</div>):
//       (headers == undefined ? (
//       <div>Loading</div>
//     ) : (
//       headers.map((header, index) => {
//         return (
//           <div
//             className=" overflow-y-auto max-h-[90vh]"
//             key={header.headerid}
//           >
//             <div className="text-medium-grey p-2 ">
//               <div className="p-1 text-body-l ">
//                 {header.headername} (
//                 {tasks == undefined ? 0 : tasks[index]?.data?.length})
//               </div>
//               {tasks == undefined ? (
//                 <div>Loading</div>
//               ) : (
//                 <IndividualTask
//                   tasks={tasks[index]?.data}
//                   key={Math.random()}
//                   status={header.headername}
//                 />
//               )}
//             </div>
//           </div>
//         );
//       })
//     )

// )}

// <div className="flex justify-center items-center m-2 min-w-44">
//       <AddColumns></AddColumns>
//     </div>
//           </div>
//   );
// }



"use client";
import IndividualTask from "@/app/helpers/IndividualTask";
import AddColumns from "../AddColum";
import { useState, useEffect, useContext } from "react";
import supabase from "@/app/supabaseclient";
import { useParams } from "next/navigation";
import { BoardDetailsContext, DisplayNavContext } from "@/app/Home/AllContext";

export default function Board() {
  const params = useParams();
  const [headers, setHeaders] = useState();
  const [tasks, setTasks] = useState();
  const [, setId] = useContext(DisplayNavContext);
  const [boardDetails] = useContext(BoardDetailsContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: headerData, error: headerError } = await supabase
          .from("headers")
          .select("*")
          .eq("boardid", params.boardid);

        if (headerError) throw new Error("Failed to fetch headers");
        setHeaders(headerData);

        const promise = headerData.map(async (header) => {
          const { data: taskData, error: taskError } = await supabase
            .from("tasks")
            .select("*")
            .eq("headerid", header.headerid);

          if (taskError) {
            console.error(`Error fetching tasks for header ${header.headerid}:`, taskError);
            return { data: [] };
          }

          return { data: taskData || [] };
        });

        const taskdata = await Promise.all(promise);
        setTasks(taskdata);
      } catch (error) {
        console.error("Error fetching headers:", error);
      }
    };

    fetchData();
  }, [params.boardid, boardDetails.change]);

  if (params.boardid == 0) {
    // Dummy Page UI
    return (
      <div className="flex flex-col items-center justify-center w-full h-[calc(100vh-4rem)] text-center px-6">
        <div className="bg-gray-800 rounded-2xl p-8 shadow-lg border border-purple-800 max-w-md w-full">
          <h1 className="text-4xl font-bold text-purple-400 mb-4">Welcome 👋</h1>
          <p className="text-gray-300 text-lg mb-4">
            This is a placeholder board. You can create a new board to start managing your tasks!
          </p>
          <div className="text-sm text-gray-500">
             Click <strong>+ New Board</strong> to get started.
          </div>
        </div>
      </div>
    );
  }

  if (!headers) {
    return <div className="text-white p-4">Loading...</div>;
  }

  return (<div className="flex">{params.boardid==0?(<div className="">Dummy</div>):
          (headers == undefined ? (
          <div>Loading</div>
        ) : (
          headers.map((header, index) => {
            return (
              <div
                className=" overflow-y-auto max-h-[90vh]"
                key={header.headerid}
              >
                <div className="text-medium-grey p-2 ">
                  <div className="p-1 text-body-l ">
                    {header.headername} (
                    {tasks == undefined ? 0 : tasks[index]?.data?.length})
                  </div>
                  {tasks == undefined ? (
                    <div>Loading</div>
                  ) : (
                    <IndividualTask
                      tasks={tasks[index]?.data}
                      key={Math.random()}
                      status={header.headername}
                    />
                  )}
                </div>
              </div>
            );
          })
        )
    
    )}
    
    <div className="flex justify-center items-center m-2 min-w-44">
          <AddColumns></AddColumns>
        </div>
              </div>
      
  );
}
