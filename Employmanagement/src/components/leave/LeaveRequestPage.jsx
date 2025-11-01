import React, { useState, useEffect } from "react";
import { ArrowLeft, Check, X, Calendar, User } from "lucide-react";
import "./LeaveRequestPage.css";

export default function LeaveRequestPage({ onBack }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all"); // all, pending, approved, rejected

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockRequests = [
      {
        id: 1,
        employeeName: "Alice Johnson",
        employeeId: "EMP001",
        department: "Product Management",
        leaveType: "SICK",
        startDate: "2025-11-05",
        endDate: "2025-11-07",
        days: 3,
        status: "PENDING",
        reason: "Medical appointment",
        appliedDate: "2025-11-01",
        isUrgent: true,
      },
      {
        id: 2,
        employeeName: "John Doe",
        employeeId: "EMP002",
        department: "Engineering",
        leaveType: "PERSONAL",
        startDate: "2025-11-10",
        endDate: "2025-11-12",
        days: 3,
        status: "PENDING",
        reason: "Family event",
        appliedDate: "2025-10-28",
        isUrgent: false,
      },
      {
        id: 3,
        employeeName: "Sara Williams",
        employeeId: "EMP003",
        department: "Engineering",
        leaveType: "SICK",
        startDate: "2025-10-25",
        endDate: "2025-10-27",
        days: 3,
        status: "APPROVED",
        reason: "Flu",
        appliedDate: "2025-10-20",
        isUrgent: false,
      },
      {
        id: 4,
        employeeName: "David Kim",
        employeeId: "EMP004",
        department: "Engineering",
        leaveType: "PERSONAL",
        startDate: "2025-11-15",
        endDate: "2025-11-20",
        days: 6,
        status: "REJECTED",
        reason: "Vacation",
        appliedDate: "2025-10-30",
        isUrgent: false,
      },
      {
        id: 5,
        employeeName: "Lily Brown",
        employeeId: "EMP005",
        department: "Design",
        leaveType: "EMERGENCY",
        startDate: "2025-11-03",
        endDate: "2025-11-03",
        days: 1,
        status: "APPROVED",
        reason: "Emergency",
        appliedDate: "2025-11-02",
        isUrgent: true,
      },
    ];
    setRequests(mockRequests);
  }, []);

  const handleApprove = async (requestId) => {
    if (!window.confirm("Approve this leave request?")) return;

    setLoading(true);
    try {
      // API call: await apiService.approveLeaveRequest(requestId);
      setRequests((prev) =>
        prev.map((req) =>
          req.id === requestId ? { ...req, status: "APPROVED" } : req
        )
      );
      alert("Leave request approved!");
    } catch (error) {
      alert("Failed to approve request");
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (requestId) => {
    const reason = window.prompt("Reason for rejection (optional):");
    if (reason === null) return; // User cancelled

    setLoading(true);
    try {
      // API call: await apiService.rejectLeaveRequest(requestId, reason);
      setRequests((prev) =>
        prev.map((req) =>
          req.id === requestId ? { ...req, status: "REJECTED" } : req
        )
      );
      alert("Leave request rejected!");
    } catch (error) {
      alert("Failed to reject request");
    } finally {
      setLoading(false);
    }
  };

  const filteredRequests = requests.filter((req) => {
    if (filter === "all") return true;
    return req.status.toLowerCase() === filter;
  });

  return (
    <div className="leave-request-page">
      {/* Header with Back Button */}
      <div className="leave-page-header">
        <button className="back-btn" onClick={onBack}>
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>
        <div className="header-content">
          <h1>Leave Requests Management</h1>
          <p>Review and manage employee leave requests</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="leave-filter-tabs">
        <button
          className={`filter-tab ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          All Requests
          <span className="count-badge">{requests.length}</span>
        </button>
        <button
          className={`filter-tab ${filter === "pending" ? "active" : ""}`}
          onClick={() => setFilter("pending")}
        >
          Pending
          <span className="count-badge warning">
            {requests.filter((r) => r.status === "PENDING").length}
          </span>
        </button>
        <button
          className={`filter-tab ${filter === "approved" ? "active" : ""}`}
          onClick={() => setFilter("approved")}
        >
          Approved
          <span className="count-badge success">
            {requests.filter((r) => r.status === "APPROVED").length}
          </span>
        </button>
        <button
          className={`filter-tab ${filter === "rejected" ? "active" : ""}`}
          onClick={() => setFilter("rejected")}
        >
          Rejected
          <span className="count-badge danger">
            {requests.filter((r) => r.status === "REJECTED").length}
          </span>
        </button>
      </div>

      {/* Leave Requests Table */}
      <div className="leave-table-card">
        <div className="leave-table-wrapper">
          <table className="leave-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Department</th>
                <th>Leave Type</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Days</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.length > 0 ? (
                filteredRequests.map((request) => (
                  <tr
                    key={request.id}
                    className={request.isUrgent ? "urgent-row" : ""}
                  >
                    <td>
                      <div className="employee-cell">
                        <div className="employee-avatar">
                          <User size={16} />
                        </div>
                        <div className="employee-info">
                          <div className="employee-name">
                            {request.employeeName}
                          </div>
                          <div className="employee-id">
                            {request.employeeId}
                          </div>
                        </div>
                        {request.isUrgent && (
                          <span className="urgent-badge">URGENT</span>
                        )}
                      </div>
                    </td>
                    <td>{request.department}</td>
                    <td>
                      <span
                        className={`leave-type-badge ${request.leaveType.toLowerCase()}`}
                      >
                        {request.leaveType}
                      </span>
                    </td>
                    <td>
                      <div className="date-cell">
                        <Calendar size={14} />
                        {new Date(request.startDate).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="date-cell">
                        <Calendar size={14} />
                        {new Date(request.endDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                    </td>
                    <td>
                      <span className="days-badge">{request.days} days</span>
                    </td>
                    <td>
                      <span
                        className={`status-badge ${request.status.toLowerCase()}`}
                      >
                        {request.status}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        {request.status === "PENDING" ? (
                          <>
                            <button
                              className="action-btn approve"
                              onClick={() => handleApprove(request.id)}
                              disabled={loading}
                              title="Approve"
                            >
                              <Check size={16} />
                            </button>
                            <button
                              className="action-btn reject"
                              onClick={() => handleReject(request.id)}
                              disabled={loading}
                              title="Reject"
                            >
                              <X size={16} />
                            </button>
                          </>
                        ) : (
                          <span className="action-disabled">
                            {request.status === "APPROVED"
                              ? "✓ Approved"
                              : "✗ Rejected"}
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="empty-state">
                    No leave requests found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
