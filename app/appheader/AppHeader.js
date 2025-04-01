"use client";
import Button from "../components/ui/Button";
import Header from "../headers/Header";
import { MoreVertical } from "react-feather";
import UnitElemDisplay from "../components/ui/UnitElemDisplay";
import { useContext, useState } from "react";
import AddNewTask from "../task/AddTask";
import ChangeOptionBoard from "../home/board/ChangeBoard";
import { BoardNameContext } from "../helpers/DisplayNavContext";

export default function AppHeader() {
  const [addTaskDialog, setAddTaskDialog] = useState(false);
  const [changeBoard, setChangeBoard] = useState(false);
  const [boardDetails, setBoardDetails] = useContext(BoardNameContext);
  console.log(boardDetails + " details");

  function addNewTask() {
    setAddTaskDialog(!addTaskDialog);
  }

  return (
    <div className="flex w-full">
      <Header>
        <UnitElemDisplay styles={"flex w-full h-full"}>
          <div className="text-heading-xl h-full flex justify-center items-center">
            {boardDetails.name}
          </div>
          <div className="flex ml-auto gap-4">
            <Button
              onClickFun={() => {
                addNewTask();
              }}
              className="px-4"
            >
              + Add new Task
            </Button>
            <AddNewTask open={addTaskDialog} onChange={setAddTaskDialog} />
            <button
              onClick={() => {
                setChangeBoard(!changeBoard);
              }}
            >
              <MoreVertical className="h-full w-8 text-medium-grey mx-2" />
              <ChangeOptionBoard open={changeBoard} onChange={setChangeBoard} />
            </button>
          </div>
        </UnitElemDisplay>
      </Header>
    </div>
  );
}
