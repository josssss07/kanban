'use client';
import React from "react";

export default function Sidebar({ notes, onNoteSelect, onNewNote, activeNoteId }) {
  return (
    <aside className="w-64 bg-gray-900 text-white h-screen overflow-y-auto flex flex-col">
      <div className="p-4 border-b border-purple-700 flex justify-between items-center">
        <h2 className="font-bold text-lg">Notes</h2>
        <button 
          onClick={onNewNote}
          className="bg-purple-600 hover:bg-purple-900 text-white p-2 rounded-full"
          title="Add new note"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {notes.length === 0 ? (
          <div className="text-gray-400 text-center p-4">No notes yet</div>
        ) : (
          <ul>
            {notes.map((note) => (
              <li 
                key={note.noteid}
                className={`px-4 py-3 border-b border-purple-600 cursor-pointer hover:bg-gray-700 transition-colors ${
                  activeNoteId === note.noteid ? 'bg-purple-700' : ''
                }`}
                onClick={() => onNoteSelect(note.noteid)}
              >
                <h3 className="font-medium truncate">{note.note_title}</h3>
                <p className="text-sm text-gray-400 truncate">{note.note_content.substring(0, 50)}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(note.note_updated).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
}