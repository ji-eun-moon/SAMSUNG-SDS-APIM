package com.example.submit_transfer.service;

import com.example.submit_transfer.dto.request.TransferRegisterReq;
import com.example.submit_transfer.dto.response.TransferArriveSearchRes;
import com.example.submit_transfer.entity.OverseasTransfer;
import com.example.submit_transfer.entity.Transfer;
import com.example.submit_transfer.repository.OverseasTransferRepository;
import com.example.submit_transfer.repository.TransferRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OverSeasTransferService {

    private final OverseasTransferRepository transferRepository;

    public void register(TransferRegisterReq req) {

        OverseasTransfer save = transferRepository.save(OverseasTransfer.builder()
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

        transferRepository.delete(save);

    }

    public List<TransferArriveSearchRes> arriveSearch(String destination, Pageable pageable) {

        return transferRepository.arriveSearch(destination, pageable);

    }

    public List<TransferArriveSearchRes> departureSearch(String departure, Pageable pageable) {

        return transferRepository.departureSearch(departure, pageable);

    }

    public List<TransferArriveSearchRes> productSearch(String product, Pageable pageable) {

        return transferRepository.productSearch(product, pageable);

    }

    public List<TransferArriveSearchRes> wayBillSearch(String wayBill) {

        return transferRepository.wayBillSearch(wayBill);

    }

    public List<TransferArriveSearchRes> departureDateSearch(LocalDate departureDate, Pageable pageable) {

        return transferRepository.departureDateSearch(departureDate, pageable);

    }
}
