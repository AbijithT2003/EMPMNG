import React from "react";
import { User, Users, Calendar } from "lucide-react";
import "./TopNav.css";

export default function TopNav({ activeView, setActiveView }) {
  return (
    <div className="top-nav">
      <div className="admin-badge">ADMIN</div>

      <div className="nav-buttons">
        <button
          className={`nav-btn ${activeView === "dashboard" ? "active" : ""}`}
          onClick={() => setActiveView("dashboard")}
          aria-label="Employee View"
        >
          <User size={20} />
        </button>

        <button
          className={`nav-btn ${activeView === "departments" ? "active" : ""}`}
          onClick={() => setActiveView("departments")}
          aria-label="Department View"
        >
          <Users size={20} />
        </button>

        <button
          className={`nav-btn ${activeView === "leave" ? "active" : ""}`}
          onClick={() => setActiveView("leave")}
          aria-label="Leave Requests"
        >
          <Calendar size={20} />
        </button>
      </div>
    </div>
  );
}
