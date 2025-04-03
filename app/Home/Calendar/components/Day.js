import dayjs from "dayjs";
import React, { useContext, useState, useEffect } from "react";
import GlobalContext from "../context/GlobalContext";

export default function Day({ day, rowIdx }) {
  const [dayEvents, setDayEvents] = useState([]);
  const {
    setDaySelected,
    setShowEventModal,
    filteredEvents,
    setSelectedEvent,
  } = useContext(GlobalContext);

  useEffect(() => {
    const events = filteredEvents.filter(
      (evt) =>
        dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
    );
    setDayEvents(events);
  }, [filteredEvents, day]);

  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-purple-600 text-white rounded-full w-7"
      : "";
  }

  // Function to get the appropriate background color class for each label
  function getEventBgClass(label) {
    const labelColorMap = {
      indigo: "bg-indigo-800 text-white",
      gray: "bg-gray-800 text-white",
      green: "bg-green-800 text-white",
      blue: "bg-blue-800 text-white",
      red: "bg-red-800 text-white",
      purple: "bg-purple-800 text-white"
    };
    
    return labelColorMap[label] || "bg-gray-800 text-white"; // Default to gray if label not found
  }

  return (
    <div className="border border-purple-400 flex flex-col h-full">
      <header className="flex flex-col items-center">
        {rowIdx === 0 && (
          <p className="text-sm mt-1">
            {day.format("ddd").toUpperCase()}
          </p>
        )}
        <p
          className={`text-sm p-1 my-1 text-center ${getCurrentDayClass()}`}
        >
          {day.format("DD")}
        </p>
      </header>
      <div
        className="flex-1 cursor-pointer overflow-y-auto max-h-24 scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-transparent"
        onClick={() => {
          setDaySelected(day);
          setShowEventModal(true);
        }}
      >
        {dayEvents.map((evt, idx) => (
          <div
            key={idx}
            onClick={(e) => {
              e.stopPropagation();
              setDaySelected(day);
              setSelectedEvent(evt);
              setShowEventModal(true);
            }}
            className={`${getEventBgClass(evt.label)} px-3 mr-3 text-sm rounded mb-1 truncate`}
          >
            {evt.title}
          </div>
        ))}
      </div>
    </div>
  );
}