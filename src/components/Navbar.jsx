import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { Search, Plus, Moon, Sun, User } from "lucide-react";
import '../styles/Navbar.css';

export default function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const pageTitle = {
    "/": "Dashboard",
    "/books": "Library",
    "/book-form": "Add Book",
    "/categories": "Categories",
    "/logs": "Logs",
    "/settings": "Settings"
  }[location.pathname] || "Admin";

  return (
    <nav className="navbar">
      {/* SECTION 1: Fixed Width Left */}
      <div className="nav-section-left">
        <h3 className="nav-logo-text">{pageTitle}</h3>
      </div>

      {/* SECTION 2: Flexible Center (Protects the layout) */}
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

      {/* SECTION 3: Fixed Width Right */}
      <div className="nav-section-right">
        <button className="premium-btn-primary" onClick={() => navigate("/book-form")}>
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