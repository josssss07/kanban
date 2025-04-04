import React, { useContext } from "react";
import GlobalContext from "../context/GlobalContext";
import { PlusCircle } from "lucide-react";

export default function CreateEventButton() {
  const { setShowEventModal } = useContext(GlobalContext);

  return (
    <button
      onClick={() => setShowEventModal(true)}
      className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white font-semibold rounded-full shadow-md hover:bg-purple-900 transition-all"
    >
      <PlusCircle size={20} />
      <span>Create Event</span>
    </button>
  );
}