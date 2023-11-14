package com.lego.thirdservice.entity;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reservation_id")
    @Schema(name = "reservationId", description = "예약 날짜 시퀀스", example = "1")
    private Long id;

    @Schema(name = "reservationDate", description = "예약 날짜", example = "2023-11-14")
    private LocalDate date;

    @Schema(name = "reservationPerson", description = "예약자", example = "김정수")
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "facility_id")
    private Facility facility;

}
