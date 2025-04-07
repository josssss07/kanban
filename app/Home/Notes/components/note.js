"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  createNote,
  updateNote,
  deleteNote,
  getNoteById,
} from "../utils/noteFunctions";

const Notepad = ({ noteId, onNoteSaved, onNoteDeleted }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isNewNote, setIsNewNote] = useState(true);
  const [aiQuery, setAiQuery] = useState("");
  const [aiResult, setAiResult] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showAiPopup, setShowAiPopup] = useState(false);
  const popupRef = useRef(null);

  useEffect(() => {
    const loadNote = async () => {
      if (noteId) {
        setIsLoading(true);
        try {
          const note = await getNoteById(noteId);
          if (note) {
            setTitle(note.title);
            setContent(note.content);
            setIsNewNote(false);
          }
        } catch (error) {
          console.error("Error loading note:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setTitle("");
        setContent("");
        setIsNewNote(true);
        setAiResult("");
      }
    };

    loadNote();
  }, [noteId]);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowAiPopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const noteData = {
        title,
        content,
        updatedAt: new Date().toISOString(),
      };

      if (isNewNote) {
        const newNote = await createNote(noteData);
        if (onNoteSaved) onNoteSaved(newNote);
      } else {
        const updatedNote = await updateNote(noteId, noteData);
        if (onNoteSaved) onNoteSaved(updatedNote);
      }
    } catch (error) {
      console.error("Error saving note:", error);
      alert("Failed to save note. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!noteId || isNewNote) return;

    const confirmed = window.confirm("Delete this note?");
    if (!confirmed) return;

    setIsLoading(true);
    try {
      await deleteNote(noteId);
      if (onNoteDeleted) onNoteDeleted(noteId);

      setTitle("");
      setContent("");
      setIsNewNote(true);
      setAiResult("");
    } catch (error) {
      console.error("Error deleting note:", error);
      alert("Failed to delete note. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const processWithAI = async () => {
    if (!content || !aiQuery) {
      alert("Please add some content to your note and ask a question.");
      return;
    }

    setIsProcessing(true);

    try {
      // Using OpenAI API, you'll need to set up your own API key
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "063c1231e6f24fbd823d2294c1ea3f59",
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              {
                role: "system",
                content:
                  "You are an AI assistant helping with note content. The user will provide note content and a question about it. Answer their question based on the note content.",
              },
              {
                role: "user",
                content: `Note content: ${content}\n\nQuestion: ${aiQuery}`,
              },
            ],
            max_tokens: 500,
          }),
        }
      );

      const data = await response.json();
      if (data.choices && data.choices[0] && data.choices[0].message) {
        setAiResult(data.choices[0].message.content);
      } else {
        throw new Error("Invalid response from AI service");
      }
    } catch (error) {
      console.error("AI processing error:", error);
      setAiResult("Error processing your request. Please try again later.");
    } finally {
      setIsProcessing(false);
    }
  };

  const toggleAiPopup = () => {
    setShowAiPopup(!showAiPopup);
    if (!showAiPopup) {
      setAiQuery("");
      setAiResult("");
    }
  };

  return (
    <div className="p-2 sm:p-4 h-screen overflow-y-auto bg-gray-900 flex-1 relative">
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto w-full">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-5 py-5 mb-3 bg-gray-700 text-white text-xl md:text-2xl mb-4 rounded-lg focus:ring-1 focus:ring-purple-500"
          placeholder="Title"
          disabled={isLoading}
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="w-full px-5 py-5 mb-3 bg-gray-700 text-white rounded-lg focus:ring-1 focus:ring-purple-500"
          rows="15"
          placeholder="Write your note here..."
          disabled={isLoading}
        />

        <div className="flex flex-wrap justify-between gap-2 mb-4">
          <button
            type="submit"
            className="px-4 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:bg-purple-400"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : isNewNote ? "Save" : "Update"}
          </button>

          {!isNewNote && (
            <button
              type="button"
              onClick={handleDelete}
              className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700 disabled:bg-red-400"
              disabled={isLoading}
            >
              Delete
            </button>
          )}

          {/* AI Assistant Circle Button */}
          <button
            type="button"
            onClick={toggleAiPopup}
            className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center hover:bg-green-700 transition-colors"
            title="AI Assistant"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </form>

      {/* AI Popup */}
      {showAiPopup && (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50">
          <div
            ref={popupRef}
            className="bg-gray-800 rounded-lg shadow-lg w-full max-w-md p-5"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white text-lg font-medium">AI Assistant</h3>
              <button
                onClick={toggleAiPopup}
                className="text-gray-400 hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            <div className="mb-4">
              <input
                type="text"
                value={aiQuery}
                onChange={(e) => setAiQuery(e.target.value)}
                placeholder="Ask anything about your note..."
                className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:ring-1 focus:ring-purple-500"
                disabled={isProcessing}
              />
            </div>

            <div className="flex justify-end mb-4">
              <button
                onClick={processWithAI}
                disabled={!aiQuery || isProcessing}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-green-800 disabled:opacity-50"
              >
                {isProcessing ? "Processing..." : "Process with AI"}
              </button>
            </div>

            {aiResult && (
              <div className="mt-3 p-3 bg-gray-700 rounded text-white max-h-60 overflow-y-auto">
                <div className="whitespace-pre-line">{aiResult}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notepad;
