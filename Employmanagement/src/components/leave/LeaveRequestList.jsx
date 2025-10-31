import React from "react";
import "./LeaveRequestList.css";

function LeaveRequestList({ requests = [] }) {
  return (
    <div className="leave-requests">
      <h2 className="section-title">Leave Requests</h2>
      <div className="request-list">
        {requests.map((request, index) => (
          <div key={index} className="request-item">
            <div className="request-header">
              <span className="request-number">LeaveRequest {index + 1}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LeaveRequestList;
