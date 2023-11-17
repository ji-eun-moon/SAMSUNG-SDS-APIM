package com.lego.firstsubmit.dto;

import com.lego.firstsubmit.domain.Employee;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeIdToHireDate{
    @Schema(description = "사번", example = "2697")
    private Long employeeId;
    @Schema(description = "이름", example = "김하은")
    private String name;
    @Schema(description = "입사일", example = "2019-05-06")
    private LocalDate hireDate;

    public EmployeeIdToHireDate(Employee employee) {
        this.employeeId = employee.getId();
        this.hireDate = employee.getHireDate();
        this.name = employee.getName();
    }
}
