import React, { useState, useContext, useEffect } from 'react';
import {
  DollarSign,
  AlertTriangle,
  ShieldCheck,
  Palette,
  Save,
  User,
  Mail,
  Lock,
  FileOutput
} from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';
import { CurrencyContext } from '../context/CurrencyContext';
import '../styles/Settings.css';

const Settings = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [activeTab, setActiveTab] = useState('general');

  const { currency, setCurrency } = useContext(CurrencyContext);
  const [threshold, setThreshold] = useState(localStorage.getItem('low_stock_limit') || 10);

  const [booksData, setBooksData] = useState([]);

  const [passwords, setPasswords] = useState({ old: '', new: '', confirm: '' });

  const [isEditingPassword, setIsEditingPassword] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('https://openlibrary.org/subjects/love.json?limit=10');
        const data = await response.json();

        const formattedBooks = data.works.map(work => ({
          title: work.title,
          author: work.authors[0]?.name || "Unknown",
          price: Math.floor(Math.random() * 500) + 100,
          stock: Math.floor(Math.random() * 50) + 1
        }));

        setBooksData(formattedBooks);
      } catch (error) {
        console.error("Data fetch karne mein galti hui:", error);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    localStorage.setItem('app_currency', currency);
  }, [currency]);

  useEffect(() => {
    localStorage.setItem('low_stock_limit', threshold);
  }, [threshold]);

  const handleExport = () => {
    if (booksData.length === 0) {
      alert("Abhi data load ho raha hai, thodi der rukein!");
      return;
    }

    let csvContent = "Book Title,Author Name,Price,Current Stock\n";

    booksData.forEach((book) => {
      let row = `"${book.title}","${book.author}",${book.price},${book.stock}`;
      csvContent += row + "\n";
    });

    const blob = new Blob(["\ufeff" + csvContent], { type: 'text/csv;charset=utf-8;' });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Library_Inventory.csv';
    a.click();
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();

    // 1. चेक करें कि पासवर्ड मैच हो रहे हैं या नहीं
    if (passwords.new !== passwords.confirm) {
      alert("Naya password match nahi ho raha!");
      return;
    }

    // 2. यहाँ आपका 'Success' मैसेज आएगा
    alert("Security details updated successfully!");

    // 3. फॉर्म के इनपुट खाली करें
    setPasswords({ old: '', new: '', confirm: '' });

    // 4. जादू: फॉर्म को अपने आप बंद कर देना (Toggle Off)
    setIsEditingPassword(false);
  };

  return (
    <div className={`settings-page-final ${theme}`}>
      <div className="settings-container-box">
        <header className="settings-header-section">
          <h1>Control Center</h1>
          <p>Configure and manage your inventory system preferences</p>
        </header>

        {/* --- Navigation Tabs --- */}
        <div className="settings-tabs-container">
          <button className={activeTab === 'general' ? 'active' : ''} onClick={() => setActiveTab('general')}>
            <DollarSign size={20} /> <span>General</span>
          </button>
          <button className={activeTab === 'inventory' ? 'active' : ''} onClick={() => setActiveTab('inventory')}>
            <AlertTriangle size={20} /> <span>Inventory</span>
          </button>
          <button className={activeTab === 'account' ? 'active' : ''} onClick={() => setActiveTab('account')}>
            <ShieldCheck size={20} /> <span>Account</span>
          </button>
          <button className={activeTab === 'appearance' ? 'active' : ''} onClick={() => setActiveTab('appearance')}>
            <Palette size={20} /> <span>Appearance</span>
          </button>
        </div>

        {/* --- Content Area --- */}
        <div className="settings-body-card animate-slide-up">

          {/* 1. General: Currency & Export */}
          {activeTab === 'general' && (
            <div className="tab-pane">
              <div className="setting-row">
                <div className="setting-info">
                  <h3>Currency Selector</h3>
                  <p>Choose the default currency for all book prices.</p>
                </div>
                <select className="st-select" value={currency} onChange={(e) => setCurrency(e.target.value)}>
                  <option value="INR">Indian Rupee (₹)</option>
                  <option value="USD">US Dollar ($)</option>
                  <option value="EUR">Euro (€)</option>
                </select>
              </div>
              <div className="setting-row border-top">
                <div className="setting-info">
                  <h3>Export Inventory</h3>
                  <p>Download your complete book list in CSV format.</p>
                </div>
                <button className="st-btn-outline" onClick={handleExport}><FileOutput size={18} /> Export Data</button>
              </div>
            </div>
          )}

          {/* 2. Inventory: Low Stock Threshold */}
          {/* 2. Inventory: Low Stock Threshold */}
          {activeTab === 'inventory' && (
            <div className="tab-pane animate-slide-up">
              <div className="tab-header">
                <h3>Inventory Preferences</h3>
                <p>Fine-tune how your stock alerts and management behave.</p>
              </div>

              <div className="setting-row">
                <div className="setting-info">
                  <h3>Low Stock Threshold</h3>
                  <p>Set the minimum quantity before the system triggers a "Low Stock" alert.</p>
                </div>

                {/* Wrapper में नई क्लास 'st-number-stepper' जोड़ी गई है */}
                <div className="st-number-stepper">
                  <input
                    type="number"
                    value={threshold}
                    onChange={(e) => setThreshold(e.target.value)}
                    className="st-inventory-input"
                  />
                  <span className="unit-label">Units</span>
                </div>
              </div>
            </div>
          )}

          {/* 3. Account & Security */}
          {/* 3. Account & Security */}
          {activeTab === 'account' && (
            <div className="tab-pane animate-slide-up">
              <div className="section-block">
                <h3 className="section-title"><User size={18} /> Public Profile</h3>
                <div className="account-grid">
                  <div className="st-form-group">
                    <label>Admin Name</label>
                    <input type="text" className="st-input-premium" defaultValue="Admin User" />
                  </div>

                  <div className="st-form-group">
                    <label>Admin Email</label>
                    <input type="email" className="st-input-premium" defaultValue="admin@bookstore.com" />
                  </div>
                </div>
              </div>

              {/* Password Section */}
              <div className="section-block border-top-glow">
                {!isEditingPassword ? (
                  <div className="password-placeholder-card">
                    <div className="setting-info">
                      <h3>Password & Security</h3>
                      <p>Update your login credentials to keep your account safe.</p>
                    </div>
                    <button
                      className="st-btn-glow"
                      onClick={() => setIsEditingPassword(true)}
                    >
                      <Lock size={16} /> Change Password
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handlePasswordChange} className="password-edit-form animate-slide-up">
                    <h3 className="section-title">Update Password</h3>
                    <div className="st-form-group">
                      <label>Current Password</label>
                      <input
                        type="password"
                        className="st-input-premium"
                        value={passwords.old}
                        onChange={(e) => setPasswords({ ...passwords, old: e.target.value })}
                        autoFocus
                      />
                    </div>
                    <div className="form-row-grid-premium">
                      <div className="st-form-group">
                        <label>New Password</label>
                        <input
                          type="password"
                          className="st-input-premium"
                          value={passwords.new}
                          onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                        />
                      </div>
                      <div className="st-form-group">
                        <label>Confirm Password</label>
                        <input
                          type="password"
                          className="st-input-premium"
                          value={passwords.confirm}
                          onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="form-actions-row">
                      <button
                        type="button"
                        className="btn-cancel-minimal"
                        onClick={() => setIsEditingPassword(false)}
                      >
                        Cancel
                      </button>
                      <button type="submit" className="st-save-btn-small">
                        Update Password
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          )}

          {/* 4. Theme & Appearance */}
          {activeTab === 'appearance' && (
            <div className="tab-pane animate-slide-up">
              <div className="tab-header">
                <h3>Appearance Settings</h3>
                <p>Customize how the platform looks on your device.</p>
              </div>

              <div className="appearance-card">
                <div className="setting-info">
                  <h3>Interface Theme</h3>
                  <p>Switch between Light and Dark mode for a comfortable viewing experience.</p>
                </div>

                <div className="theme-switch-wrapper">
                  <button
                    className={`premium-theme-toggle ${theme}`}
                    onClick={toggleTheme}
                    aria-label="Toggle Theme"
                  >
                    <div className="switch-track">
                      <div className="switch-thumb">
                        {theme === 'dark' ? <Lock size={14} /> : <Palette size={14} />}
                      </div>
                    </div>
                    <span className="theme-status-text">
                      {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="st-footer-premium">
            <div className="footer-content">
              <p>Changes are auto-saved to local storage</p>
              <button className="st-save-btn-glow" onClick={() => alert("All settings synchronized!")}>
                <Save size={18} /> Save All Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;