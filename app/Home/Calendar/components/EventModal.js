import React, { useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import { Calendar1Icon, X, Trash2, Clock } from "lucide-react";

const labelsClasses = ["indigo", "gray", "green", "blue", "red", "purple"];

export default function EventModal() {
  const { setShowEventModal, daySelected, dispatchCalEvent, selectedEvent } =
    useContext(GlobalContext);

  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");
  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ""
  );
  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent ? selectedEvent.label : labelsClasses[0]
  );
  const [startTime, setStartTime] = useState(
    selectedEvent ? selectedEvent.startTime : "12:00"
  );
  const [endTime, setEndTime] = useState(
    selectedEvent ? selectedEvent.endTime : "13:00"
  );

  function handleSubmit(e) {
    e.preventDefault();
    const calendarEvent = {
      title,
      description,
      label: selectedLabel,
      day: daySelected.valueOf(),
      startTime,
      endTime,
      id: selectedEvent ? selectedEvent.id : Date.now(),
    };

    dispatchCalEvent({
      type: selectedEvent ? "update" : "push",
      payload: calendarEvent,
    });

    setShowEventModal(false);
  }

  return (
    <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center">
      <form className="bg-blue-950 rounded-2xl shadow-xl w-96 p-6 relative">
        <header className="flex justify-between items-center pb-3 border-b border-gray-600">
          <Calendar1Icon className="text-gray-400" size={24} />
          <div className="flex space-x-3">
            {selectedEvent && (
              <button
                onClick={() => {
                  dispatchCalEvent({ type: "delete", payload: selectedEvent });
                  setShowEventModal(false);
                }}
                className="text-gray-400 hover:text-red-500"
              >
                <Trash2 size={20} />
              </button>
            )}
            <button
              onClick={() => setShowEventModal(false)}
              className="text-gray-400 hover:text-gray-200"
            >
              <X size={20} />
            </button>
          </div>
        </header>
        <div className="space-y-4 mt-4">
          <input
            type="text"
            placeholder="Add title"
            value={title}
            required
            className="w-full bg-transparent border-b border-gray-400 text-white text-lg focus:outline-none focus:border-blue-400"
            onChange={(e) => setTitle(e.target.value)}
          />
          <p className="text-gray-300">{daySelected.format("dddd, MMMM DD")}</p>
          <div className="flex items-center space-x-2">
            <Clock className="text-gray-400" size={20} />
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="bg-transparent border-b border-gray-400 text-white focus:outline-none focus:border-blue-400"
            />
            <span className="text-gray-300">to</span>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="bg-transparent border-b border-gray-400 text-white focus:outline-none focus:border-blue-400"
            />
          </div>
          <input
            type="text"
            placeholder="Add a description"
            value={description}
            required
            className="w-full bg-transparent border-b border-gray-400 text-white focus:outline-none focus:border-blue-400"
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="flex gap-2 mt-2">
            {labelsClasses.map((lblClass) => (
              <span
                key={lblClass}
                onClick={() => setSelectedLabel(lblClass)}
                className={`bg-${lblClass}-500 w-6 h-6 rounded-full cursor-pointer flex items-center justify-center border-2 transition-all ${
                  selectedLabel === lblClass ? "border-white" : "border-transparent"
                }`}
              >
                {selectedLabel === lblClass && <span className="text-white">✓</span>}
              </span>
            ))}
          </div>
        </div>
        <footer className="mt-5 flex justify-end">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-semibold shadow-md"
          >
            Save
          </button>
        </footer>
      </form>
    </div>
  );
}