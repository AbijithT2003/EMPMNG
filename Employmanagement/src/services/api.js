// Employmanagement/src/services/api.js


const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "API request failed");
      }

      // Handle 204 No Content
      if (response.status === 204) {
        return null;
      }

      return await response.json();
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  }

  // Employee endpoints
  async getEmployees() {
    return this.request("/employees");
  }

  async getEmployee(id) {
    return this.request(`/employees/${id}`);
  }

  async createEmployee(employeeData) {
    return this.request("/employees", {
      method: "POST",
      body: JSON.stringify(employeeData),
    });
  }

  async updateEmployee(id, employeeData) {
    return this.request(`/employees/${id}`, {
      method: "PUT",
      body: JSON.stringify(employeeData),
    });
  }

  async deleteEmployee(id) {
    return this.request(`/employees/${id}`, {
      method: "DELETE",
    });
  }

  // Department endpoints
  async getDepartments() {
    return this.request("/departments");
  }

  async getDepartment(id) {
    return this.request(`/departments/${id}`);
  }

  async createDepartment(departmentData) {
    return this.request("/departments", {
      method: "POST",
      body: JSON.stringify(departmentData),
    });
  }

  async updateDepartment(id, departmentData) {
    return this.request(`/departments/${id}`, {
      method: "PUT",
      body: JSON.stringify(departmentData),
    });
  }

  async deleteDepartment(id) {
    return this.request(`/departments/${id}`, {
      method: "DELETE",
    });
  }
  // Get all departments along with their employees
  async getDepartmentsWithEmployees() {
    return this.request("/departments/with-employees");
  }
  async filterEmployees(filters) {
    const params = new URLSearchParams(filters).toString();
    return this.request(`/filter?${params}`);
  }

  // Employmanagement/src/services/api.js

  // Add these methods to your ApiService class:

  async getLeaveRequests(filters = {}) {
    const params = new URLSearchParams(filters).toString();
    return this.request(`/time-off?${params}`);
  }

  async approveLeaveRequest(id, comments = "") {
    return this.request(`/time-off/${id}/approve`, {
      method: "PUT",
      body: JSON.stringify({ comments }),
    });
  }

  async rejectLeaveRequest(id, comments = "") {
    return this.request(`/time-off/${id}/reject`, {
      method: "PUT",
      body: JSON.stringify({ comments }),
    });
  }

  async getLeaveBalance(employeeId) {
    return this.request(`/time-off/balance/${employeeId}`);
  }
}

export default new ApiService();
