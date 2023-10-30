package com.lego.submitservice.provide.entity.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CreateProvideRequest {

    private String teamName;
    private String serverName;
    private String description;
    private String endpoint;
}
