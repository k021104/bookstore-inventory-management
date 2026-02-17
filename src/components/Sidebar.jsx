import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  BookOpen, 
  PlusCircle, 
  Tags, 
  History, 
  Settings,
  Library
} from "lucide-react"; // Premium professional icons
import '../styles/Sidebar.css';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo-icon">
          <Library size={24} />
        </div>
        <h2>Book Admin</h2>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/" end className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/books" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <BookOpen size={20} />
          <span>Books</span>
        </NavLink>

        <NavLink to="/categories" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <Tags size={20} />
          <span>Categories</span>
        </NavLink>

        <NavLink to="/logs" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <History size={20} />
          <span>Activity Logs</span>
        </NavLink>

        <div className="sidebar-divider"></div>

        <NavLink to="/settings" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <Settings size={20} />
          <span>Settings</span>
        </NavLink>
      </nav>
      
      <div className="sidebar-footer">
        <p>© 2026 Inventory Pro</p>
      </div>
    </aside>
  );
}