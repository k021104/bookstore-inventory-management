import { type } from "@testing-library/user-event/dist/type";

export const saveLog = (action, details, type = 'info') => {
    const logs = JSON.parse(localStorage.getItem('activity_logs')) || [];
    const newLog = {
        id: Date.now(),
        action,
        details,
        time: new Date().toLocaleString('en-GB', {
            day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'
        }),
        type
    };

    const updatedLogs = [newLog, ...logs].slice(0, 50);
    localStorage.setItem('activity_logs', JSON.stringify(updatedLogs));
}