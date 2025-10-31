package project1.model;

import jakarta.persistence.*;
import lombok.*;
import project1.model.enums.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "time_off_requests")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TimeOffRequest extends BaseEntity {
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private LeaveType leaveType;
    
    @Column(nullable = false)
    private LocalDate startDate;
    
    @Column(nullable = false)
    private LocalDate endDate;
    
    @Column(nullable = false)
    private Integer daysRequested;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    @Builder.Default
    private RequestStatus status = RequestStatus.PENDING;
    
    @Column
    private LocalDateTime processedAt;
    
    // For urgency flag
    @Column
    private Boolean isUrgent = false;
}
