import React from "react";
import { MoreVertical } from "react-feather";
import "./EmployeeTable.css";

function EmployeeTable({ employees, onEdit, onDelete }) {
  return (
    <div className="employee-table-container">
      <table className="employee-table">
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Email</th>
            <th>Job Title</th>
            <th>Department</th>
            <th>Contract</th>
            <th>Status</th>
            <th>Salary</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>
                <div className="employee-name">
                  <div className="employee-avatar">{employee.firstName[0]}</div>
                  <span>{`${employee.firstName} ${employee.lastName}`}</span>
                </div>
              </td>
              <td>{employee.email}</td>
              <td>{employee.jobTitle}</td>
              <td>
                <span className="department-badge">
                  {employee.department?.name || "N/A"}
                </span>
              </td>
              <td>{employee.contractType}</td>
              <td>
                <span
                  className={`status-badge ${employee.status.toLowerCase()}`}
                >
                  {employee.status}
                </span>
              </td>
              <td>${employee.salary?.toLocaleString()}</td>
              <td>
                <div className="actions-dropdown">
                  <button className="action-button">
                    <MoreVertical size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeTable;
