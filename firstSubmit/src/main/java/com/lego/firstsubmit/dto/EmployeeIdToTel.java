package com.lego.firstsubmit.dto;

import com.lego.firstsubmit.domain.Employee;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeIdToTel {

    @Schema(description = "사번", example = "2697")
    private Long employeeId;
    @Schema(description = "이름", example = "김하은")
    private String name;
    @Schema(description = "휴대폰 번호", example = "055-166-1194")
    private String tel;

    public EmployeeIdToTel(Employee employee) {
        this.employeeId = employee.getId();
        this.tel = employee.getTel();
        this.name = employee.getName();
    }
}
