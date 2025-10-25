// EmployeeCreateDto.java
package project1.dto;

import jakarta.validation.constraints.*;
import lombok.*;

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
}
