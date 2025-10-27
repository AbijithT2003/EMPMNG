package project1.controller;

import project1.model.Department;
import project1.service.DepartmentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/departments")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class DepartmentController {

    private final DepartmentService departmentService;

    @GetMapping
    public ResponseEntity<List<Department>> getAllDepartments() {
        log.info("Fetching all departments");
        List<Department> departments = departmentService.getAllDepartments();
        return ResponseEntity.ok(departments);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Department> getDepartmentById(@PathVariable Long id) {
        log.info("Fetching department with ID {}", id);
        return departmentService.getDepartmentById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Department> createDepartment(@RequestBody Department department) {
        log.info("Creating new department: {}", department.getName());
        Department created = departmentService.createDepartment(department);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDepartment(@PathVariable Long id) {
        log.info("Deleting department with ID {}", id);
        departmentService.deleteDepartment(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/with-employees")
    public ResponseEntity<List<Department>> getDepartmentsWithEmployees() {
    log.info("Fetching departments with employees");
    List<Department> departments = departmentService.getDepartmentsWithEmployees();
    return ResponseEntity.ok(departments);
}

}