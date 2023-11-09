package com.lego.firstsubmit.repository;

import com.lego.firstsubmit.domain.Employee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    Page<Employee> findAllBy(Pageable pageable);

    Page<Employee> findAllByHireDateGreaterThanEqualAndHireDateLessThanEqual(LocalDate startDate, LocalDate endDate, Pageable pageable);

}
