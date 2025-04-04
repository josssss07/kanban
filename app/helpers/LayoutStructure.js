"use client";
import EyeOrNav from "./EyeBunOrNavBar.js";
import { useContext, React } from "react";
// import { DisplayNavContext } from "./DisplayNavContext.js";
import { DisplayNavContext } from "../Home/AllContext.js";
import BoardContent from "../Home/BoardContent.js";

export default function LayoutStructure({ children }) {

  const [displayNav, setDisplayNav] = useContext(DisplayNavContext);
  
  return (
    <div className={displayNav ? " grid grid-cols-5" : ""}>
      <EyeOrNav />
      <div className={displayNav ? "col-span-4" : ""}>
        <BoardContent/>
                {children}
      </div>
    </div>
  );
}
