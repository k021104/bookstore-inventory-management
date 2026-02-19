import React from 'react';
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Tags,
  History,
  Settings,
  Library,
  ChevronRight,
  X // Close आइकॉन जोड़ा
} from "lucide-react";
import '../styles/Sidebar.css';

export default function Sidebar({ isOpen, setSidebarOpen }) {
  
  // मोबाइल पर लिंक क्लिक होने पर साइडबार बंद करने के लिए
  const handleLinkClick = () => {
    if (window.innerWidth <= 600) {
      setSidebarOpen(false);
    }
  };

  return (
    <aside className={`premium-sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-container">
        
        {/* Mobile Close Button */}
        <button className="sidebar-close-btn" onClick={() => setSidebarOpen(false)}>
          <X size={24} />
        </button>

        {/* Brand Logo */}
        <div className="sidebar-brand">
          <div className="brand-icon-box">
            <Library size={24} strokeWidth={2.5} />
          </div>
          <span className="brand-name">Book Admin</span>
        </div>

        {/* Main Navigation */}
        <nav className="sidebar-menu">
          <div className="menu-group">
            <NavLink to="/" end className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={handleLinkClick}>
              <LayoutDashboard size={20} />
              <span className="link-text">Dashboard</span>
              <ChevronRight className="arrow-icon" size={14} />
            </NavLink>

            <NavLink to="/books" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={handleLinkClick}>
              <BookOpen size={20} />
              <span className="link-text">Books Inventory</span>
              <ChevronRight className="arrow-icon" size={14} />
            </NavLink>

            <NavLink to="/categories" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={handleLinkClick}>
              <Tags size={20} />
              <span className="link-text">Categories</span>
              <ChevronRight className="arrow-icon" size={14} />
            </NavLink>

            <NavLink to="/logs" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={handleLinkClick}>
              <History size={20} />
              <span className="link-text">Activity Logs</span>
              <ChevronRight className="arrow-icon" size={14} />
            </NavLink>
          </div>
        </nav>

        {/* Bottom Section */}
        <div className="sidebar-footer-area">
          <div className="divider-line"></div>
          <NavLink to="/settings" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={handleLinkClick}>
            <Settings size={20} />
            <span className="link-text">Settings</span>
          </NavLink>
        </div>
      </div>
    </aside>
  );
}