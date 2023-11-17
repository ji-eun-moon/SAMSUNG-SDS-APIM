package com.lego.secondsubmit.controller;

import com.lego.secondsubmit.dto.request.WorkerCreateReq;
import com.lego.secondsubmit.dto.request.WorkerShiftCreateReq;
import com.lego.secondsubmit.dto.response.ProductRes;
import com.lego.secondsubmit.dto.response.WorkerRes;
import com.lego.secondsubmit.dto.response.WorkerShiftRes;
import com.lego.secondsubmit.service.WorkerService;
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
@RequestMapping("/worker")
@Tag(name = "MES - 작업", description = "작업자에 대한 생성, 조회와 작업일자 생성, 조회 기능을 제공하고 있습니다.")
public class WorkerController {
    private final WorkerService workerService;

    @PostMapping("/register")
    @Operation(summary = "작업자 등록", description = "작업자 정보를 통해 작업자를 등록하는 API입니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201",description = "CREATED"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> workerRegister(@RequestBody WorkerCreateReq workerCreateReq) {
        workerService.workerRegister(workerCreateReq);
        return ResponseEntity.status(HttpStatus.CREATED).body(HttpStatus.CREATED);
    }

    @PostMapping("/shift/register")
    @Operation(summary = "작업 일자 등록", description = "작업자 시퀀스와 일자 정보를 통해 작업 일자를 등록하는 API입니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201",description = "CREATED"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> workerShiftRegister(@RequestBody WorkerShiftCreateReq workerShiftCreateReq) {
        workerService.workerShiftRegister(workerShiftCreateReq);
        return ResponseEntity.status(HttpStatus.CREATED).body(HttpStatus.CREATED);
    }


    @GetMapping("/all")
    @Operation(summary = "전체 작업자 조회", description = "전체 작업자를 조회하는 API입니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "조회 완료", content = @Content(schema = @Schema(
                    implementation = WorkerRes.class
            ))),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> all(@Parameter(description = "원하는 페이지", example = "0", name = "page")@RequestParam(required = false) Integer page,
                                 @Parameter(description = "원하는 사이즈", example = "2", name = "size")@RequestParam(required = false) Integer size) {

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
        return ResponseEntity.ok().body(workerService.findAll(pageable));
    }

    @GetMapping("/shift/all")
    @Operation(summary = "작업 일자 전체 조회", description = "해당하는 작업자에 대한 모든 작업 날짜를 조회하는 API입니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "조회 완료", content = @Content(schema = @Schema(
                    implementation = WorkerShiftRes.class
            ))),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> shiftAll(@Parameter(description = "작업자 시퀀스", example = "1", name = "workerId") Long workerId,
                                      @Parameter(description = "원하는 페이지", example = "0", name = "page")@RequestParam(required = false) Integer page,
                                      @Parameter(description = "원하는 사이즈", example = "2", name = "size")@RequestParam(required = false) Integer size) {

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
        return ResponseEntity.ok().body(workerService.findAllWorkerShiftByWorkerId(workerId, pageable));
    }

    @GetMapping("/detail")
    @Operation(summary = "작업자 세부 조회", description = "해당하는 작업자에 세부 정보를 조회하는 API입니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "조회 완료", content = @Content(schema = @Schema(
                    implementation = WorkerRes.class
            ))),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> shiftAll(@Parameter(description = "작업자 시퀀스", example = "1", name = "workerId") Long workerId) {

        return ResponseEntity.ok().body(workerService.findWorkerById(workerId));
    }

    @GetMapping("/shift/detail")
    @Operation(summary = "작업 일자 세부 조회", description = "해당하는 작업자에 대한 해당 작업 날짜를 조회하는 API입니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "조회 완료", content = @Content(schema = @Schema(
                    implementation = WorkerShiftRes.class
            ))),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> shiftAll(@Parameter(description = "작업자 시퀀스", example = "1", name = "workerId") Long workerId,
                                      @Parameter(description = "작업 날짜", example = "2023-11-17", name = "workingDay") LocalDate workingDay) {


        return ResponseEntity.ok().body(workerService.findWorkerShiftByWorkerIdAndDate(workerId, workingDay));
    }
}
