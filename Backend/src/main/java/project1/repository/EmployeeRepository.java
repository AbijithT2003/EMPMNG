package project1.repository;

import project1.model.Employee;
import project1.model.enums.EmploymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    Optional<Employee> findByEmployeeNumber(String employeeNumber);

    Optional<Employee> findByEmail(String email);

    List<Employee> findByStatus(EmploymentStatus status);

    List<Employee> findByDepartment_Id(Long departmentId);

    boolean existsByEmail(String email);

    boolean existsByEmployeeNumber(String employeeNumber);
}
