"use client";
import { useState , useEffect } from "react";
import { Menu, ClipboardList, Notebook, Inbox,CalendarDays, User, LogOut, Timer } from "lucide-react";
import { logout } from "./action";
import { createClient } from "@/utils/supabase/server";
import PomodoroPage from "./Pomodoro/page";
import Calendar from "./Calendar/page";
import ContextWrapper from "./Calendar/context/ContextWrapperr";
import useStore from "../global";
import { useRouter } from "next/navigation";
// import BoardContent from "./BoardContent";

// // Create content components for each page(temp)
// const BoardsContent = () => <div className="p-6"><h1 className="text-2xl font-bold mb-4">Boards</h1><p>Your boards content goes here...</p></div>;
const NotebookContent = () => <div className="p-6"><h1 className="text-2xl font-bold mb-4">Notebook</h1><p>Your notebook content goes here...</p></div>;

export default function Dashboard({ user }) {
  const router = useRouter();

  const setUser = useStore((state) => state.setUser);

  useEffect(() => {
    if (user) setUser(user); // will persist it to localStorage
  }, [user, setUser]);


  const [isOpen, setIsOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState("boards"); // Default page

  // Page content mapping
  const pageContent = {
    boards: <></>,
    calendar: <ContextWrapper><Calendar/></ContextWrapper>,
    notebook: <NotebookContent />,
    pomodoro: <PomodoroPage></PomodoroPage>
  };

  return (
    <div className="flex border-2">
      {/* Sidebar */}
      <aside className={`h-screen bg-gray-800 text-white p-4 fixed transition-all duration-300 ${isOpen ? "w-64" : "w-20"}`}>
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
        {/* display a user icon if sidebar is colapsed */}
        {
          !isOpen &&(
            <div className="mb-6 p-2">
              <User></User>
            </div>
          )
        }

        {/* Navigation Links */}
        <nav className="space-y-2">
          <SidebarItem 
            icon={<ClipboardList   size={20} />} 
            text="Boards" 
            isOpen={isOpen} 
            isActive={currentPage === "boards"}
            onClick={() => router.push("/Boards")} 
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

          <SidebarItem 
            icon={<Timer size={20} />} 
            text="Pomodoro" 
            isOpen={isOpen} 
            isActive={currentPage === "pomodoro"}
            onClick={() => setCurrentPage("pomodoro")} 
          />        </nav>

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
