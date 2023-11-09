package com.lego.firstsubmit.dto;

import com.lego.firstsubmit.domain.Attendance;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AttendanceInAndOut {

    @Schema(description = "날짜", example = "2023-11-08")
    private LocalDate date;

    @Schema(description = "출근 시간", example = "08:30:00.000000")
    private LocalTime inTime;

    @Schema(description = "퇴근 시간", example = "18:00:00.000000")
    private LocalTime outTime;

    public AttendanceInAndOut(Attendance attendance) {
        this.date = attendance.getDate();
        this.inTime = attendance.getInTime();
        this.outTime = attendance.getOutTime();
    }
}
