package com.lego.firstsubmit.controller;

import com.lego.firstsubmit.domain.Employee;
import com.lego.firstsubmit.repository.EmployeeRepository;
import com.lego.firstsubmit.dto.EmployeeDepartment;
import com.lego.firstsubmit.dto.EmployeeIdToHireDate;
import com.lego.firstsubmit.dto.EmployeeIdToSalary;
import com.lego.firstsubmit.dto.EmployeeIdToTel;
import com.lego.firstsubmit.service.EmployeeService;
import com.opencsv.exceptions.CsvException;
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

import java.io.IOException;
import java.time.LocalDate;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("")
@Tag(name = "사원 정보 조회", description = "사원의 개인 정보, 연락처 정보, 입사일, 직급 및 부서, 연봉과 같은 기본 정보를 조회할 수 있는 기능을 제공하고 있습니다.")
public class EmployeeController {

    private final EmployeeRepository employeeRepository;
    private final EmployeeService employeeService;

    @PostMapping("")
    @Operation(hidden = true)
    public ResponseEntity<?> register() throws IOException, CsvException {
        employeeService.register();
        return ResponseEntity.status(HttpStatus.CREATED).body(HttpStatus.CREATED);
    }


    @GetMapping("/all")
    @Operation(summary = "모든 사원 전체 정보", description = "페이지와 사이즈를 통해 사원 전체 정보를 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "조회 완료", content = @Content(schema =  @Schema(
                    implementation = Employee.class
            ))),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> getAll(@Parameter(description = "원하는 페이지", example = "0")@RequestParam(required = false) Integer page,
                                    @Parameter(description = "원하는 사이즈", example = "5")@RequestParam(required = false) Integer size) {

        if (page == null) {
            page = 0;
        }
        if (size == null) {
            size = 5;
        }

        if (page < 0 || size < 1) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }


         Pageable pageable = PageRequest.of(page, size);

        return ResponseEntity.ok(employeeRepository.findAllBy(pageable));
    }

    @GetMapping("/all/name")
    @Operation(summary = "모든 사원 사번, 부서, 직급, 이름 정보", description = "페이지와 사이즈를 통해 사원 사번, 부서, 직급, 이름 정보를 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "조회 완료", content = @Content(schema =  @Schema(
                    implementation = EmployeeDepartment.class
            ))),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> getAllName(@Parameter(description = "원하는 페이지", example = "0")@RequestParam(required = false) Integer page,
                                    @Parameter(description = "원하는 사이즈", example = "5")@RequestParam(required = false) Integer size) {

        if (page == null) {
            page = 0;
        }
        if (size == null) {
            size = 5;
        }

        if (page < 0 || size < 1) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }

        Pageable pageable = PageRequest.of(page, size);

        return ResponseEntity.ok(employeeRepository.findAllBy(pageable).map(EmployeeDepartment::new));
    }

    @GetMapping("/tel")
    @Operation(summary = "사번을 통한 휴대폰 번호 조회", description = "사번을 통해 이름, 휴대폰 번호 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "조회 완료", content = @Content(schema =  @Schema(
                    implementation = EmployeeIdToTel.class
            ))),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> getTel(@Parameter(description = "사번", example = "2697") Long employeeId) {

        Optional<Employee> employee= employeeRepository.findById(employeeId);
        if (employee.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok(new EmployeeIdToTel(employee.get()));
    }

    @GetMapping("/hireDate")
    @Operation(summary = "사번을 통한 입사일 조회", description = "사번을 통해 이름, 입사일 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "조회 완료", content = @Content(schema =  @Schema(
                    implementation = EmployeeIdToHireDate.class
            ))),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> getHireDate(@Parameter(description = "사번", example = "2697") Long employeeId) {

        Optional<Employee> employee= employeeRepository.findById(employeeId);
        if (employee.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok(new EmployeeIdToHireDate(employee.get()));
    }

    @GetMapping("/salary")
    @Operation(summary = "사번을 통한 연봉 조회", description = "사번을 통해 이름, 연봉(만원) 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "조회 완료", content = @Content(schema =  @Schema(
                    implementation = EmployeeIdToSalary.class
            ))),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> getSalary(@Parameter(description = "사번", example = "2697") Long employeeId) {

        Optional<Employee> employee= employeeRepository.findById(employeeId);
        if (employee.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok(new EmployeeIdToSalary(employee.get()));
    }

    @GetMapping("/hire-date/employee")
    @Operation(summary = "입사일을 통한 사원 정보 전체 조회", description = "입사일을 통해 사원 정보 전체 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "조회 완료", content = @Content(schema =  @Schema(
                    implementation = Employee.class
            ))),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> getEmployeeToHireDate(@Parameter(description = "시작일", example = "2015-01-01") String start,
                                                   @Parameter(description = "종료일", example = "2020-12-31") String end,
                                                   @Parameter(description = "원하는 페이지", example = "0")@RequestParam(required = false) Integer page,
                                                   @Parameter(description = "원하는 사이즈", example = "5")@RequestParam(required = false) Integer size) {
        if (page == null) {
            page = 0;
        }
        if (size == null) {
            size = 5;
        }
        if (page < 0 || size < 1) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        LocalDate startDate = null;
        LocalDate endDate = null;
        try {
            startDate = LocalDate.parse(start);
            endDate = LocalDate.parse(end);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }

        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(employeeRepository.findAllByHireDateGreaterThanEqualAndHireDateLessThanEqual(startDate, endDate, pageable));
    }
}
