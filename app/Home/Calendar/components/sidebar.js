import React from "react";
import CreateEventButton from "./CreateEventButtton";
import SmallCalendar from "./smallCalendar";
import Labels from "./Labels";
export default function Sidebar() {
  return (
    <aside className=" p-5 w-64  bg-gray-900 flex flex-col h-full">
      <CreateEventButton />
      <SmallCalendar />
      <Labels />
      <div className="flex-grow"></div>
    </aside>
  );
}