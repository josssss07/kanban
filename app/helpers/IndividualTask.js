'use client';
import React from "react";
import SubtasksForm from "../subtask/SubTask";


export default function IndividualTask({tasks, status}) {
// console.log("Inside indi task");
// console.log(tasks);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [task, setTask] = React.useState(undefined);
  return (
    <div >{tasks.map((task)=>{
        return <button key={task.taskid} className="flex flex-col text-[var(--color-text)] p-3 bg-[var(--color-dialog)] m-2 w-64 rounded-md" onClick={()=>{
          setTask(task);
          setOpenDialog(!openDialog)}}>
          <div className="p-2 text-start">
          <div>{task.taskname}</div>
            <div className="text-medium-grey text-body-m">{task.totalsubtaskcompleted} out of {task.totalsubtask} subtasks</div>
            </div>
        </button>
    })}
    
    {openDialog?<SubtasksForm open={openDialog} onChange={setOpenDialog}  task={task} status={status}></SubtasksForm>:undefined}</div>
  );
}


