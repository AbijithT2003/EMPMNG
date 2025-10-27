import { Building, Plus, Filter, MoreVertical } from "lucide-react";
import "./DepartmentView.css";

function DepartmentView({ departments, searchQuery }) {
  const filteredDepartments = departments.filter((dept) =>
    dept.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="department-view">
      <div className="department-header">
        <div>
          <h3>Departments</h3>
          <p>Manage company departments</p>
        </div>
        <div className="department-actions">
          <button className="filter-btn">
            <Filter size={14} />
            Filter
          </button>
          <button className="add-btn">
            <Plus size={14} />
            Add Department
          </button>
        </div>
      </div>

      <div className="department-table">
        <table>
          <thead>
            <tr>
              <th>Department Name</th>
              <th>Head of Department</th>
              <th>Employees</th>
              <th>Budget</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDepartments.map((dept) => (
              <tr key={dept.id}>
                <td>
                  <div className="dept-info">
                    <div className="dept-icon">
                      <Building size={16} color="white" />
                    </div>
                    <div className="dept-name">{dept.name}</div>
                  </div>
                </td>
                <td>{dept.head}</td>
                <td>{dept.employees}</td>
                <td>${dept.budget.toLocaleString()}</td>
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

        {filteredDepartments.length === 0 && (
          <div className="empty-state">
            <Building size={48} color="#d1d5db" />
            <p>No departments found</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default DepartmentView;
