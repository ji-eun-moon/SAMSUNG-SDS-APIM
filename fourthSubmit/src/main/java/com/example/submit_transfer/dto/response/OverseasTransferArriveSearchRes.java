package com.example.submit_transfer.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
public class OverseasTransferArriveSearchRes {

    @Schema(description = "운송장 번호", example = "PER0001")
    private String wayBillNumber;

    @Schema(description = "출발지", example = "Seoul")
    private String departureLocation;

    @Schema(description = "도착지", example = "New York")
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
