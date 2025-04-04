"use client"; 
import Button from "../components/ui/Button"; 
import Header from "../headers/Header"; 
import { MoreVertical } from "react-feather"; 
import UnitElemDisplay from "../components/ui/UnitElemDisplay"; 
import { useContext, useState } from "react"; 
import AddNewTask from "../task/AddTask"; 
import ChangeOptionBoard from "../Boards/ChangeBoard"; 
import { BoardDetailsContext } from "../Home/AllContext";  

export default function AppHeader() {   
  const [addTaskDialog, setAddTaskDialog] = useState(false);   
  const [changeBoard, setChangeBoard] = useState(false);   
  const [boardDetails, setBoardDetails] = useContext(BoardDetailsContext);   
  
  function addNewTask() {     
    setAddTaskDialog(!addTaskDialog);   
  }    
  
  return (     
    <div className="flex w-full">       
      <Header>         
        <div className="flex w-full h-16 items-center px-6 bg-gray-900 text-white justify-between">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="3" y1="9" x2="21" y2="9"></line>
              <line x1="9" y1="21" x2="9" y2="9"></line>
            </svg>
            <span className="text-lg font-medium ml-2">{boardDetails.name}</span>
          </div>
          <div className="flex items-center gap-4">             
            <Button               
              onClickFun={() => {                 
                addNewTask();               
              }}               
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded text-sm"             
            >               
              + Add new Task             
            </Button>             
            <AddNewTask open={addTaskDialog} onChange={setAddTaskDialog} />             
            <button               
              onClick={() => {                 
                setChangeBoard(!changeBoard);               
              }}
              className="p-2 rounded hover:bg-gray-800"             
            >               
              <MoreVertical className="h-6 w-6 text-gray-400" />               
              <ChangeOptionBoard open={changeBoard} onChange={setChangeBoard} />             
            </button>           
          </div>         
        </div>       
      </Header>     
    </div>   
  ); 
}