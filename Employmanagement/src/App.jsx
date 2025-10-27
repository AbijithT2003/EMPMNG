import { useState } from "react";
import { initialEmployees, departments } from "./sampledata/SampleData";
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import EmployeeView from "./components/employees/EmployeeView";
import DepartmentView from "./components/departments/DepartmentView";
import "./App.css";

function App() {
  const [activeView, setActiveView] = useState("employees");
  const [activeTab, setActiveTab] = useState("employees");
  const [employees] = useState(initialEmployees);
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-container">
      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      {sidebarOpen && (
        <div className="overlay" onClick={() => setSidebarOpen(false)} />
      )}

      <div className="main-content">
        <Header
          activeView={activeView}
          setSidebarOpen={setSidebarOpen}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <main className="page-content">
          {activeView === "employees" ? (
            <EmployeeView
              employees={employees}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          ) : (
            <DepartmentView departments={departments} employees={employees} />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
