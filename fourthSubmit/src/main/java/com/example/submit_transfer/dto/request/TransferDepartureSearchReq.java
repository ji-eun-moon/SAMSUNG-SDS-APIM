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
public class TransferDepartureSearchReq {

    @Schema(description = "출발지", example = "광명시")
    private String departureLocation;

}
