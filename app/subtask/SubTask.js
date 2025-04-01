import { useEffect, useState } from "react";
import CustomDialog from "../components/ui/Dialog";
import supabase from "../supabaseclient";



export default function SubtasksForm({open, onChange, task, status}){

    const [subtasks , setSubtasks] = useState([]);


    useEffect(()=>{

        if(!task?.taskid){return;}
        const fetchData=async()=>{
            const {data:subTaskData , error:subTaskError} = await supabase.from("subtasks").select("*").eq("taskid" , task.taskid);

            if(subTaskError){
                throw new Error("Failed to fetch subtasks");
            }

            setSubtasks(subTaskData);

        }

        fetchData();
    }, [task?.taskid]);


  return(
    <div>
<CustomDialog open={open} onChange={onChange} title={task.taskname} heightx={400} heighty={400} titleWidth="max-w-sm">
<form className="max-w-sm text-body-m">
    <div className=" text-medium-grey  my-4">{task.taskdescription}</div>
    <div className="mb-2">Subtasks {task.totalsubtaskcompleted} out of {task.totalsubtask}</div>

    {subtasks.length>0 ?(subtasks.map((subtask, subtaskIndex)=>(
        <div key={subtaskIndex} className="bg-[var(--color-backgroundlighter)] mb-2 accent-main-purple p-2"><input type="checkbox" id={subtask.subtaskid}/>
        <label id={subtask.subtaskid} className="align-top">  {subtask.subtaskname}</label></div>
    ))):undefined}
              <label  className="text-body-m  text-medium-grey ">CurrentStatus</label><br/>
          <select className="w-full p-2 border-2 border-[var(--color-lineinput)] bg-[var(--color-dialog)]">
            <option value={status}>{status}</option>
            </select>
        </form>
</CustomDialog>
</div>
    );
}