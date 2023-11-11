package com.lego.secondsubmit.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductNameSearchReq {

    @Schema(description = "상품 이름", example = "삼성 냉장고")
    private String productName;

}
