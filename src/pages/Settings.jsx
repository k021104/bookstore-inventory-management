import React, { useState, useContext, useEffect } from 'react';
import {
  DollarSign,
  AlertTriangle,
  Download,
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
            <DollarSign size={18} /> General
          </button>
          <button className={activeTab === 'inventory' ? 'active' : ''} onClick={() => setActiveTab('inventory')}>
            <AlertTriangle size={18} /> Inventory
          </button>
          <button className={activeTab === 'account' ? 'active' : ''} onClick={() => setActiveTab('account')}>
            <ShieldCheck size={18} /> Account
          </button>
          <button className={activeTab === 'appearance' ? 'active' : ''} onClick={() => setActiveTab('appearance')}>
            <Palette size={18} /> Appearance
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
          {activeTab === 'inventory' && (
            <div className="tab-pane">
              <div className="setting-row">
                <div className="setting-info">
                  <h3>Low Stock Threshold</h3>
                  <p>Alert me when book quantity falls below this number.</p>
                </div>
                <div className="st-input-wrapper">
                  <input
                    type="number"
                    value={threshold}
                    onChange={(e) => setThreshold(e.target.value)}
                    className="st-number-input"
                  />
                  <span>Units</span>
                </div>
              </div>
            </div>
          )}

          {/* 3. Account & Security */}
          {activeTab === 'account' && (
            <div className="tab-pane animate-fade">
              {/* Admin Profile - ये हमेशा दिखेगा */}
              <div className="st-form-group">
                <label><User size={16} /> Admin Name</label>
                <input type="text" className="st-input" defaultValue="Admin User" />
              </div>

              <div className="st-form-group">
                <label><Mail size={16} /> Admin Email</label>
                <input type="email" className="st-input" defaultValue="admin@bookstore.com" />
              </div>

              {/* Password Section */}
              <div className="security-section border-top">
                {!isEditingPassword ? (
                  // अगर बटन क्लिक नहीं हुआ है, तो सिर्फ ये दिखेगा
                  <div className="password-placeholder">
                    <div className="setting-info">
                      <h3>Password & Security</h3>
                      <p>Update your login credentials to keep your account safe.</p>
                    </div>
                    <button
                      className="st-btn-outline"
                      onClick={() => setIsEditingPassword(true)}
                    >
                      <Lock size={16} /> Change Password
                    </button>
                  </div>
                ) : (
                  // अगर बटन क्लिक कर दिया, तो ये फॉर्म खुलेगा
                  <form onSubmit={handlePasswordChange} className="password-edit-form animate-slide-up">
                    <div className="st-form-group">
                      <label>Current Password</label>
                      <input
                        type="password"
                        className="st-input"
                        value={passwords.old}
                        onChange={(e) => setPasswords({ ...passwords, old: e.target.value })}
                        autoFocus
                      />
                    </div>
                    <div className="form-row-grid">
                      <div className="st-form-group">
                        <label>New Password</label>
                        <input
                          type="password"
                          className="st-input"
                          value={passwords.new}
                          onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                        />
                      </div>
                      <div className="st-form-group">
                        <label>Confirm Password</label>
                        <input
                          type="password"
                          className="st-input"
                          value={passwords.confirm}
                          onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="form-actions-row">
                      <button
                        type="button"
                        className="btn-cancel-text"
                        onClick={() => setIsEditingPassword(false)}
                      >
                        Cancel
                      </button>
                      <button type="submit" className="st-save-btn small">
                        Save New Password
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          )}

          {/* 4. Theme & Appearance */}
          {activeTab === 'appearance' && (
            <div className="tab-pane">
              <div className="setting-row">
                <div className="setting-info">
                  <h3>Theme Mode</h3>
                  <p>Switch between light and dark visual styles.</p>
                </div>
                <button className={`theme-toggle-btn ${theme}`} onClick={toggleTheme}>
                  <div className="toggle-dot"></div>
                  <span>{theme === 'dark' ? 'Dark' : 'Light'}</span>
                </button>
              </div>
            </div>
          )}

          <div className="st-footer">
            <button className="st-save-btn"><Save size={18} /> Save All Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;