import { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { Search, Plus, Moon, Sun, User } from "lucide-react";
import '../styles/Navbar.css';

// We now accept 'onAddClick' as a property
export default function Navbar({ onAddClick }) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const location = useLocation();
  const [search, setSearch] = useState("");

  const pageTitle = {
    "/": "Dashboard",
    "/books": "Library",
    "/categories": "Categories",
    "/logs": "Logs",
    "/settings": "Settings"
  }[location.pathname] || "Admin";

  return (
    <nav className="navbar">
      <div className="nav-section-left">
        <h3 className="nav-logo-text">{pageTitle}</h3>
      </div>

      <div className="nav-section-center">
        <div className="search-pill">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="nav-section-right">
        {/* MODIFIED: Now triggers the modal prop instead of navigating */}
        <button className="premium-btn-primary" onClick={onAddClick}>
          <Plus size={18} />
          <span className="hide-mobile">Add Book</span>
        </button>

        <button className="premium-btn-icon" onClick={toggleTheme}>
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        <div className="premium-user-pill">
          <div className="premium-avatar">
            <User size={14} />
          </div>
          <span className="hide-tablet">Admin</span>
        </div>
      </div>
    </nav>
  );
}