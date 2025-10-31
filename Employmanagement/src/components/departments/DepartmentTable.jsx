import { Building, MoreVertical } from "lucide-react";
import Table from "../../common/Table/Table";
import Button from "../../common/Button/Button";
import "./DepartmentTable.css";

function DepartmentTable({ departments, employees, loading }) {
  const headers = [
    { label: "Department Name" },
    { label: "Head of Department" },
    { label: "Employees" },
    { label: "Budget" },
    { label: "Actions" },
  ];

  const rows = departments.map((dept) => {
    const deptEmployees = employees.filter(
      (emp) => emp.department?.id === dept.id
    );

    return (
      <>
        <td>
          <div className="dept-name-cell">
            <div className="dept-icon-wrapper">
              <Building size={16} color="white" />
            </div>
            <span className="dept-name">{dept.name}</span>
          </div>
        </td>
        <td>{dept.head || "—"}</td>
        <td>{deptEmployees.length}</td>
        <td>{dept.budget ? `$${dept.budget.toLocaleString()}` : "Not set"}</td>
        <td>
          <div className="dept-actions">
            <Button variant="ghost" size="small">
              Details
            </Button>
            <button className="dept-more-btn">
              <MoreVertical size={14} />
            </button>
          </div>
        </td>
      </>
    );
  });

  return (
    <Table
      headers={headers}
      rows={rows}
      emptyMessage="No departments found"
      loading={loading}
    />
  );
}

export default DepartmentTable;
