"use client";
import IndividualTask from "@/app/helpers/IndividualTask";
import AddColumns from "../AddColum";
import { useState, useEffect, useContext } from "react";
import supabase from "@/app/supabaseclient";
import { useParams } from "next/navigation";
import { BoardDetailsContext, DisplayNavContext } from "../../AllContext";
import useStore from "@/app/global";

export default function Board() {
  const params = useParams();

  const [headers, setHeaders] = useState();
  const [tasks, setTasks] = useState();
  console.log("DisplayNavContext:", useContext(DisplayNavContext));
  console.log("BoardDetailsContext:", useContext(BoardDetailsContext));
  
  const [id, setId] = useContext(DisplayNavContext);
  const [boardDetails, setBoardDetails] = useContext(BoardDetailsContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: headerData, error: headerError } = await supabase
          .from("headers")
          .select("*")
          .eq("boardid", params.boardid);
        if (headerError) {
          throw new Error("failed to fetch headers");
        }
        setHeaders(headerData);
        console.log(headerData);

        const promise = headerData.map(async (header) => {
          const { data: taskData, error: taskError } = await supabase
            .from("tasks")
            .select("*")
            .eq("headerid", header.headerid);

          if (taskError) {
            throw new Error(
              `Error fetching tasks for header ${header.headerid}:`,
              taskError
            );
            return { data: [] }; 
          }

          return { data: taskData || [] };
        });

        const taskdata = await Promise.all(promise);
        setTasks(taskdata);
      } catch (error) {
        throw new Error("Error fetching headers: ", error);
      }
    };
    fetchData();
  }, [params.boardid, boardDetails.change]);


  return (
    <div className="flex">
      {headers == undefined ? (
        <div>Loading</div>
      ) : (
        headers.map((header, index) => {
          return (
            <div
              className=" overflow-y-auto max-h-[90vh]"
              key={header.headerid}
            >
              <div className="text-medium-grey p-2">
                <div className="p-1 text-body-l">
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
      )}

      <div className="flex justify-center items-center bg-[rgba(var(--color-dialog), 1)] m-2 min-w-44">
        <AddColumns></AddColumns>
      </div>
    </div>
  );
}
