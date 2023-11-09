package com.lego.firstsubmit.controller;

import com.lego.firstsubmit.dto.AttendanceInAndOut;
import com.lego.firstsubmit.dto.AttendanceMonthlyCount;
import com.lego.firstsubmit.dto.AttendanceTime;
import com.lego.firstsubmit.service.AttendanceService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.YearMonth;

@RestController
@RequiredArgsConstructor
@RequestMapping("/attendance")
@Tag(name = "사원 출결 정보 관련", description = "사원 출근, 퇴근 시간 조회, 등록, 전체 출근 기록 조회 기능을 제공하고 있습니다.")
public class AttendanceController {

    private final AttendanceService attendanceService;

    @PostMapping("/check-in")
    @Operation(summary = "출근 기록 API", description = "사원 번호, 출근 일자, 출근 시간을 통해 출근 기록하는 API")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Created"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> checkIn(@RequestBody AttendanceTime attendanceTime) {

        attendanceService.checkIn(attendanceTime);
        return ResponseEntity.status(HttpStatus.CREATED).body(HttpStatus.CREATED);
    }

    @PostMapping("/check-out")
    @Operation(summary = "퇴근 기록 API", description = "사원 번호, 퇴근 일자, 퇴근 시간을 통해 퇴근 기록하는 API - 출근하지 않은날짜에 사용 불가능")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "202", description = "Accept"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> checkOut(@RequestBody AttendanceTime attendanceTime) {

        attendanceService.checkOut(attendanceTime);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(HttpStatus.ACCEPTED);
    }

    @GetMapping("/monthly")
    @Operation(summary = "월간 출퇴근 시간 조회", description = "사원 번호, 년, 월 정보를 통해 출퇴근 시간 기록 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "조회 완료", content = @Content(schema =  @Schema(
                    implementation = AttendanceInAndOut.class
            ))),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> monthly(@Parameter(description = "사원 번호", example = "9999") Long employeeId,
                                     @Parameter(description = "날짜", example = "2023-11") YearMonth date) {
        return ResponseEntity.ok(attendanceService.monthlyTime(employeeId, date));
    }

    @GetMapping("/daily")
    @Operation(summary = "일간 출퇴근 시간 조회", description = "사원 번호, 년, 월, 일 정보를 통해 출퇴근 시간 기록 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "조회 완료", content = @Content(schema =  @Schema(
                    implementation = AttendanceInAndOut.class
            ))),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> daily(@Parameter(description = "사원 번호", example = "9999") Long employeeId,
                                     @Parameter(description = "날짜", example = "2023-11-07") LocalDate date) {
        return ResponseEntity.ok(attendanceService.dailyTime(employeeId, date));
    }

    @GetMapping("/monthly-count")
    @Operation(summary = "월간 출퇴근 날짜수", description = "사원 번호, 년, 월 정보를 통해 출퇴근 날짜 수 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "조회 완료", content = @Content(schema =  @Schema(
                    implementation = AttendanceMonthlyCount.class
            ))),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> monthlyCount(@Parameter(description = "사원 번호", example = "9999") Long employeeId,
                                          @Parameter(description = "날짜", example = "2023-11") YearMonth date) {
        return ResponseEntity.ok(attendanceService.monthlyCount(employeeId, date));
    }
}
