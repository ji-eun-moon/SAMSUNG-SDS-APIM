package com.example.submit_transfer.service;

import com.example.submit_transfer.dto.request.TransferRegisterReq;
import com.example.submit_transfer.dto.response.TransferArriveSearchRes;
import com.example.submit_transfer.entity.Transfer;
import com.example.submit_transfer.repository.TransferRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TransferService {

    private final TransferRepository transferRepository;

    public void register(TransferRegisterReq req) {

        transferRepository.save(Transfer.builder()
                        .wayBillNumber(req.getWayBillNumber())
                        .departureLocation(req.getDepartureLocation())
                        .destinationLocation(req.getDestinationLocation())
                        .transportation(req.getTransportation())
                        .product(req.getProduct())
                        .departureDate(req.getDepartureDate())
                        .arrivalDate(req.getArrivalDate())
                        .quantity(req.getQuantity())
                        .unitPrice(req.getUnitPrice())
                        .transportCost(req.getTransportCost())
                .build());

    }

    public List<TransferArriveSearchRes> arriveSearch(String destination) {

        return transferRepository.arriveSearch(destination);

    }

    public List<TransferArriveSearchRes> departureSearch(String departure) {

        return transferRepository.departureSearch(departure);

    }

    public List<TransferArriveSearchRes> productSearch(String product) {

        return transferRepository.productSearch(product);

    }

    public List<TransferArriveSearchRes> wayBillSearch(String wayBill) {

        return transferRepository.wayBillSearch(wayBill);

    }

    public List<TransferArriveSearchRes> departureDateSearch(LocalDate departureDate) {

        return transferRepository.departureDateSearch(departureDate);

    }
}
