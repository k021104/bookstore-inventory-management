import { Layers } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import '../styles/Categories.css';
import { useNavigate } from 'react-router-dom';

export default function Categories() {
  const [stats, setStats] = useState([]);

  const navigate = useNavigate();

  const handleViewShelf = (categoryId) => {
    navigate('/books', { state: { selectedCategory: categoryId } });
  };

  useEffect(() => {
    const categories = ['fantasy', 'history', 'science_fiction', 'mystery'];
    const calculatedStats = categories.map(cat => {
      const books = JSON.parse(localStorage.getItem(`inventory_${cat}`)) || [];
      const totalStock = books.reduce((acc, book) => acc + parseInt(book.stock || 0), 0);
      const totalValue = books.reduce((acc, book) => acc + (parseFloat(book.price || 0) * parseInt(book.stock || 0)), 0);

      return {
        id: cat,
        name: cat.replace('_', ' '),
        count: books.length,
        stock: totalStock,
        value: totalValue.toFixed(2)
      };
    });
    setStats(calculatedStats);
  }, []);

  return (
    <div className='categories-container'>
      <header className='page-header'>
        <h1>Inventory Categories</h1>
        <p>Manage and monitor your stock distribution across genres.</p>
      </header>

      <div className='categories-grid'>
        {stats.map(cat => (
          <div key={cat.id} className='category-card glass'>
            <div className='card-top'>
              <div className='cat-icon-box'>
                <Layers size={24} />
              </div>
              <span className='stock-count'>{cat.stock} Units</span>
            </div>

            <div className='card-mid'>
              <h3>{cat.name}</h3>
              <p>{cat.count} Unique Titles</p>
            </div>

            <div className="card-bottom">
              <div className="value-box">
                <span>Inventory Value</span>
                <strong>${cat.value}</strong>
              </div>
              <button className="view-details-btn" onClick={() => handleViewShelf(cat.id)}>View Shelf</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
