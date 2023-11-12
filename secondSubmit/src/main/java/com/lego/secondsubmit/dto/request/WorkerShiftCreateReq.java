package com.lego.secondsubmit.dto.request;

import com.lego.secondsubmit.entity.Worker;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class WorkerShiftCreateReq {

    @Schema(description = "작업자 시퀀스", example = "1")
    private Long workerId;

    @Schema(description = "작업 시작 시간", example = "08:30:00")
    private LocalTime shiftStartTime;

    @Schema(description = "작업 종료 시간", example = "18:00:00")
    private LocalTime shiftEndTime;

    @Schema(description = "작업 날짜", example = "2023-11-17")
    private LocalDate workingDay;
}
