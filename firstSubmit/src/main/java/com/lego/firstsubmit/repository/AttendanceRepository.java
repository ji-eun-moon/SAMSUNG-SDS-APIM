package com.lego.firstsubmit.repository;

import com.lego.firstsubmit.domain.Attendance;
import com.lego.firstsubmit.domain.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

    @Query("select a " +
            "from Attendance a " +
            "where a.date=:date and a.employee.id=:employee_id")
    Optional<Attendance> findByEmployeeAndDate(@Param("date") LocalDate date, @Param("employee_id") Long employeeId);

    List<Attendance> findAllByEmployeeAndDateGreaterThanEqualAndDateLessThanEqualOrderByDate(Employee employee, LocalDate startDate,
                                                                                  LocalDate endDate);


}
