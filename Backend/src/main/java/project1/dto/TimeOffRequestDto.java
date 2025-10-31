package project1.dto;

import jakarta.validation.constraints.*;
import lombok.*;
import project1.model.enums.*;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TimeOffRequestDto {
    @NotNull(message = "Employee ID is required")
    private Long employeeId;
    
    @NotNull(message = "Leave type is required")
    private LeaveType leaveType;
    
    @NotNull(message = "Start date is required")
    private LocalDate startDate;
    
    @NotNull(message = "End date is required")
    private LocalDate endDate;
    
    
    private Boolean isUrgent;
}
