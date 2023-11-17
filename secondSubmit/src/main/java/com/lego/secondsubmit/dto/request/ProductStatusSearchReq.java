package com.lego.secondsubmit.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductStatusSearchReq {

    @Schema(description = "동작 상태", example = "점검 중")
    private String status;

}
