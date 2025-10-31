package project1.repository;

import project1.model.TimeOffRequest;
import project1.model.enums.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface TimeOffRequestRepository extends JpaRepository<TimeOffRequest, Long> {
    
    List<TimeOffRequest> findAllByOrderByCreatedAtDesc();
    
    List<TimeOffRequest> findByStatusOrderByCreatedAtDesc(RequestStatus status);
    
    List<TimeOffRequest> findByEmployee_IdOrderByCreatedAtDesc(Long employeeId);
    
    @Query("SELECT t FROM TimeOffRequest t WHERE t.employee.department.id = :departmentId ORDER BY t.createdAt DESC")
    List<TimeOffRequest> findByDepartmentId(Long departmentId);
    
    @Query("SELECT t FROM TimeOffRequest t WHERE t.startDate >= :startDate AND t.endDate <= :endDate")
    List<TimeOffRequest> findByDateRange(LocalDate startDate, LocalDate endDate);
    
    @Query("SELECT COUNT(t) FROM TimeOffRequest t WHERE t.status = :status")
    Long countByStatus(RequestStatus status);
    
    @Query("SELECT SUM(t.daysRequested) FROM TimeOffRequest t WHERE t.employee.id = :employeeId " +
           "AND t.status = 'APPROVED' AND t.leaveType = :leaveType " +
           "AND YEAR(t.startDate) = :year")
    Integer sumDaysUsed(Long employeeId, LeaveType leaveType, int year);
}
