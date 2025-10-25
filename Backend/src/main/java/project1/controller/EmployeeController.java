package project1.controller;
import project1.model.*;
import project1.dto.*;
import project1.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;  
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@RestController
@RequestMapping("/api") 
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Employee Management System", description = "APIs for managing employees")
@CrossOrigin(origins = "*", allowedHeaders = "*",allowcredentials = "true")

public class EmployeeController {

    private final EmployeeService EmployeeService;
    @RequestMapping("/")
    public String index(){
        return "WELCOME TO THE EMPLOYEE MANAGEMENT SYSTEM API";
         }

@PostMapping("/employees")
@Operation(summary = "Create a new employee", description = "Adds a new employee to the system")
@ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Employee created successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid input data")
})
public ResponseEntity<employeeDto> createEmployee(@Valid @RequestBody employeeCreateDto createDto) {
    // Logic to save employee to the database
    EmployeeDto created = EmployeeService.createEmployee(EmployeeDto);
    return ResponseEntity.status(HttpStatus.CREATED).body(created);   
}

//=READ ALL OF THE DETALS , THIS IS THE ONE THAT FETCHES ALL THE DETAILS
@GetMapping("/employees")
@Operation(summary = "Get all employees", description = "Returns a list of all employees in the system")
    @ApiResponse(responseCode = "200", description = "Employees fetched successfully")
    public ResponseEntity<List<EmployeeDto>> getAllEmployees() {
        log.info("Fetching all employees");
        List<EmployeeDto> employees = employeeService.getAllEmployees();
        return ResponseEntity.ok(employees);
    }
// ==================== READ ONE ====================

    @GetMapping("/employees/{id}")
    @Operation(summary = "Get an employee by ID", description = "Returns employee details for a given ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Employee found"),
            @ApiResponse(responseCode = "404", description = "Employee not found")
    })
    public ResponseEntity<EmployeeDto> getEmployeeById(
            @Parameter(description = "Employee ID", example = "1")
            @PathVariable Long id
    ) {
        log.info("Fetching employee with ID {}", id);
        EmployeeDto employee = employeeService.getEmployeeById(id);
        return ResponseEntity.ok(employee);
    } 
    // ==================== UPDATE ====================

    @PutMapping("/employees/{id}")
    @Operation(summary = "Update employee details", description = "Updates information for an existing employee")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Employee updated successfully"),
            @ApiResponse(responseCode = "404", description = "Employee not found")
    })
    public ResponseEntity<EmployeeDto> updateEmployee(
            @Parameter(description = "Employee ID", example = "1") @PathVariable Long id,
            @Valid @RequestBody EmployeeDto updatedDto
    ) {
        log.info("Updating employee with ID {}", id);
        EmployeeDto updated = employeeService.updateEmployee(id, updatedDto);
        return ResponseEntity.ok(updated);
    }

    // ==================== DELETE ====================

    @DeleteMapping("/employees/{id}")
    @Operation(summary = "Delete an employee", description = "Removes an employee record by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Employee deleted successfully"),
            @ApiResponse(responseCode = "404", description = "Employee not found")
    })
    public ResponseEntity<Void> deleteEmployee(
            @Parameter(description = "Employee ID", example = "1") @PathVariable Long id
    ) {
        log.info("Deleting employee with ID {}", id);
        employeeService.deleteEmployee(id);
        return ResponseEntity.noContent().build();
    }

}
