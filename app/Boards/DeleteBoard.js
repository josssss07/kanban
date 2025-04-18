import CustomDialog from "@/app/components/ui/Dialog.js";
import Button from "@/app/components/ui/Button.js";
import { BoardDetailsContext } from "../Home/AllContext";
import { useContext } from "react";
import { BoardsContext } from "../Home/AllContext";
import supabase from "@/app/supabaseclient";

export default function DeleteBoard({
  open,
  onChange,
  boardName = "Platform Launch",
}) {
  const [Board, setBoards] = useContext(BoardsContext);
  const heightx = 400;
  const heighty = 400;

  const [boardDetails, setBoardDetails] = useContext(BoardDetailsContext);

  async function deleteBoard() {
    const { data: deletedBoard, error: deleteBoardError } = await supabase
      .from("boards")
      .delete()
      .eq("boardid", boardDetails.id);

    if (deleteBoardError) {
      throw new Error("Failed to delete board", deleteBoardError);
    }

    setBoards(
      Board.filter((board) => {
        return board.boardname != boardDetails.boardname;
      })
    );
    setBoardDetails((prevBoard)=>({
      ...prevBoard,
      name: Board[0].boardname,
      id: Board[0].boardid,
    }));

    onChange(!open);
  }

  return (
    <div>
      <CustomDialog
        open={open}
        onChange={onChange}
        title={"Delete this board?"}
        heightx={heightx}
        heighty={heighty}
      >
        <div>
          <div className="w-80">
            Are you sure you want to delete &apos;{boardName} &apos; board? This
            action will remove all columns and tasks and cannot be reversed.
          </div>
          <div className="flex">
            <Button
              textColor={"text-white"}
              className={"w-full bg-red-600"}
              onClickFun={() => {
                deleteBoard();
              }}
            >
              Delete
            </Button>
            <br />
            <Button
              textColor={"text-main-purple"}
              className={"w-full bg-white/20"}
            >
              Cancel
            </Button>
            <br />
          </div>
        </div>
      </CustomDialog>
    </div>
  );
}
