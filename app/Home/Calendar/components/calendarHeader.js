import dayjs from "dayjs";
import React, { useContext, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import GlobalContext from "../context/GlobalContext";

export default function CalendarHeader() {
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);
  const [currentTime, setCurrentTime] = useState(dayjs().format("hh:mm A"));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs().format("hh:mm A"));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (monthIndex === undefined || setMonthIndex === undefined) {
    console.error("GlobalContext is not properly initialized.");
    return null;
  }

  function handlePrevMonth() {
    setMonthIndex((prev) => prev - 1);
  }

  function handleNextMonth() {
    setMonthIndex((prev) => prev + 1);
  }

  function handleReset() {
    setMonthIndex(dayjs().month());
  }

  return (
    <header className="px-4 py-2 flex items-center justify-between bg-gray-900 text-white">
      <div className="flex items-center">
        <button 
          onClick={handleReset} 
          className="border rounded-lg py-2 px-6 mr-5 bg-purple-600 hover:bg-purple-700 text-white font-bold shadow-md transition duration-300"
        >
          Today
        </button>
        <button onClick={handlePrevMonth} className="p-1 rounded-full hover:bg-purple-100">
          <ChevronLeft className="text-purple-600" size={24} />
        </button>
        <button onClick={handleNextMonth} className="p-1 rounded-full hover:bg-purple-100">
          <ChevronRight className="text-purple-600" size={24} />
        </button>
        <h2 className="ml-4 text-xl font-bold px-2">
          {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
        </h2>
      </div>
      <div className="text-lg font-semibold">
        {currentTime}
      </div>
    </header>
  );
}