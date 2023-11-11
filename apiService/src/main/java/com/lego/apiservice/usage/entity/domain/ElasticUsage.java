package com.lego.apiservice.usage.entity.domain;


import com.lego.apiservice.api.entity.domain.ApiMethod;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.DateFormat;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import java.time.LocalDateTime;

@Document(indexName = "usage")
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ElasticUsage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String _id;

    @Field(type= FieldType.Date, format = DateFormat.date_hour_minute_second_millis)
    private LocalDateTime createdAt;
    private ApiMethod method;
    private String endpoint;
    private String teamName;
    private String categoryId;
    private Long responseTime;
    private String responseCode;
    private String remoteAddr;
}
