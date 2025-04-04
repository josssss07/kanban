"use client";

import Button from "./Button";
import { Eye, EyeOff } from "react-feather";
import React from "react";

export default function EyeButton({ clickBun, isOpen = false }) {
  return (
    <>
      <Button
        className="hide sm:block m-0 rounded-l-none w-min absolute bottom-10 left-0 p-3 ml-0 bg-purple-600 hover:bg-purple-700 transition-colors duration-200"
        onClickFun={clickBun}
      >
        {isOpen ? (
          <EyeOff color="#e2e8f0" size={20} />
        ) : (
          <Eye color="#e2e8f0" size={20} />
        )}
      </Button>
    </>
  );
}