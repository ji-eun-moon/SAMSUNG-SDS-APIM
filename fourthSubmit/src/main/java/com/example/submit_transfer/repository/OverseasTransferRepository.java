package com.example.submit_transfer.repository;

import com.example.submit_transfer.dto.response.TransferArriveSearchRes;
import com.example.submit_transfer.entity.OverseasTransfer;
import com.example.submit_transfer.entity.Transfer;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface OverseasTransferRepository extends JpaRepository<OverseasTransfer, Long> {

    @Query("select new com.example.submit_transfer.dto.response.TransferArriveSearchRes(t.wayBillNumber, t.departureLocation, t.destinationLocation, t.transportation, t.product, t.departureDate, t.arrivalDate, t.quantity, t.unitPrice, t.transportCost) " +
            "from OverseasTransfer t " +
            "where t.destinationLocation = :destination")
    List<TransferArriveSearchRes> arriveSearch(@Param("destination") String destination, Pageable pageable);

    @Query("select new com.example.submit_transfer.dto.response.TransferArriveSearchRes(t.wayBillNumber, t.departureLocation, t.destinationLocation, t.transportation, t.product, t.departureDate, t.arrivalDate, t.quantity, t.unitPrice, t.transportCost) " +
            "from OverseasTransfer t " +
            "where t.departureLocation = :departure")
    List<TransferArriveSearchRes> departureSearch(@Param("departure") String departure, Pageable pageable);

    @Query("select new com.example.submit_transfer.dto.response.TransferArriveSearchRes(t.wayBillNumber, t.departureLocation, t.destinationLocation, t.transportation, t.product, t.departureDate, t.arrivalDate, t.quantity, t.unitPrice, t.transportCost) " +
            "from OverseasTransfer t " +
            "where t.product = :product")
    List<TransferArriveSearchRes> productSearch(@Param("product") String product, Pageable pageable);

    @Query("select new com.example.submit_transfer.dto.response.TransferArriveSearchRes(t.wayBillNumber, t.departureLocation, t.destinationLocation, t.transportation, t.product, t.departureDate, t.arrivalDate, t.quantity, t.unitPrice, t.transportCost) " +
            "from OverseasTransfer t " +
            "where t.wayBillNumber = :wayBill")
    List<TransferArriveSearchRes> wayBillSearch(@Param("wayBill") String wayBill);

    @Query("select new com.example.submit_transfer.dto.response.TransferArriveSearchRes(t.wayBillNumber, t.departureLocation, t.destinationLocation, t.transportation, t.product, t.departureDate, t.arrivalDate, t.quantity, t.unitPrice, t.transportCost) " +
            "from OverseasTransfer t " +
            "where t.departureDate >= :departureDate")
    List<TransferArriveSearchRes> departureDateSearch(@Param("departureDate") LocalDate departureDate, Pageable pageable);

}
