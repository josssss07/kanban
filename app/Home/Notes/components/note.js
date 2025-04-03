'use client';
import React, { useState, useEffect } from 'react';
import { createNote, updateNote, deleteNote, getNoteById } from '../utils/noteFunctions'; 

const Notepad = ({ noteId, onNoteSaved, onNoteDeleted }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isNewNote, setIsNewNote] = useState(true);

  useEffect(() => {
    // Load note data if we have a noteId
    const loadNote = async () => {
      if (noteId) {
        setIsLoading(true);
        try {
          const note = await getNoteById(noteId);
          if (note) {
            setTitle(note.title);
            setContent(note.content);
            setFileName(note.fileName || '');
            setIsNewNote(false);
          }
        } catch (error) {
          console.error("Error loading note:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        // Reset form for new note
        setTitle('');
        setContent('');
        setFile(null);
        setFileName('');
        setIsNewNote(true);
      }
    };

    loadNote();
  }, [noteId]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const noteData = {
        title,
        content,
        fileName: fileName || (file ? file.name : null),
        file,
        updatedAt: new Date().toISOString()
      };

      if (isNewNote) {
        const newNote = await createNote(noteData);
        if (onNoteSaved) onNoteSaved(newNote);
      } else {
        const updatedNote = await updateNote(noteId, noteData);
        if (onNoteSaved) onNoteSaved(updatedNote);
      }

      // Reset file selection after saving
      setFile(null);
    } catch (error) {
      console.error("Error saving note:", error);
      alert("Failed to save note. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!noteId || isNewNote) return;
    
    const confirmed = window.confirm("Are you sure you want to delete this note?");
    if (!confirmed) return;
    
    setIsLoading(true);
    try {
      await deleteNote(noteId);
      if (onNoteDeleted) onNoteDeleted(noteId);
      
      // Reset form
      setTitle('');
      setContent('');
      setFile(null);
      setFileName('');
      setIsNewNote(true);
    } catch (error) {
      console.error("Error deleting note:", error);
      alert("Failed to delete note. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 h-screen overflow-y-auto bg-gray-900 flex-1">
      <div className="bg-gray-800 rounded-lg shadow-md  border-purple-700 p-6 max-w-4xl mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white font-medium mb-2">Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Note title"
              disabled={isLoading}
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-white font-medium mb-2">Content:</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows="12"
              placeholder="Write your note here..."
              disabled={isLoading}
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-white font-medium mb-2">Attachment:</label>
            <div className="flex items-center">
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
                disabled={isLoading}
              />
              <label
                htmlFor="file-upload"
                className="px-4 py-2 bg-gray-700 text-white rounded-md cursor-pointer hover:bg-gray-600 transition"
              >
                Choose File
              </label>
              <span className="ml-3 text-gray-300 text-sm">
                {fileName || "No file selected"}
              </span>
            </div>
          </div>
          
          <div className="flex justify-between">
            <button
              type="submit"
              className="px-5 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition disabled:bg-purple-400"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : isNewNote ? 'Save Note' : 'Update Note'}
            </button>
            
            {!isNewNote && (
              <button
                type="button"
                onClick={handleDelete}
                className="px-5 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition disabled:bg-red-400"
                disabled={isLoading}
              >
                Delete
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Notepad;