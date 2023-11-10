package com.lego.itdagateway.messageQueue;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CreateUsageRequest {

    private LocalDateTime createAt;
    private String method;
    private String endpoint;
    private String teamName;
    private Long categoryId;
    private Long responseTime;
    private Integer responseCode;
    private String remoteAddr;

}
