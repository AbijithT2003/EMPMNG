import React from "react";
import { Search, Bell, Settings } from "react-feather";
import "./Header.css";

function Header({ searchQuery, setSearchQuery, onOpenSidebar }) {
  return (
    <header className="header">
      <div className="header-left">
        <div className="search-container">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Hint search text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
      </div>
      <div className="header-right">
        <button className="icon-button">
          <Bell size={18} />
        </button>
        <button className="icon-button">
          <Settings size={18} />
        </button>
        <div className="admin-profile">
          <span className="admin-label">ADMIN</span>
          <div className="admin-avatar" />
        </div>
      </div>
    </header>
  );
}

export default Header;
