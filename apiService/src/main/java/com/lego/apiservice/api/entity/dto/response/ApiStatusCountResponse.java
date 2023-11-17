package com.lego.apiservice.api.entity.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ApiStatusCountResponse {

    private Integer success;
    private Integer warning;
    private Integer error;
}
