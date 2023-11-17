package com.lego.firstsubmit.domain;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Employee {

    @Id
    @Column(name = "employee_id")
    @Schema(description = "사번", example = "2697")
    private Long id;

    @Schema(description = "부서", example = "디자인팀")
    private String department;

    @Schema(description = "직급", example = "부장")
    private String position;

    @Schema(description = "이름", example = "김하은")
    private String name;

    @Schema(description = "휴대폰 번호", example = "055-166-1194")
    private String tel;

    @Schema(description = "이메일", example = "ogsun19@example.com")
    private String email;

    @Schema(description = "연봉(만원)", example = "16927")
    private Integer salary;

    @Schema(description = "입사일", example = "2019-05-06")
    private LocalDate hireDate;
}
