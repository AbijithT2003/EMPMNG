import React from "react";
import { Users, Layout, Calendar, X } from "react-feather";
import "./Sidebar.css";

const navItems = [
  { id: "employees", label: "Employees", icon: Users },
  { id: "departments", label: "Departments", icon: Layout },
  { id: "leave", label: "Leave Requests", icon: Calendar },
];

function Sidebar({ activeView, setActiveView, isOpen, onClose }) {
  const handleNavClick = (id) => {
    setActiveView(id);
  };

  return (
    <aside className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
      <div className="sidebar-header">
        <div className="sidebar-brand">
          <div className="sidebar-logo">
            <Users color="#fff" size={20} />
          </div>
          <span className="sidebar-title">Manager</span>
        </div>
        <button onClick={onClose} className="sidebar-close">
          <X size={18} />
        </button>
      </div>

      <nav className="sidebar-nav">
        {navItems.map(({ id, label, icon: NavIcon }) => (
          <button
            key={id}
            className={`sidebar-nav-item ${activeView === id ? "active" : ""}`}
            onClick={() => handleNavClick(id)}
          >
            <NavIcon size={16} />
            <span>{label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
