package com.lego.apiservice.server.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ResponseInfo {
    private String name;
    private String description;
    private String example;
    private String type;
}
