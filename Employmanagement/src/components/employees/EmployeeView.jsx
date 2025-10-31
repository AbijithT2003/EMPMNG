import { useState } from "react";
import {Search,Filter,Users,Calendar,Plus,Edit,Trash2,Building2,GroupIcon,
} from "lucide-react";
import EmployeeForm from "./EmployeeForm";
import "./EmployeeView.css";
import api from "../../services/api";

function EmployeeView({
  employees,
  setEmployees,
  departments=[],
  searchQuery,
  setSearchQuery,
  activeTab,
  setActiveTab,
  onCreateEmployee,
  onUpdateEmployee,
  onDeleteEmployee,
}) {
  const [showForm, setShowForm] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showActions, setShowActions] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState({
    status: "",
    departmentId: "",
    contractType: "",
  });
  const toggleActions = () => setShowActions((prev) => !prev);

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
      head:dept.manager,
      employees: employees.filter((emp) => emp.department?.id === dept.id),
  })
  );


  return (
    <div className="employee-view">
      {/* Header */}
      <div className="employee-header">
        <div>
          <h3>Employees</h3>
          <p>Manage your employee records efficiently</p>
        </div>
        <div className="employee-actions">
          <button className="filter-btn" onClick={toggleActions}>
            {showActions ? "Hide Actions" : "Show Actions"}
          </button>
          <button className="add-btn" onClick={handleAdd}>
            <Plus size={14} />
            Add Employee
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button
          className={`tab-btn ${activeTab === "employees" ? "active" : ""}`}
          onClick={() => setActiveTab("employees")}
        >
          <Users size={14} />
          Manage Employees
        </button>
        {/*show employess in department cards*/}
        <button
          className={`tab-btn ${activeTab === "departments" ? "active" : ""}`}
          onClick={() => setActiveTab("departments")}
        >
          <GroupIcon size={14} />
          Departments View
        </button>
      </div>

      {/* Search and Filter */}
      <div className="search-filter">
        <div className="search-field">
          <Search className="search-icon" size={14} color="#9ca3af" />
          <input
            type="text"
            placeholder="Search employees by name,job, department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="filter-container">
          <button
            className="filter-btn"
            onClick={() => setShowFilter(!showFilter)}
          >
            <Filter size={14} /> Filter
          </button>

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
                onChange={(e) =>
                  setFilters({ ...filters, status: e.target.value })
                }
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
        </div>
      </div>

      {/* Employee Table */}
      {activeTab === "employees" && (
        <div className="employee-table">
          <div className="employee-table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Employee Name</th>
                <th className="hide-md">Email</th>
                <th>Job Title</th>
                <th>Department</th>
                <th>Contract</th>
                <th>Status</th>
                <th className="hide-lg">Salary</th>
                {showActions && <th>Actions</th>}
              </tr>
            </thead>

            <tbody>
              {filteredEmployees.map((emp) => (
                <tr key={emp.id}>
                  <td>
                    <div className="emp-info">
                      <div className="avatar">
                        {emp.firstName?.charAt(0)}
                        {emp.lastName?.charAt(0)}
                      </div>
                      <div>
                        <div className="emp-name">
                          {emp.firstName} {emp.lastName}
                        </div>
                        <div className="emp-id">{emp.employeeNumber}</div>
                      </div>
                    </div>
                  </td>
                  <td className="hide-md">{emp.email}</td>
                  <td>{emp.jobTitle}</td>
                  <td>
                    <div className="dept-cell">
                      <Building2 size={12} />
                      {emp.department?.name || "-"}
                    </div>
                  </td>
                  <td>{emp.contractType || "-"}</td>
                  <td>
                    <span
                      className={`status-badge ${
                        emp.status === "ACTIVE"
                          ? "active"
                          : emp.status === "ON_LEAVE"
                          ? "leave"
                          : "inactive"
                      }`}
                    >
                      {emp.status}
                    </span>
                  </td>
                  <td className="hide-lg">
                    {emp.salary ? `$${emp.salary.toLocaleString()}` : "-"}
                  </td>

                  {showActions && (
                    <td className="actions">
                      <div className="action-buttons">
                        <button
                          className="icon-btn"
                          onClick={() => handleEdit(emp)}
                          title="Edit"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          className="icon-btn danger"
                          onClick={() => handleDelete(emp.id)}
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          </div>

          {filteredEmployees.length === 0 && (
            <div className="empty-state">
              <Users size={48} color="#d1d5db" />
              <p>No employees found</p>
            </div>
          )}
        </div>
      )}
      {/* Department Cards View */}
      {activeTab === "departments" && (
        <div className="department-cards-container">
          {groupedDepartments.map((dept) => (
            <div key={dept.id} className="department-card">
              <h4>{dept.name}</h4>
              <p>
                <strong>Head:</strong> {dept.head ? `${dept.head.firstName} ${dept.head.lastName}` : "N/A"}
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

      {/* Employee Form Modal */}
      {showForm && (
        <EmployeeForm
          employee={selectedEmployee}
          onSubmit={handleFormSubmit}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}

export default EmployeeView;
