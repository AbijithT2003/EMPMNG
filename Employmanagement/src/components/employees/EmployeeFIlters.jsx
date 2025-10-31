import { Filter } from "lucide-react";
import Button from "../../common/Button/Button";
import Dropdown from "../../common/Dropdown/Dropdown";
import "./EmployeeFilters.css";

function EmployeeFilters({ filters, setFilters, onApply, departments }) {
  const handleChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Dropdown
      trigger={
        <Button variant="secondary" icon={Filter}>
          Filter
        </Button>
      }
      align="right"
    >
      <div className="employee-filters">
        <div className="filter-group">
          <label className="filter-label">Department</label>
          <select
            value={filters.departmentId}
            onChange={(e) => handleChange("departmentId", e.target.value)}
            className="filter-select"
          >
            <option value="">All Departments</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">Status</label>
          <select
            value={filters.status}
            onChange={(e) => handleChange("status", e.target.value)}
            className="filter-select"
          >
            <option value="">All Statuses</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
            <option value="ON_LEAVE">On Leave</option>
            <option value="ON_SITE">On Site</option>
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">Contract Type</label>
          <select
            value={filters.contractType}
            onChange={(e) => handleChange("contractType", e.target.value)}
            className="filter-select"
          >
            <option value="">All Types</option>
            <option value="FULL_TIME">Full Time</option>
            <option value="PART_TIME">Part Time</option>
            <option value="CONTRACT">Contract</option>
            <option value="INTERN">Intern</option>
          </select>
        </div>

        <Button variant="primary" onClick={onApply} fullWidth>
          Apply Filters
        </Button>
      </div>
    </Dropdown>
  );
}

export default EmployeeFilters;
