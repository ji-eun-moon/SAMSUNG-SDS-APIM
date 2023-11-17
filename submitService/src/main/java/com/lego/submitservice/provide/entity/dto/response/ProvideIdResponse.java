package com.lego.submitservice.provide.entity.dto.response;

import com.lego.submitservice.provide.entity.domain.Provide;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ProvideIdResponse {
    private Long provideId;

    public ProvideIdResponse(Provide provide) {
        this.provideId = provide.getId();
    }
}
