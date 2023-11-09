package com.example.submit_transfer.dto.request;

import lombok.Data;

import java.time.LocalDate;

@Data
public class TransferRegisterReq {

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
