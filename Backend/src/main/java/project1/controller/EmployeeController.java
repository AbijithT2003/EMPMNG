package project1.controller;

import project1.dto.*;
import project1.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/api") 
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class EmployeeController {

    private final EmployeeService employeeService;
    
    @GetMapping("/")
    public String index(){
        return "WELCOME TO THE EMPLOYEE MANAGEMENT SYSTEM API";
    }

    @PostMapping("/employees")
    public ResponseEntity<EmployeeDto> createEmployee(@Valid @RequestBody EmployeeCreateDto createDto) {
        log.info("Creating new employee: {}", createDto.getEmail());
        EmployeeDto created = employeeService.createEmployee(createDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);   
    }

    @GetMapping("/employees")
    public ResponseEntity<List<EmployeeDto>> getAllEmployees() {
        log.info("Fetching all employees");
        List<EmployeeDto> employees = employeeService.getAllEmployees();
        return ResponseEntity.ok(employees);
    }

    @GetMapping("/employees/{id}")
    public ResponseEntity<EmployeeDto> getEmployeeById(@PathVariable Long id) {
        log.info("Fetching employee with ID {}", id);
        EmployeeDto employee = employeeService.getEmployeeById(id);
        return ResponseEntity.ok(employee);
    } 

    @PutMapping("/employees/{id}")
    public ResponseEntity<EmployeeDto> updateEmployee(
            @PathVariable Long id,
            @Valid @RequestBody EmployeeDto updatedDto) {
        log.info("Updating employee with ID {}", id);
        EmployeeDto updated = employeeService.updateEmployee(id, updatedDto);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/employees/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable Long id) {
        log.info("Deleting employee with ID {}", id);
        employeeService.deleteEmployee(id);
        return ResponseEntity.noContent().build();
    }
}