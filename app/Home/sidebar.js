"use client";
import { useState } from "react";
import { Menu, ClipboardList, Notebook, Inbox, CalendarDays, User, LogOut, Timer } from "lucide-react";
import { logout } from "./action";
import PomodoroPage from "./Pomodoro/page";
import Calendar from "./Calendar/page";
import ContextWrapper from "./Calendar/context/ContextWrapperr";
import Notes from "./Notes/page";

// Create content components for each page(temp)
const BoardsContent = () => <div className="p-6"><h1 className="text-2xl font-bold mb-4">Boards</h1><p>Your boards content goes here...</p></div>;

export default function Dashboard({ user }) {

  const [isOpen, setIsOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState("boards"); // Default page
  const [isMobileOpen, setIsMobileOpen] = useState(false); // State for mobile sidebar

  // Page content mapping
  const pageContent = {
    boards: <BoardsContent />,
    calendar: <ContextWrapper><Calendar/></ContextWrapper>,
    notebook: <Notes></Notes>,
    pomodoro: <PomodoroPage></PomodoroPage>
  };

  return (
    <div className="flex relative">
      {/* Sidebar */}
      <aside className={`h-screen bg-gray-800 text-white p-4 fixed transition-all duration-300 z-40 ${isOpen ? "w-64" : "w-20"}
        ${isMobileOpen ? "left-0 w-64" : "-left-64"} md:left-0`}
      >
        {/* Toggle Button */}
        <button 
           className="hidden md:block text-gray-400 hover:text-white mb-6"
           onClick={() => setIsOpen(!isOpen)}
        >
           <Menu size={24} />
      </button>


        {/* User info section */}
        {user && (
          <div className={`mb-2 p-2 ${isMobileOpen ? "pt-12" : "pt-4"}`}>
            {isMobileOpen || isOpen ? (
              <p className="text-sm text-gray-300 truncate">
                {isOpen || isMobileOpen ? user.email : user.name}
              </p>
            ) : (
              // On mobile, always show name or email when sidebar is open
              !isOpen && !isMobileOpen && (
                <div className="hidden md:block">
                  <User />
                </div>
              )
            )}
          </div>
        )}



        {/* Navigation Links */}
        <nav className="space-y-2">
          <SidebarItem icon={<ClipboardList size={20} />} text="Boards" isOpen={isOpen || isMobileOpen} isActive={currentPage === "boards"} onClick={() => { setCurrentPage("boards"); setIsMobileOpen(false); }} />
          <SidebarItem icon={<CalendarDays size={20} />} text="Calendar" isOpen={isOpen || isMobileOpen} isActive={currentPage === "calendar"} onClick={() => { setCurrentPage("calendar"); setIsMobileOpen(false); }} />
          <SidebarItem icon={<Notebook size={20} />} text="Notebook" isOpen={isOpen || isMobileOpen} isActive={currentPage === "notebook"} onClick={() => { setCurrentPage("notebook"); setIsMobileOpen(false); }} />
          <SidebarItem icon={<Timer size={20} />} text="Pomodoro" isOpen={isOpen || isMobileOpen} isActive={currentPage === "pomodoro"} onClick={() => { setCurrentPage("pomodoro"); setIsMobileOpen(false); }} />
        </nav>

        {/* Settings & Extras */}

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
      <main className={`flex-1 transition-all duration-300 w-full ${isOpen ? "md:ml-64" : "md:ml-20"}`}>

        {/* Mobile Floating Toggle Button */}
        <button
          className="md:hidden fixed top-4 left-4 bg-gray-800 text-white p-2 rounded-full shadow-lg z-50"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          <Menu size={24} />
        </button>
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
