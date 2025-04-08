'use client';
import React, { useState, useEffect, useContext } from 'react';
import Header from './components/header';
import Sidebar from './components/sidebar';
import Notepad from './components/note';
import { getNotes } from './utils/noteFunctions';
import { UserIdContext } from '../AllContext';

const Notes = () => {
  const [activeNoteId, setActiveNoteId] = useState(null);
  const [notes, setNotes] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [userId , setUserId] = useContext(UserIdContext);

  // Load all notes initially and when refreshTrigger changes
  useEffect(() => {
    const loadNotes = async () => {
      const allNotes = await getNotes(userId);
      setNotes(allNotes);
    };
    
    loadNotes();
  }, [refreshTrigger]);

  const handleNoteSelect = (noteId) => {
    setActiveNoteId(noteId);
  };

  const handleNewNote = () => {
    setActiveNoteId(null); // Setting to null creates a new note
  };

  const handleNoteSaved = (note) => {
    setActiveNoteId(note.id);
    // Trigger a refresh of the notes list
    setRefreshTrigger(prev => prev + 1);
  };

  const handleNoteDeleted = () => {
    setActiveNoteId(null);
    // Trigger a refresh of the notes list
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="flex flex-col h-screen relative">
      {/* Grid background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="400" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="purple" strokeWidth="0.5" strokeOpacity="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      {/* App content */}
      <Header />
      <div className="flex flex-1 overflow-hidden relative z-10">
        <Sidebar 
          notes={notes}
          onNoteSelect={handleNoteSelect} 
          onNewNote={handleNewNote} 
          activeNoteId={activeNoteId}
        />
        <Notepad 
          noteId={activeNoteId} 
          onNoteSaved={handleNoteSaved}
          onNoteDeleted={handleNoteDeleted}
        />
      </div>
    </div>
  );
};

export default Notes;