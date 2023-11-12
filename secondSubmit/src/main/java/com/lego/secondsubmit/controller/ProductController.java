package com.lego.secondsubmit.controller;

import com.lego.secondsubmit.dto.request.ProductNameSearchReq;
import com.lego.secondsubmit.dto.request.ProductStatusSearchReq;
import com.lego.secondsubmit.dto.request.ProductLineReq;
import com.lego.secondsubmit.dto.response.ProductRes;
import com.lego.secondsubmit.service.ProductService;
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

import java.time.LocalDateTime;

@RestController
@RequiredArgsConstructor
@RequestMapping("/product")
@Tag(name = "MES - 상품 현황", description = "해당 상품에 대한 상태나 라인을 조회하는 기능을 제공하고 있습니다.")
public class ProductController {

    private final ProductService productService;

    @GetMapping("/all")
    @Operation(summary = "전체 상품 조회", description = "전체 상품에 대해 조회 기능 API입니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "조회 완료", content = @Content(schema = @Schema(
                    implementation = ProductRes.class
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
        return ResponseEntity.ok().body(productService.all(pageable));
    }

    @GetMapping("/line-search")
    @Operation(summary = "라인 검색", description = "해당 라인에 대한 모든 상품 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "조회 완료", content = @Content(schema = @Schema(
                    implementation = ProductRes.class
            ))),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> lineSearch(@Parameter(description = "라인", example = "1", name = "line") String line,
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
        return ResponseEntity.ok().body(productService.lineSearch(line, pageable));
    }

    @GetMapping("/dynamic-search")
    @Operation(summary = "동작 중인 상품 검색", description = "현재 동작 중인 상품 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "조회 완료", content = @Content(schema = @Schema(
                    implementation = ProductRes.class
            ))),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> dynamicSearch(@Parameter(description = "날짜", example = "2023-06-29T00:00:00.000", name = "date")@RequestParam LocalDateTime date,
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
        return ResponseEntity.ok().body(productService.dynamicSearch(date, pageable));

    }

    @GetMapping("/already-end-search")
    @Operation(summary = "동작이 종료된 상품 조회", description = "현재 동작이 종료된 상품 리스트 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "조회 완료", content = @Content(schema = @Schema(
                    implementation = ProductRes.class
            ))),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> alreadyEndSearch(@Parameter(description = "날짜", example = "2023-03-03T00:00:00.000", name = "date")@RequestParam LocalDateTime date,
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
        return ResponseEntity.ok().body(productService.alreadyEndSearch(date, pageable));

    }

    @GetMapping("/yet-start-search")
    @Operation(summary = "동작이 실행 전인 상품 조회", description = "현재 동작이 실행 전인 상품 리스트 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "조회 완료", content = @Content(schema = @Schema(
                    implementation = ProductRes.class
            ))),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> yetStartSearch(@Parameter(description = "날짜", example = "2023-03-03T00:00:00.000", name = "date")@RequestParam LocalDateTime date,
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
        return ResponseEntity.ok().body(productService.yetStartSearch(date, pageable));

    }

    @GetMapping("/status-search")
    @Operation(summary = "동작 상태로 검색", description = "현재 검색한 상태중인 상품들 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "조회 완료", content = @Content(schema = @Schema(
                    implementation = ProductRes.class
            ))),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> statusSearch(@Parameter(description = "동작 상태", example = "점검 중", name = "status") String status,
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
        return ResponseEntity.ok().body(productService.statusSearch(status, pageable));

    }

    @GetMapping("/product-search")
    @Operation(summary = "제품 검색", description = "검색명이 포함된 제품들으 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "조회 완료", content = @Content(schema = @Schema(
                    implementation = ProductRes.class
            ))),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> productSearch(@Parameter(description = "제품명", example = "삼성 냉장고", name = "productName") String productName,
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
        return ResponseEntity.ok().body(productService.productSearch(productName, pageable));
    }
}
