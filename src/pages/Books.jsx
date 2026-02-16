import React, { useState, useEffect } from 'react';
import { Trash2, Edit3, X, Loader2, Package, DollarSign } from 'lucide-react';
import '../styles/Books.css';

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('fantasy');
  const [editingBook, setEditingBook] = useState(null); // This controls the Popup

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const localData = localStorage.getItem(`inventory_${activeCategory}`);
      if (localData) {
        setBooks(JSON.parse(localData));
        setLoading(false);
      } else {
        try {
          const res = await fetch(`https://openlibrary.org/subjects/${activeCategory}.json?limit=12`);
          const data = await res.json();
          const formatted = data.works.map(b => ({
            id: b.key,
            title: b.title,
            author: b.authors?.[0]?.name || "Unknown Author",
            coverId: b.cover_id,
            stock: Math.floor(Math.random() * 50) + 1,
            price: (Math.random() * 30 + 10).toFixed(2),
          }));
          setBooks(formatted);
          localStorage.setItem(`inventory_${activeCategory}`, JSON.stringify(formatted));
        } finally { setLoading(false); }
      }
    };
    loadData();
  }, [activeCategory]);

  const deleteBook = (id) => {
    if (window.confirm("Remove this book from inventory?")) {
      const updated = books.filter(b => b.id !== id);
      setBooks(updated);
      localStorage.setItem(`inventory_${activeCategory}`, JSON.stringify(updated));
    }
  };

  const saveEdit = (e) => {
    e.preventDefault();
    const updated = books.map(b => b.id === editingBook.id ? editingBook : b);
    setBooks(updated);
    localStorage.setItem(`inventory_${activeCategory}`, JSON.stringify(updated));
    setEditingBook(null); // Close the popup
  };

  return (
    <div className="books-wrapper">
      <div className="category-header">
        {['fantasy', 'history', 'science_fiction', 'mystery'].map(cat => (
          <button 
            key={cat} 
            className={`cat-tab ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat.replace('_', ' ')}
          </button>
        ))}
      </div>

      {loading ? <div className="loader"><Loader2 className="spin" /></div> : (
        <div className="books-grid">
          {books.map((book) => (
            <div key={book.id} className="book-card-premium glass">
              <div className="card-image">
                <img src={`https://covers.openlibrary.org/b/id/${book.coverId}-M.jpg`} alt="" />
                <div className="stock-pill" data-status={book.stock < 10 ? 'low' : 'ok'}>
                  {book.stock < 10 ? 'Low Stock' : 'In Stock'}
                </div>
              </div>

              <div className="card-content">
                <div className="info-header">
                  <h3 className="book-name">{book.title}</h3>
                  <p className="author-name">by {book.author}</p>
                </div>

                <div className="stats-row">
                  <div className="stat">
                    <span className="label">Price</span>
                    <span className="value">${book.price}</span>
                  </div>
                  <div className="stat">
                    <span className="label">Stock</span>
                    <span className="value">{book.stock} pcs</span>
                  </div>
                </div>

                <div className="card-actions">
                  <button className="btn-edit" onClick={() => setEditingBook(book)}>
                    <Edit3 size={16} /> Edit
                  </button>
                  <button className="btn-delete" onClick={() => deleteBook(book.id)}>
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- PREMIUM EDIT POPUP (MODAL) --- */}
      {editingBook && (
        <div className="modal-overlay" onClick={() => setEditingBook(null)}>
          <div className="modal-box glass" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Edit Inventory</h3>
              <button className="close-btn" onClick={() => setEditingBook(null)}><X size={20}/></button>
            </div>
            
            <form onSubmit={saveEdit} className="modal-form">
              <div className="book-preview-small">
                 <img src={`https://covers.openlibrary.org/b/id/${editingBook.coverId}-S.jpg`} alt="" />
                 <div>
                    <h4>{editingBook.title}</h4>
                    <span>{editingBook.author}</span>
                 </div>
              </div>

              <div className="form-grid">
                <div className="input-field">
                  <label><DollarSign size={14}/> Price</label>
                  <input 
                    type="number" 
                    step="0.01"
                    value={editingBook.price} 
                    onChange={(e) => setEditingBook({...editingBook, price: e.target.value})}
                    autoFocus
                  />
                </div>
                <div className="input-field">
                  <label><Package size={14}/> Stock</label>
                  <input 
                    type="number" 
                    value={editingBook.stock} 
                    onChange={(e) => setEditingBook({...editingBook, stock: parseInt(e.target.value) || 0})}
                  />
                </div>
              </div>

              <div className="modal-actions">
                <button type="button" className="secondary-btn" onClick={() => setEditingBook(null)}>Discard</button>
                <button type="submit" className="primary-btn">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BooksPage;