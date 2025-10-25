package project1.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "departments",
       indexes = {@Index(name = "idx_dept_code", columnList = "code", unique = true)})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Department extends BaseEntity {

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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "manager_id")
    private Employee manager;

    @OneToMany(mappedBy = "department", cascade = CascadeType.PERSIST)
    @JsonIgnore
    @Builder.Default
    private List<Employee> employees = new ArrayList<>();

    public void addEmployee(Employee employee) {
        employees.add(employee);
        employee.setDepartment(this);
    }

    public void removeEmployee(Employee employee) {
        employees.remove(employee);
        employee.setDepartment(null);
    }
}
