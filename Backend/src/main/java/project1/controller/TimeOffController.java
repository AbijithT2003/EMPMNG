package project1.controller;

import project1.dto.*;
import project1.model.enums.RequestStatus;
import project1.service.TimeOffService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/time-off")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class TimeOffController {

    private final TimeOffService service;

    @PostMapping
    public ResponseEntity<TimeOffResponseDto> createRequest(@Valid @RequestBody TimeOffRequestDto dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.createRequest(dto));
    }

    @GetMapping
    public ResponseEntity<List<TimeOffResponseDto>> getAll(
            @RequestParam(required = false) RequestStatus status,
            @RequestParam(required = false) Long departmentId,
            @RequestParam(required = false) Long employeeId) {
        return ResponseEntity.ok(service.getAllRequests(status, departmentId, employeeId));
    }

    @PutMapping("/{id}/approve")
    public ResponseEntity<TimeOffResponseDto> approve(@PathVariable Long id, @RequestBody(required = false) String comments) {
        return ResponseEntity.ok(service.approveRequest(id, comments));
    }

    @PutMapping("/{id}/reject")
    public ResponseEntity<TimeOffResponseDto> reject(@PathVariable Long id, @RequestBody(required = false) String comments) {
        return ResponseEntity.ok(service.rejectRequest(id, comments));
    }

    @GetMapping("/balance/{employeeId}")
    public ResponseEntity<LeaveBalanceDto> balance(@PathVariable Long employeeId) {
        return ResponseEntity.ok(service.getLeaveBalance(employeeId));
    }

    @GetMapping("/summary")
    public ResponseEntity<TimeOffSummaryDto> summary() {
        return ResponseEntity.ok(service.getSummary());
    }
}
