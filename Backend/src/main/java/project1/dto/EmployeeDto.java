// EmployeeDto.java
package project1.dto;
import project1.model.enums.EmploymentStatus;
import project1.model.enums.ContractType;

import java.time.LocalDate;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmployeeDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String jobTitle;
    private Double salary;
    private LocalDate joinDate;
    private EmploymentStatus status;
    private ContractType contractType;
    private DepartmentDto department;
}
