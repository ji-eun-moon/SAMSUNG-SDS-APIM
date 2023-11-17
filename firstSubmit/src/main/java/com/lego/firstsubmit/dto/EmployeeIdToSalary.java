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
public class EmployeeIdToSalary {
    @Schema(description = "사번", example = "2697")
    private Long employeeId;
    @Schema(description = "이름", example = "김하은")
    private String name;
    @Schema(description = "연봉(만원)", example = "16927")
    private Integer salary;

    public EmployeeIdToSalary(Employee employee) {
        this.employeeId = employee.getId();
        this.salary = employee.getSalary();
        this.name = employee.getName();
    }
}
