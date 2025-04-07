"use client";
import CustomDialog from "@/app/components/ui/Dialog.js";
import Button from "@/app/components/ui/Button.js";
import { BoardDetailsContext } from "../Home/AllContext";
import { useContext, useState, useEffect } from "react";
import supabase from "@/app/supabaseclient";
import DeleteHeader from "@/app/headers/DeleteHeader";
import updateHeaderTable from "@/app/headers/UpdateHeader";
import insertNewHeader from "@/app/headers/CreateHeader";

export default function EditBoard({ open, onChange }) {
  const heightx = 400;
  const heighty = 500;
  const [boardDetails, setBoardDetails] = useContext(BoardDetailsContext);
  const [headers, setHeaders] = useState([]);
  const [oldHeaders, setOldHeaders] = useState([]);

  async function fetchHeaders() {
    try {
      const { data: header, error } = await supabase
        .from("headers")
        .select("*")
        .eq("boardid", boardDetails.id);

      if (error) throw new Error("Failed to fetch headers");

      if (header) {
        setHeaders([...header]); // ✅ Forces state update
        setOldHeaders([...header]);
      }
    } catch (err) {
      throw new Error("Failed to run fetchHeader", err);
    }
  }

  useEffect(() => {
    if (boardDetails?.id) {
      fetchHeaders();
    }
  }, [boardDetails?.id]);

  function removeFromList(header) {
    setHeaders((prevItems) =>
      prevItems.filter((item) => item.headerid !== header.headerid)
    );
    setOldHeaders((prevItems) =>
      prevItems.filter((item) => item.headername !== header.headername)
    );

    DeleteHeader(header);
  }

  function addToList() {
    setHeaders((prevItems) => [
      ...prevItems,
      {
        headerid: prevItems.length + 1,
        headername: "+Add new column",
        boardid: boardDetails.id,
      },
    ]);
  }

  function editList(value, index) {
    setHeaders((prevItems) =>
      prevItems.map((item, idx) =>
        idx === index ? { ...item, headername: value } : item
      )
    );
  }

  function changeBoardName(boardname) {
    setBoardDetails((prevBoard) => ({
      ...prevBoard,
      name: boardname,
    }));
  }

  async function UpdateBoard() {
    const { data: board, error: boardError } = await supabase
      .from("boards")
      .update({ boardname: boardDetails.name })
      .eq("boardid", boardDetails.id);
    if (boardError) {
      throw new Error("Update board failed", boardError);
    }
    console.log(boardDetails.name)
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (oldHeaders.length < headers.length) {
      for (let i = oldHeaders.length; i < headers.length; i++) {
        await insertNewHeader(headers[i], boardDetails);
      }
    }
    headers.forEach(async (header, index) => {
      if (
        !oldHeaders[index] ||
        header.headername !== oldHeaders[index].headername
      ) {
        await updateHeaderTable(header);
      }
    });

    await UpdateBoard();
    await fetchHeaders();
    setBoardDetails((prevBoard) => ({
      ...prevBoard,
      change: !prevBoard.change,
    }));
    onChange(!open);
  }

  return (
    <div>
      <CustomDialog
        open={open}
        onChange={onChange}
        title={"Edit Board"}
        heightx={heightx}
        heighty={heighty}
      >
        <form onSubmit={handleSubmit}>
          <label className="text-body-m text-medium-grey">Board Name</label>
          <br />
          <input
            type="text"
            className="w-full text-body-l p-2 border-2 border-[var(--color-lineinput)] rounded-md bg-"
            value={boardDetails.name}
            placeholder={boardDetails.name}
            onChange={(event) => {
              changeBoardName(event.target.value);
            }}
          ></input>
          <br />
          <label className="text-body-m text-medium-grey">Board Cloumns</label>
          <br />
          {headers ? (
            headers.map((header, index) => (
              <div key={header.headerid}>
                <input
                  type="text"
                  value={header.headername}
                  placeholder={header.headername}
                  className="w-5/6  text-body-l p-2 border-2 border-[var(--color-lineinput)] rounded-md  bg-[var(--color-dialog)]"
                  onChange={(event) => editList(event.target.value, index)}
                ></input>
                <Button
                  textColor={"text-medium-grey"}
                  bgColor={"bg-none"}
                  className={"text-heading-l"}
                  onClickFun={() => {
                    removeFromList(header);
                  }}
                >
                  X
                </Button>
              </div>
            ))
          ) : (
            <div>Loading</div>
          )}
          <Button
            className="w-full"
            textColor={"text-main-purple"}
            bgColor={"bg-lines-light"}
            onClickFun={() => {
              addToList();
            }}
          >
            +Add New Cloumn
          </Button>
          <br />
          <input
            type="submit"
            value="Update Board"
            className="text-white bg-main-purple rounded-full m-2 p-1 w-full"
          />
        </form>
      </CustomDialog>
    </div>
  );
}
