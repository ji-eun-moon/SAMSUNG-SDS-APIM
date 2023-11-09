package com.example.submit_transfer.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
public class TransferArriveSearchRes {

    private String wayBillNumber;
    private String departureLocation;
    private String destinationLocation;
    private String transportation;
    private String product;
    private LocalDate departureDate;
    private LocalDate arrivalDate;
    private Long quantity;
    private Long unitPrice;
    private Long transportCost;

}
