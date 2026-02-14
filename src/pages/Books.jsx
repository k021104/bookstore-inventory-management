import React, { useEffect, useState } from "react";
import { Search, Filter, MoreVertical, BookOpen, Download, Plus, Star } from "lucide-react";
import '../styles/Books.css';

export default function Books() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://openlibrary.org/subjects/fantasy.json")
      .then(res => res.json())
      .then(data => {
        setBooks(data.works);
        setLoading(false);
      });
  }, []);

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="books-loader"><span>ACCESSING ARCHIVES...</span></div>;

  return (
    <div className="books-page">
      {/* HEADER SECTION */}
      <header className="books-header">
        <div className="header-left">
          <h1>Library Catalog</h1>
          <p>Managing {books.length} active titles in Fantasy</p>
        </div>
        <div className="header-actions">
          <button className="action-btn secondary"><Download size={18} /> Export</button>
          <button className="action-btn primary"><Plus size={18} /> Add New Book</button>
        </div>
      </header>

      {/* FILTER BAR */}
      <div className="filter-bar glass">
        <div className="search-wrapper">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search by title, author, or ISBN..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <button className="filter-pill active">All</button>
          <button className="filter-pill">Available</button>
          <button className="filter-pill">Low Stock</button>
          <div className="divider"></div>
          <button className="icon-pill"><Filter size={18} /></button>
        </div>
      </div>

      {/* BOOKS GRID */}
      <div className="books-grid">
        {filteredBooks.map((book, i) => (
          <div className="book-card glass" key={i}>
            <div className="card-image">
              {book.cover_id ? (
                <img src={`https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`} alt={book.title} />
              ) : (
                <div className="no-cover"><BookOpen size={40} /></div>
              )}
              <div className="card-badge">{book.first_publish_year}</div>
            </div>
            
            <div className="card-content">
              <div className="card-top">
                <h3>{book.title}</h3>
                <button className="more-btn"><MoreVertical size={16} /></button>
              </div>
              <p className="author-name">By {book.authors?.[0]?.name || "Unknown Author"}</p>
              
              <div className="card-stats">
                <div className="stat-item">
                  <span className="stat-label">Editions</span>
                  <span className="stat-value">{book.edition_count}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Status</span>
                  <span className={`status-dot ${book.edition_count < 10 ? 'red' : 'green'}`}></span>
                </div>
              </div>

              <div className="card-footer">
                <button className="view-btn">View Details</button>
                <button className="fav-btn"><Star size={16} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}