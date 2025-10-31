import { Building, Users } from "lucide-react";
import Card from "../../common/Card/Card";
import "./DepartmentCard.css";

function DepartmentCard({ department, employees }) {
  return (
    <Card className="department-card" hover>
      <div className="department-card-header">
        <div className="department-icon">
          <Building size={20} color="white" />
        </div>
        <h3 className="department-card-title">{department.name}</h3>
      </div>

      <div className="department-card-body">
        <div className="department-stat">
          <Users size={16} />
          <span>{employees.length} Employees</span>
        </div>
        {department.head && (
          <div className="department-head">
            <span className="label">Head:</span>
            <span className="value">{department.head}</span>
          </div>
        )}
      </div>

      <div className="department-card-footer">
        <div className="employee-list">
          {employees.length > 0 ? (
            employees.slice(0, 3).map((emp) => (
              <div key={emp.id} className="employee-item">
                <span className="employee-item-name">
                  {emp.firstName} {emp.lastName}
                </span>
                <span className="employee-item-title">{emp.jobTitle}</span>
              </div>
            ))
          ) : (
            <p className="no-employees">No employees assigned</p>
          )}
          {employees.length > 3 && (
            <div className="more-employees">+{employees.length - 3} more</div>
          )}
        </div>
      </div>
    </Card>
  );
}

export default DepartmentCard;
