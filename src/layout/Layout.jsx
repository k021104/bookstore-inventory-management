// src/layout/Layout.jsx
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import '../styles/layout.css';
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        {/* <main style={{ padding: '20px' }}>
          {children}
        </main> */}
         <div className="page-container">
          <Outlet />
        </div>
      </div>
    </div>
  );
}