package main.java.PROJECTS.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import jakartha.validation.constraints.NotBlank;
import jakartha.validation.constraints.Size;

import java.util.List;
import java.util.ArrayList;


@Entity
@Table(name = "departments",
            indexes={@Index(name="idx_dept_code", columnList="code", unique=true)})

@data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class department extends baseentity {
    @NotBlank(message = "Department name is required")
    @Size(max = 100)
    @Column(nullable = false, length = 100)
    private String name;

    @Size(max = 20)
    @Column(unique = true, length = 20)
    private String code;

    @Size(max = 500)
    @Column(length = 500)
    private String description;
    /**
     * Manager of the department
     * Many departments can have the same manager (OneToMany from Employee side)
     */
    @ManyToOne(fetch = FetchType.LAZY)  // LAZY = don't load manager unless explicitly accessed
    @JoinColumn(name = "manager_id")
    private Employee manager;
    /**
     * Employees in this department
     * One department has many employees
     */
    @OneToMany(mappedBy = "department", cascade = CascadeType.PERSIST)
    @JsonIgnore  // Prevent infinite loop: Department -> Employees -> Department -> ...
    @Builder.Default  // Ensures the list is initialized even with builder pattern
    private List<Employee> employees = new ArrayList<>();

    /**
     * Helper method to add employee to department
     * This maintains bidirectional consistency
     */
    public void addEmployee(Employee employee) {
        employees.add(employee);
        employee.setDepartment(this);
    }

    public void removeEmployee(Employee employee) {
        employees.remove(employee);
        employee.setDepartment(null);
    }

    /**
     * Get count of active employees in department
     */
    public long getActiveEmployeeCount() {
        return employees.stream()
                .filter(emp -> !emp.getDeleted() && emp.getStatus() == com.yourorg.yourapp.model.enums.EmploymentStatus.ACTIVE)
                .count();
    }
    
}
