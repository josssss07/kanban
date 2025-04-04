// utils/bookmarkService.js
import { v4 as uuidv4 } from 'uuid'; // You'll need to install this package

// Local storage keys
const FOLDERS_KEY = 'bookmark_folders';

// Initialize or get folders from localStorage
const getInitialFolders = () => {
  if (typeof window === 'undefined') return [];
  
  const storedFolders = localStorage.getItem(FOLDERS_KEY);
  return storedFolders ? JSON.parse(storedFolders) : [];
};

// Save folders to localStorage
const saveFolders = (folders) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(FOLDERS_KEY, JSON.stringify(folders));
  
  // Supabase implementation would go here
  // saveFoldersToSupabase(folders);
};

// ===== FOLDER OPERATIONS =====

// Create a new folder
export const createFolder = (folderName) => {
  const folders = getInitialFolders();
  
  const newFolder = {
    id: uuidv4(),
    name: folderName,
    bookmarks: [],
    createdAt: new Date().toISOString(),
  };
  
  const updatedFolders = [...folders, newFolder];
  saveFolders(updatedFolders);
  
  return newFolder;
};

// Get all folders
export const getAllFolders = () => {
  return getInitialFolders();
};

// Get a specific folder by ID
export const getFolderById = (folderId) => {
  const folders = getInitialFolders();
  return folders.find(folder => folder.id === folderId) || null;
};

// Update a folder
export const updateFolder = (folderId, updatedData) => {
  const folders = getInitialFolders();
  
  const updatedFolders = folders.map(folder => {
    if (folder.id === folderId) {
      return { ...folder, ...updatedData, updatedAt: new Date().toISOString() };
    }
    return folder;
  });
  
  saveFolders(updatedFolders);
  return updatedFolders.find(folder => folder.id === folderId);
};

// Delete a folder
export const deleteFolder = (folderId) => {
  const folders = getInitialFolders();
  const updatedFolders = folders.filter(folder => folder.id !== folderId);
  saveFolders(updatedFolders);
  return true;
};

// ===== BOOKMARK OPERATIONS =====

// Add a bookmark to a folder
export const addBookmark = (folderId, bookmarkData) => {
  const folders = getInitialFolders();
  
  const newBookmark = {
    id: uuidv4(),
    ...bookmarkData,
    createdAt: new Date().toISOString(),
  };
  
  const updatedFolders = folders.map(folder => {
    if (folder.id === folderId) {
      return { 
        ...folder, 
        bookmarks: [...folder.bookmarks, newBookmark],
        updatedAt: new Date().toISOString()
      };
    }
    return folder;
  });
  
  saveFolders(updatedFolders);
  return newBookmark;
};

// Update a bookmark
export const updateBookmark = (folderId, bookmarkId, updatedData) => {
  const folders = getInitialFolders();
  
  const updatedFolders = folders.map(folder => {
    if (folder.id === folderId) {
      const updatedBookmarks = folder.bookmarks.map(bookmark => {
        if (bookmark.id === bookmarkId) {
          return { ...bookmark, ...updatedData, updatedAt: new Date().toISOString() };
        }
        return bookmark;
      });
      
      return { ...folder, bookmarks: updatedBookmarks, updatedAt: new Date().toISOString() };
    }
    return folder;
  });
  
  saveFolders(updatedFolders);
  
  const updatedFolder = updatedFolders.find(folder => folder.id === folderId);
  return updatedFolder?.bookmarks.find(bookmark => bookmark.id === bookmarkId) || null;
};

// Delete a bookmark
export const deleteBookmark = (folderId, bookmarkId) => {
  const folders = getInitialFolders();
  
  const updatedFolders = folders.map(folder => {
    if (folder.id === folderId) {
      return {
        ...folder,
        bookmarks: folder.bookmarks.filter(bookmark => bookmark.id !== bookmarkId),
        updatedAt: new Date().toISOString()
      };
    }
    return folder;
  });
  
  saveFolders(updatedFolders);
  return true;
};

// ===== SUPABASE IMPLEMENTATION (COMMENTED OUT) =====

/*
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Save all folders to Supabase
const saveFoldersToSupabase = async (folders) => {
  try {
    // First, get all existing folders from Supabase
    const { data: existingFolders } = await supabase
      .from('folders')
      .select('id');
    
    const existingFolderIds = existingFolders.map(f => f.id);
    
    // For each folder in local storage
    for (const folder of folders) {
      if (existingFolderIds.includes(folder.id)) {
        // Update existing folder
        await supabase
          .from('folders')
          .update({
            name: folder.name,
            updated_at: folder.updatedAt || new Date().toISOString()
          })
          .eq('id', folder.id);
      } else {
        // Insert new folder
        await supabase
          .from('folders')
          .insert({
            id: folder.id,
            name: folder.name,
            created_at: folder.createdAt || new Date().toISOString(),
            updated_at: folder.updatedAt || folder.createdAt || new Date().toISOString()
          });
      }
      
      // Handle bookmarks for this folder
      const { data: existingBookmarks } = await supabase
        .from('bookmarks')
        .select('id')
        .eq('folder_id', folder.id);
      
      const existingBookmarkIds = existingBookmarks.map(b => b.id);
      
      // Get bookmarks that need to be deleted
      const bookmarkIdsToKeep = folder.bookmarks.map(b => b.id);
      const bookmarksToDelete = existingBookmarkIds.filter(id => !bookmarkIdsToKeep.includes(id));
      
      // Delete bookmarks that are no longer in local storage
      if (bookmarksToDelete.length > 0) {
        await supabase
          .from('bookmarks')
          .delete()
          .in('id', bookmarksToDelete);
      }
      
      // Update or insert bookmarks
      for (const bookmark of folder.bookmarks) {
        if (existingBookmarkIds.includes(bookmark.id)) {
          // Update existing bookmark
          await supabase
            .from('bookmarks')
            .update({
              title: bookmark.title,
              url: bookmark.url,
              description: bookmark.description,
              updated_at: bookmark.updatedAt || new Date().toISOString()
            })
            .eq('id', bookmark.id);
        } else {
          // Insert new bookmark
          await supabase
            .from('bookmarks')
            .insert({
              id: bookmark.id,
              folder_id: folder.id,
              title: bookmark.title,
              url: bookmark.url,
              description: bookmark.description,
              created_at: bookmark.createdAt || new Date().toISOString(),
              updated_at: bookmark.updatedAt || bookmark.createdAt || new Date().toISOString()
            });
        }
      }
    }
    
    // Get all folder IDs from Supabase
    const { data: allFolders } = await supabase
      .from('folders')
      .select('id');
    
    const allFolderIds = allFolders.map(f => f.id);
    
    // Find folders that exist in Supabase but not in local storage
    const folderIdsToKeep = folders.map(f => f.id);
    const foldersToDelete = allFolderIds.filter(id => !folderIdsToKeep.includes(id));
    
    // Delete folders that are no longer in local storage
    if (foldersToDelete.length > 0) {
      // Delete associated bookmarks first
      await supabase
        .from('bookmarks')
        .delete()
        .in('folder_id', foldersToDelete);
      
      // Then delete the folders
      await supabase
        .from('folders')
        .delete()
        .in('id', foldersToDelete);
    }
    
    return true;
  } catch (error) {
    console.error('Error syncing with Supabase:', error);
    return false;
  }
};

// Initialize data from Supabase
export const initFromSupabase = async () => {
  try {
    // Get all folders
    const { data: folders, error: foldersError } = await supabase
      .from('folders')
      .select('*')
      .order('created_at', { ascending: true });
    
    if (foldersError) throw foldersError;
    
    // Get all bookmarks
    const { data: bookmarks, error: bookmarksError } = await supabase
      .from('bookmarks')
      .select('*')
      .order('created_at', { ascending: true });
    
    if (bookmarksError) throw bookmarksError;
    
    // Format data for local storage structure
    const formattedFolders = folders.map(folder => {
      const folderBookmarks = bookmarks
        .filter(bookmark => bookmark.folder_id === folder.id)
        .map(bookmark => ({
          id: bookmark.id,
          title: bookmark.title,
          url: bookmark.url,
          description: bookmark.description,
          createdAt: bookmark.created_at,
          updatedAt: bookmark.updated_at
        }));
      
      return {
        id: folder.id,
        name: folder.name,
        bookmarks: folderBookmarks,
        createdAt: folder.created_at,
        updatedAt: folder.updated_at
      };
    });
    
    // Save to local storage
    localStorage.setItem(FOLDERS_KEY, JSON.stringify(formattedFolders));
    
    return formattedFolders;
  } catch (error) {
    console.error('Error initializing from Supabase:', error);
    return getInitialFolders();
  }
};
*/