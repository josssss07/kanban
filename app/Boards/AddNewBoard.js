import { useContext, useEffect, useState } from "react";
import CustomDialog from "@/app/components/ui/Dialog.js";
import Button from "@/app/components/ui/Button.js";
import { NextResponse } from "next/server.js";
import supabase from "@/app/supabaseclient";
import { UserIdContext , BoardDetailsContext } from "../Home/AllContext";

export default function AddNewBoard({ open, onChange, newElem }) {
  const heightx = 400;
  const heighty = 500;
  const [columnsList, setColumnList] = useState(["ToDo", "Doing"]);
  const [boardName, setBoardName] = useState(null);
  const [userid, setUserId] = useContext(UserIdContext);
  const [boardDetails, setBoardDetails] = useContext(BoardDetailsContext);

  function removeFromList(itemToRemove) {
    setColumnList((prevItems) =>
      prevItems.filter((item) => item !== itemToRemove)
    );
  }
  function addToList() {
    setColumnList((prevItems) => [...prevItems, ":Example"]);
  }
  function editList(value, index) {
    setColumnList((prevItems) =>
      prevItems.map((item, idx) => (idx === index ? value : item))
    );
  }

  async function saveInBackend(e) {
    e.preventDefault();
    try {
      const { data: addTask, error: addTaskError } = await supabase
        .from("boards")
        .insert([{ boardname: boardName, userid: userid }]);

      if (addTaskError) {
        alert("Faild to create Board: " + addTaskError);
      }

      const { data: board, error: BoardError } = await supabase
        .from("boards")
        .select("*")
        .eq("boardname", boardName);
      if (BoardError) {
        throw new Error("Failed to fetch board", BoardError);
      }

      const id = board[0].boardid;

      const postHeader = async (columnsList) => {
        try {
          const insertPromises = columnsList.map((header) =>
            supabase
              .from("headers")
              .insert([{ headername: header, boardid: id }])
          );

          const results = await Promise.all(insertPromises);

          results.forEach(({ error }, index) => {
            if (error) {
              throw new Error(
                `Error inserting header '${columnsList[index]}':`,
                error
              );
            }
          });
        } catch (err) {
          throw new Error(" Unable to run postHeader:", err);
        }
      };

      await postHeader(columnsList);
    } catch (error) {
      return NextResponse.json(
        { error: "Faild to create | Fetch id | insert header board" },
        { status: 500 }
      );
    }

    onChange(false);
    newElem(boardName);
    setBoardDetails((prevBoard)=>({
      ...prevBoard,
      newBoard: !prevBoard.newBoard,
      change:!prevBoard.change
    }));
  }

  return (
    <div>
      <CustomDialog
        open={open.state}
        onChange={onChange}
        title={"Add New Board"}
        heightx={heightx}
        heighty={heighty}
      >
        <form onSubmit={saveInBackend}>
          <label className="text-body-m text-medium-grey">Name</label>
          <br />
          <input
            type="text"
            className="w-full text-body-l p-2 border-2 border-[var(--color-lineinput)] bg-[var(--color-dialog)] rounded-md"
            placeholder="eg: Web Design"
            onChange={(e) => {
              setBoardName(e.target.value);
            }}
          ></input>
          <br />
          <label className="text-body-m text-medium-grey">Cloumns</label>
          <br />
          {columnsList.map((col, index) => (
            <div key={index}>
              <input
                type="text"
                value={col}
                className="w-5/6  text-body-l p-2 border-2 border-[var(--color-lineinput)] rounded-md bg-[var(--color-dialog)]"
                onChange={(event) => editList(event.target.value, index)}
              ></input>
              <Button
                textColor={"text-medium-grey"}
                bgColor={"bg-none"}
                className={"text-heading-l"}
                onClickFun={(e) => {
                  e.preventDefault();
                  removeFromList(col);
                }}
              >
                X
              </Button>
            </div>
          ))}
          <Button
            className="w-full bg-white/10 hover:bg-white/20 rounded-full"
            textColor={"text-main-purple"}
            onClickFun={(e) => {
              e.preventDefault();
              addToList();
            }}
          >
            +Add New Cloumn
          </Button>
          <br />
          <input
            type="submit"
            value="Create New Board"
            className="text-white bg-purple-700 hover:bg-purple-600 rounded-full m-2 p-1 w-full"
          />
        </form>
      </CustomDialog>
    </div>
  );
}
