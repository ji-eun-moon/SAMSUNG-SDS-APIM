package com.lego.apiservice.usage.entity.dto.statistics;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.YearMonth;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MonthlyResponse {

    private YearMonth date;
    private Integer count;
}
