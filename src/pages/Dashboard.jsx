import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from "recharts";
import { Book, Users, AlertTriangle, Calendar, Clock, ShoppingCart, Activity, ArrowRight } from "lucide-react";
import '../styles/Dashboard.css';

export default function Dashboard() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://openlibrary.org/subjects/fantasy.json")
      .then(res => res.json())
      .then(data => {
        setBooks(data.works.slice(0, 15));
        setLoading(false);
      })
      .catch(err => console.error("Error:", err));
  }, []);

  // Calculations for KPIs
  const totalBooks = books.length;
  const authors = new Set(books.flatMap(b => b.authors?.map(a => a.name))).size;
  const lowStockCount = books.filter(b => b.edition_count < 10).length;
  const latestYear = books.length > 0 ? Math.max(...books.map(b => b.first_publish_year || 0)) : 0;

  // Chart Data - Ensure unique keys for rendering
  const chartData = [
    { name: "High Stock", value: books.filter(b => b.edition_count > 15).length },
    { name: "Medium", value: books.filter(b => b.edition_count >= 10 && b.edition_count <= 15).length },
    { name: "Low Stock", value: books.filter(b => b.edition_count < 10).length }
  ];

  if (loading) return <div className="loading-state"><span>SYNCING ASSETS...</span></div>;

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2>📚 Bookstore Inventory Dashboard</h2>
        <p>Real-time analytics for your Fantasy collection.</p>
      </header>

      {/* ROW 1: KPI 2x2 GRID */}
      <div className="kpi-grid">
        <div className="kpi-card glass">
          <div className="kpi-icon blue"><Book /></div>
          <div className="kpi-content"><span>Total Books</span><h3>{totalBooks}</h3></div>
        </div>
        <div className="kpi-card glass">
          <div className="kpi-icon purple"><Users /></div>
          <div className="kpi-content"><span>Authors</span><h3>{authors}</h3></div>
        </div>
        <div className="kpi-card glass">
          <div className="kpi-icon red"><AlertTriangle /></div>
          <div className="kpi-content"><span>Low Stock</span><h3>{lowStockCount}</h3></div>
        </div>
        <div className="kpi-card glass">
          <div className="kpi-icon green"><Calendar /></div>
          <div className="kpi-content"><span>Latest Year</span><h3>{latestYear}</h3></div>
        </div>
      </div>

      {/* ROW 2: CATEGORY CHART (Fix: Ensure all bars show) */}
      <div className="dashboard-row glass">
        <div className="row-head"><Activity size={18}/> <h3>Stock Level Distribution</h3></div>
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} margin={{ top: 10, right: 30, left: -10, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--nav-border)" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'var(--text-muted)', fontSize: 12}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: 'var(--text-muted)', fontSize: 12}} />
              <Tooltip cursor={{fill: 'var(--input-fill)'}} contentStyle={{borderRadius: '12px', border: 'none', background: 'var(--nav-bg)', boxShadow: 'var(--shadow-lg)'}} />
              <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={50}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 2 ? '#ef4444' : index === 1 ? '#8b5cf6' : '#3b82f6'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ROW 3: INVENTORY TABLE */}
      <div className="dashboard-row glass">
        <div className="row-head"><h3>Inventory Snapshot</h3></div>
        <div className="table-wrapper">
          <table className="premium-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Author</th>
                <th>Year</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, i) => (
                <tr key={i} className="table-row-hover">
                  <td className="book-cell">
                    <img src={`https://covers.openlibrary.org/b/id/${book.cover_id}-S.jpg`} alt="" />
                    <span>{book.title}</span>
                  </td>
                  <td>{book.authors?.[0]?.name}</td>
                  <td>{book.first_publish_year}</td>
                  <td>
                    <span className={`status-pill ${book.edition_count < 10 ? 'red' : 'green'}`}>
                      {book.edition_count < 10 ? 'Low' : 'Secure'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ROW 4: ENHANCED RECENT ACTIVITY */}
      <div className="dashboard-row glass">
        <div className="row-head"><Clock size={18}/> <h3>Recent Activity Log</h3></div>
        <div className="activity-grid">
          {books.slice(0, 4).map((b, i) => (
            <div className="activity-card" key={i}>
              <div className="activity-meta">
                <span className="log-time">{i + 1}h ago</span>
                <p>New catalog entry: <strong>{b.title}</strong></p>
                <span className="log-detail">Published by {b.authors?.[0]?.name} in {b.first_publish_year}</span>
              </div>
              <ArrowRight size={16} className="activity-arrow" />
            </div>
          ))}
        </div>
      </div>

      {/* ROW 5: CRITICAL LOW STOCK (Purchase Required) */}
      <div className="dashboard-row glass critical-zone">
        <div className="row-head red-text"><ShoppingCart size={18}/> <h3>Critical Low Stock - Restock Immediately</h3></div>
        <div className="critical-purchase-list">
          {books.filter(b => b.edition_count < 10).map((b, i) => (
            <div className="critical-book-card" key={i}>
              <img src={`https://covers.openlibrary.org/b/id/${b.cover_id}-S.jpg`} alt="" />
              <div className="critical-meta">
                <h4>{b.title}</h4>
                <p>Author: {b.authors?.[0]?.name}</p>
                <span className="count-warning">{b.edition_count} copies remaining</span>
              </div>
              <button className="purchase-btn">Purchase Now</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}