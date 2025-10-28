package project1.repository;

import project1.model.Employee;
import project1.model.enums.ContractType;
import project1.model.enums.EmploymentStatus;

import org.springframework.data.jpa.repository.Query;
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
    List<Employee> findByContractType(ContractType contractType);
    List<Employee> findByStatusAndContractType(EmploymentStatus status, ContractType contractType);
    List<Employee> findByDepartment_IdAndStatus(Long departmentId, EmploymentStatus status);

    List<Employee> findByDepartment_IdAndContractType(Long departmentId, ContractType contractType);

    List<Employee> findByDepartment_IdAndStatusAndContractType(Long departmentId, EmploymentStatus status, ContractType contractType);


    boolean existsByEmail(String email);

    boolean existsByEmployeeNumber(String employeeNumber);
    // Custom query to find the maximum employee number@Query("SELECT MAX(e.employeeNumber) FROM Employee e")
    @Query("SELECT MAX(e.employeeNumber) FROM Employee e")
    String findMaxEmployeeNumber();


}
