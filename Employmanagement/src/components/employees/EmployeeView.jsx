import {
  Search,
  Filter,
  Users,
  Calendar,
  Download,
  Plus,
  MoreVertical,
} from "lucide-react";
import "./EmployeeView.css";

function EmployeeView({
  employees,
  searchQuery,
  setSearchQuery,
  activeTab,
  setActiveTab,
}) {
  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getDepartmentColor = (dept) => {
    const colors = {
      Design: "green",
      Development: "blue",
      HR: "purple",
      PM: "orange",
    };
    return colors[dept] || "gray";
  };

  return (
    <div className="employee-view">
      <div className="employee-header">
        <div>
          <h3>Employee</h3>
          <p>Manage your employee</p>
        </div>
        <div className="employee-actions">
          <button className="export-btn">
            <Download size={14} />
            Export
          </button>
          <button className="add-btn">
            <Plus size={14} />
            Add Employee
          </button>
        </div>
      </div>

      <div className="tabs">
        <button
          className={`tab-btn ${activeTab === "employees" ? "active" : ""}`}
          onClick={() => setActiveTab("employees")}
        >
          <Users size={14} />
          Manage Employees
        </button>
        <button
          className={`tab-btn ${activeTab === "timeoff" ? "active" : ""}`}
          onClick={() => setActiveTab("timeoff")}
        >
          <Calendar size={14} />
          Request Time Off
        </button>
      </div>

      <div className="search-filter">
        <div className="search-field">
          <Search className="search-icon" size={14} color="#9ca3af" />
          <input
            type="text"
            placeholder="Search keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="filter-btn">
          <Filter size={14} />
          Filter
        </button>
      </div>

      <div className="employee-table">
        <table>
          <thead>
            <tr>
              <th>Employee Name</th>
              <th className="hide-md">Phone Number</th>
              <th>Department</th>
              <th className="hide-lg">Job Title</th>
              <th className="hide-xl">Contract Type</th>
              <th className="hide-xl">Attendance</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((emp) => (
              <tr key={emp.id}>
                <td>
                  <div className="emp-info">
                    <div className="avatar">{emp.avatar}</div>
                    <div>
                      <div className="emp-name">{emp.name}</div>
                      <div className="emp-email">{emp.email}</div>
                    </div>
                  </div>
                </td>
                <td className="hide-md">{emp.phone}</td>
                <td>
                  <span
                    className={`dept-badge ${getDepartmentColor(
                      emp.department
                    )}`}
                  >
                    {emp.department}
                  </span>
                </td>
                <td className="hide-lg">{emp.jobTitle}</td>
                <td className="hide-xl">{emp.contract}</td>
                <td className="hide-xl">{emp.attendance}</td>
                <td className="actions">
                  <button className="details-btn">See Details</button>
                  <button className="more-btn">
                    <MoreVertical size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredEmployees.length === 0 && (
          <div className="empty-state">
            <Users size={48} color="#d1d5db" />
            <p>No employees found</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default EmployeeView;
