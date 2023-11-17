package com.lego.firstsubmit.domain;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

import java.time.LocalTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
public class Attendance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "attendance_id")
    @Schema(description = "출결 시퀀스", example = "1")
    private Long id;

    @Schema(description = "날짜", example = "2023-11-08")
    private LocalDate date;

    @Schema(description = "출근 시간", example = "08:30:00.000000")
    private LocalTime inTime;

    @Schema(description = "퇴근 시간", example = "18:00:00.000000")
    private LocalTime outTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id")
    private Employee employee;

}
