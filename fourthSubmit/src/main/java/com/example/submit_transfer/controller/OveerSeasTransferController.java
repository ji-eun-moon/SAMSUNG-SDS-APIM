package com.example.submit_transfer.controller;

import com.example.submit_transfer.dto.request.TransferRegisterReq;
import com.example.submit_transfer.dto.response.OverseasTransferArriveSearchRes;
import com.example.submit_transfer.service.OverSeasTransferService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;

@RestController
@RequiredArgsConstructor
@RequestMapping("/overseas-transfer")
@Tag(name = "해외 운송 정보 관련", description = "해외 운송정보와 출발지, 도착지, 날짜에 관련한 기록 조회 기능을 제공하고 있습니다.")
public class OveerSeasTransferController {

    private final OverSeasTransferService transferService;

    @PostMapping("/register")
    @Operation(summary = "해외 운송 정보 등록", description = "운송 정보를 기록하는 API 입니다.")
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

    @GetMapping("/arrive-location-search")
    @Operation(summary = "해외 운송 도착 정보 조회", description = "도착지를 검색하면 해당 도착지로 기록된 운송 정보를 조회하는 API입니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "조회 완료", content = @Content(schema = @Schema(
                    implementation = OverseasTransferArriveSearchRes.class
            ))),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> arriveSearch(@Parameter(description = "도착지", example = "New York", name = "arriveLocation") String arriveLocation,
                                          @Parameter(description = "페이지", example = "0", name = "page")@RequestParam(required = false) Integer page,
                                          @Parameter(description = "사이즈", example = "2", name = "size")@RequestParam(required = false) Integer size) {


        if (page == null) {
            page = 0;
        }
        if (size == null) {
            size = 2;
        }
        if (page < 0 || size < 1) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.status(HttpStatus.OK).body(transferService.arriveSearch(arriveLocation, pageable));

    }

    @GetMapping("/departure-location-search")
    @Operation(summary = "해외 운송 출발 정보 조회", description = "출발지를 검색하면 해당 출발지로 기록된 운송 정보를 조회하는 API입니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "조회 완료", content = @Content(schema = @Schema(
                    implementation = OverseasTransferArriveSearchRes.class
            ))),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> departureSearch(@Parameter(description = "출발지", example = "Seoul", name = "departureLocation") String departureLocation,
                                             @Parameter(description = "페이지", example = "0", name = "page")@RequestParam(required = false) Integer page,
                                             @Parameter(description = "사이즈", example = "2", name = "size")@RequestParam(required = false) Integer size) {


        if (page == null) {
            page = 0;
        }
        if (size == null) {
            size = 2;
        }
        if (page < 0 || size < 1) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        Pageable pageable = PageRequest.of(page, size);

        return ResponseEntity.status(HttpStatus.OK).body(transferService.departureSearch(departureLocation, pageable));

    }

    @GetMapping("/product-search")
    @Operation(summary = "해외 물품 정보 조회 - 물품", description = "물품 정보로 검색하면 해당 물품의 모든 운송 정보를 조회하는 API입니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "조회 완료", content = @Content(schema = @Schema(
                    implementation = OverseasTransferArriveSearchRes.class
            ))),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> productSearch(@Parameter(description = "물품", example = "가공 식품", name = "product") String product,
                                           @Parameter(description = "페이지", example = "0", name = "page")@RequestParam(required = false) Integer page,
                                           @Parameter(description = "사이즈", example = "2", name = "size")@RequestParam(required = false) Integer size) {

        if (page == null) {
            page = 0;
        }
        if (size == null) {
            size = 2;
        }
        if (page < 0 || size < 1) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        Pageable pageable = PageRequest.of(page, size);


        return ResponseEntity.status(HttpStatus.OK).body(transferService.productSearch(product, pageable));

    }

    @GetMapping("/way-bill-search")
    @Operation(summary = "해외 물품 정보 조회 - 운송장 번호", description = "운송장 번호로 검색하면 해당 물품의 모든 운송 정보를 조회하는 API입니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "조회 완료", content = @Content(schema = @Schema(
                    implementation = OverseasTransferArriveSearchRes.class
            ))),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> wayBillSearch(@Parameter(description = "운송장 번호", example = "PER0001", name = "wayBill")@RequestParam String wayBill) {

        return ResponseEntity.status(HttpStatus.OK).body(transferService.wayBillSearch(wayBill));

    }

    @GetMapping("/arrival-date-search")
    @Operation(summary = "해외 해당 날짜 이후 도착건 조회", description = "날짜를 검색하면 해당 날짜 포함 이후 날짜에 도착한 운송 정보를 조회하는 API입니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "조회 완료", content = @Content(schema = @Schema(
                    implementation = OverseasTransferArriveSearchRes.class
            ))),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> departureDateSearch(@Parameter(description = "도착 날짜", example = "2023-12-25", name = "arriveDate") LocalDate arriveDate,
                                                 @Parameter(description = "페이지", example = "0", name = "page")@RequestParam(required = false) Integer page,
                                                 @Parameter(description = "사이즈", example = "2", name = "size")@RequestParam(required = false) Integer size) {

        if (page == null) {
            page = 0;
        }
        if (size == null) {
            size = 2;
        }
        if (page < 0 || size < 1) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        Pageable pageable = PageRequest.of(page, size);

        return ResponseEntity.status(HttpStatus.OK).body(transferService.departureDateSearch(arriveDate, pageable));

    }

    @GetMapping("/departure-date-search")
    @Operation(summary = "해외 해당 날짜 이후 출발건 조회", description = "날짜를 검색하면 해당 날짜 포함 이후 날짜에 출발한 운송 정보를 조회하는 API입니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "조회 완료", content = @Content(schema = @Schema(
                    implementation = OverseasTransferArriveSearchRes.class
            ))),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> arrivalDateSearch(@Parameter(description = "출발 날짜", example = "2023-12-25", name = "departureDate") LocalDate departureDate,
                                               @Parameter(description = "페이지", example = "0", name = "page")@RequestParam(required = false) Integer page,
                                               @Parameter(description = "사이즈", example = "2", name = "size")@RequestParam(required = false) Integer size) {

        if (page == null) {
            page = 0;
        }
        if (size == null) {
            size = 2;
        }
        if (page < 0 || size < 1) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        Pageable pageable = PageRequest.of(page, size);

        return ResponseEntity.status(HttpStatus.OK).body(transferService.departureDateSearch(departureDate, pageable));

    }

}
