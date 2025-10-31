package project1.dto;

import lombok.*;
import project1.model.enums.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TimeOffResponseDto {
    private Long id;
    private Long employeeId;
    private String employeeName;
    private String departmentName;
    private LeaveType leaveType;
    private LocalDate startDate;
    private LocalDate endDate;
    private Integer daysRequested;
    private RequestStatus status;
    private Boolean isUrgent;
    private LocalDateTime processedAt;
    private LocalDateTime createdAt;
}
