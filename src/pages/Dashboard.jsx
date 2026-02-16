import React, { useEffect, useState } from 'react';
import { Book, Users, AlertTriangle, Activity, Clock, ArrowRight } from "lucide-react";
// 1. Import Chart.js essentials
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import '../styles/Dashboard.css';

// 2. Register Chart.js Components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://openlibrary.org/subjects/fantasy.json")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.works) {
          setBooks(data.works.slice(0, 12));
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setLoading(false);
      });
  }, []);

  // --- DATA PREPARATION ---
  const getAuthorData = () => {
    const counts = {};
    books.forEach((b) => {
      const name = b.authors?.[0]?.name || "Unknown Author";
      counts[name] = (counts[name] || 0) + 1;
    });

    const sorted = Object.keys(counts)
      .map((name) => ({ name, count: counts[name] }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    return {
      labels: sorted.map(item => item.name),
      datasets: [{
        label: 'Books',
        data: sorted.map(item => item.count),
        backgroundColor: ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'],
        borderRadius: 6,
      }]
    };
  };

  const getStockDistribution = () => {
    const low = books.filter(b => b.edition_count < 750).length;
    const healthy = books.length - low;

    return {
      labels: ['Low Stock', 'Healthy'],
      datasets: [{
        data: [low, healthy],
        backgroundColor: ['#ef4444', '#10b981'],
        borderWidth: 0,
        cutout: '75%',
      }]
    };
  };

  if (loading) return <div style={{ padding: '50px', textAlign: 'center', color: 'white' }}>Syncing Library Data...</div>;

  const barData = getAuthorData();
  const doughnutData = getStockDistribution();

  return (
    <div className='dashboard-wrapper'>
      <header className='main-header'>
        <h2>Executive Dashboard</h2>
        <p>Comprehensive overview of library assets and activity.</p>
      </header>

      <div className="stat-row">
        <div className="stat-card glass border-blue">
          <div className="stat-icon blue"><Book /></div>
          <div className="stat-val">
            <span>Total Titles</span>
            <h3>{books.length}</h3>
          </div>
        </div>

        <div className="stat-card glass border-purple">
          <div className="stat-icon purple"><Users /></div>
          <div className="stat-val">
            <span>Active Authors</span>
            <h3>{new Set(books.map(b => b.authors?.[0]?.name)).size}</h3>
          </div>
        </div>

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

        {/* SAME CSS CLASS: chart-box */}
        <div className="chart-box" style={{ height: '300px', width: '100%' }}>
          <Bar
            data={barData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { display: false }
              },
              scales: {
                x: {
                  grid: { display: false },
                  ticks: {
                    color: '#94a3b8',
                    maxRotation: 0, // नाम को तिरछा होने से रोकता है
                    minRotation: 0, // नाम को सीधा रखता है
                    autoSkip: false, // सभी नाम दिखाने की कोशिश करता है
                    font: {
                      size: 10 // छोटा फ़ॉन्ट ताकि नाम एक लाइन में आ सकें
                    },
                    callback: function (value) {
                      const label = this.getLabelForValue(value);
                      if (label.length > 10) {
                        return label.substr(0, 10) + '...'; // बहुत लंबे नामों को छोटा कर देगा
                      }
                      return label;
                    }
                  }
                },
                y: {
                  grid: { color: 'rgba(255,255,255,0.05)' },
                  ticks: { color: '#94a3b8', stepSize: 1 }
                }
              }
            }}
          />
        </div>
      </div>

      <div className="dashboard-grid-2">
        <div className="content-panel glass">
          <div className="panel-title"><h3>Stock Health</h3></div>

          {/* SAME CSS CLASS: chart-box-small */}
          <div className="chart-box-small" style={{ height: '220px', width: '100%' }}>
            <Doughnut
              data={doughnutData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } }
              }}
            />
            <div className="chart-label">
              <strong>{books.length > 0 ? Math.round(((books.length - books.filter(b => b.edition_count < 750).length) / books.length) * 100) : 0}%</strong>
              <span>Healthy</span>
            </div>
          </div>
        </div>

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
          {books.slice(0, 4).map((book, i) => (
            <div className="activity-item-detailed" key={i}>
              <img src={`https://covers.openlibrary.org/b/id/${book.cover_id}-S.jpg`} alt={book.title} className="activity-img" />
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
        <div className="panel-title"><h3>Inventory Snapshot</h3></div>
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
              {books.slice(0, 6).map((book, i) => (
                <tr key={i}>
                  <td className="table-book-cell">
                    <img src={`https://covers.openlibrary.org/b/id/${book.cover_id}-S.jpg`} alt="" />
                    <div className="table-text">
                      <strong>{book.title}</strong>
                      <span>ID: {book.cover_id}</span>
                    </div>
                  </td>
                  <td>{book.authors?.[0]?.name}</td>
                  <td>
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
  );
}