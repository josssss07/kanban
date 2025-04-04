'use client';
import dayjs from 'dayjs';
import React, { useState, useEffect } from 'react';



// Modal component for adding/editing folders and bookmarks
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg w-full max-w-md p-6 border border-purple-500">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <button 
            onClick={onClose}
            className="text-gray-300 hover:text-white"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

// Folder form component
const FolderForm = ({ folder, onSubmit, onCancel }) => {
  const [name, setName] = useState(folder?.name || '');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-300 mb-2">Folder Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
          required
        />
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-700 rounded hover:bg-gray-800 text-gray-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          {folder ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );
};

// Bookmark form component
const BookmarkForm = ({ bookmark, onSubmit, onCancel }) => {
  const [title, setTitle] = useState(bookmark?.title || '');
  const [url, setUrl] = useState(bookmark?.url || '');
  const [description, setDescription] = useState(bookmark?.description || '');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Add http:// prefix if not present
    let formattedUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      formattedUrl = `https://${url}`;
    }
    
    onSubmit({ title, url: formattedUrl, description });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-300 mb-2">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-300 mb-2">URL</label>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
          required
          placeholder="example.com or https://example.com"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-300 mb-2">Description (optional)</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
          rows="3"
        />
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-700 rounded hover:bg-gray-800 text-gray-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          {bookmark ? 'Update' : 'Add'}
        </button>
      </div>
    </form>
  );
};

// TopBar component with dark theme and purple accent
const TopBar = () => {
  const [currentTime, setCurrentTime] = useState(dayjs().format("hh:mm A"));
  
  useEffect(() => {
    // Update time every minute
    const timer = setInterval(() => {
      setCurrentTime(dayjs().format("hh:mm A"));
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="px-6 py-3 flex items-center justify-between bg-gray-900 text-white shadow-md">
      <div className="flex items-center">
        <span className="text-xl font-bold">BookMark</span>
      </div>
      <div className="text-lg font-semibold">
        {currentTime}
      </div>
    </header>
  );
};

const BookmarkGrid = ({ folders, onOpenFolder, onAddFolder, onEditFolder, onDeleteFolder }) => (
  <div className="py-6">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-bold text-white">My Folders</h2>
      <button 
        onClick={onAddFolder}
        className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
      >
        New Folder
      </button>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {folders.map(folder => (
        <div 
          key={folder.id}
          className="bg-gray-800 rounded-lg shadow p-4 hover:shadow-lg transition-shadow border border-gray-700"
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-white">{folder.name}</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => onEditFolder(folder)}
                className="text-gray-300 hover:text-white"
              >
                Edit
              </button>
              <button
                onClick={() => onDeleteFolder(folder.id)}
                className="text-red-400 hover:text-red-300"
              >
                Delete
              </button>
            </div>
          </div>
          <p className="text-gray-400 mb-4">
            {folder.bookmarks?.length || 0} bookmarks
          </p>
          <button
            onClick={() => onOpenFolder(folder.id)}
            className="w-full px-4 py-2 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 border border-gray-600"
          >
            Open Folder
          </button>
        </div>
      ))}
    </div>
  </div>
);

const BookmarkFolderView = ({ 
  folder, 
  onBack, 
  onAddBookmark, 
  onEditBookmark, 
  onDeleteBookmark 
}) => (
  <div className="py-6">
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center space-x-2">
        <button 
          onClick={onBack}
          className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 text-gray-300"
        >
          ←
        </button>
        <h2 className="text-xl font-bold text-white">{folder.name}</h2>
      </div>
      <button 
        onClick={() => onAddBookmark(folder.id)}
        className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
      >
        Add Bookmark
      </button>
    </div>
    
    {folder.bookmarks?.length > 0 ? (
      <div className="space-y-4">
        {folder.bookmarks.map(bookmark => (
          <div 
            key={bookmark.id}
            className="bg-gray-800 rounded-lg shadow p-4 border border-gray-700"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-white">{bookmark.title}</h3>
                <a 
                  href={bookmark.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:underline block mb-2"
                >
                  {bookmark.url}
                </a>
                {bookmark.description && (
                  <p className="text-gray-400">{bookmark.description}</p>
                )}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => onEditBookmark(bookmark)}
                  className="text-gray-300 hover:text-white"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDeleteBookmark(bookmark.id)}
                  className="text-red-400 hover:text-red-300"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="text-center py-12">
        <p className="text-gray-400">No bookmarks yet. Add your first bookmark!</p>
      </div>
    )}
  </div>
);

// Mock bookmark service for demo purposes
const mockBookmarkService = () => {
  let nextId = 1;
  
  const generateId = () => {
    return nextId++;
  };
  
  let folders = [
    {
      id: generateId(),
      name: "Development",
      bookmarks: [
        {
          id: generateId(),
          title: "GitHub",
          url: "https://github.com",
          description: "Code hosting platform"
        },
        {
          id: generateId(),
          title: "Stack Overflow",
          url: "https://stackoverflow.com",
          description: "Developer Q&A site"
        }
      ]
    },
    {
      id: generateId(),
      name: "News",
      bookmarks: [
        {
          id: generateId(),
          title: "HackerNews",
          url: "https://news.ycombinator.com",
          description: "Tech news aggregator"
        }
      ]
    }
  ];
  
  return {
    getAllFolders: () => folders,
    createFolder: (name) => {
      const newFolder = { id: generateId(), name, bookmarks: [] };
      folders.push(newFolder);
      return newFolder;
    },
    updateFolder: (id, data) => {
      folders = folders.map(folder => 
        folder.id === id ? { ...folder, ...data } : folder
      );
      return folders.find(folder => folder.id === id);
    },
    deleteFolder: (id) => {
      folders = folders.filter(folder => folder.id !== id);
    },
    addBookmark: (folderId, data) => {
      const newBookmark = { id: generateId(), ...data };
      folders = folders.map(folder => {
        if (folder.id === folderId) {
          return {
            ...folder,
            bookmarks: [...folder.bookmarks, newBookmark]
          };
        }
        return folder;
      });
      return newBookmark;
    },
    updateBookmark: (folderId, bookmarkId, data) => {
      folders = folders.map(folder => {
        if (folder.id === folderId) {
          return {
            ...folder,
            bookmarks: folder.bookmarks.map(bookmark => 
              bookmark.id === bookmarkId ? { ...bookmark, ...data } : bookmark
            )
          };
        }
        return folder;
      });
    },
    deleteBookmark: (folderId, bookmarkId) => {
      folders = folders.map(folder => {
        if (folder.id === folderId) {
          return {
            ...folder,
            bookmarks: folder.bookmarks.filter(bookmark => bookmark.id !== bookmarkId)
          };
        }
        return folder;
      });
    }
  };
};

const BookmarkManager = () => {
  const [folders, setFolders] = useState([]);
  const [currentFolder, setCurrentFolder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Modal states
  const [folderModalOpen, setFolderModalOpen] = useState(false);
  const [bookmarkModalOpen, setBookmarkModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  
  // Initialize mock service
  const bookmarkService = React.useMemo(() => mockBookmarkService(), []);
  
  // Load folders on mount
  useEffect(() => {
    const loadFolders = () => {
      const allFolders = bookmarkService.getAllFolders();
      setFolders(allFolders);
      setIsLoading(false);
    };
    
    loadFolders();
  }, [bookmarkService]);
  
  // === Folder operations ===
  const handleOpenFolder = (folderId) => {
    const folder = folders.find(f => f.id === folderId);
    setCurrentFolder(folder);
  };
  
  const handleAddFolder = () => {
    setCurrentItem(null);
    setFolderModalOpen(true);
  };
  
  const handleEditFolder = (folder) => {
    setCurrentItem(folder);
    setFolderModalOpen(true);
  };
  
  const handleDeleteFolder = (folderId) => {
    if (window.confirm('Are you sure you want to delete this folder and all its bookmarks?')) {
      bookmarkService.deleteFolder(folderId);
      setFolders(folders.filter(folder => folder.id !== folderId));
    }
  };
  
  const handleFolderSubmit = (formData) => {
    if (currentItem) {
      // Update existing folder
      const updatedFolder = bookmarkService.updateFolder(currentItem.id, formData);
      setFolders(folders.map(folder => 
        folder.id === currentItem.id ? { ...folder, ...updatedFolder } : folder
      ));
    } else {
      // Create new folder
      const newFolder = bookmarkService.createFolder(formData.name);
      setFolders([...folders, newFolder]);
    }
    setFolderModalOpen(false);
  };
  
  // === Bookmark operations ===
  const handleAddBookmark = (folderId) => {
    setCurrentItem(null);
    setBookmarkModalOpen(true);
  };
  
  const handleEditBookmark = (bookmark) => {
    setCurrentItem(bookmark);
    setBookmarkModalOpen(true);
  };
  
  const handleDeleteBookmark = (bookmarkId) => {
    if (window.confirm('Are you sure you want to delete this bookmark?')) {
      bookmarkService.deleteBookmark(currentFolder.id, bookmarkId);
      
      // Update the current folder in state
      setCurrentFolder({
        ...currentFolder,
        bookmarks: currentFolder.bookmarks.filter(bookmark => bookmark.id !== bookmarkId)
      });
      
      // Update folders state
      setFolders(folders.map(folder => {
        if (folder.id === currentFolder.id) {
          return {
            ...folder,
            bookmarks: folder.bookmarks.filter(bookmark => bookmark.id !== bookmarkId)
          };
        }
        return folder;
      }));
    }
  };
  
  const handleBookmarkSubmit = (formData) => {
    if (currentItem) {
      // Update existing bookmark
      bookmarkService.updateBookmark(currentFolder.id, currentItem.id, formData);
      
      // Update the current folder in state
      setCurrentFolder({
        ...currentFolder,
        bookmarks: currentFolder.bookmarks.map(bookmark => 
          bookmark.id === currentItem.id ? { ...bookmark, ...formData } : bookmark
        )
      });
      
      // Update folders state
      setFolders(folders.map(folder => {
        if (folder.id === currentFolder.id) {
          return {
            ...folder,
            bookmarks: folder.bookmarks.map(bookmark => 
              bookmark.id === currentItem.id ? { ...bookmark, ...formData } : bookmark
            )
          };
        }
        return folder;
      }));
    } else {
      // Add new bookmark
      const newBookmark = bookmarkService.addBookmark(currentFolder.id, formData);
      
      // Update the current folder in state
      setCurrentFolder({
        ...currentFolder,
        bookmarks: [...currentFolder.bookmarks, newBookmark]
      });
      
      // Update folders state
      setFolders(folders.map(folder => {
        if (folder.id === currentFolder.id) {
          return {
            ...folder,
            bookmarks: [...folder.bookmarks, newBookmark]
          };
        }
        return folder;
      }));
    }
    setBookmarkModalOpen(false);
  };
  
  return (
    <div className="min-h-screen bg-gray-900">
      <TopBar />
      
      <main className="container mx-auto px-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-400">Loading...</p>
          </div>
        ) : currentFolder ? (
          <BookmarkFolderView 
            folder={currentFolder}
            onBack={() => setCurrentFolder(null)}
            onAddBookmark={handleAddBookmark}
            onEditBookmark={handleEditBookmark}
            onDeleteBookmark={handleDeleteBookmark}
          />
        ) : (
          <BookmarkGrid 
            folders={folders}
            onOpenFolder={handleOpenFolder}
            onAddFolder={handleAddFolder}
            onEditFolder={handleEditFolder}
            onDeleteFolder={handleDeleteFolder}
          />
        )}
      </main>
      
      {/* Folder Modal */}
      <Modal 
        isOpen={folderModalOpen}
        onClose={() => setFolderModalOpen(false)}
        title={currentItem ? "Edit Folder" : "Create New Folder"}
      >
        <FolderForm 
          folder={currentItem}
          onSubmit={handleFolderSubmit}
          onCancel={() => setFolderModalOpen(false)}
        />
      </Modal>
      
      {/* Bookmark Modal */}
      <Modal 
        isOpen={bookmarkModalOpen}
        onClose={() => setBookmarkModalOpen(false)}
        title={currentItem ? "Edit Bookmark" : "Add New Bookmark"}
      >
        <BookmarkForm 
          bookmark={currentItem}
          onSubmit={handleBookmarkSubmit}
          onCancel={() => setBookmarkModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default BookmarkManager;