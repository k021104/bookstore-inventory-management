import { useState } from "react"; // useState जोड़ा
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import '../styles/layout.css';
import { Outlet } from "react-router-dom";

export default function Layout({ onAddClick, searchQuery, setSearchQuery }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false); // मोबाइल मेनू के लिए स्टेट

  return (
    <div className={`app-container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      {isSidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>}

      <Sidebar isOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="main-content">
        <Navbar
          onAddClick={onAddClick}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          toggleMobileMenu={() => setSidebarOpen(!isSidebarOpen)}
        />
        <div className="page-container">
          <Outlet />
        </div>
      </div>
    </div>
  );
}