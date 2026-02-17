import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import '../styles/layout.css';
import { Outlet } from "react-router-dom";

export default function Layout({ onAddClick, searchQuery, setSearchQuery }) {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Navbar onAddClick={onAddClick}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <div className="page-container">
          <Outlet />
        </div>
      </div>
    </div>
  );
}