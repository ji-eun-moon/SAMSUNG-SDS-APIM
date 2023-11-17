package com.lego.thirdservice.dto;

import com.lego.thirdservice.entity.Reservation;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ReservationPerson {
    @Schema(name = "reservationDate", description = "예약 날짜", example = "2023-11-14")
    private LocalDate date;

    @Schema(name = "reservationPerson", description = "예약자", example = "김정수")
    private String name;

    @Schema(name = "facilityName", description = "시설명", example = "휘트니스 센터")
    private String facilityName;

    public ReservationPerson(Reservation reservation) {
        this.date = reservation.getDate();
        this.name = reservation.getName();
        this.facilityName = reservation.getFacility().getFacilityName();
    }
}
