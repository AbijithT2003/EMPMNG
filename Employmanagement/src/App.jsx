import { useState, useEffect } from "react";
//import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import EmployeeView from "./components/employees/EmployeeView";
import DepartmentView from "./components/departments/DepartmentView";
import apiService from "./services/api";
import "./App.css";

function App() {
  const [activeView, setActiveView] = useState("employees");
  const [activeTab, setActiveTab] = useState("employees");
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  //const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
;
useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Load departments first
        const depData = await apiService.getDepartments();
        setDepartments(depData);

        // Then load employees and map them with department info
        const empData = await apiService.getEmployees();
        const normalized = empData.map((emp) => {
          const depId = emp.departmentId || emp.department?.id || emp.department;
          const department = depData.find((d) => d.id === depId) || null;
          return { ...emp, department };
        });

        setEmployees(normalized);
      } catch (err) {
        console.error("Failed to load data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);



  

  const handleCreateEmployee = async (employeeData) => {
    try {
      const newEmployee = await apiService.createEmployee(employeeData);
      setEmployees([...employees, newEmployee]);
      return newEmployee;
    } catch (err) {
      console.error('Failed to create employee:', err);
      throw err;
    }
  };

  const handleUpdateEmployee = async (id, employeeData) => {
    try {
      const updatedEmployee = await apiService.updateEmployee(id, employeeData);
      setEmployees(employees.map(emp => 
        emp.id === id ? updatedEmployee : emp
      ));
      return updatedEmployee;
    } catch (err) {
      console.error('Failed to update employee:', err);
      throw err;
    }
  };

  const handleDeleteEmployee = async (id) => {
    try {
      await apiService.deleteEmployee(id);
      setEmployees(employees.filter(emp => emp.id !== id));
    } catch (err) {
      console.error('Failed to delete employee:', err);
      throw err;
    }
  };
  

  return (
    <div className="app-container">
      <div className="main-content">
        <Header
          activeView={activeView}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <main className="page-content">
          {loading && (
            <div style={{ padding: "2rem", textAlign: "center" }}>
              Loading...
            </div>
          )}

          {error && (
            <div
              style={{
                padding: "2rem",
                textAlign: "center",
                color: "#ef4444",
              }}
            >
              Error: {error}
            </div>
          )}

          {!loading && !error && (
            <>
              {activeView === "employees" && (
                <EmployeeView
                  employees={employees}
                  departments={departments}
                  setEmployees={setEmployees}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  onCreateEmployee={handleCreateEmployee}
                  onUpdateEmployee={handleUpdateEmployee}
                  onDeleteEmployee={handleDeleteEmployee}
                />
              )}

              {activeView === "departments" && (
                <DepartmentView
                  departments={departments}
                  employees={employees}
                  searchQuery={searchQuery}
                />
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
