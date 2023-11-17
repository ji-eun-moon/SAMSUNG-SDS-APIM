package com.lego.submitservice.provide.entity.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AcceptRequest {

    private Long provideId;
    private String endpoint;
}
