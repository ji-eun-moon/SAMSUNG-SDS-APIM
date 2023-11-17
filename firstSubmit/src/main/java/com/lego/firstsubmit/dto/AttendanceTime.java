package com.lego.firstsubmit.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AttendanceTime {

    @Schema(description = "사원 번호", example = "9999")
    private Long employeeId;

    @Schema(description = "출결 날짜, 시간", example = "2023-11-08T14:50:18.939Z")
    private LocalDateTime datetime;
}
