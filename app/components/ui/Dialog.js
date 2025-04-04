import * as Dialog from "@radix-ui/react-dialog";
import React from "react";

export default function CustomDialog({
  open,
  onChange,
  title,
  heightx,
  heighty,
  titleWidth = "w-fit",
  children,
  header,
}) {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Dialog.Root open={open} onOpenChange={onChange}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed top-0 left-0 right-0 bottom-0 bg-transparent bg-opacity-50 overflow-clip" />
          <Dialog.Content
            className="fixed border border-gray-700 bg-gray-900 p-5 min-w-96 rounded-md"
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              maxWidth: '90vw',
              maxHeight: '80vh',
              width: `${heightx}px`,
              overflowY: 'auto'
            }}
          >
            <Dialog.Title className={`text-heading-l ${titleWidth} text-white`}>
              {title}
            </Dialog.Title>
            <div>{children}</div>
            <Dialog.Description />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}