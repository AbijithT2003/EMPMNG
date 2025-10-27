// EmployeeCreateDto.java
package project1.dto;

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
    private Double salary; // add field
     private EmploymentStatus status;      // changed from lowercase 'string'
    private ContractType contractType;   // keep as enum to match entity/service
    private Long departmentId;// add getter
}
