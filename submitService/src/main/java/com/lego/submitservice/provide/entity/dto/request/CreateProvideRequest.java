package com.lego.submitservice.provide.entity.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CreateProvideRequest {

    private Long teamId;
    private String serverName;
    private String description;
    private String endpoint;
}
