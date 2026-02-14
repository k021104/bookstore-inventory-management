// import React, { useEffect, useState } from "react";
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from "recharts";
// import { Book, Users, AlertTriangle, Calendar, Clock, ShoppingCart, Activity, ArrowRight } from "lucide-react";
// import '../styles/Dashboard.css';

// export default function Dashboard() {
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch("https://openlibrary.org/subjects/fantasy.json")
//       .then(res => res.json())
//       .then(data => {
//         setBooks(data.works.slice(0, 15));
//         setLoading(false);
//       })
//       .catch(err => console.error("Error:", err));
//   }, []);

//   // Calculations for KPIs
//   const totalBooks = books.length;
//   const authors = new Set(books.flatMap(b => b.authors?.map(a => a.name))).size;
//   const lowStockCount = books.filter(b => b.edition_count < 10).length;
//   const latestYear = books.length > 0 ? Math.max(...books.map(b => b.first_publish_year || 0)) : 0;

//   // Chart Data - Ensure unique keys for rendering
//   const chartData = [
//     { name: "High Stock", value: books.filter(b => b.edition_count > 8).length },
//     { name: "Medium", value: books.filter(b => b.edition_count >= 4 && b.edition_count <= 8).length },
//     { name: "Low Stock", value: books.filter(b => b.edition_count < 4).length }
//   ];

//   if (loading) return <div className="loading-state"><span>SYNCING ASSETS...</span></div>;

//   return (
//     <div className="dashboard-container">
//       <header className="dashboard-header">
//         <h2>Bookstore Inventory Dashboard</h2>
//         <p>Real-time analytics for your Fantasy collection.</p>
//       </header>

//       {/* ROW 1: KPI 2x2 GRID */}
//       <div className="kpi-grid">
//         <div className="kpi-card glass">
//           <div className="kpi-icon blue"><Book /></div>
//           <div className="kpi-content"><span>Total Books</span><h3>{totalBooks}</h3></div>
//         </div>
//         <div className="kpi-card glass">
//           <div className="kpi-icon purple"><Users /></div>
//           <div className="kpi-content"><span>Authors</span><h3>{authors}</h3></div>
//         </div>
//         <div className="kpi-card glass">
//           <div className="kpi-icon red"><AlertTriangle /></div>
//           <div className="kpi-content"><span>Low Stock</span><h3>{lowStockCount}</h3></div>
//         </div>
//         <div className="kpi-card glass">
//           <div className="kpi-icon green"><Calendar /></div>
//           <div className="kpi-content"><span>Latest Year</span><h3>{latestYear}</h3></div>
//         </div>
//       </div>

//       {/* ROW 2: CATEGORY CHART (Fix: Ensure all bars show) */}
//       <div className="dashboard-row glass">
//         <div className="row-head"><Activity size={18} /> <h3>Stock Level Distribution</h3></div>
//         <div className="chart-wrapper">
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={chartData} margin={{ top: 10, right: 30, left: -10, bottom: 10 }}>
//               <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--nav-border)" />
//               <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 12 }} />
//               <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 12 }} />
//               <Tooltip cursor={{ fill: 'var(--input-fill)' }} contentStyle={{ borderRadius: '12px', border: 'none', background: 'var(--nav-bg)', boxShadow: 'var(--shadow-lg)' }} />
//               <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={50}>
//                 {chartData.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={index === 2 ? '#ef4444' : index === 1 ? '#8b5cf6' : '#3b82f6'} />
//                 ))}
//               </Bar>
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       {/* ROW 3: INVENTORY TABLE */}
//       <div className="dashboard-row glass">
//         <div className="row-head"><h3>Inventory Snapshot</h3></div>
//         <div className="table-wrapper">
//           <table className="premium-table">
//             <thead>
//               <tr>
//                 <th>Item</th>
//                 <th>Author</th>
//                 <th>Year</th>
//                 <th>Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {books.map((book, i) => (
//                 <tr key={i} className="table-row-hover">
//                   <td className="book-cell">
//                     <img src={`https://covers.openlibrary.org/b/id/${book.cover_id}-S.jpg`} alt="" />
//                     <span>{book.title}</span>
//                   </td>
//                   <td>{book.authors?.[0]?.name}</td>
//                   <td>{book.first_publish_year}</td>
//                   <td>
//                     <span className={`status-pill ${book.edition_count < 10 ? 'red' : 'green'}`}>
//                       {book.edition_count < 10 ? 'Low' : 'Secure'}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* ROW 4: ENHANCED RECENT ACTIVITY */}
//       <div className="dashboard-row glass">
//         <div className="row-head"><Clock size={18} /> <h3>Recent Activity Log</h3></div>
//         <div className="activity-grid">
//           {books.slice(0, 4).map((b, i) => (
//             <div className="activity-card" key={i}>
//               <div className="activity-meta">
//                 <span className="log-time">{i + 1}h ago</span>
//                 <p>New catalog entry: <strong>{b.title}</strong></p>
//                 <span className="log-detail">Published by {b.authors?.[0]?.name} in {b.first_publish_year}</span>
//               </div>
//               <ArrowRight size={16} className="activity-arrow" />
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* ROW 5: CRITICAL LOW STOCK (Purchase Required) */}
//       <div className="dashboard-row glass critical-zone">
//         <div className="row-head red-text"><ShoppingCart size={18} /> <h3>Critical Low Stock - Restock Immediately</h3></div>
//         <div className="critical-purchase-list">
//           {books.filter(b => b.edition_count < 10).map((b, i) => (
//             <div className="critical-book-card" key={i}>
//               <img src={`https://covers.openlibrary.org/b/id/${b.cover_id}-S.jpg`} alt="" />
//               <div className="critical-meta">
//                 <h4>{b.title}</h4>
//                 <p>Author: {b.authors?.[0]?.name}</p>
//                 <span className="count-warning">{b.edition_count} copies remaining</span>
//               </div>
//               <button className="purchase-btn">Purchase Now</button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from 'react'
import { Book, Users, AlertTriangle, Activity, Clock, ArrowRight, User } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid, PieChart, Pie } from "recharts";
import '../styles/Dashboard.css';

export default function Dashboard() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://openlibrary.org/subjects/fantasy.json")
      .then((res) => res.json())
      .then((data) => {
        // We take the first 12 books to keep the dashboard clean
        setBooks(data.works.slice(0, 12));
        setLoading(false);
      })
      .catch((err) => console.error("API Error:", err));
  }, []);

  const getAuthorData = () => {
    const counts = {};
    books.forEach((b) => {
      const name = b.authors?.[0]?.name || "Unknown Author";
      counts[name] = (counts[name] || 0) + 1;
    });

    return Object.keys(counts)
      .map((name) => ({ name, count: counts[name] }))
      .sort((a, b) => b.count - a.count) // Sort biggest to smallest
      .slice(0, 5); // Take top 5
  };

  if (loading) return <div style={{ padding: '50px', textAlign: 'center' }}>Syncing Library Data...</div>;

  const authorChartData = getAuthorData();

  const getStockDistribution = () => {
    // Change 10 to 40 to catch more books for the demo
    const low = books.filter(b => b.edition_count < 750).length;
    const healthy = books.length - low;

    return [
      { name: 'Low Stock', value: low, color: '#ef4444' },
      { name: 'Healthy', value: healthy, color: '#10b981' }
    ];
  };

  const stockData = getStockDistribution();

  return (
    <div className='dashboard-wrapper'>
      <header className='main-header'>
        <h2>Executive Dashboard</h2>
        <p>Comprehensive overview of library assets and activity.</p>
      </header>

      <div className="stat-row">
        {/* Card 1: Total Titles */}
        <div className="stat-card glass border-blue">
          <div className="stat-icon blue"><Book /></div>
          <div className="stat-val">
            <span>Total Titles</span>
            <h3>{books.length}</h3>
          </div>
        </div>

        {/* Card 2: Active Authors (Calculated dynamically) */}
        <div className="stat-card glass border-purple">
          <div className="stat-icon purple"><Users /></div>
          <div className="stat-val">
            <span>Active Authors</span>
            <h3>{new Set(books.map(b => b.authors?.[0]?.name)).size}</h3>
          </div>
        </div>

        {/* Card 3: Low Stock (Based on edition_count < 10) */}
        <div className="stat-card glass border-red">
          <div className="stat-icon red"><AlertTriangle /></div>
          <div className="stat-val">
            <span>Low Stock Alerts</span>
            <h3>{books.filter(b => b.edition_count < 10).length}</h3>
          </div>
        </div>

      </div>

      <div className="content-panel glass">
        <div className="panel-title">
          <Activity size={18} />
          <h3>Top Authors Concentration</h3>
        </div>

        <div className="chart-box">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={authorChartData} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--nav-border)" />

              {/* XAxis is now for Names. interval={0} shows ALL names. angle rotates them. */}
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'var(--text-muted)', fontSize: 11 }}
                interval={0}
                height={30}
                dy={10}
              />

              {/* YAxis is now for the Numbers (Counts) */}
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'var(--text-muted)', fontSize: 12 }}
              />

              <Tooltip
                cursor={{ fill: 'var(--input-fill)', opacity: 0.4 }}
                contentStyle={{ borderRadius: '12px', border: 'none', background: 'var(--nav-bg)', color: 'var(--text-main)' }}
              />

              {/* Bars now grow UP. radius affects the top corners only. */}
              <Bar dataKey="count" radius={[6, 6, 0, 0]} barSize={40}>
                {authorChartData.map((entry, index) => (
                  <Cell key={index} fill={['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'][index % 5]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="dashboard-grid-2">
        {/* NEW CHART: STOCK DISTRIBUTION */}
        <div className="content-panel glass">
          <div className="panel-title"><h3>Stock Health</h3></div>
          <div className="chart-box-small">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={stockData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {stockData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="chart-label">
              <strong>{Math.round((stockData[1].value / books.length) * 100)}%</strong>
              <span>Healthy</span>
            </div>
          </div>
        </div>

        {/* LOW STOCK UPDATOR PANEL */}
        <div className="content-panel glass border-red">
          <div className="panel-title red-text">
            <AlertTriangle size={18} />
            <h3>Urgent Restock</h3>
          </div>
          <div className="updater-list">
            {books.filter(b => b.edition_count < 750).slice(0, 3).map((book, i) => (
              <div className="updater-item" key={i}>
                <div className="updater-info">
                  <p>{book.title}</p>
                  <span>Current: {book.edition_count} units</span>
                </div>
                <button className="restock-btn">Order</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="content-panel glass">
        <div className="panel-title">
          <Clock size={18} />
          <h3>Recent Inventory Activity</h3>
        </div>

        <div className="activity-list">
          {/* We use the real books we fetched earlier */}
          {books.slice(0, 4).map((book, i) => (
            <div className="activity-item-detailed" key={i}>
              {/* Real book cover from Open Library API */}
              <img
                src={`https://covers.openlibrary.org/b/id/${book.cover_id}-S.jpg`}
                alt={book.title}
                className="activity-img"
              />
              <div className="activity-info">
                <p>Inventory update: <strong>{book.title}</strong></p>
                <span>By {book.authors?.[0]?.name} • Stock Level: {book.edition_count}</span>
              </div>
              <div className="activity-time">{i + 1}h ago</div>
              <ArrowRight size={16} className="activity-link" />
            </div>
          ))}
        </div>
      </div>

      <div className="content-panel glass">
        <div className="panel-title">
          <h3>Inventory Snapshot</h3>
        </div>

        <div className="table-overflow">
          <table className="pro-table">
            <thead>
              <tr>
                <th>Book Details</th>
                <th>Primary Author</th>
                <th>Stock Status</th>
              </tr>
            </thead>
            <tbody>
              {/* We use the first 6 books for the table */}
              {books.slice(0, 6).map((book, i) => (
                <tr key={i}>
                  <td className="table-book-cell">
                    <img
                      src={`https://covers.openlibrary.org/b/id/${book.cover_id}-S.jpg`}
                      alt=""
                    />
                    <div className="table-text">
                      <strong>{book.title}</strong>
                      <span>ID: {book.cover_id}</span>
                    </div>
                  </td>
                  <td>{book.authors?.[0]?.name}</td>
                  <td>
                    {/* This badge changes color based on the edition_count */}
                    <span className={`status-badge ${book.edition_count < 10 ? 'urgent' : 'stable'}`}>
                      {book.edition_count < 10 ? 'Restock' : 'Stable'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}
