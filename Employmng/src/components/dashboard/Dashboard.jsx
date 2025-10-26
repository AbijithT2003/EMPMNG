// src/components/Dashboard.jsx
import Card from "../common/Card";
import "./Dashboard.css";

const Dashboard = ({ employees }) => {
  const totalEmployees = employees.length;

  const employeesWithSalary = employees.filter((emp) => emp.salary);
  const averageSalary =
    employeesWithSalary.length > 0
      ? employeesWithSalary.reduce((sum, emp) => sum + emp.salary, 0) /
        employeesWithSalary.length
      : 0;

  const jobTitles = [...new Set(employees.map((emp) => emp.jobTitle))].length;

  const recentEmployees = [...employees]
    .sort((a, b) => b.id - a.id)
    .slice(0, 3);

  const StatCard = ({ icon, title, value, color }) => (
    <Card className="stat-card" hoverable>
      <div className="stat-content">
        <div className={`stat-icon stat-icon-${color}`}>{icon}</div>
        <div className="stat-details">
          <h3 className="stat-value">{value}</h3>
          <p className="stat-title">{title}</p>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>
        <p className="dashboard-subtitle">
          Welcome to Employee Management System
        </p>
      </div>

      <div className="stats-grid">
        <StatCard
          icon={
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          }
          title="Total Employees"
          value={totalEmployees}
          color="purple"
        />

        <StatCard
          icon={
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
          title="Average Salary"
          value={
            averageSalary > 0
              ? `$${Math.round(averageSalary).toLocaleString()}`
              : "N/A"
          }
          color="green"
        />

        <StatCard
          icon={
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          }
          title="Job Positions"
          value={jobTitles}
          color="blue"
        />
      </div>

      {recentEmployees.length > 0 && (
        <Card title="Recent Employees" className="recent-employees-card">
          <div className="recent-employees-list">
            {recentEmployees.map((employee) => (
              <div key={employee.id} className="recent-employee-item">
                <div className="recent-employee-avatar">
                  {employee.firstName[0]}
                  {employee.lastName[0]}
                </div>
                <div className="recent-employee-info">
                  <h4 className="recent-employee-name">
                    {employee.firstName} {employee.lastName}
                  </h4>
                  <p className="recent-employee-title">{employee.jobTitle}</p>
                </div>
                <div className="recent-employee-email">{employee.email}</div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default Dashboard;
