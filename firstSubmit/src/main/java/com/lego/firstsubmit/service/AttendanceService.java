package com.lego.firstsubmit.service;

import com.lego.firstsubmit.domain.Attendance;
import com.lego.firstsubmit.domain.Employee;
import com.lego.firstsubmit.dto.AttendanceInAndOut;
import com.lego.firstsubmit.dto.AttendanceMonthlyCount;
import com.lego.firstsubmit.dto.AttendanceTime;
import com.lego.firstsubmit.repository.AttendanceRepository;
import com.lego.firstsubmit.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final EmployeeRepository employeeRepository;

    @Transactional
    public void checkIn(AttendanceTime attendanceTime) {
        Employee employee = checkEmployee(attendanceTime.getEmployeeId());

        Optional<Attendance> attendance = attendanceRepository.findByEmployeeAndDate(attendanceTime.getDatetime().toLocalDate(),
                employee.getId());

        if (attendance.isEmpty()) {
            attendanceRepository.save(Attendance.builder()
                            .employee(employee)
                            .date(attendanceTime.getDatetime().toLocalDate())
                            .inTime(attendanceTime.getDatetime().toLocalTime())
                    .build());
        }
    }

    @Transactional
    public void checkOut(AttendanceTime attendanceTime) {
        Employee employee = checkEmployee(attendanceTime.getEmployeeId());

        Optional<Attendance> attendance = attendanceRepository.findByEmployeeAndDate(attendanceTime.getDatetime().toLocalDate(),
                employee.getId());

        if (attendance.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        } else {
            attendance.get().setOutTime(attendanceTime.getDatetime().toLocalTime());
        }
    }

    public List<AttendanceInAndOut> monthlyTime(Long employeeId, YearMonth date) {
        Employee employee = checkEmployee(employeeId);

        return attendanceRepository.findAllByEmployeeAndDateGreaterThanEqualAndDateLessThanEqualOrderByDate(employee, date.atDay(1),
                date.atEndOfMonth()).stream().map(AttendanceInAndOut::new).collect(Collectors.toList());
    }

    public AttendanceInAndOut dailyTime(Long employeeId, LocalDate date) {
        Employee employee = checkEmployee(employeeId);

        Optional<Attendance> attendance = attendanceRepository.findByEmployeeAndDate(date, employee.getId());
        if (attendance.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        return new AttendanceInAndOut(attendance.get());
    }

    public AttendanceMonthlyCount monthlyCount(Long employeeId, YearMonth date) {
        Employee employee = checkEmployee(employeeId);
        AttendanceMonthlyCount attendanceMonthlyCount = new AttendanceMonthlyCount(date, 0);
        attendanceRepository.findAllByEmployeeAndDateGreaterThanEqualAndDateLessThanEqualOrderByDate(employee, date.atDay(1),
                date.atEndOfMonth()).forEach(attendanceMonthlyCount::countUp);

        return attendanceMonthlyCount;
    }

    public Employee checkEmployee(Long employeeId) {
        Optional<Employee> employee = employeeRepository.findById(employeeId);
        if (employee.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }

        return employee.get();
    }
}
