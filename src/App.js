import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Dashboard from "./pages/Dashboard";
import Books from "./pages/Books";
import Categories from "./pages/Categories";
import ActivityLogs from "./pages/ActivityLogs";
import Settings from "./pages/Settings";
import { useState } from "react";
import AddBookModal from "./components/AddBookModal";
import './App.css';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={
          <ProtectedRoute>
            <Layout
              onAddClick={() => setIsModalOpen(true)}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="/books" element={<Books searchQuery={searchQuery} />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/logs" element={<ActivityLogs />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

      </Routes>
      <AddBookModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </BrowserRouter>
  );
}

export default App;
