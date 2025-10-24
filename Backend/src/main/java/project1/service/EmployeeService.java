package main.java.PROJECTS.service;

import com.yourorg.yourapp.model.employee.Employee;
import com.yourorg.yourapp.repository.EmployeeRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
        Employee existing = getEmployeeById(id);
        updated.setId(existing.getId());
        return employeeRepository.save(updated);
    }

    public void deleteEmployee(Long id) {
        if (!employeeRepository.existsById(id)) {
            throw new EntityNotFoundException("Employee not found with id " + id);
        }
        employeeRepository.deleteById(id);
    }
}
