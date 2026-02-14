import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Dashboard from "./pages/Dashboard";
import Books from "./pages/Books";
import BookForm from "./pages/BookForm";
import Categories from "./pages/Categories";
import ActivityLogs from "./pages/ActivityLogs";
import Settings from "./pages/Settings";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/books" element={<Books />} />
          <Route path="/book-form" element={<BookForm />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/logs" element={<ActivityLogs />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
