package com.lego.firstsubmit.dto;

import com.lego.firstsubmit.domain.Employee;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeDepartment {

    @Schema(description = "사번", example = "2697")
    private Long employeeId;

    @Schema(description = "부서", example = "디자인팀")
    private String department;

    @Schema(description = "직급", example = "부장")
    private String position;

    @Schema(description = "이름", example = "김하은")
    private String name;

    public EmployeeDepartment(Employee employee) {
        this.employeeId = employee.getId();
        this.department = employee.getDepartment();
        this.position = employee.getPosition();
        this.name = employee.getName();
    }
}
