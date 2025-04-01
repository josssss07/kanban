import DisplayContext from "../helpers/DisplayNavContext";
import LayoutStructure from "../helpers/LayoutStructure";
import AllBoards from "../helpers/BoardContext";

export default function RootLayout({ children }) {
  return (
    <div className="min-h-full p-0 m-0 box-border">
      <div
        className={`box-border font-sans min-h-screen p-0 m-0 text-[var(--color-text)] bg-[var(--color-dialog)]  overflow-y-hidden`}
      >
        <AllBoards>
          <DisplayContext>
            <LayoutStructure>{children}</LayoutStructure>
          </DisplayContext>
        </AllBoards>
      </div>
    </div>
  );
}
