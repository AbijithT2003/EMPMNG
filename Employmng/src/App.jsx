// src/App.jsx
import { useState, useEffect } from "react";
import Dashboard from "./components/dashboard/Dashboard";
import EmployeeTable from "./components/employees/EmployeeTable";
import EmployeeForm from "./components/employees/EmployeeForm";
import Modal from "./components/common/Modal";
import Button from "./components/common/Button";
import Card from "./components/common/Card";
import api from "./Services/api";
import "./App.css";

function App() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [viewEmployee, setViewEmployee] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const data = await api.getAllEmployees();
      setEmployees(data);
    } catch (error) {
      showNotification("Failed to fetch employees", "error");
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleCreateEmployee = async (employeeData) => {
    try {
      setActionLoading(true);
      const newEmployee = await api.createEmployee(employeeData);
      setEmployees([...employees, newEmployee]);
      setIsModalOpen(false);
      showNotification("Employee created successfully");
    } catch (error) {
      showNotification(error.message || "Failed to create employee", "error");
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdateEmployee = async (employeeData) => {
    try {
      setActionLoading(true);
      const updated = await api.updateEmployee(
        selectedEmployee.id,
        employeeData
      );
      setEmployees(
        employees.map((emp) => (emp.id === selectedEmployee.id ? updated : emp))
      );
      setIsModalOpen(false);
      setSelectedEmployee(null);
      showNotification("Employee updated successfully");
    } catch (error) {
      showNotification(error.message || "Failed to update employee", "error");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteEmployee = async (employee) => {
    if (
      window.confirm(
        `Are you sure you want to delete ${employee.firstName} ${employee.lastName}?`
      )
    ) {
      try {
        await api.deleteEmployee(employee.id);
        setEmployees(employees.filter((emp) => emp.id !== employee.id));
        showNotification("Employee deleted successfully");
      } catch (error) {
        showNotification(error.message || "Failed to delete employee", "error");
      }
    }
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const handleView = (employee) => {
    setViewEmployee(employee);
    setIsViewModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
  };

  const handleViewModalClose = () => {
    setIsViewModalOpen(false);
    setViewEmployee(null);
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <div className="logo">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <h1>EMS</h1>
          </div>
          <nav className="nav-tabs">
            <button
              className={`nav-tab ${
                activeTab === "dashboard" ? "nav-tab-active" : ""
              }`}
              onClick={() => setActiveTab("dashboard")}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Dashboard
            </button>
            <button
              className={`nav-tab ${
                activeTab === "employees" ? "nav-tab-active" : ""
              }`}
              onClick={() => setActiveTab("employees")}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Employees
            </button>
          </nav>
        </div>
      </header>

      {/* Notification */}
      {notification && (
        <div className={`notification notification-${notification.type}`}>
          {notification.message}
        </div>
      )}

      {/* Main Content */}
      <main className="app-main">
        <div className="container">
          {loading ? (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Loading employees...</p>
            </div>
          ) : (
            <>
              {activeTab === "dashboard" && <Dashboard employees={employees} />}

              {activeTab === "employees" && (
                <>
                  <div className="employees-header">
                    <div>
                      <h2 className="page-title">Employees</h2>
                      <p className="page-subtitle">Manage your team members</p>
                    </div>
                    <Button
                      variant="primary"
                      onClick={() => setIsModalOpen(true)}
                      icon={
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                      }
                    >
                      Add Employee
                    </Button>
                  </div>

                  <Card>
                    <EmployeeTable
                      employees={employees}
                      onEdit={handleEdit}
                      onDelete={handleDeleteEmployee}
                      onView={handleView}
                    />
                  </Card>
                </>
              )}
            </>
          )}
        </div>
      </main>

      {/* Create/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title={selectedEmployee ? "Edit Employee" : "Add New Employee"}
        size="medium"
      >
        <EmployeeForm
          employee={selectedEmployee}
          onSubmit={
            selectedEmployee ? handleUpdateEmployee : handleCreateEmployee
          }
          onCancel={handleModalClose}
          loading={actionLoading}
        />
      </Modal>

      {/* View Employee Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={handleViewModalClose}
        title="Employee Details"
        size="medium"
      >
        {viewEmployee && (
          <div className="employee-details">
            <div className="employee-details-avatar">
              {viewEmployee.firstName[0]}
              {viewEmployee.lastName[0]}
            </div>
            <h3 className="employee-details-name">
              {viewEmployee.firstName} {viewEmployee.lastName}
            </h3>
            <div className="employee-details-grid">
              <div className="employee-detail-item">
                <span className="detail-label">Email</span>
                <span className="detail-value">{viewEmployee.email}</span>
              </div>
              <div className="employee-detail-item">
                <span className="detail-label">Job Title</span>
                <span className="detail-value">{viewEmployee.jobTitle}</span>
              </div>
              <div className="employee-detail-item">
                <span className="detail-label">Salary</span>
                <span className="detail-value">
                  {viewEmployee.salary
                    ? `$${viewEmployee.salary.toLocaleString()}`
                    : "Not specified"}
                </span>
              </div>
              <div className="employee-detail-item">
                <span className="detail-label">Employee ID</span>
                <span className="detail-value">#{viewEmployee.id}</span>
              </div>
            </div>
            <div className="employee-details-actions">
              <Button
                variant="secondary"
                onClick={handleViewModalClose}
                fullWidth
              >
                Close
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  handleViewModalClose();
                  handleEdit(viewEmployee);
                }}
                fullWidth
              >
                Edit Employee
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default App;
