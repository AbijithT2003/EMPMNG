import { useState } from "react";
import "./EmployeeProfile.css";

export default function EmployeeProfile() {
  const [employee] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Developer",
    department: "Engineering",
    phone: "+1 234 567 890",
    address: "123 Main Street, City, Country",
    joinedDate: "2022-01-15",
  });

  return (
    <div className="employee-profile">
      <h1>Employee Profile</h1>
      <div className="profile-card">
        <div className="profile-item">
          <span className="label">Name:</span>
          <span className="value">{employee.name}</span>
        </div>
        <div className="profile-item">
          <span className="label">Email:</span>
          <span className="value">{employee.email}</span>
        </div>
        <div className="profile-item">
          <span className="label">Role:</span>
          <span className="value">{employee.role}</span>
        </div>
        <div className="profile-item">
          <span className="label">Department:</span>
          <span className="value">{employee.department}</span>
        </div>
        <div className="profile-item">
          <span className="label">Phone:</span>
          <span className="value">{employee.phone}</span>
        </div>
        <div className="profile-item">
          <span className="label">Address:</span>
          <span className="value">{employee.address}</span>
        </div>
        <div className="profile-item">
          <span className="label">Joined Date:</span>
          <span className="value">{employee.joinedDate}</span>
        </div>
      </div>
    </div>
  );
}
