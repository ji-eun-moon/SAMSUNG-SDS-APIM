package com.lego.submitservice.use.entity.dto.response;

import com.lego.submitservice.provide.entity.domain.State;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UseListResponse {

    private Long useId;
    private String CategoryName;
    private String teamName;
    private String userName;
    private LocalDateTime createdAt;
    private State state;
}
