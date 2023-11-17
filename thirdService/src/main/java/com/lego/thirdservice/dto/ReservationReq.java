package com.lego.thirdservice.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ReservationReq {
    @Schema(name = "reservationDate", description = "예약 날짜", example = "2023-11-14")
    private LocalDate reservationDate;

    @Schema(name = "reservationPerson", description = "예약자", example = "김정수")
    private String reservationPerson;

    @Schema(name = "facilityId", description = "시설 시퀀스", example = "1")
    private Long facilityId;
}
