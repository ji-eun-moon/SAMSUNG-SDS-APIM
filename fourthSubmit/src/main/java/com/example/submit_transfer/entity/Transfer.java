package com.example.submit_transfer.entity;

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
    private Long id;

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
