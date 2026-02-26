import React from "react";
import "./Navbar.css";

export default function Navbar({ setActiveTab, activeTab, onLogout }) {
  return (
    <div className="sidebar">
      <div className="logo">
        <span className="logo-icon">🏆</span>
        <span>Student Portal</span>
      </div>

      <nav className="menu-list">
        <div 
          className={`menu-item ${activeTab === "Dashboard" ? "active" : ""}`} 
          onClick={() => setActiveTab("Dashboard")}
        >
          🏠 Dashboard
        </div>
        <div 
          className={`menu-item ${activeTab === "Add" ? "active" : ""}`} 
          onClick={() => setActiveTab("Add")}
        >
          ➕ Add Achievement
        </div>
      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={onLogout}>🚪 Logout</button>
      </div>
    </div>
  );
}