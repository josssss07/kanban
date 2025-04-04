"use client";

import React, { useState, useEffect } from "react";
import EyeButton from "../components/ui/EyeButton";
import NavBar from "../components/ui/NavBar/NavBarApp";
import { useContext } from "react";
import { DisplayNavContext } from "../Home/AllContext";
import AddNewBoard from "../Boards/AddNewBoard";
import DisplayBoards from "./DisplayBoard";
import PageSection from "../components/ui/NavBar/PageSection";
import { useRouter } from "next/navigation";

export default function EyeOrNav() {
  const router = useRouter();
  const [displayNav, setDisplayNav] = useContext(DisplayNavContext);
  const [newBoard, setNewBoard] = useState({
    state: false,
    newElem: undefined,
  });

  function setBoard(newstate) {
    console.log(newstate + " new ");
    setNewBoard((prevBoard) => ({
      ...prevBoard,
      state: newstate,
    }));
  }
  
  function setNewElem(element) {
    setNewBoard((prevBoard) => ({
      ...prevBoard,
      newElem: element,
    }));
  }

  function setElemUndefined() {
    setNewBoard((prevBoard) => ({
      ...prevBoard,
      newElem: undefined,
    }));
  }
  
  function setDisplay() {
    setDisplayNav(!displayNav);
  }

  return (
    <>
      {displayNav === true ? (
        <NavBar clickBun={setDisplay}>
          <div className="flex flex-col h-full bg-gray-900">
            <div className="h-16 flex justify-center items-center text-heading-xl text-purple-400 font-bold">
              kanban
            </div>

            <div className="px-4 py-2">
              <h2 className="text-gray-400 uppercase text-sm tracking-wider mb-3 ml-2"></h2>
              
              <DisplayBoards
                state={newBoard.state}
                stateChange={setBoard}
                newElem={newBoard.newElem}
                setElemUndefined={setElemUndefined}
              />

              {newBoard.state ? (
                <AddNewBoard
                  open={newBoard}
                  onChange={setBoard}
                  newElem={setNewElem}
                />
              ) : undefined}
            </div>
            
            <PageSection onChange={()=>{router.push('/Home')}} className="bg-gray-800 hover:bg-purple-700 transition-colors duration-200 rounded-lg mx-4 my-2 py-2">
              <span className="text-gray-200">Home</span>
            </PageSection>
            
            <div className="mt-auto mb-4">
              <button
                className="flex items-center mx-6 py-2 px-4 rounded-lg text-gray-300 hover:text-purple-300 transition-colors"
                onClick={() => {
                  setDisplayNav(!displayNav);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                  <line x1="1" y1="1" x2="23" y2="23"></line>
                </svg>
                <div className="pl-3">Hide Sidebar</div>
              </button>
            </div>
          </div>
        </NavBar>
      ) : (
        <EyeButton clickBun={setDisplay} />
      )}
    </>
  );
}