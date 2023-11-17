package com.example.submit_transfer.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TransferWayBillSearchReq {

    @Schema(description = "운송장 번호", example = "INV0001")
    private String wayBill;

}
