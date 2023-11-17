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
public class TransferArriveSearchReq {

    @Schema(description = "도착지", example = "부여군")
    private String arriveLocation;

}
