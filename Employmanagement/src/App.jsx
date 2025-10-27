import { useState, useEffect } from "react";
import { departments } from "./sampledata/SampleData";
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import EmployeeView from "./components/employees/EmployeeView";
import DepartmentView from "./components/departments/DepartmentView";
import apiService from "./services/api";
import "./App.css";

function App() {
  const [activeView, setActiveView] = useState("employees");
  const [activeTab, setActiveTab] = useState("employees");
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch employees on mount
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getEmployees();
      setEmployees(data);
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch employees:', err);
    } finally {
      setLoading(false);
    }
  };

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
      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      {sidebarOpen && (
        <div className="overlay" onClick={() => setSidebarOpen(false)} />
      )}

      <div className="main-content">
        <Header
          activeView={activeView}
          setSidebarOpen={setSidebarOpen}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <main className="page-content">
          {loading && (
            <div style={{ padding: '2rem', textAlign: 'center' }}>
              Loading...
            </div>
          )}
          
          {error && (
            <div style={{ 
              padding: '2rem', 
              textAlign: 'center', 
              color: '#ef4444' 
            }}>
              Error: {error}
            </div>
          )}

          {!loading && !error && (
            <>
              {activeView === "employees" ? (
                <EmployeeView
                  employees={employees}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  onCreateEmployee={handleCreateEmployee}
                  onUpdateEmployee={handleUpdateEmployee}
                  onDeleteEmployee={handleDeleteEmployee}
                />
              ) : (
                <DepartmentView departments={departments} employees={employees} />
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
