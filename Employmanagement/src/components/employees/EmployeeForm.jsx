import { useState, useEffect } from "react";
import { X } from "lucide-react";
import "./EmployeeForm.css";

function EmployeeForm({ employee, onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    jobTitle: "",
    salary: "",
    joinDate: "setoday()",
    departmentId: "",
    contractType: "FULL_TIME",
    status: "ACTIVE",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (employee) {
      setFormData({
        firstName: employee.firstName || "",
        lastName: employee.lastName || "",
        email: employee.email || "",
        jobTitle: employee.jobTitle || "",
        salary: employee.salary || "",
        joinDate: employee.joinDate || "",
        departmentId: employee.department?.id || "",
        contractType: employee.contractType || "FULL_TIME",
        status: employee.status || "ACTIVE",
      });
    }
  }, [employee]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.jobTitle.trim()) newErrors.jobTitle = "Job title is required";
    if (!formData.employeeNumber.trim())
      newErrors.employeeNumber = "Employee number is required";
    if (!formData.departmentId) newErrors.departmentId = "Select a department";
    if (formData.salary && isNaN(formData.salary))
      newErrors.salary = "Salary must be a number";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const submitData = {
        ...formData,
        salary: formData.salary ? parseFloat(formData.salary) : null,
        department: { id: parseInt(formData.departmentId, 10) },
      };
      await onSubmit(submitData);
      onClose();
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{employee ? "Edit Employee" : "Add New Employee"}</h3>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="employee-form">
          {/* Basic Info */}
          <div className="form-row">
            <div className="form-group">
              <label>First Name *</label>
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
              {errors.firstName && (
                <span className="error-text">{errors.firstName}</span>
              )}
            </div>

            <div className="form-group">
              <label>Last Name *</label>
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
              {errors.lastName && (
                <span className="error-text">{errors.lastName}</span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Job Title *</label>
              <input
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
              />
              {errors.jobTitle && (
                <span className="error-text">{errors.jobTitle}</span>
              )}
            </div>

            <div className="form-group">
              <label>Salary</label>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                step="0.01"
              />
              {errors.salary && (
                <span className="error-text">{errors.salary}</span>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Join Date</label>
              <input
                type="date"
                name="joinDate"
                value={formData.joinDate}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Department *</label>
              <select
                name="departmentId"
                value={formData.departmentId}
                onChange={handleChange}
              >
                <option value="">Select Department</option>
                <option value="1">Design</option>
                <option value="2">Development</option>
                <option value="3">HR</option>
                <option value="4">Marketing&Sales</option>
              </select>
              {errors.departmentId && (
                <span className="error-text">{errors.departmentId}</span>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Contract Type</label>
              <select
                name="contractType"
                value={formData.contractType}
                onChange={handleChange}
              >
                <option value="FULL_TIME">Full Time</option>
                <option value="PART_TIME">Part Time</option>
                <option value="CONTRACT">Contract</option>
                <option value="INTERN">Intern</option>
              </select>
            </div>

            <div className="form-group">
              <label>Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
                <option value="ON_SITE">On site</option>
                <option value="ON_LEAVE">On Leave</option>
              </select>
            </div>
          </div>

          {errors.submit && (
            <div className="error-message">{errors.submit}</div>
          )}

          <div className="form-actions">
            <button
              type="button"
              onClick={onClose}
              className="btn secondary"
              disabled={loading}
            >
              Cancel
            </button>
            <button type="submit" className="btn primary" disabled={loading}>
              {loading ? "Saving..." : employee ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EmployeeForm;
