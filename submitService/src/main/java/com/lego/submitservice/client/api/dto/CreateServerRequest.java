package com.lego.submitservice.client.api.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CreateServerRequest {

    private String serverName;
    private String description;
    private String endPoint;
    private String employeeId;
    private String teamName;
}
