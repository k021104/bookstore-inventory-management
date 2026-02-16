import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Dashboard from "./pages/Dashboard";
import Books from "./pages/Books";
import BookForm from "./pages/BookForm";
import Categories from "./pages/Categories";
import ActivityLogs from "./pages/ActivityLogs";
import Settings from "./pages/Settings";
import { useState } from "react";
import AddBookModal from "./components/AddBookModal";
import './App.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <BrowserRouter>
      <Routes>

        <Route element={<Layout onAddClick={() => setIsModalOpen(true)} />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/books" element={<Books />} />
          <Route path="/book-form" element={<BookForm />} />
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
