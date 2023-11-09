package com.lego.firstsubmit.dto;

import com.lego.firstsubmit.domain.Attendance;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.YearMonth;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AttendanceMonthlyCount {

    @Schema(description = "년-월", example = "2023-11")
    private YearMonth date;
    @Schema(description = "출결 일수", example = "19")
    private Integer count;

    public void countUp(Attendance attendance) {
        if (attendance.getInTime() != null && attendance.getOutTime() != null) {
            this.count += 1;
        }
    }
}
