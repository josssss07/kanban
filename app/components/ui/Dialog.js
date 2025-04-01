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
}) {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Dialog.Root open={open} onOpenChange={onChange}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-25 overflow-clip" />
          <Dialog.Content
            className="absolute border-2 bg-[var(--color-dialog)] p-5 min-w-96 rounded-md border-[var(--color-dialog)]"
            style={{
              left: `calc(100% - calc(${heightx}px + 30rem))`,
              top: `calc(100vh - ${heighty}px)`,
            }}
          >
            <Dialog.Title className={`text-heading-l ${titleWidth}`}>
              {title}
            </Dialog.Title>
            <div>{children}</div>
            <Dialog.Description/>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
