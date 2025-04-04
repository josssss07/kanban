"use client";
import React from "react";
import EditOrDeleteForm from "../task/EditOrDeleteForm";

export default function IndividualTask({ tasks, status }) {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [task, setTask] = React.useState(undefined);
  return (
    <div>
      {tasks?.map((task) => {
        return (
          <button
            key={task?.taskid}
            className="flex flex-col text-white p-3 bg-[#1f2638] m-2 w-64 rounded-md border-l-4 border-purple-600 text-left hover:bg-[#262d40] transition-colors"
            onClick={() => {
              setTask(task);
              setOpenDialog(!openDialog);
            }}
          >
            <div className="p-2 text-start">
              <div>{task?.taskname}</div>
            </div>
          </button>
        );
      })}

      {openDialog ? (
        <EditOrDeleteForm
          open={openDialog}
          onChange={setOpenDialog}
          task={task}
          status={status}
        ></EditOrDeleteForm>
      ) : undefined}
    </div>
  );
}
