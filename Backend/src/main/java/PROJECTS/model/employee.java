package main.java.PROJECTS.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.lang.annotation.Inherited;
import java.time.LocalDateTime;


public enum Role {
    ROLE_ADMIN,
    ROLE_HR,
    ROLE_EMPLOYEE
}

@Entity
@Table(name = "employees")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class employee {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @column(name = "first_name", nullable = false)
    private String firstName;

    @column(name = "last_name", nullable = false)
    private String lastName;

    @column(name = "company email", nullable = false, unique = true)
    private String email;

    @ManyToMany(fetch = FetchType.EAGER)
    @Enumerated(EnumType.STRING)
    @collectionTable(
            name = "employee_roles",
            joinColumns = @JoinColumn(name = "employee_id")
    )
    private set<Role> roles;

    private BOOLEAN isActive = TRUE;

    @CreationTimestamp
    private LocalDateTime createdAt;


}
