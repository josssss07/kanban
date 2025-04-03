'use client'
import DisplayContext from "../helpers/DisplayNavContext";
import LayoutStructure from "../helpers/LayoutStructure";
import AllBoards from "../helpers/BoardContext";
import FetchBoards from "./Userid";

export default function RootLayoutClient({userId , boards , children}) {
    console.log(boards);

  return (
    <div className="min-h-full p-0 m-0 box-border">
      <div
        className={`box-border font-sans min-h-screen p-0 m-0 text-[var(--color-text)] bg-[var(--color-dialog)]  overflow-y-hidden`}
      >
        <AllBoards  userId={userId}  initialBoards={boards}>
          <DisplayContext>
            <LayoutStructure>{children}</LayoutStructure>
          </DisplayContext>
        </AllBoards>
      </div>
    </div>
  );
}
