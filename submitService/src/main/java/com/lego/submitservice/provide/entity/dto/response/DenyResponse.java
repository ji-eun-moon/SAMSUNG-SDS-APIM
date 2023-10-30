package com.lego.submitservice.provide.entity.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class DenyResponse {

    private Long provideId;
    private String denyReason;
}
