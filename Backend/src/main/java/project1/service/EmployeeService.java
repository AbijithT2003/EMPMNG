package project1.service;

import project1.dto.EmployeeCreateDto;
import project1.dto.EmployeeDto;
import project1.exception.ResourceNotFound;
import project1.model.Employee;
import project1.repository.EmployeeRepository;
import project1.model.enums.EmploymentStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    public List<EmployeeDto> getAllEmployees() {
        log.info("Fetching all employees");
        return employeeRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public EmployeeDto getEmployeeById(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFound("Employee not found with id " + id));
        return convertToDto(employee);
    }

    public EmployeeDto createEmployee(EmployeeCreateDto createDto) {
        if (employeeRepository.existsByEmail(createDto.getEmail())) {
            throw new IllegalArgumentException("Employee with this email already exists");
        }
        
        Employee employee = Employee.builder()
                .employeeNumber(generateEmployeeNumber())
                .firstName(createDto.getFirstName())
                .lastName(createDto.getLastName())
                .email(createDto.getEmail())
                .jobTitle(createDto.getJobTitle())
                .salary(createDto.getSalary())  // Fixed: Added salary mapping
                .joinDate(LocalDate.now())
                .status(EmploymentStatus.ACTIVE)
                .build();
        
        Employee saved = employeeRepository.save(employee);
        return convertToDto(saved);
    }

    public EmployeeDto updateEmployee(Long id, EmployeeDto updatedDto) {
        log.info("Updating employee with ID: {}", id);
        Employee existing = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFound("Employee not found with id " + id));
        
        existing.setFirstName(updatedDto.getFirstName());
        existing.setLastName(updatedDto.getLastName());
        existing.setEmail(updatedDto.getEmail());
        existing.setJobTitle(updatedDto.getJobTitle());
        existing.setSalary(updatedDto.getSalary());  // Fixed: Added salary update
        
        Employee updated = employeeRepository.save(existing);
        return convertToDto(updated);
    }

    public void deleteEmployee(Long id) {
        if (!employeeRepository.existsById(id)) {
            throw new ResourceNotFound("Employee not found with id " + id);
        }
        employeeRepository.deleteById(id);
    }

    public List<EmployeeDto> getEmployeesByStatus(EmploymentStatus status) {
        log.info("Fetching employees by status: {}", status);
        return employeeRepository.findByStatus(status).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    private EmployeeDto convertToDto(Employee employee) {
        return EmployeeDto.builder()
                .id(employee.getId())
                .firstName(employee.getFirstName())
                .lastName(employee.getLastName())
                .email(employee.getEmail())
                .jobTitle(employee.getJobTitle())
                .salary(employee.getSalary())  // Fixed: Added salary to DTO conversion
                .build();
    }
    
    private String generateEmployeeNumber() {
        long count = employeeRepository.count();
        return String.format("EMP%05d", count + 1);
    }
}