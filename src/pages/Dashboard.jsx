import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Book, Layers, AlertTriangle, Sparkles, Clock } from "lucide-react"; // Matching Navbar/Sidebar style
import '../styles/Dashboard.css';

export default function Dashboard() {
  const stats = [
    { title: "Total Books", value: 248, icon: <Book size={20} />, color: "var(--primary)" },
    { title: "Categories", value: 12, icon: <Layers size={20} />, color: "#8b5cf6" },
    { title: "Low Stock", value: 5, icon: <AlertTriangle size={20} />, color: "#ef4444" },
    { title: "New Arrivals", value: 18, icon: <Sparkles size={20} />, color: "#10b981" },
  ];

  const chartData = [
    { name: "Fiction", books: 40 },
    { name: "Science", books: 28 },
    { name: "Business", books: 35 },
    { name: "History", books: 22 },
  ];

  const recentBooks = [
    { title: "Atomic Habits", author: "James Clear", date: "2 hours ago" },
    { title: "Deep Work", author: "Cal Newport", date: "5 hours ago" },
    { title: "Think Again", author: "Adam Grant", date: "Yesterday" },
  ];

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Overview</h1>
        <p>Welcome back, Admin. Here is what's happening today.</p>
      </header>

      {/* KPI CARDS */}
      <div className="stat-grid">
        {stats.map((item, index) => (
          <div className="stat-card" key={index}>
            <div className="stat-icon" style={{ backgroundColor: `${item.color}15`, color: item.color }}>
              {item.icon}
            </div>
            <div className="stat-info">
              <h4>{item.title}</h4>
              <h2>{item.value}</h2>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-content-grid">
        {/* CHART SECTION */}
        <div className="chart-wrapper premium-card">
          <div className="card-header">
            <h3>Books by Category</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'var(--text-muted)', fontSize: 12}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: 'var(--text-muted)', fontSize: 12}} />
              <Tooltip 
                cursor={{fill: 'var(--input-fill)'}}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: 'var(--shadow-md)', background: 'var(--nav-bg)' }}
              />
              <Bar dataKey="books" radius={[6, 6, 0, 0]} barSize={40}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index % 2 === 0 ? 'var(--primary)' : 'var(--primary-hover)'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* RECENT ACTIVITY SECTION */}
        <div className="recent-books premium-card">
          <div className="card-header">
            <h3>Recently Added</h3>
          </div>
          <div className="book-list">
            {recentBooks.map((book, index) => (
              <div className="book-item" key={index}>
                <div className="book-icon"><Clock size={16} /></div>
                <div className="book-details">
                  <span className="book-title">{book.title}</span>
                  <span className="book-author">{book.author}</span>
                </div>
                <span className="book-time">{book.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}