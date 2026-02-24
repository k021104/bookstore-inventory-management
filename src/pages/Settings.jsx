import React, { useState, useContext, useEffect } from 'react';
import {
  DollarSign,
  AlertTriangle,
  ShieldCheck,
  Palette,
  Save,
  User,
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

  const [adminData, setAdminData] = useState({
    name: "",
    email: ""
  });

  const [profileError, setProfileError] = useState("");
  const [profileSuccess, setProfileSuccess] = useState("");

  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

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

  useEffect(() => {
    const storedAdmin = JSON.parse(localStorage.getItem("admin_data"));

    if (storedAdmin) {
      setAdminData({
        name: storedAdmin.username,
        email: storedAdmin.email
      });
    }
  }, []);

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

  const handleProfileUpdate = () => {
    let storedAdmin = JSON.parse(localStorage.getItem("admin_data"));

    if (!storedAdmin) {
      storedAdmin = {
        username: "Admin",
        email: "admin@bookstore.com",
        password: "Admin123"
      };
    }

    // Reset messages
    setProfileError("");
    setProfileSuccess("");

    // Name validation
    if (!adminData.name.trim()) {
      setProfileError("Admin name cannot be empty!");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(adminData.email)) {
      setProfileError("Please enter a valid email address!");
      return;
    }

    const updatedAdmin = {
      ...storedAdmin,
      username: adminData.name,
      email: adminData.email
    };

    localStorage.setItem("admin_data", JSON.stringify(updatedAdmin));

    setProfileSuccess("Profile updated successfully!");
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();

    const storedAdmin = JSON.parse(localStorage.getItem("admin_data"));

    setPasswordError("");
    setPasswordSuccess("");

    if (!storedAdmin) {
      setPasswordError("Admin data not found!");
      return;
    }

    if (passwords.old !== storedAdmin.password) {
      setPasswordError("Current password is incorrect!");
      return;
    }

    if (passwords.new.length < 6) {
      setPasswordError("Password must be at least 6 characters long!");
      return;
    }

    if (!/[A-Z]/.test(passwords.new)) {
      setPasswordError("Password must contain at least one uppercase letter!");
      return;
    }

    if (!/[0-9]/.test(passwords.new)) {
      setPasswordError("Password must contain at least one number!");
      return;
    }

    if (passwords.new !== passwords.confirm) {
      setPasswordError("New password and confirm password do not match!");
      return;
    }

    const updatedAdmin = {
      ...storedAdmin,
      password: passwords.new
    };

    localStorage.setItem("admin_data", JSON.stringify(updatedAdmin));

    setPasswordSuccess("Password updated successfully!");

    setPasswords({ old: '', new: '', confirm: '' });
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
                    <input type="text" className="st-input-premium" value={adminData.name} onChange={(e) => setAdminData({ ...adminData, name: e.target.value })} />
                  </div>

                  <div className="st-form-group">
                    <label>Admin Email</label>
                    <input type="email" className="st-input-premium" value={adminData.email} onChange={(e) => setAdminData({ ...adminData, email: e.target.value })} />
                  </div>
                </div>
                {profileError && <span className="error-text">{profileError}</span>}
                {profileSuccess && <span className="success-text">{profileSuccess}</span>}
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
                  <form className="password-edit-form animate-slide-up" onSubmit={handlePasswordChange}>
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
                      <button type="submit" className="st-save-btn-small" onClick={handlePasswordChange}>
                        Update Password
                      </button>
                    </div>
                    {passwordError && <span className="error-text">{passwordError}</span>}
                    {passwordSuccess && <span className="success-text">{passwordSuccess}</span>}
                  </form>
                )}
                <div className="st-footer-premium">
                  <div className="footer-content">
                    <button className="st-save-btn-glow" onClick={handleProfileUpdate}>
                      <Save size={18} /> Save Profile
                    </button>
                  </div>
                </div>
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

        </div>
      </div>
    </div>
  );
};

export default Settings;