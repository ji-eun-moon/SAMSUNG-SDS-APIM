package com.lego.apiservice.usage.entity.dto.statistics;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.YearMonth;
import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MonthCategoryResponse {
    private YearMonth date;
    private List<ApiCount> countList;
}
