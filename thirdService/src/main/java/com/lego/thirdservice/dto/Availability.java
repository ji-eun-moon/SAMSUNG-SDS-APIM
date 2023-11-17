package com.lego.thirdservice.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Availability {

    @Schema(name = "able", description = "예약 가능 여부 true/false", example = "true")
    public Boolean able;
}
