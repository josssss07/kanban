"use client";
import { useState } from "react";
import { Menu, ClipboardList, Notebook, Inbox,CalendarDays, Settings, LogOut } from "lucide-react";
import { logout } from "./action";
import { createClient } from "@/utils/supabase/server";

// Create content components for each page
const BoardsContent = () => <div className="p-6"><h1 className="text-2xl font-bold mb-4">Boards</h1><p>Your boards content goes here...</p></div>;
const CalendarContent = () => <div className="p-6"><h1 className="text-2xl font-bold mb-4">Calendar</h1><p>Your calendar content goes here...</p></div>;
const NotebookContent = () => <div className="p-6"><h1 className="text-2xl font-bold mb-4">Notebook</h1><p>Your notebook content goes here...</p></div>;
const SettingsContent = () => <div className="p-6"><h1 className="text-2xl font-bold mb-4">Settings</h1><p>Your settings content goes here...</p></div>;

export default function Dashboard({ user }) {
  
  const [isOpen, setIsOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState("boards"); // Default page

  // Page content mapping
  const pageContent = {
    boards: <BoardsContent />,
    calendar: <CalendarContent />,
    notebook: <NotebookContent />,
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className={`h-screen bg-gray-900 text-white p-4 fixed transition-all duration-300 ${isOpen ? "w-64" : "w-20"}`}>
        {/* Toggle Button */}
        <button 
          className="text-gray-400 hover:text-white mb-6"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu size={24} />
        </button>

        {/* User info section - only visible when sidebar is open */}
        {isOpen && user && (
          <div className="mb-6 p-2">
            <p className="text-sm text-gray-300 truncate">{user.email}</p>
          </div>
        )}

        {/* Navigation Links */}
        <nav className="space-y-2">
          <SidebarItem 
            icon={<ClipboardList   size={20} />} 
            text="Boards" 
            isOpen={isOpen} 
            isActive={currentPage === "boards"}
            onClick={() => setCurrentPage("boards")} 
          />
          <SidebarItem 
            icon={<CalendarDays size={20} />} 
            text="Calendar" 
            isOpen={isOpen} 
            isActive={currentPage === "calendar"}
            onClick={() => setCurrentPage("calendar")} 
          />
          <SidebarItem 
            icon={<Notebook size={20} />} 
            text="Notebook" 
            isOpen={isOpen} 
            isActive={currentPage === "notebook"}
            onClick={() => setCurrentPage("notebook")} 
          />
        </nav>

        {/* Settings & Extras */}
        <div className="absolute bottom-12 ">
          <SidebarItem 
            icon={<Settings size={20} />} 
            text="Settings" 
            isOpen={isOpen} 
            isActive={currentPage === "settings"}
            onClick={() => setCurrentPage("settings")} 
          />
        </div>

        {/* Logout Section - at the bottom of sidebar */}
        <div className="absolute bottom-4 left-0 right-0 px-4">
          <form action="/logout">
            <button 
              formAction={logout}
              className="flex items-center space-x-3 p-2 w-full text-left rounded-lg cursor-pointer transition-colors hover:bg-red-700 text-gray-200"
            >
              <LogOut size={20} />
              {isOpen && <span className="text-sm">Sign out</span>}
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area - pushes content to the right of sidebar */}
      <main className={`flex-1 transition-all duration-300 ${isOpen ? "ml-64" : "ml-20"}`}>
        {pageContent[currentPage]}
      </main>
    </div>
  );
}

// Enhanced Sidebar Item Component
function SidebarItem({ icon, text, isOpen, isActive, onClick }) {
  return (
    <button 
      className={`flex items-center space-x-3 p-2 w-full text-left rounded-lg cursor-pointer transition-colors
        ${isActive ? "bg-purple-600 text-white" : "hover:bg-gray-700 text-gray-200"}`}
      onClick={onClick}
    >
      {icon}
      {isOpen && <span className="text-sm">{text}</span>}
    </button>
  );
}