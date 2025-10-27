package project1.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import project1.model.enums.*;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "employees",
       indexes = {
           @Index(name = "idx_emp_email", columnList = "email", unique = true),
           @Index(name = "idx_emp_status", columnList = "status"),
           @Index(name = "idx_emp_dept", columnList = "department_id"),
           @Index(name = "idx_emp_number", columnList = "employee_number")
       })
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Employee extends BaseEntity {

    @NotBlank(message = "Employee number is required")
    @Column(name = "employee_number", nullable = false, unique = true)
    private String employeeNumber;

    @NotBlank(message = "First name is required")
    @Column(name = "first_name", nullable = false)
    private String firstName;

    @NotBlank(message = "Last name is required")
    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Email(message = "Invalid email format")
    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @NotNull(message = "Join date is required")
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

    @Column(name = "salary")
    private Double salary;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id")
    private Department department;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "manager_id")
    private Employee manager;
}