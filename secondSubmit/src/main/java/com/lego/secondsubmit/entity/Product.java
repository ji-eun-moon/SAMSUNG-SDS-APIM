package com.lego.secondsubmit.entity;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    @Schema(description = "생산라인 시퀀스", example = "1")
    private Long id;

    @Schema(description = "라인 번호", example = "라인-1")
    private String line;

    @Schema(description = "상태", example = "점검 중")
    private String status;

    @Schema(description = "제품 명", example = "삼성 냉장고")
    private String productName;

    @Schema(description = "생산 양", example = "461")
    private String productionQuantity;

    @Schema(description = "불량 양", example = "82")
    private String defectQuantity;

    @Schema(description = "생산 시작 시간", example = "2023-06-28 18:45:20")
    private LocalDateTime productionStartTime;

    @Schema(description = "생산 종료 시간", example = "2023-06-29 00:58:20")
    private LocalDateTime productionEndTime;

}
