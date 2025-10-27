import { Search, Bell, Share2, Menu } from "lucide-react";
import "./Header.css";

function Header({ activeView, setSidebarOpen, searchQuery, setSearchQuery }) {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-left">
          <button className="menu-btn" onClick={() => setSidebarOpen(true)}>
            <Menu size={20} color="#4b5563" />
          </button>
          <h2 className="header-title">
            {activeView === "employees" ? "Employee Management" : "Departments"}
          </h2>
        </div>

        <div className="header-right">
          <div className="search-wrapper">
            <Search className="search-icon" size={16} color="#9ca3af" />
            <input
              type="text"
              placeholder="Search keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          <button className="icon-btn">
            <Bell size={18} color="#4b5563" />
          </button>
          <button className="icon-btn">
            <Share2 size={18} color="#4b5563" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
