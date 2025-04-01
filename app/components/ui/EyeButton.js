"use client";
import Button from "./Button";
import { Eye } from "react-feather";
import React from "react";

export default function EyeButton({ clickBun }) {
  return (
    <>
      <Button
        className="hide sm:block m-0 rounded-l-none w-min absolute bottom-10 left-0 p-3 ml-0"
        onClickFun={clickBun}
      >
        <Eye />
      </Button>
    </>
  );
}
