'use client';
import supabase from '@/app/supabaseclient';



export const getNotes = async (userId) => {
  
  try {
    
    const { data, error } = await supabase.from('notes').select('*').eq("userid", userId).order('note_updated', { ascending: false });
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error getting notes:', error);
    return [];
  }
};

// Get a single note by ID
export const getNoteById = async (id) => {
  try {
    const { data, error } = await supabase.from('notes').select('*').eq('noteid', id).single();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error getting note with ID ${id}:`, error);
    return null;
  }
};

// Create a new note
export const createNote = async (noteData , userid) => {
  try {
    const createdAt = new Date().toISOString();
    const newNote = {
      userid,
      ...noteData,
      createdAt,
      updatedAt: createdAt
    };
    
    const { data, error } = await supabase.from('notes').insert([{
      userid:userid,
      note_title: noteData.title,
      note_content: noteData.content,
      note_created: createdAt,
      note_updated: createdAt
    }]).select();
    if (error) throw error;
    return data[0];
    
  } catch (error) {
    console.error('Error creating note:', error);
    throw error;
  }
};

// Update an existing note
export const updateNote = async (id, noteData) => {
  try {
    const { data, error } = await supabase.from('notes').update({
      note_title: noteData.title,
      note_content: noteData.content,
      note_updated: new Date().toISOString()
    }).eq('noteid', id).select();
    if (error) throw error;
    return data[0];
    
    // return updatedNote;
  } catch (error) {
    console.error(`Error updating note with ID ${id}:`, error);
    throw error;
  }
};

// Delete a note
export const deleteNote = async (id) => {
  try {
    const { data ,error } = await supabase.from('notes').delete().eq('noteid', id).select();
    console.log(data);
    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error(`Error deleting note with ID ${id}:`, error);
    throw error;
  }
};