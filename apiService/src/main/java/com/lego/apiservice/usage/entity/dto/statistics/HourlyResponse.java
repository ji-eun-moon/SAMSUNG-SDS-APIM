package com.lego.apiservice.usage.entity.dto.statistics;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class HourlyResponse {

    private LocalDateTime date;
    private Integer count;
}
