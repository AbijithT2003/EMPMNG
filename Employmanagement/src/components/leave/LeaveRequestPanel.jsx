import React from "react";
import "./LeaveRequestPanel.css";

export default function LeaveRequestPanel() {
  const requests = [
    { id: 1, label: "LeaveRequest 1" },
    { id: 2, label: "LeaveRequest 2" },
    { id: 3, label: "LeaveRequest 3" },
    { id: 4, label: "LeaveRequest 4" },
    { id: 5, label: "LeaveRequest 5" },
    { id: 6, label: "LeaveRequest 6" },
  ];

  return (
    <div className="leave-request-panel">
      <div className="leave-panel-header">
        <h3>Leave Requests</h3>
      </div>

      <div className="leave-request-list">
        {requests.map((req) => (
          <div key={req.id} className="leave-request-item">
            {req.label}
          </div>
        ))}
      </div>
    </div>
  );
}
