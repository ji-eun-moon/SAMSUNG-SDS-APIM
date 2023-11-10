package com.example.submit_transfer.entity;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Transfer {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "transfer_id")
    @Schema(description = "물품 시퀸스", example = "1")
    private Long id;

    @Schema(description = "운송장 번호", example = "INV0001")
    @Column(unique = true)
    private String wayBillNumber;

    @Schema(description = "출발지", example = "광명시")
    private String departureLocation;

    @Schema(description = "도착지", example = "부여군")
    private String destinationLocation;

    @Schema(description = "운송 수단", example = "비행기")
    private String transportation;

    @Schema(description = "물품", example = "가공 식품")
    private String product;

    @Schema(description = "출발 일자", example = "2023-03-17")
    private LocalDate departureDate;

    @Schema(description = "도착 일자", example = "2023-03-18")
    private LocalDate arrivalDate;

    @Schema(description = "수량", example = "91")
    private Long quantity;

    @Schema(description = "단가", example = "27407")
    private Long unitPrice;

    @Schema(description = "운송 비용", example = "2494037")
    private Long transportCost;

}
