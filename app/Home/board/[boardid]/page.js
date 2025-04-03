'use client'
import IndividualTask from "@/app/helpers/IndividualTask";
import AddColumns from "../AddColum";
import { useState, useEffect, useContext } from "react";
import supabase from "@/app/supabaseclient";
import { useParams } from "next/navigation";
import { BoardNameContext } from "@/app/helpers/DisplayNavContext";




export default function Board(){
    const params = useParams();
    // console.log(params);
    // const headers = await fetchHeaders(params.boardid);
    // const tasks = await Promise.all(
    // headers.map(header => fetchTasks(header.headerid)));
        
    const [headers, setHeaders] = useState();
    const [tasks, setTasks] = useState();
    const [boardDetails , setBoardDetails] = useContext(BoardNameContext);
    //const [boardName, setBoardName] = useContext();//not complete need to know boad name using another api
    useEffect(()=>{
        // console.log("hi");
        const fetchData= async()=>{
            try{
                //  console.log("call headers");
                const {data: headerData, error: headerError } = await supabase.from("headers").select("*").eq("boardid", params.boardid)
                //(`/board/api/${params.boardid}`, {cache:"no-store"});
                // console.log(response);
                if(headerError){
                    throw new Error("failed to fetch headers");
                }
                // console.log(headerData); 
                setHeaders(headerData);

                const promise = headerData.map(async(header)=>{
                    const { data: taskData, error: taskError } = await supabase.from("tasks").select("*").eq("headerid" , header.headerid);
                    // fetch(`/headers/api/${header.headerid}`, {cache: 'no-store'});
                    
      if (taskError) {
        console.error(`Error fetching tasks for header ${header.headerid}:`, taskError);
        return { data: [] }; // Ensure an empty array is returned in case of an error
      }

      return { data: taskData || [] };
                
                });

                const taskdata =await Promise.all(promise);
                setTasks(taskdata);
            }
            catch(error){
                console.log("Error fetching headers:", error);
            }
        };
        fetchData();
    },[params.boardid , boardDetails.change]);
    // console.log(headers);
    console.log(tasks);


    return(<div className = "flex">
    {headers== undefined? <div>Loading</div>:headers.map((header, index)=>{return (<div className=" overflow-y-auto max-h-[90vh]" key={header.headerid}>
            <div className="text-medium-grey p-2"><div className="p-1 text-body-l">{header.headername} ({tasks== undefined? 0:tasks[index]?.data?.length})</div>
           {tasks== undefined?<div>Loading</div>:
           <IndividualTask  tasks = {tasks[index]?.data} key={Math.random()} status={header.headername}/> }
           </div>
        </div>)})}
        
        <div className="flex justify-center items-center bg-[rgba(var(--color-dialog), 1)] m-2 min-w-44"><AddColumns></AddColumns>
    
        </div>
        
        </div>
    );
}