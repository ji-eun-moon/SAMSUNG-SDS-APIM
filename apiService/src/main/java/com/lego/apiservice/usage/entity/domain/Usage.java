package com.lego.apiservice.usage.entity.domain;

import com.lego.apiservice.api.entity.domain.ApiMethod;
import jakarta.persistence.Column;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "Usage")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Usage {

    @Transient
    public static final String USAGE_SEQUENCE = "Usage_sequence";

    @Id
    private Long _id;

    private LocalDateTime createAt;
    private ApiMethod method;
    private String endpoint;
    private String teamToken;
    private Long categoryId;
    private Long responseTime;
    private Integer responseCode;
}
