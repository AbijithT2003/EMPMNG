package project1.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LeaveBalanceDto {
    private Long employeeId;
    private String employeeName;
    private Integer totalSickDays;
    private Integer usedSickDays;
    private Integer remainingSickDays;
}
