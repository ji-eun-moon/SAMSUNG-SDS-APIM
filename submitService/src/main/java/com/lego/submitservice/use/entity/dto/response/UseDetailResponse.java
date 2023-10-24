package com.lego.submitservice.use.entity.dto.response;

import com.lego.submitservice.provide.entity.domain.ApplyType;
import com.lego.submitservice.provide.entity.domain.State;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UseDetailResponse {

    private Long useId;
    private String categoryName;
    private String description;
    private String teamName;
    private String userName;
    private LocalDateTime createdAt;
    private State state;
    private String failReason;
}
