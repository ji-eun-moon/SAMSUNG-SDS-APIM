package com.lego.thirdservice.controller;

import com.lego.thirdservice.dto.Availability;
import com.lego.thirdservice.dto.ReservationPerson;
import com.lego.thirdservice.dto.ReservationReq;
import com.lego.thirdservice.entity.Facility;
import com.lego.thirdservice.entity.FacilityReq;
import com.lego.thirdservice.service.FacilityService;
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
@Tag(name = "복지 시설 관리 관련", description = "시설 예약 현황 조회, 예약 등을 관리할 수 있는 기능을 가지고 있습니다.")
public class FacilityController {

    private final FacilityService facilityService;

    @PostMapping("/register")
    @Operation(summary = "시설 등록 API", description = "시설 시퀀스, 시설명, 시섵 타입, 위치를 입력하여 시설 등록하는 API")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Created"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> register(@RequestBody FacilityReq facilityReq) {
        facilityService.register(facilityReq);
        return ResponseEntity.status(HttpStatus.CREATED).body(HttpStatus.CREATED);
    }

    @PostMapping("/reservation/register")
    @Operation(summary = "시설 예약 등록 API", description = "시설 시퀀스, 날짜, 이름을 입력하여 예약 등록하는 API")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Created"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> reservationRegister(@RequestBody ReservationReq reservationReq) {
        facilityService.reservationRegister(reservationReq);
        return ResponseEntity.status(HttpStatus.CREATED).body(HttpStatus.CREATED);
    }

    @GetMapping("/sequence")
    @Operation(summary = "시퀀스를 통한 시설물 조회", description = "시설물 시퀀스를 통해 시설물에 대한 정보를 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "조회 완료", content = @Content(schema =  @Schema(
                    implementation = Facility.class
            ))),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> findFacilityBySequence(@Parameter(description = "시설물 시퀀스",
            example = "1", name = "facilityId") Long facilityId) {
        return ResponseEntity.ok(facilityService.findById(facilityId));
    }

    @GetMapping("/type")
    @Operation(summary = "타입를 통한 시설물 조회", description = "시설물 타입를 통해 시설물들에 대한 정보를 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "조회 완료", content = @Content(schema =  @Schema(
                    implementation = Facility.class
            ))),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> findFacilityByType(@Parameter(description = "시설 타입", example = "운동 시설", name = "facilityType") String facilityType,
                                         @Parameter(description = "원하는 페이지", example = "0", name = "page")@RequestParam(required = false) Integer page,
                                         @Parameter(description = "원하는 사이즈", example = "5", name = "size")@RequestParam(required = false) Integer size) {

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

        return ResponseEntity.ok(facilityService.findByType(facilityType, pageable));
    }

    @GetMapping("/name")
    @Operation(summary = "이름을 통한 시설물 조회", description = "시설물 이름를 통해 시설물에 대한 정보를 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "조회 완료", content = @Content(schema =  @Schema(
                    implementation = Facility.class
            ))),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> findFacilityByName(@Parameter(description = "시설물 이름", example = "휘트니스 센터", name = "facilityName") String facilityName,
                                                @Parameter(description = "원하는 페이지", example = "0", name = "page")@RequestParam(required = false) Integer page,
                                                @Parameter(description = "원하는 사이즈", example = "5", name = "size")@RequestParam(required = false) Integer size) {

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

        return ResponseEntity.ok(facilityService.findByName(facilityName, pageable));
    }

    @GetMapping("/reservation/available")
    @Operation(summary = "시설물 예약 가능 여부", description = "시설물 시퀀스와 날짜를 통해 예약이 가능한 상태인지 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "조회 완료", content = @Content(schema =  @Schema(
                    implementation = Availability.class
            ))),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> findReservationAvailable(@Parameter(description = "시설물 시퀀스", example = "1", name = "facilityId") Long facilityId,
                                                      @Parameter(description = "예약 날짜", example = "2023-11-14", name = "date") LocalDate date) {

        return ResponseEntity.ok(facilityService.reservationAble(facilityId, date));
    }

    @GetMapping("/reservation/person")
    @Operation(summary = "예약자 이름을 통한 예약 조회", description = "예약자 이름을 통해 해당 이름으로 예약되어 있는 모든 예약 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "조회 완료", content = @Content(schema =  @Schema(
                    implementation = ReservationPerson.class
            ))),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> findReservationByName(@Parameter(description = "예약자 이름", example = "김정수", name = "reservationName") String reservationName,
                                                @Parameter(description = "원하는 페이지", example = "0", name = "page")@RequestParam(required = false) Integer page,
                                                @Parameter(description = "원하는 사이즈", example = "5", name = "size")@RequestParam(required = false) Integer size) {

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

        return ResponseEntity.ok(facilityService.findReservationByName(reservationName, pageable));
    }
}
