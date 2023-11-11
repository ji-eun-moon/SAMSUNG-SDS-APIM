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
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/product")
@Tag(name = "상품 상태 현황 조회", description = "해당 상품에 대한 상태나 라인을 조회하는 기능을 제공하고 있습니다.")
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
    public ResponseEntity<?> all() {

        return ResponseEntity.ok().body(productService.all());

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
    public ResponseEntity<?> lineSearch(@Parameter(description = "라인", example = "1", name = "line") String line) {

        return ResponseEntity.ok().body(productService.lineSearch(line));

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
    public ResponseEntity<?> dynamicSearch() {

        return ResponseEntity.ok().body(productService.dynamicSearch());

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
    public ResponseEntity<?> alreadyEndSearch() {

        return ResponseEntity.ok().body(productService.alreadyEndSearch());

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
    public ResponseEntity<?> yetStartSearch() {

        return ResponseEntity.ok().body(productService.yetStartSearch());

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
    public ResponseEntity<?> statusSearch(@Parameter(description = "동작 상태", example = "점검 중", name = "status") String status) {

        return ResponseEntity.ok().body(productService.statusSearch(status));

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
    public ResponseEntity<?> productSearch(@Parameter(description = "제품명", example = "삼성 냉장고", name = "productName") String productName) {

        return ResponseEntity.ok().body(productService.productSearch(productName));

    }


}
