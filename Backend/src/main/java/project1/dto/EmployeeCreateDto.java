// EmployeeCreateDto.java
package project1.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import project1.model.enums.ContractType;
import project1.model.enums.EmploymentStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;



@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmployeeCreateDto {
    @NotBlank private String firstName;
    @NotBlank private String lastName;
    @Email private String email;
    private String jobTitle;
    private Double salary; 
    private LocalDate joinDate;
     private EmploymentStatus status;      
    private ContractType contractType;   
    private Long departmentId;
}
