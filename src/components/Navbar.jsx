import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { Search, Plus, Moon, Sun, User, LogOut, Settings, ChevronDown } from "lucide-react";
import '../styles/Navbar.css';

export default function Navbar({ onAddClick, searchQuery, setSearchQuery }) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Dropdown state
  const navigate = useNavigate();
  const location = useLocation();

  const pageTitle = {
    "/": "Dashboard",
    "/books": "Library",
    "/categories": "Categories",
    "/logs": "Logs",
    "/settings": "Settings"
  }[location.pathname] || "Admin";

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value.length > 0 && location.pathname !== "/books") {
      navigate("/books");
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure want to logout?")) {
      localStorage.removeItem("isLoggedIn");
      window.location.href = "/login";
    }
  };

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
            placeholder="Search by title or author..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <div className="nav-section-right">
        <button className="premium-btn-primary" onClick={onAddClick}>
          <Plus size={18} />
          <span className="hide-mobile">Add Book</span>
        </button>

        <button className="premium-btn-icon" onClick={toggleTheme}>
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        {/* --- PROFESSIONAL DROPDOWN START --- */}
        <div className="profile-wrapper">
          <div
            className={`premium-user-pill ${isDropdownOpen ? 'active' : ''}`}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <div className="premium-avatar">
              <User size={14} />
            </div>
            <span className="hide-tablet">Admin</span>
            <ChevronDown size={14} className={`chevron-icon ${isDropdownOpen ? 'rotate' : ''}`} />
          </div>

          {isDropdownOpen && (
            <div className="profile-dropdown">
              <div className="dropdown-header-box">
                <p className="signed-in-label">Signed in as</p>
                <p className="user-email-text">admin@bookstore.com</p>
              </div>

              <div className="dropdown-divider"></div>

              <div className="dropdown-menu-items">
                <button className="dropdown-item" onClick={() => { navigate('/settings'); setIsDropdownOpen(false); }}>
                  <Settings size={17} />
                  <span>Account Settings</span>
                </button>

                <button className="dropdown-item logout-red" onClick={handleLogout}>
                  <LogOut size={17} />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
        {/* --- PROFESSIONAL DROPDOWN END --- */}
      </div>
    </nav>
  );
}