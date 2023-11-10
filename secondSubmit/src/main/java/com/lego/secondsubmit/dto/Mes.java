package com.lego.secondsubmit.dto;

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
public class Mes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "mes_id")
    @Schema(description = "생산라인 시퀀스", example = "1")
    private Long id;

    @Schema(description = "생산라인 시퀀스", example = "1")
    private String line;

    @Schema(description = "생산라인 시퀀스", example = "1")
    private String product;

    @Schema(description = "생산라인 시퀀스", example = "1")
    private Integer acceptance;

    @Schema(description = "생산라인 시퀀스", example = "1")
    private Integer defective;

    @Schema(description = "생산라인 시퀀스", example = "1")
    private LocalDateTime startDate;

    @Schema(description = "생산라인 시퀀스", example = "1")
    private LocalDateTime endDate;

}
