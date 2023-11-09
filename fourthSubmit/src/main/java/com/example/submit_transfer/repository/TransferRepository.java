package com.example.submit_transfer.repository;

import com.example.submit_transfer.dto.response.TransferArriveSearchRes;
import com.example.submit_transfer.entity.Transfer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransferRepository extends JpaRepository<Transfer, Long> {

    @Query("select new com.example.submit_transfer.dto.response.TransferArriveSearchRes(t.wayBillNumber, t.departureLocation, t.destinationLocation, t.transportation, t.product, t.departureDate, t.arrivalDate, t.quantity, t.unitPrice, t.transportCost) " +
            "from Transfer t " +
            "where t.destinationLocation = :destination")
    List<TransferArriveSearchRes> arriveSearch(String destination);

    @Query("select new com.example.submit_transfer.dto.response.TransferArriveSearchRes(t.wayBillNumber, t.departureLocation, t.destinationLocation, t.transportation, t.product, t.departureDate, t.arrivalDate, t.quantity, t.unitPrice, t.transportCost) " +
            "from Transfer t " +
            "where t.departureLocation = :departure")
    List<TransferArriveSearchRes> departureSearch(String departure);
}
