"use client";
import CustomDialog from "@/app/components/ui/Dialog";
import Button from "@/app/components/ui/Button";
import React, { useContext } from "react";
import insertNewHeader from "@/app/headers/CreateHeader";
import { BoardDetailsContext } from "../Home/AllContext";

export default function AddColumns() {
  const heightx = 400;
  const heighty = 350;

  function toggle() {
    setAddColumn(!addColumn);
  }
  const [addColumn, setAddColumn] = React.useState(false);
  const [numOfCols, setNumOfCols] = React.useState(0);
  const [column, setCloumn] = React.useState({ headername: "eg: To do" });
  const [boardDetails, setBoardDetails] = useContext(BoardDetailsContext);

  async function handleSubmit(e) {
    e.preventDefault();
    await insertNewHeader(column, boardDetails);
    setBoardDetails((prevBoard)=>({
      ...prevBoard,
      change: !prevBoard.change
    }))
    setAddColumn(!addColumn);
  }

  return (
    <>
      <Button
        onClickFun={() => {
          toggle();
        }}
        className="w-fit p-2 bg-white/10 hover:bg-white/20 "
        bgColor="bg-none"
        textColor="text-medium-grey"
      >
        +New Column
      </Button>
      {addColumn ? (
        <CustomDialog
          open={addColumn}
          onChange={setAddColumn}
          title={"Add New Column"}
          heightx={heightx}
          heighty={heighty}
        >
          <form onSubmit={handleSubmit}>
            <label className="text-body-m text-medium-grey">
              New column title
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-700 bg-gray-800 text-white rounded"
              value={column.headername}
              onChange={(event) => {
                setCloumn((prevHeader) => ({
                  ...prevHeader,
                  headername: event.target.value,
                }));
              }}
            />
            <input
              type="submit"
              value="Submit"
              className="text-white bg-purple-700 rounded-full m-2 p-3 w-fit"
              onClick={() => {
                setNumOfCols(numOfCols + 1);
              }}
            />
          </form>
        </CustomDialog>
      ) : undefined}
    </>
  );
}
