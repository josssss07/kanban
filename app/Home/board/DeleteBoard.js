import CustomDialog from "@/app/components/ui/Dialog.js";
import Button from "@/app/components/ui/Button.js";
import { BoardNameContext } from "@/app/helpers/DisplayNavContext.js";
import { useContext } from "react";
import { BoardContext } from "@/app/helpers/BoardContext.js";
import supabase from "@/app/supabaseclient";

export default function DeleteBoard({
  open,
  onChange,
  boardName = "Platform Launch",
}) {
  const [Board, setBoards] = useContext(BoardContext);
  const heightx = 400;
  const heighty = 400;

  const [boardDetails, setBoardDetails] = useContext(BoardNameContext);

  async function deleteBoard() {
    console.log("called delete board function");
    console.log(boardDetails.id);
    const {data:deletedBoard , error:deleteBoardError} = await supabase.from("boards").delete().eq("boardid" , boardDetails.id) 
    
    // fetch(`./api/${boardDetails.id}`, {
    //   method: "DELETE",
    // });

    console.log("delete function");
    if (deleteBoardError) {
      alert(deleteBoardError);
    }

    setBoards(
      Board.filter((board) => {
        return board.boardname != boardDetails.boardname;
      })
    );
    setBoardDetails({
      name: Board[0].boardname,
      id: Board[0].boardid,
      change: true,
    });

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
              bgColor={"bg-red"}
              className={"w-full"}
              onClickFun={() => {
                deleteBoard();
              }}
            >
              Delete
            </Button>
            <br />
            <Button
              textColor={"text-main-purple"}
              bgColor={"bg-lines-light"}
              className={"w-full"}
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
