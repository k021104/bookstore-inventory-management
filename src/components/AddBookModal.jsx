import React, { useState } from 'react';
import { X, BookOpen, User, DollarSign, Package } from 'lucide-react';
import '../styles/AddBookModal.css';
import { saveLog } from '../utils/logger';

export default function AddBookModal({ isOpen, onClose }) {
    const [formData, setFormData] = useState({
        title: '', author: '', price: '', stock: '', category: 'fantasy', coverId: '12818862'
    });

    if (!isOpen) return null; 

    const handleSave = (e) => {
        e.preventDefault();
        const existingData = JSON.parse(localStorage.getItem(`inventory_${formData.category}`)) || [];
        const newData = [{ ...formData, id: Date.now() }, ...existingData];
        localStorage.setItem(`inventory_${formData.category}`, JSON.stringify(newData));
        alert("Book Added Successfully!");
        saveLog("Added", `New book "${formData.title}" added to ${formData.category}`, "success");
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-box glass" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Add New Book</h2>
                    <button onClick={onClose}><X size={20} /></button>
                </div>
                <form onSubmit={handleSave} className="add-form">
                    <input type="text" placeholder="Book Title" required onChange={e => setFormData({ ...formData, title: e.target.value })} />
                    <input type="text" placeholder="Author Name" required onChange={e => setFormData({ ...formData, author: e.target.value })} />
                    <div className="form-row">
                        <input type="number" placeholder="Price" required onChange={e => setFormData({ ...formData, price: e.target.value })} />
                        <input type="number" placeholder="Stock" required onChange={e => setFormData({ ...formData, stock: e.target.value })} />
                    </div>
                    <select onChange={e => setFormData({ ...formData, category: e.target.value })}>
                        <option value="fantasy">Fantasy</option>
                        <option value="history">History</option>
                        <option value="science_fiction">Science Fiction</option>
                        <option value="mystery">Mystery</option>
                    </select>
                    <button type="submit" className="submit-btn">Save to Inventory</button>
                </form>
            </div>
        </div>
    );
}