import React, { useState, useEffect } from 'react';
import { Clock, Trash2, PlusCircle, Edit, AlertCircle } from 'lucide-react';
import '../styles/ActivityLogs.css';

export default function ActivityLogs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('activity_logs')) || [];
    setLogs(data);
  }, []);

  const getIcon = (action) => {
    if (action.includes("Added")) return <PlusCircle size={18} className='text-success' />;
    if (action.includes("Deleted")) return <Trash2 size={18} className="text-danger" />;
    return <Edit size={18} className="text-warning" />;
  };

  return (
    <div className="logs-wrapper">
      <div className="logs-header">
        <h1>Activity History</h1>
        <p>Track all inventory changes and administrative actions.</p>
      </div>

      <div className="logs-list glass">
        {logs.length > 0 ? (
          logs.map((log) => (
            <div key={log.id} className="log-card">
              <div className={`log-icon-wrapper ${log.type}`}>
                {getIcon(log.action)}
              </div>
              <div className="log-content">
                <div className="log-main">
                  <span className="log-action">{log.action}</span>
                  <p className="log-details">{log.details}</p>
                </div>
                <div className="log-meta">
                  <Clock size={14} />
                  <span>{log.time}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-logs">
            <AlertCircle size={40} />
            <p>No activity recorded yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}
