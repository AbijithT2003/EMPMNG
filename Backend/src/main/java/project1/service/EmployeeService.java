package project1.service;

import project1.dto.EmployeeCreateDto;
import project1.dto.EmployeeDto;
import project1.exception.ResourceNotFound;
import project1.model.Employee;
import project1.model.Department;
import project1.repository.EmployeeRepository;
import project1.model.enums.ContractType;
import project1.model.enums.EmploymentStatus;
import project1.dto.DepartmentDto;
import project1.repository.DepartmentRepository;
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
    private final DepartmentRepository departmentRepository; 
    
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
        
          Department department = null;
        if (createDto.getDepartmentId() != null) {
            department = departmentRepository.findById(createDto.getDepartmentId())
            .orElseThrow(() -> new ResourceNotFound("Department not found with ID " + createDto.getDepartmentId()));
}       

        // ✅ Safely parse enums from DTO (or fallback to defaults)
        EmploymentStatus status = createDto.getStatus() != null
                ? createDto.getStatus()
                : EmploymentStatus.ACTIVE;

        ContractType contractType = createDto.getContractType() != null
                ? createDto.getContractType()
                : ContractType.FULL_TIME;
        Employee employee = Employee.builder()
                .employeeNumber(generateEmployeeNumber())
                .firstName(createDto.getFirstName())
                .lastName(createDto.getLastName())
                .email(createDto.getEmail())
                .jobTitle(createDto.getJobTitle())
                .salary(createDto.getSalary())  // Fixed: Added salary mapping
                .joinDate(LocalDate.now())
                .status(status)
                .contractType(contractType) // Fixed: Set default contract type
                .department(department) // Fixed: Set department if provided
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
        existing.setStatus(updatedDto.getStatus());
        existing.setContractType(updatedDto.getContractType());
        
        if (updatedDto.getDepartment() != null && updatedDto.getDepartment().getName() != null) {
            Department dept = departmentRepository.findByName(updatedDto.getDepartment().getName())
                    .orElseGet(() -> {
                        Department newDept = new Department();
                        newDept.setName(updatedDto.getDepartment().getName());
                        return departmentRepository.save(newDept);
                    });
            existing.setDepartment(dept);
        }
        
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
                .salary(employee.getSalary()) 
                .status(employee.getStatus())
                .contractType(employee.getContractType())
                .department(employee.getDepartment() != null
                        ? DepartmentDto.builder()
                            .departmentid(employee.getDepartment().getId())
                            .name(employee.getDepartment().getName())
                            .build()
                        : null) // Fixed: Added salary to DTO conversion
                .build();
    }
    
    private String generateEmployeeNumber() {
    String lastNumber = employeeRepository.findMaxEmployeeNumber(); // custom query
    int next = 1;
    if (lastNumber != null && lastNumber.startsWith("EMP")) {
        next = Integer.parseInt(lastNumber.substring(3)) + 1;
    }
    return String.format("EMP%05d", next);
}

    public List<EmployeeDto> filterEmployees(Long departmentId, EmploymentStatus status, ContractType contractType) {
    List<Employee> employees;

    if (departmentId != null && status != null && contractType != null) {
        employees = employeeRepository.findByDepartment_IdAndStatusAndContractType(departmentId, status, contractType);
    } else if (departmentId != null && status != null) {
        employees = employeeRepository.findByDepartment_IdAndStatus(departmentId, status);
    } else if (departmentId != null && contractType != null) {
        employees = employeeRepository.findByDepartment_IdAndContractType(departmentId, contractType);
    } else if (departmentId != null) {
        employees = employeeRepository.findByDepartment_Id(departmentId);
    } else if (status != null && contractType != null) {
        employees = employeeRepository.findByStatusAndContractType(status, contractType);
    } else if (status != null) {
        employees = employeeRepository.findByStatus(status);
    } else if (contractType != null) {
        employees = employeeRepository.findByContractType(contractType);
    } else {
        employees = employeeRepository.findAll();
    }

    return employees.stream().map(this::convertToDto).collect(Collectors.toList());
}
}

