import React, { useState, useEffect } from "react";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import EmployeeView from "./components/employees/EmployeeView";
import DepartmentView from "./components/departments/DepartmentView";
import LeaveRequestList from "./components/leave/LeaveRequestList";
import apiService from "./services/api";
import "./App.css";

export default function App() {
  // State management
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeView, setActiveView] = useState("employees");
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch initial data
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

  // Employee CRUD operations
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

  // Render loading or error states
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

  return (
    <div className="app">
      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="app-content">
        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onOpenSidebar={() => setSidebarOpen(true)}
        />

        <main className="main-content">
          {activeView === "employees" && (
            <EmployeeView
              employees={employees}
              departments={departments}
              searchQuery={searchQuery}
              onCreateEmployee={handleCreateEmployee}
              onUpdateEmployee={handleUpdateEmployee}
              onDeleteEmployee={handleDeleteEmployee}
            />
          )}

          {activeView === "departments" && (
            <DepartmentView
              departments={departments}
              employees={employees}
              searchQuery={searchQuery}
            />
          )}

          {activeView === "leave" && (
            <div className="leave-container">
              <h1 className="page-title">Leave Management</h1>
              <LeaveRequestList />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
