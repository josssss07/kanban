// // utils/bookmarkService.js
// import { v4 as uuidv4 } from 'uuid'; // You'll need to install this package
// import supabase from '@/app/supabaseclient';

// // Local storage keys
// const FOLDERS_KEY = 'bookmark_folders';

// // Initialize or get folders from localStorage
// const getInitialFolders = async(userId) => {
  

//   try {
//     // const storedFolders = localStorage.getItem(FOLDERS_KEY);
//     // return storedFolders ? JSON.parse(storedFolders) : [];
//         // First, get all existing folders from Supabase
//         const { data: existingFolders, error } = await supabase
//         .from('bookmark_folders')
//         .select('*').eq("userid", userId);
        
//         if(error){
//           console.error("Cannot fetch folders", error);
//         }
      
//       // const existingFolderIds = existingFolders.map(f => f.id);
//       console.log(existingFolders);
//       return existingFolders;
      
//       // // For each folder in local storage
//       // for (const folder of folders) {
//       //   if (existingFolderIds.includes(folder.id)) {
//       //     // Update existing folder
//       //     await supabase
//       //       .from('folders')
//       //       .update({
//       //         name: folder.name,
//       //         updated_at: folder.updatedAt || new Date().toISOString()
//       //       })
//       //       .eq('id', folder.id);
//       //   } else {
//       //     // Insert new folder
//       //     await supabase
//       //       .from('folders')
//       //       .insert({
//       //         id: folder.id,
//       //         name: folder.name,
//       //         created_at: folder.createdAt || new Date().toISOString(),
//       //         updated_at: folder.updatedAt || folder.createdAt || new Date().toISOString()
//       //       });
//       //   }


//   } catch (error) {
//     console.error('Error retrieving folders from localStorage:', error);
//     return [];
//   }
// };

// // Save folders to localStorage
// const saveFolders = async(folders) => {
  
//   try {
//     const {data , error} = await supabase.from("bookmark_folders").insert({
//       name: folders.name,
//       created_at: folders.createdAt,
//       updated_at: folders.updatedAt,
//       userid: folders.userid
//     });
//     if(error){
//       console.error("Error with creating a folder");
//     }
//     console.log(data);
//     return data;


//   } catch (error) {
//     console.error('Error saving folders to localStorage:', error);
//     return false;
//   }
// };

// // ===== FOLDER OPERATIONS =====

// // Create a new folder
// export const createFolder = async(folderName, userId) => {
  
//   const newFolder = {
//     name: folderName,
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//     userid:userId
//   };
  
//   //const updatedFolders = [...folders, newFolder];
//    await saveFolders(newFolder);
  
//   return newFolder;
// };

// // Get all folders
// export const getAllFolders = async (userId) => {
//   console.log("User id in get all folder");
//   console.log(userId);
//   return await getInitialFolders(userId);
// };


// // Get a specific folder by ID
// export const getFolderById = async(folderId) => {
//   try{
//     const {data , error} = await supabase.from("bookmark_folders").select("*").eq("id", folderId);
//     if(error){
//       console.log("select query for retreiveing folders by id is throwing error" , error);
//     }
//     console.log(data);
//     return data;
//   }
//   catch(error){
//     console.error("issue with get folder id");
//   }
// };

// // Update a folder
// export const updateFolder = async(folderId, updatedData) => {
//   console.log(updatedData);
// try{
//   const{data , error} = await supabase.from("bookmark_folders").update({"name": updatedData.name}).eq("id", folderId).select();
//   if(error){
//     console.error("Error in updating the folder", error);
//   }
//     return data;
// }
// catch(error){
//   console.error("Issues in update folder");
// }
  
// };

// // Delete a folder
// export const deleteFolder =async(folderId) => {
// try{
//   const {data, error} = await supabase.from("bookmark_folders").delete().eq("id", folderId).select();
//   if(error){
//     console.error("Error in deleting folder", error);
//   }
//   console.log(data);
//   return data;
// }
// catch(error){
//   console.error("Issue in deletefolder");
// }  
// };

// // ===== BOOKMARK OPERATIONS =====

// // Add a bookmark to a folder
// export const addBookmark = (folderId, bookmarkData) => {
//   const folders = getInitialFolders();
  
//   const newBookmark = {
//     id: uuidv4(),
//     ...bookmarkData,
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString()
//   };
  
//   const updatedFolders = folders.map(folder => {
//     if (folder.id === folderId) {
//       return { 
//         ...folder, 
//         bookmarks: [...folder.bookmarks, newBookmark],
//         updatedAt: new Date().toISOString()
//       };
//     }
//     return folder;
//   });
  
//   saveFolders(updatedFolders);
//   return newBookmark;
// };

// // Update a bookmark
// export const updateBookmark = (folderId, bookmarkId, updatedData) => {
//   const folders = getInitialFolders();
  
//   const updatedFolders = folders.map(folder => {
//     if (folder.id === folderId) {
//       const updatedBookmarks = folder.bookmarks.map(bookmark => {
//         if (bookmark.id === bookmarkId) {
//           return { 
//             ...bookmark, 
//             ...updatedData, 
//             updatedAt: new Date().toISOString() 
//           };
//         }
//         return bookmark;
//       });
      
//       return { 
//         ...folder, 
//         bookmarks: updatedBookmarks, 
//         updatedAt: new Date().toISOString() 
//       };
//     }
//     return folder;
//   });
  
//   saveFolders(updatedFolders);
  
//   const updatedFolder = updatedFolders.find(folder => folder.id === folderId);
//   return updatedFolder?.bookmarks.find(bookmark => bookmark.id === bookmarkId) || null;
// };

// // Delete a bookmark
// export const deleteBookmark = (folderId, bookmarkId) => {
//   const folders = getInitialFolders();
  
//   const updatedFolders = folders.map(folder => {
//     if (folder.id === folderId) {
//       return {
//         ...folder,
//         bookmarks: folder.bookmarks.filter(bookmark => bookmark.id !== bookmarkId),
//         updatedAt: new Date().toISOString()
//       };
//     }
//     return folder;
//   });
  
//   saveFolders(updatedFolders);
//   return true;
// };

// // Move a bookmark to a different folder
// export const moveBookmark = (sourceFolderId, targetFolderId, bookmarkId) => {
//   const folders = getInitialFolders();
  
//   // Find the bookmark to move
//   const sourceFolder = folders.find(folder => folder.id === sourceFolderId);
//   if (!sourceFolder) return false;
  
//   const bookmarkToMove = sourceFolder.bookmarks.find(bookmark => bookmark.id === bookmarkId);
//   if (!bookmarkToMove) return false;
  
//   // Update the bookmark with a new moved timestamp
//   const updatedBookmark = {
//     ...bookmarkToMove,
//     updatedAt: new Date().toISOString(),
//     movedAt: new Date().toISOString()
//   };
  
//   // Create new folders array with the bookmark moved
//   const updatedFolders = folders.map(folder => {
//     if (folder.id === sourceFolderId) {
//       // Remove from source folder
//       return {
//         ...folder,
//         bookmarks: folder.bookmarks.filter(b => b.id !== bookmarkId),
//         updatedAt: new Date().toISOString()
//       };
//     } else if (folder.id === targetFolderId) {
//       // Add to target folder
//       return {
//         ...folder,
//         bookmarks: [...folder.bookmarks, updatedBookmark],
//         updatedAt: new Date().toISOString()
//       };
//     }
//     return folder;
//   });
  
//   saveFolders(updatedFolders);
//   return true;
// };

// // Export all bookmarks as JSON
// export const getBookmarks = async(folderid) => {
// try{
//   const{data , error} = await supabase.from("bookmarks").select("*").eq("folder_id", folderid);
//   if(error){
//     console.error("Cannot get bookmarks");
//   }
//   console.log(data);
//   return data;
// }
// catch(error){
//   console.error("Cannot get bookmark function", error);
// }
// };

// // Import bookmarks from JSON
// export const importBookmarks = (jsonData) => {
//   try {
//     const importedFolders = JSON.parse(jsonData);
    
//     // Validate the imported data (basic validation)
//     if (!Array.isArray(importedFolders)) {
//       throw new Error('Invalid bookmarks data format');
//     }
    
//     // Save to local storage
//     saveFolders(importedFolders);
//     return true;
//   } catch (error) {
//     console.error('Error importing bookmarks:', error);
//     return false;
//   }
// };

// // Initialize with sample data if empty
// // export const initializeWithSampleData = () => {
// //   const folders = getInitialFolders();
  
// //   // Only initialize if empty
// //   if (folders.length === 0) {
// //     const sampleFolders = [
// //       {
// //         id: uuidv4(),
// //         name: "Development",
// //         bookmarks: [
// //           {
// //             id: uuidv4(),
// //             title: "GitHub",
// //             url: "https://github.com",
// //             description: "Code hosting platform",
// //             createdAt: new Date().toISOString(),
// //             updatedAt: new Date().toISOString()
// //           },
// //           {
// //             id: uuidv4(),
// //             title: "Stack Overflow",
// //             url: "https://stackoverflow.com",
// //             description: "Developer Q&A site",
// //             createdAt: new Date().toISOString(),
// //             updatedAt: new Date().toISOString()
// //           }
// //         ],
// //         createdAt: new Date().toISOString(),
// //         updatedAt: new Date().toISOString()
// //       },
// //       {
// //         id: uuidv4(),
// //         name: "News",
// //         bookmarks: [
// //           {
// //             id: uuidv4(),
// //             title: "HackerNews",
// //             url: "https://news.ycombinator.com",
// //             description: "Tech news aggregator",
// //             createdAt: new Date().toISOString(),
// //             updatedAt: new Date().toISOString()
// //           }
// //         ],
// //         createdAt: new Date().toISOString(),
// //         updatedAt: new Date().toISOString()
// //       }
// //     ];
    
// //     saveFolders(sampleFolders);
// //     return sampleFolders;
// //   }
  
// //   return folders;
// // };

// // ===== SUPABASE IMPLEMENTATION (COMMENTED OUT) =====

// /*
// import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
// const supabase = createClient(supabaseUrl, supabaseKey);

// // Save all folders to Supabase
// const saveFoldersToSupabase = async (folders) => {
//   try {
//     // First, get all existing folders from Supabase
//     const { data: existingFolders } = await supabase
//       .from('folders')
//       .select('id');
    
//     const existingFolderIds = existingFolders.map(f => f.id);
    
//     // For each folder in local storage
//     for (const folder of folders) {
//       if (existingFolderIds.includes(folder.id)) {
//         // Update existing folder
//         await supabase
//           .from('folders')
//           .update({
//             name: folder.name,
//             updated_at: folder.updatedAt || new Date().toISOString()
//           })
//           .eq('id', folder.id);
//       } else {
//         // Insert new folder
//         await supabase
//           .from('folders')
//           .insert({
//             id: folder.id,
//             name: folder.name,
//             created_at: folder.createdAt || new Date().toISOString(),
//             updated_at: folder.updatedAt || folder.createdAt || new Date().toISOString()
//           });
//       }
      
//       // Handle bookmarks for this folder
//       const { data: existingBookmarks } = await supabase
//         .from('bookmarks')
//         .select('id')
//         .eq('folder_id', folder.id);
      
//       const existingBookmarkIds = existingBookmarks.map(b => b.id);
      
//       // Get bookmarks that need to be deleted
//       const bookmarkIdsToKeep = folder.bookmarks.map(b => b.id);
//       const bookmarksToDelete = existingBookmarkIds.filter(id => !bookmarkIdsToKeep.includes(id));
      
//       // Delete bookmarks that are no longer in local storage
//       if (bookmarksToDelete.length > 0) {
//         await supabase
//           .from('bookmarks')
//           .delete()
//           .in('id', bookmarksToDelete);
//       }
      
//       // Update or insert bookmarks
//       for (const bookmark of folder.bookmarks) {
//         if (existingBookmarkIds.includes(bookmark.id)) {
//           // Update existing bookmark
//           await supabase
//             .from('bookmarks')
//             .update({
//               title: bookmark.title,
//               url: bookmark.url,
//               description: bookmark.description,
//               updated_at: bookmark.updatedAt || new Date().toISOString()
//             })
//             .eq('id', bookmark.id);
//         } else {
//           // Insert new bookmark
//           await supabase
//             .from('bookmarks')
//             .insert({
//               id: bookmark.id,
//               folder_id: folder.id,
//               title: bookmark.title,
//               url: bookmark.url,
//               description: bookmark.description,
//               created_at: bookmark.createdAt || new Date().toISOString(),
//               updated_at: bookmark.updatedAt || bookmark.createdAt || new Date().toISOString()
//             });
//         }
//       }
//     }
    
//     // Get all folder IDs from Supabase
//     const { data: allFolders } = await supabase
//       .from('folders')
//       .select('id');
    
//     const allFolderIds = allFolders.map(f => f.id);
    
//     // Find folders that exist in Supabase but not in local storage
//     const folderIdsToKeep = folders.map(f => f.id);
//     const foldersToDelete = allFolderIds.filter(id => !folderIdsToKeep.includes(id));
    
//     // Delete folders that are no longer in local storage
//     if (foldersToDelete.length > 0) {
//       // Delete associated bookmarks first
//       await supabase
//         .from('bookmarks')
//         .delete()
//         .in('folder_id', foldersToDelete);
      
//       // Then delete the folders
//       await supabase
//         .from('folders')
//         .delete()
//         .in('id', foldersToDelete);
//     }
    
//     return true;
//   } catch (error) {
//     console.error('Error syncing with Supabase:', error);
//     return false;
//   }
// };

// // Initialize data from Supabase
// export const initFromSupabase = async () => {
//   try {
//     // Get all folders
//     const { data: folders, error: foldersError } = await supabase
//       .from('folders')
//       .select('*')
//       .order('created_at', { ascending: true });
    
//     if (foldersError) throw foldersError;
    
//     // Get all bookmarks
//     const { data: bookmarks, error: bookmarksError } = await supabase
//       .from('bookmarks')
//       .select('*')
//       .order('created_at', { ascending: true });
    
//     if (bookmarksError) throw bookmarksError;
    
//     // Format data for local storage structure
//     const formattedFolders = folders.map(folder => {
//       const folderBookmarks = bookmarks
//         .filter(bookmark => bookmark.folder_id === folder.id)
//         .map(bookmark => ({
//           id: bookmark.id,
//           title: bookmark.title,
//           url: bookmark.url,
//           description: bookmark.description,
//           createdAt: bookmark.create*/


//-------------------------------------------
// utils/bookmarkService.js
import { v4 as uuidv4 } from 'uuid';
import supabase from '@/app/supabaseclient';

// ===== FOLDER OPERATIONS =====

// Create a new folder
export const createFolder = async (folderName, userId) => {
  try {
    const newFolder = {
      id: uuidv4(),
      name: folderName,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      userid: userId
    };
    
    const { data, error } = await supabase
      .from('bookmark_folders')
      .insert(newFolder)
      .select();
    
    if (error) throw error;
    
    // Return the new folder with empty bookmarks array
    return { ...data[0], bookmarks: [] };
  } catch (error) {
    console.error('Error creating folder:', error);
    return null;
  }
};

// Get all folders with their bookmarks for a user
export const getAllFolders = async (userId) => {
  try {
    // Get all folders for the user
    const { data: folders, error: foldersError } = await supabase
      .from('bookmark_folders')
      .select('*')
      .eq('userid', userId)
      .order('created_at', { ascending: true });
    
    if (foldersError) throw foldersError;
    
    // Get all bookmarks for the user's folders
    const { data: bookmarks, error: bookmarksError } = await supabase
      .from('bookmarks')
      .select('*')
      .in(
        'folder_id', 
        folders.map(folder => folder.id)
      )
      .order('created_at', { ascending: true });
    
    if (bookmarksError) throw bookmarksError;
    
    // Add bookmarks array to each folder
    const foldersWithBookmarks = folders.map(folder => {
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
        createdAt: folder.created_at,
        updatedAt: folder.updated_at,
        bookmarks: folderBookmarks
      };
    });
    
    return foldersWithBookmarks;
  } catch (error) {
    console.error('Error retrieving folders:', error);
    return [];
  }
};

// Get a specific folder by ID
export const getFolderById = async (folderId) => {
  try {
    // Get the folder
    const { data: folder, error: folderError } = await supabase
      .from('bookmark_folders')
      .select('*')
      .eq('id', folderId)
      .single();
    
    if (folderError) throw folderError;
    
    // Get bookmarks for this folder
    const { data: bookmarks, error: bookmarksError } = await supabase
      .from('bookmarks')
      .select('*')
      .eq('folder_id', folderId)
      .order('created_at', { ascending: true });
    
    if (bookmarksError) throw bookmarksError;
    
    // Format bookmarks
    const formattedBookmarks = bookmarks.map(bookmark => ({
      id: bookmark.id,
      title: bookmark.title,
      url: bookmark.url,
      description: bookmark.description,
      createdAt: bookmark.created_at,
      updatedAt: bookmark.updated_at
    }));
    
    // Return folder with bookmarks
    return {
      id: folder.id,
      name: folder.name,
      createdAt: folder.created_at,
      updatedAt: folder.updated_at,
      bookmarks: formattedBookmarks
    };
  } catch (error) {
    console.error('Error retrieving folder:', error);
    return null;
  }
};

// Update a folder
export const updateFolder = async (folderId, updatedData) => {
  try {
    const updates = {
      name: updatedData.name,
      updated_at: new Date().toISOString()
    };
    
    const { error } = await supabase
      .from('bookmark_folders')
      .update(updates)
      .eq('id', folderId);
    
    if (error) throw error;
    
    // Get the updated folder with bookmarks
    return await getFolderById(folderId);
  } catch (error) {
    console.error('Error updating folder:', error);
    return null;
  }
};

// Delete a folder
export const deleteFolder = async (folderId) => {
  try {
    // First delete all bookmarks associated with this folder
    const { error: bookmarksError } = await supabase
      .from('bookmarks')
      .delete()
      .eq('folder_id', folderId);
    
    if (bookmarksError) throw bookmarksError;
    
    // Then delete the folder
    const { error: folderError } = await supabase
      .from('bookmark_folders')
      .delete()
      .eq('id', folderId);
    
    if (folderError) throw folderError;
    
    return true;
  } catch (error) {
    console.error('Error deleting folder:', error);
    return false;
  }
};

// ===== BOOKMARK OPERATIONS =====

// Add a bookmark to a folder
export const addBookmark = async (folderId, bookmarkData) => {
  try {
    const newBookmark = {
      id: uuidv4(),
      folder_id: folderId,
      title: bookmarkData.title,
      url: bookmarkData.url,
      description: bookmarkData.description,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    const { data, error } = await supabase
      .from('bookmarks')
      .insert(newBookmark)
      .select();
    
    if (error) throw error;
    
    // Update folder's updated_at timestamp
    await supabase
      .from('bookmark_folders')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', folderId);
    
    // Return formatted bookmark
    return {
      id: data[0].id,
      title: data[0].title,
      url: data[0].url,
      description: data[0].description,
      createdAt: data[0].created_at,
      updatedAt: data[0].updated_at
    };
  } catch (error) {
    console.error('Error adding bookmark:', error);
    return null;
  }
};

// Update a bookmark
export const updateBookmark = async (folderId, bookmarkId, updatedData) => {
  try {
    const updates = {
      title: updatedData.title,
      url: updatedData.url,
      description: updatedData.description,
      updated_at: new Date().toISOString()
    };
    
    const { data, error } = await supabase
      .from('bookmarks')
      .update(updates)
      .eq('id', bookmarkId)
      .select();
    
    if (error) throw error;
    
    // Update folder's updated_at timestamp
    await supabase
      .from('bookmark_folders')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', folderId);
    
    // Return formatted bookmark
    return {
      id: data[0].id,
      title: data[0].title,
      url: data[0].url,
      description: data[0].description,
      createdAt: data[0].created_at,
      updatedAt: data[0].updated_at
    };
  } catch (error) {
    console.error('Error updating bookmark:', error);
    return null;
  }
};

// Delete a bookmark
export const deleteBookmark = async (folderId, bookmarkId) => {
  try {
    const { error } = await supabase
      .from('bookmarks')
      .delete()
      .eq('id', bookmarkId);
    
    if (error) throw error;
    
    // Update folder's updated_at timestamp
    await supabase
      .from('bookmark_folders')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', folderId);
    
    return true;
  } catch (error) {
    console.error('Error deleting bookmark:', error);
    return false;
  }
};

// Move a bookmark to a different folder
export const moveBookmark = async (sourceFolderId, targetFolderId, bookmarkId) => {
  try {
    // Update the bookmark's folder_id
    const { error } = await supabase
      .from('bookmarks')
      .update({
        folder_id: targetFolderId,
        updated_at: new Date().toISOString()
      })
      .eq('id', bookmarkId);
    
    if (error) throw error;
    
    // Update both folders' updated_at timestamps
    await supabase
      .from('bookmark_folders')
      .update({ updated_at: new Date().toISOString() })
      .in('id', [sourceFolderId, targetFolderId]);
    
    return true;
  } catch (error) {
    console.error('Error moving bookmark:', error);
    return false;
  }
};

// Export all bookmarks for a user
export const exportBookmarks = async (userId) => {
  try {
    const folders = await getAllFolders(userId);
    return JSON.stringify(folders, null, 2);
  } catch (error) {
    console.error('Error exporting bookmarks:', error);
    return null;
  }
};

// Import bookmarks from JSON
export const importBookmarks = async (jsonData, userId) => {
  try {
    const importedFolders = JSON.parse(jsonData);
    
    // Validate the imported data (basic validation)
    if (!Array.isArray(importedFolders)) {
      throw new Error('Invalid bookmarks data format');
    }
    
    // Start a transaction
    // Note: Supabase doesn't support transactions directly in the client, 
    // so we'll have to do our best to handle errors and rollbacks manually
    
    // For each folder in the imported data
    for (const folder of importedFolders) {
      // Create the folder
      const newFolder = await createFolder(folder.name, userId);
      
      if (!newFolder) continue;
      
      // Add bookmarks to the folder
      if (Array.isArray(folder.bookmarks)) {
        for (const bookmark of folder.bookmarks) {
          await addBookmark(newFolder.id, {
            title: bookmark.title,
            url: bookmark.url,
            description: bookmark.description
          });
        }
      }
    }
    
    return true;
  } catch (error) {
    console.error('Error importing bookmarks:', error);
    return false;
  }
};

// Initialize with sample data if empty
export const initializeWithSampleData = async (userId) => {
  try {
    // Check if user already has folders
    const { data: existingFolders, error } = await supabase
      .from('bookmark_folders')
      .select('id')
      .eq('userid', userId);
    
    if (error) throw error;
    
    // Only initialize if empty
    if (existingFolders.length === 0) {
      // Create Development folder
      const devFolder = await createFolder('Development', userId);
      
      // Add bookmarks to Development folder
      await addBookmark(devFolder.id, {
        title: 'GitHub',
        url: 'https://github.com',
        description: 'Code hosting platform'
      });
      
      await addBookmark(devFolder.id, {
        title: 'Stack Overflow',
        url: 'https://stackoverflow.com',
        description: 'Developer Q&A site'
      });
      
      // Create News folder
      const newsFolder = await createFolder('News', userId);
      
      // Add bookmark to News folder
      await addBookmark(newsFolder.id, {
        title: 'HackerNews',
        url: 'https://news.ycombinator.com',
        description: 'Tech news aggregator'
      });
      
      // Get all folders with bookmarks
      return await getAllFolders(userId);
    }
    
    return await getAllFolders(userId);
  } catch (error) {
    console.error('Error initializing sample data:', error);
    return [];
  }
};