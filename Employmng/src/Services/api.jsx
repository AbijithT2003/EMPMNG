// src/services/api.js
const API_BASE_URL = "http://localhost:8080/api";

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
        const error = await response.json().catch(() => ({}));
        throw new Error(
          error.message || `HTTP error! status: ${response.status}`
        );
      }

      // Handle 204 No Content
      if (response.status === 204) {
        return null;
      }

      return await response.json();
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  }

  // Employee endpoints
  async getAllEmployees() {
    return this.request("/employees");
  }

  async getEmployeeById(id) {
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

  async getWelcomeMessage() {
    return this.request("/");
  }
}

export default new ApiService();
