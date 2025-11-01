// Employmanagement/src/components/employees/EmployeeView.jsx
import React, { useState } from "react";
import { Search, Filter, Users, Plus, GroupIcon } from "lucide-react";
import EmployeeForm from "./EmployeeForm";
import EmployeeTable from "./EmployeeTable";
import Button from "../common/Button";
import api from "../../services/api";
import "./EmployeeView.css";

export default function EmployeeView({
  employees,
  setEmployees,
  departments = [],
  searchQuery,
  setSearchQuery,
  onCreateEmployee,
  onUpdateEmployee,
  onDeleteEmployee,
}) {
  const [showForm, setShowForm] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState({
    status: "",
    departmentId: "",
    contractType: "",
  });
  const [activeTab, setActiveTab] = useState("employee-view");

  // ---- Filtering Logic ----
  const filteredEmployees = employees.filter(
    (emp) =>
      emp.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.jobTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.department?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdd = () => {
    setSelectedEmployee(null);
    setShowForm(true);
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await onDeleteEmployee(id);
      } catch (error) {
        alert("Failed to delete employee: " + error.message);
      }
    }
  };

  const handleFormSubmit = async (formData) => {
    if (selectedEmployee) {
      await onUpdateEmployee(selectedEmployee.id, formData);
    } else {
      await onCreateEmployee(formData);
    }
    setShowForm(false);
  };

  const fetchFilteredEmployees = async () => {
    try {
      const data = await api.filterEmployees(filters);
      setEmployees(data);
      setShowFilter(false);
    } catch (error) {
      console.error("Failed to fetch filtered employees:", error);
      alert("Error applying filters. Check console for details.");
    }
  };

  const groupedDepartments = departments.map((dept) => ({
    ...dept,
    head: dept.manager,
    employees: employees.filter((emp) => emp.department?.id === dept.id),
  }));

  // ---- JSX UI ----
  return (
    <div className="employee-view-card">
      {/* Header */}
      <div className="employee-view-header">
        <div className="header-left">
          <h3>Employees</h3>
          <p>Manage your employee records efficiently</p>
        </div>
        <div className="header-actions">
          <Button variant="primary" icon={Plus} onClick={handleAdd}>
            Add Employee
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="employee-view-tabs">
        <button
          className={`tab ${activeTab === "employee-view" ? "active" : ""}`}
          onClick={() => setActiveTab("employee-view")}
        >
          <Users size={16} /> Employee Database
        </button>
        <button
          className={`tab ${activeTab === "departments-view" ? "active" : ""}`}
          onClick={() => setActiveTab("departments-view")}
        >
          <GroupIcon size={16} /> Departments View
        </button>
      </div>

      {/* Search + Filter */}
      <div className="employee-view-actions">
        <div className="search-wrapper">
          <Search className="search-icon" size={16} />
          <input
            type="text"
            placeholder="Search employees by name/role, departments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <button
          className="filter-btn"
          onClick={() => setShowFilter(!showFilter)}
        >
          <Filter size={16} />
          Filter
        </button>
      </div>

      {/* Filter Dropdown */}
      {showFilter && (
        <div className="filter-dropdown">
          <select
            value={filters.departmentId}
            onChange={(e) =>
              setFilters({ ...filters, departmentId: e.target.value })
            }
          >
            <option value="">All Departments</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>

          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <option value="">All Statuses</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
            <option value="ON_LEAVE">On Leave</option>
            <option value="ON_SITE">On Site</option>
          </select>

          <select
            value={filters.contractType}
            onChange={(e) =>
              setFilters({ ...filters, contractType: e.target.value })
            }
          >
            <option value="">All Contract Types</option>
            <option value="FULL_TIME">Full Time</option>
            <option value="PART_TIME">Part Time</option>
            <option value="CONTRACT">Contract</option>
            <option value="INTERN">Intern</option>
          </select>

          <button className="apply-filter" onClick={fetchFilteredEmployees}>
            Apply
          </button>
        </div>
      )}

      {/* Table View */}
      {activeTab === "employee-view" && (
        <div className="employee-table-wrapper">
          <EmployeeTable
            employees={filteredEmployees}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          {filteredEmployees.length === 0 && (
            <div className="empty-state">No employees found</div>
          )}
        </div>
      )}

      {/* Department Cards */}
      {activeTab === "departments-view" && (
        <div className="department-cards-container">
          {groupedDepartments.map((dept) => (
            <div key={dept.id} className="department-card">
              <h4>{dept.name}</h4>
              <p>
                <strong>Head:</strong>{" "}
                {dept.head
                  ? `${dept.head.firstName} ${dept.head.lastName}`
                  : "N/A"}
              </p>
              <p>
                <strong>Employees:</strong> {dept.employees.length}
              </p>

              <div className="employee-list">
                {dept.employees.length > 0 ? (
                  dept.employees.map((emp) => (
                    <div key={emp.id} className="employee-item">
                      <span>
                        {emp.firstName} {emp.lastName}
                      </span>
                      <span className="emp-title">{emp.jobTitle}</span>
                    </div>
                  ))
                ) : (
                  <p className="no-emp">No employees assigned</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Form */}
      {showForm && (
        <EmployeeForm
          employee={selectedEmployee}
          onSubmit={handleFormSubmit}
          onClose={() => setShowForm(false)}
          departments={departments}
        />
      )}
    </div>
  );
}
