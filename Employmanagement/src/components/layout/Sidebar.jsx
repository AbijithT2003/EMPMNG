import { Users, Briefcase, X } from "lucide-react";
import "./Sidebar.css";

function Sidebar({ activeView, setActiveView, sidebarOpen, setSidebarOpen }) {
  return (
    <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
      <div className="sidebar-header">
        <div className="sidebar-title">
          <div className="logo">
            <Users size={18} color="#fff" />
          </div>
          <h1>EmpManage</h1>
        </div>
        <button onClick={() => setSidebarOpen(false)} className="close-btn">
          <X size={18} />
        </button>
      </div>

      <nav className="sidebar-nav">
        <button
          className={`nav-item ${activeView === "employees" ? "active" : ""}`}
          onClick={() => {
            setActiveView("employees");
            setSidebarOpen(false);
          }}
        >
          <Users size={16} />
          Employees
        </button>
        <button
          className={`nav-item ${activeView === "departments" ? "active" : ""}`}
          onClick={() => {
            setActiveView("departments");
            setSidebarOpen(false);
          }}
        >
          <Briefcase size={16} />
          Departments
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;
