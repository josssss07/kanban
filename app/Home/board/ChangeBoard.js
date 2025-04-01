import * as Dialog from "@radix-ui/react-dialog";
import EditBoard from "./EditBoard";
import DeleteBoard from "./DeleteBoard";
import React from "react";

export default function ChangeOptionBoard({ open, onChange }) {
  const [editBoard, setEditBoard] = React.useState(false);
  const [deleteBoard, setDeleteBoard] = React.useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={onChange}>
      {editBoard ? (
        <EditBoard open={editBoard} onChange={setEditBoard} />
      ) : undefined}

      {deleteBoard ? (
        <DeleteBoard open={deleteBoard} onChange={setDeleteBoard} />
      ) : undefined}
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.DialogTitle/>
        <Dialog.Content className="absolute top-14 right-0 border-2 border-[var(--color-lineborder)] bg-[var(--color-dialog)] p-2  rounded-md ">
          <Dialog.Description/>
          <div>
            <button
              onClick={() => {
                setEditBoard(!editBoard);
              }}
            >
              Edit Board
            </button>

            <br />
            <button
              onClick={() => {
                setDeleteBoard(!deleteBoard);
              }}
            >
              Delete Board
            </button>
            </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
