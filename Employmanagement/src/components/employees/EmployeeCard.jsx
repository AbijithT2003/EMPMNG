import { Mail, Phone, Building2, Briefcase } from "lucide-react";
import Avatar from "../../common/Avatar/Avatar";
import Badge from "../../common/Badge/Badge";
import Card from "../../common/Card/Card";
import "./EmployeeCard.css";

function EmployeeCard({ employee, onEdit, onDelete }) {
  const getStatusVariant = (status) => {
    switch (status) {
      case "ACTIVE":
        return "success";
      case "ON_LEAVE":
        return "warning";
      case "INACTIVE":
        return "danger";
      default:
        return "default";
    }
  };

  return (
    <Card className="employee-card" hover>
      <div className="employee-card-header">
        <Avatar
          firstName={employee.firstName}
          lastName={employee.lastName}
          size="large"
        />
        <Badge variant={getStatusVariant(employee.status)}>
          {employee.status}
        </Badge>
      </div>

      <div className="employee-card-body">
        <h3 className="employee-card-name">
          {employee.firstName} {employee.lastName}
        </h3>
        <p className="employee-card-title">{employee.jobTitle}</p>

        <div className="employee-card-details">
          <div className="employee-card-detail">
            <Mail size={14} />
            <span>{employee.email}</span>
          </div>
          <div className="employee-card-detail">
            <Building2 size={14} />
            <span>{employee.department?.name || "N/A"}</span>
          </div>
          <div className="employee-card-detail">
            <Briefcase size={14} />
            <span>{employee.contractType}</span>
          </div>
        </div>
      </div>

      <div className="employee-card-footer">
        <button className="employee-card-btn" onClick={() => onEdit(employee)}>
          Edit
        </button>
        <button
          className="employee-card-btn employee-card-btn-danger"
          onClick={() => onDelete(employee.id)}
        >
          Delete
        </button>
      </div>
    </Card>
  );
}

export default EmployeeCard;
