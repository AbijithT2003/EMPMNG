package project1.service;

import project1.dto.*;
import project1.exception.ResourceNotFound;
import project1.model.*;
import project1.model.enums.*;
import project1.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.*;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class TimeOffService {

    private final TimeOffRequestRepository repo;
    private final EmployeeRepository empRepo;

    private static final int SICK_DAYS_PER_YEAR = 10;

    /**
     * Create new time-off request for an employee
     */
    public TimeOffResponseDto createRequest(TimeOffRequestDto dto) {
        Employee employee = empRepo.findById(dto.getEmployeeId())
                .orElseThrow(() -> new ResourceNotFound("Employee not found"));

        if (dto.getEndDate().isBefore(dto.getStartDate())) {
            throw new IllegalArgumentException("End date cannot be before start date");
        }

        int businessDays = calculateBusinessDays(dto.getStartDate(), dto.getEndDate());

        TimeOffRequest request = TimeOffRequest.builder()
                .employee(employee)
                .leaveType(dto.getLeaveType())
                .startDate(dto.getStartDate())
                .endDate(dto.getEndDate())
                .daysRequested(businessDays)
                .isUrgent(Boolean.TRUE.equals(dto.getIsUrgent()))
                .status(RequestStatus.PENDING)
                .build();

        return convertToDto(repo.save(request));
    }

    /**
     * View all requests with optional filters
     */
    @Transactional(readOnly = true)
    public List<TimeOffResponseDto> getAllRequests(RequestStatus status, Long departmentId, Long employeeId) {
        List<TimeOffRequest> list;

        if (employeeId != null) {
            list = repo.findByEmployee_IdOrderByCreatedAtDesc(employeeId);
        } else if (departmentId != null) {
            list = repo.findByDepartmentId(departmentId);
        } else if (status != null) {
            list = repo.findByStatusOrderByCreatedAtDesc(status);
        } else {
            list = repo.findAllByOrderByCreatedAtDesc();
        }

        return list.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    /**
     * Approve a pending request
     */
    public TimeOffResponseDto approveRequest(Long requestId, String comments) {
        TimeOffRequest request = repo.findById(requestId)
                .orElseThrow(() -> new ResourceNotFound("Request not found"));

        if (request.getStatus() != RequestStatus.PENDING)
            throw new IllegalStateException("Only pending requests can be approved");

        request.setStatus(RequestStatus.APPROVED);
        request.setProcessedAt(LocalDateTime.now());

        return convertToDto(repo.save(request));
    }

    /**
     * Reject a pending request
     */
    public TimeOffResponseDto rejectRequest(Long requestId, String comments) {
        TimeOffRequest request = repo.findById(requestId)
                .orElseThrow(() -> new ResourceNotFound("Request not found"));

        if (request.getStatus() != RequestStatus.PENDING)
            throw new IllegalStateException("Only pending requests can be rejected");

        request.setStatus(RequestStatus.REJECTED);
        request.setProcessedAt(LocalDateTime.now());

        return convertToDto(repo.save(request));
    }

    /**
     * Calculate leave balance for an employee
     */
    @Transactional(readOnly = true)
    public LeaveBalanceDto getLeaveBalance(Long employeeId) {
        Employee emp = empRepo.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFound("Employee not found"));

        int year = LocalDate.now().getYear();

        int usedSick = Optional.ofNullable(repo.sumDaysUsed(employeeId, LeaveType.SICK, year)).orElse(0);

        return LeaveBalanceDto.builder()
                .employeeId(emp.getId())
                .employeeName(emp.getFirstName() + " " + emp.getLastName())
                .totalSickDays(SICK_DAYS_PER_YEAR)
                .usedSickDays(usedSick)
                .remainingSickDays(SICK_DAYS_PER_YEAR - usedSick)
                .build();
    }

    /**
     * Summary statistics for dashboard
     */
    @Transactional(readOnly = true)
    public TimeOffSummaryDto getSummary() {
        Long pending = repo.countByStatus(RequestStatus.PENDING);
        Long approved = repo.countByStatus(RequestStatus.APPROVED);
        Long rejected = repo.countByStatus(RequestStatus.REJECTED);
        Long urgent = repo.findAllByOrderByCreatedAtDesc().stream().filter(TimeOffRequest::getIsUrgent).count();

        return TimeOffSummaryDto.builder()
                .totalRequests(pending + approved + rejected)
                .pendingRequests(pending)
                .approvedRequests(approved)
                .rejectedRequests(rejected)
                .urgentRequests(urgent)
                .build();
    }

    // ---------------- HELPER METHODS ----------------

    private int calculateBusinessDays(LocalDate start, LocalDate end) {
        int count = 0;
        LocalDate date = start;
        while (!date.isAfter(end)) {
            if (date.getDayOfWeek().getValue() < 6) count++;
            date = date.plusDays(1);
        }
        return count;
    }

    private TimeOffResponseDto convertToDto(TimeOffRequest req) {
        return TimeOffResponseDto.builder()
                .id(req.getId())
                .employeeId(req.getEmployee().getId())
                .employeeName(req.getEmployee().getFirstName() + " " + req.getEmployee().getLastName())
                .departmentName(req.getEmployee().getDepartment() != null 
                        ? req.getEmployee().getDepartment().getName() : null)
                .leaveType(req.getLeaveType())
                .startDate(req.getStartDate())
                .endDate(req.getEndDate())
                .daysRequested(req.getDaysRequested())
                .status(req.getStatus())
                .isUrgent(req.getIsUrgent())
                .processedAt(req.getProcessedAt())
                .createdAt(req.getCreatedAt())
                .build();
    }
}
