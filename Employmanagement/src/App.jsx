// Employmanagement/src/App.jsx
import React, { useState, useEffect } from "react";
import TopNav from "./components/layout/TopNav";
import EmployeeView from "./components/employees/EmployeeView";
import DepartmentView from "./components/departments/DepartmentView";
import LeaveRequestPage from "./components/leave/LeaveRequestPage";
import LeaveRequestPanel from "./components/leave/LeaveRequestPanel";
import apiService from "./services/api";
import "./App.css";

export default function App() {
  const [activeView, setActiveView] = useState("dashboard");
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        const depData = await apiService.getDepartments();
        setDepartments(depData || []);

        const empData = await apiService.getEmployees();
        const normalized = (empData || []).map((emp) => {
          const depId =
            emp.departmentId ?? emp.department?.id ?? emp.department;
          const department =
            (depData || []).find((d) => d.id === depId) || null;
          return { ...emp, department };
        });

        setEmployees(normalized);
      } catch (err) {
        console.error("Failed to load data:", err);
        setError(err?.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleCreateEmployee = async (employeeData) => {
    try {
      const newEmployee = await apiService.createEmployee(employeeData);
      setEmployees((prev) => [...prev, newEmployee]);
      return newEmployee;
    } catch (err) {
      console.error("Failed to create employee:", err);
      throw err;
    }
  };

  const handleUpdateEmployee = async (id, employeeData) => {
    try {
      const updated = await apiService.updateEmployee(id, employeeData);
      setEmployees((prev) => prev.map((e) => (e.id === id ? updated : e)));
      return updated;
    } catch (err) {
      console.error("Failed to update employee:", err);
      throw err;
    }
  };

  const handleDeleteEmployee = async (id) => {
    try {
      await apiService.deleteEmployee(id);
      setEmployees((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      console.error("Failed to delete employee:", err);
      throw err;
    }
  };

  if (loading) {
    return (
      <div className="app-loading">
        <span className="loading-spinner"></span>
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-error">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  const showDashboard = activeView === "dashboard";

  return (
    <div className="app">
      <div className="app-content">
        <TopNav activeView={activeView} setActiveView={setActiveView} />

        <main className="main-content">
          <div className="content-left">
            {showDashboard && (
              <>
                <h1
                  style={{
                    fontSize: "2rem",
                    fontWeight: "bold",
                    marginBottom: "2rem",
                  }}
                >
                  WELCOME, ADMIN..........
                </h1>
                <EmployeeView
                  employees={employees}
                  departments={departments}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  onCreateEmployee={handleCreateEmployee}
                  onUpdateEmployee={handleUpdateEmployee}
                  onDeleteEmployee={handleDeleteEmployee}
                />
              </>
            )}

            {activeView === "departments" && (
              <DepartmentView
                departments={departments}
                employees={employees}
                searchQuery={searchQuery}
              />
            )}

            {activeView === "leave" && (<LeaveRequestPage onBack={() => setActiveView("dashboard")} />
            )}
          </div>

          {showDashboard && (
            <div className="content-right">
              <LeaveRequestPanel />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
