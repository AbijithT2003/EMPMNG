package main.java.PROJECTS.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.util.list;
import java.util.LocalDate;
import java.util.ArrayList;

import java.lang.annotation.Inherited;
import java.time.LocalDateTime;


public enum Role {
    ROLE_ADMIN,
    ROLE_HR,
    ROLE_EMPLOYEE
}
public enum EmploymentStatus {
    ACTIVE,         // Currently working
    INACTIVE,       // Temporarily not working (but not terminated)
    ON_LEAVE,       // Sick leave, maternity leave, sabbatical, etc.
    TERMINATED      // Employment ended
}
public enum ContractType {
    FULL_TIME,      // Standard 40hrs/week permanent position
    PART_TIME,      // Less than full-time hours
    CONTRACT,       // Fixed-term contractor
    INTERN,         // Internship/trainee
    TEMPORARY       // Temp worker (seasonal, project-based)
} 

public enum ShiftStatus {
    PENDING,        // Shift created, awaiting approval
    APPROVED,       // Manager/admin approved the shift
    REJECTED,       // Shift request denied
    COMPLETED,      // Shift has been worked
    CANCELLED       // Shift was cancelled
}

@Entity
@Table(name = "employees",
indexes={
       @Index(name="idx_emp_email", columnList="email", unique=true),
       @Index(name = "idx_emp_status", columnList = "status"),
        @Index(name = "idx_emp_dept", columnList = "department_id"),
        @Index(name = "idx_emp_number", columnList = "employeeNumber")
    }
)

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor

public class employee extends BaseEntity{
    
    @NotBlank(message="employee number is required")
    @Column(name = "employee_number", nullable = false, unique = true)
    private String employeeNumber;  
    
    @NotBlank(message = "First name is required")
    @column(name = "first_name", nullable = false)
    private String firstName;

    @NotBlank(message = "Last name is required")
    @column(name = "last_name", nullable = false)
    private String lastName;

    @Email(message = "Invalid email format")
    @column(name = "company email", nullable = false, unique = true)
    private String email;

    @ManyToMany(fetch = FetchType.EAGER)
    @Enumerated(EnumType.STRING)
    @collectionTable(
            name = "employee_roles",
            joinColumns = @JoinColumn(name = "employee_id")
    )
    private set<Role> roles;

    @NotNull(message = "join date is required")
    @Column(nullable = false)
    private LocalDate joinDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    @Builder.Default
    private EmploymentStatus status = EmploymentStatus.ACTIVE;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    @Builder.Default
    private ContractType contractType = ContractType.FULL_TIME;

    @NotBlank(message = "Job title is required")
    @Size(max = 100)
    @Column(nullable = false, length = 100)
    private String jobTitle;

    /**
     * Department the employee belongs to
     * Many employees belong to one department
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id")
    private Department department;

    /**
     * Manager of the employee
     * Many employees can have the same manager
     */
    @ManytoOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "manager_id")
    private Employee manager;


}
