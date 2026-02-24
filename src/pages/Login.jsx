import React, { useState } from 'react'
import { LogIn, Lock, User, Eye, EyeOff } from 'lucide-react';
import '../styles/Login.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();

        let adminData = JSON.parse(localStorage.getItem("admin_data"));

        if (!adminData) {
            adminData = {
                username: "Admin",
                email: "admin@bookstore.com",
                password: "Admin123"
            };

            localStorage.setItem("admin_data", JSON.stringify(adminData));
        }

        console.log("Stored Admin:", adminData);

        if (
            email.trim() === adminData.email &&
            password === adminData.password
        ) {
            localStorage.setItem("isLoggedIn", "true");
            window.location.href = "/";
        } else {
            alert("Invalid Credentials!");
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-glass-card">
                <div className="login-header">
                    <div className="logo-icon"><LogIn size={28} /></div>
                    <h2>Admin Login</h2>
                    <p>Welcome back! Please enter your details.</p>
                </div>

                <form onSubmit={handleLogin} className="login-form">
                    <div className="input-group">
                        <label><User size={16} /> Email Address</label>
                        <input
                            type="email"
                            placeholder="admin@bookstore.com"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <label><Lock size={16} /> Password</label>
                        <div className="pass-wrapper">
                            <input
                                type={showPass ? "text" : "password"}
                                placeholder="••••••••"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button type="button" onClick={() => setShowPass(!showPass)}>
                                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <button type="submit" className="login-btn">Sign In</button>
                </form>
            </div>
        </div>
    )
}
