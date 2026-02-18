import React, { useState, useContext } from 'react';
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
import '../styles/Settings.css';

const Settings = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [activeTab, setActiveTab] = useState('general');

  // Form States
  const [currency, setCurrency] = useState('INR');
  const [threshold, setThreshold] = useState(10);

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
                <button className="st-btn-outline"><FileOutput size={18} /> Export Data</button>
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
            <div className="tab-pane">
              <div className="st-form-group">
                <label><User size={16} /> Admin Name</label>
                <input type="text" defaultValue="Admin User" className="st-input" />
              </div>
              <div className="st-form-group">
                <label><Mail size={16} /> Admin Email</label>
                <input type="email" defaultValue="admin@bookstore.com" className="st-input" />
              </div>
              <div className="st-form-group border-top">
                <label><Lock size={16} /> Change Password</label>
                <input type="password" placeholder="••••••••" className="st-input" />
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