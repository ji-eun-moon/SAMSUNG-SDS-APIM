package com.example.submit_transfer.controller;

import com.example.submit_transfer.dto.request.TransferRegisterReq;
import com.example.submit_transfer.dto.response.TransferArriveSearchRes;
import com.example.submit_transfer.service.TransferService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/transfer")
@Tag(name = "운송 정보 관련", description = "운송정보와 출발지, 도착지, 날짜에 관련한 기록 조회 기능을 제공하고 있습니다.")
public class TransferController {

    private final TransferService transferService;

    @PostMapping("/register")
    @Operation(summary = "운송 정보 등록", description = "운송 정보를 기록하는 API 입니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "202", description = "Accept"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> register(@RequestBody TransferRegisterReq req) {

        transferService.register(req);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(HttpStatus.ACCEPTED);

    }

    @GetMapping("/arrive-search")
    @Operation(summary = "운송 도착 정보 조회", description = "도착지를 검색하면 해당 도착지로 기록된 운송 정보를 조회하는 API입니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "202", description = "Accept"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<List<TransferArriveSearchRes>> arriveSearch(@RequestParam("destination") String destination) {

        return ResponseEntity.status(HttpStatus.OK).body(transferService.arriveSearch(destination));

    }

    @GetMapping("/departure-search")
    @Operation(summary = "운송 출발 정보 조회", description = "출발지를 검색하면 해당 출발지로 기록된 운송 정보를 조회하는 API입니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "202", description = "Accept"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<List<TransferArriveSearchRes>> departureSearch(@RequestParam("departure") String departure) {

        return ResponseEntity.status(HttpStatus.OK).body(transferService.departureSearch(departure));

    }

}
