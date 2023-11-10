package com.lego.apiservice.usage.entity.dto.statistics;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ResponseTimeCategoryResponse {

    private Long apiId;
    private String apiTitle;
    private List<ResponseTimeResponse> responseTimeResponses;
}
