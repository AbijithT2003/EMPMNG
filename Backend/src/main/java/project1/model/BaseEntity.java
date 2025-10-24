package main.java.PROJECTS.model;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

/**
 * Base entity with common audit fields.
 * All entities extend this to get automatic timestamp tracking.
 * 
 * @EntityListeners enables JPA Auditing - Spring will automatically
 * populate createdAt/updatedAt fields without you writing any code
 */
@Data
@MappedSuperclass  // This tells JPA: "This is not a table, but child classes inherit these fields"
@EntityListeners(AuditingEntityListener.class)  // Enables automatic audit field population
public abstract class BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // PostgreSQL auto-increment
    private Long id;

    @CreatedDate  // Spring Data JPA automatically sets this on entity creation
    @Column(nullable = false, updatable = false)  // Can't be null, can't be changed after creation
    private LocalDateTime createdAt;

    @LastModifiedDate  // Automatically updated on every save()
    @Column(nullable = false)
    private LocalDateTime updatedAt;

    /**
     * Soft delete flag - instead of DELETE FROM table, we do UPDATE table SET deleted = true
     * Why? Preserves data for audit trails, allows "undelete", maintains referential integrity
     */
    @Column(nullable = false)
    private Boolean deleted = false;

    /**
     * Convenience method for soft deletion
     * Usage: employee.softDelete(); employeeRepository.save(employee);
     */
    public void softDelete() {
        this.deleted = true;
    }

    public void restore() {
        this.deleted = false;
    }
}