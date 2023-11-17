package com.lego.secondsubmit.dto.response;

import com.lego.secondsubmit.entity.Worker;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class WorkerRes {

    @Schema(description = "사번", example = "912472")
    private Long id;

    @Schema(description = "성", example = "이")
    private String firstName;

    @Schema(description = "이름", example = "찬웅")
    private String lastName;

    @Schema(description = "생일", example = "1998-01-14")
    private LocalDate birthdate;

    @Schema(description = "입사일", example = "2023-11-17")
    private LocalDate hireDate;

    @Schema(description = "부서", example = "생산관리팀")
    private String department;

    public WorkerRes(Worker worker) {
        this.id = worker.getWorkerId();
        this.firstName = worker.getFirstName();
        this.lastName = worker.getLastName();
        this.birthdate = worker.getBirthdate();
        this.hireDate = worker.getHireDate();
        this.department = worker.getDepartment();
    }
}
