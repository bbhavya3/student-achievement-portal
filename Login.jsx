import React from "react";
import "./Login.css";

export default function Login({ onLogin }) {
  return (
    <div className="login-wrapper">
      <div className="login-glass-card">
        <div className="login-header">
          <span className="login-logo">🎓</span>
          <h2>Welcome Back</h2>
          <p>Sign in to your Student Portal</p>
        </div>
        <form className="login-form" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
          <div className="login-input-group">
            <label>EMAIL ADDRESS</label>
            <input type="email" placeholder="student@university.com" required />
          </div>
          <div className="login-input-group">
            <label>PASSWORD</label>
            <input type="password" placeholder="••••••••" required />
          </div>
          <button type="submit" className="login-btn">Sign In</button>
        </form>
      </div>
    </div>
  );
}