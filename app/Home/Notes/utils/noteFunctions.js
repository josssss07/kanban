'use client';
import { createClient } from '@/utils/supabase/client';

// Generate a unique ID for new notes
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// Get all notes from local storage
export const getNotes = async () => {
  try {
    const notesString = localStorage.getItem('notes');
    const notes = notesString ? JSON.parse(notesString) : [];
    
    // Sort by updated date (newest first)
    return notes.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    
    // Supabase version (commented out)
    // const supabase = createClient();
    // const { data, error } = await supabase.from('notes').select('*').order('updated_at', { ascending: false });
    // if (error) throw error;
    // return data;
  } catch (error) {
    console.error('Error getting notes:', error);
    return [];
  }
};

// Get a single note by ID
export const getNoteById = async (id) => {
  try {
    const notesString = localStorage.getItem('notes');
    const notes = notesString ? JSON.parse(notesString) : [];
    return notes.find(note => note.id === id) || null;
    
    // Supabase version (commented out)
    // const supabase = createClient();
    // const { data, error } = await supabase.from('notes').select('*').eq('id', id).single();
    // if (error) throw error;
    // return data;
  } catch (error) {
    console.error(`Error getting note with ID ${id}:`, error);
    return null;
  }
};

// Create a new note
export const createNote = async (noteData) => {
  try {
    const id = generateId();
    const createdAt = new Date().toISOString();
    const newNote = {
      id,
      ...noteData,
      createdAt,
      updatedAt: createdAt
    };
    
    // Save to local storage
    const notesString = localStorage.getItem('notes');
    const notes = notesString ? JSON.parse(notesString) : [];
    notes.unshift(newNote);
    localStorage.setItem('notes', JSON.stringify(notes));
    
    // Supabase version (commented out)
    // const supabase = createClient();
    // const { data, error } = await supabase.from('notes').insert([{
    //   id,
    //   title: noteData.title,
    //   content: noteData.content,
    //   created_at: createdAt,
    //   updated_at: createdAt
    // }]).select();
    // if (error) throw error;
    // return data[0];
    
    return newNote;
  } catch (error) {
    console.error('Error creating note:', error);
    throw error;
  }
};

// Update an existing note
export const updateNote = async (id, noteData) => {
  try {
    // Get current notes
    const notesString = localStorage.getItem('notes');
    const notes = notesString ? JSON.parse(notesString) : [];
    
    // Find the note to update
    const noteIndex = notes.findIndex(note => note.id === id);
    if (noteIndex === -1) throw new Error(`Note with ID ${id} not found`);
    
    // Update the note
    const updatedNote = {
      ...notes[noteIndex],
      title: noteData.title,
      content: noteData.content,
      updatedAt: new Date().toISOString()
    };
    
    notes[noteIndex] = updatedNote;
    localStorage.setItem('notes', JSON.stringify(notes));
    
    // Supabase version (commented out)
    // const supabase = createClient();
    // const { data, error } = await supabase.from('notes').update({
    //   title: noteData.title,
    //   content: noteData.content,
    //   updated_at: new Date().toISOString()
    // }).eq('id', id).select();
    // if (error) throw error;
    // return data[0];
    
    return updatedNote;
  } catch (error) {
    console.error(`Error updating note with ID ${id}:`, error);
    throw error;
  }
};

// Delete a note
export const deleteNote = async (id) => {
  try {
    // Get current notes
    const notesString = localStorage.getItem('notes');
    const notes = notesString ? JSON.parse(notesString) : [];
    
    // Filter out the note to delete
    const filteredNotes = notes.filter(note => note.id !== id);
    localStorage.setItem('notes', JSON.stringify(filteredNotes));
    
    // Supabase version (commented out)
    // const supabase = createClient();
    // const { error } = await supabase.from('notes').delete().eq('id', id);
    // if (error) throw error;
    
    return true;
  } catch (error) {
    console.error(`Error deleting note with ID ${id}:`, error);
    throw error;
  }
};