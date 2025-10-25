package project1.service;

import project1.model.Employee;
import project1.repository.EmployeeRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import project1.model.enums.EmploymentStatus;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    public List<Employee> getAllEmployees() {
        log.info("Fetching all employees");
        return employeeRepository.findAll();
    }

    public Employee getEmployeeById(Long id) {
        return employeeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Employee not found with id " + id));
    }

    public Employee createEmployee(Employee employee) {
        if (employeeRepository.existsByEmail(employee.getPersonalInfo().getEmail())) {
            throw new IllegalArgumentException("Employee with this email already exists");
        }
        return employeeRepository.save(employee);
    }

    public Employee updateEmployee(Long id, Employee updated) {
        log.info("Updating employee with ID: {}", id);
        return employeeRepository.findById(id)
                .map(existing -> {
                    existing.setFirstName(updated.getFirstName());
                    existing.setLastName(updated.getLastName());
                    existing.setEmail(updated.getEmail());
                    existing.setStatus(updated.getStatus());
                    existing.setDepartment(updated.getDepartment());
                    return employeeRepository.save(existing);
                })
                .orElseThrow(() -> new RuntimeException("Employee not found"));
    }

    public void deleteEmployee(Long id) {
        if (!employeeRepository.existsById(id)) {
            throw new EntityNotFoundException("Employee not found with id " + id);
        }
        employeeRepository.deleteById(id);
    }
    public List<Employee> getEmployeesByStatus(EmploymentStatus status) {
        log.info("Fetching employees by status: {}", status);
        return employeeRepository.findByStatus(status);
    }
    
}
