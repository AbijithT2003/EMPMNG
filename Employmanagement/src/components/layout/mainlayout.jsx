import { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import "./MainLayout.css";

function MainLayout({
  children,
  title,
  activeView,
  setActiveView,
  searchQuery,
  onSearchChange,
  showSearch,
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="main-layout">
      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {sidebarOpen && (
        <div
          className="main-layout-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="main-layout-content">
        <Header
          title={title}
          onMenuClick={() => setSidebarOpen(true)}
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          showSearch={showSearch}
        />
        <main className="main-layout-body">{children}</main>
      </div>
    </div>
  );
}

export default MainLayout;
