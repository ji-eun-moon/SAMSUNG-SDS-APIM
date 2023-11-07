package com.lego.apiservice.messageQueue;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.lego.apiservice.api.entity.domain.ApiMethod;
import com.lego.apiservice.usage.entity.dto.request.CreateUsageRequest;
import com.lego.apiservice.usage.service.ElasticUsageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class KafkaConsumer {

    // 레포지 토리 연결
    private final ElasticUsageService elasticUsageService;

    @KafkaListener(topics = "usage-register-topic-local")
    public void usageRegisterQty(String kafkaMessage) {
        JSONParser parser = new JSONParser();

        try {
            JSONObject jsonObject = (JSONObject) parser.parse(kafkaMessage);
            ApiMethod apiMethod = null;
            if (jsonObject.get("method").toString().equals("GET")) {
                apiMethod = ApiMethod.GET;
            } else {
                apiMethod = ApiMethod.POST;
            }
            elasticUsageService.register(new CreateUsageRequest(LocalDateTime.parse(jsonObject.get("createdAt").toString()), apiMethod,
                    jsonObject.get("endpoint").toString(), jsonObject.get("teamName").toString(),
                    Long.valueOf(jsonObject.get("categoryId").toString()), Long.valueOf(jsonObject.get("ResponseTime").toString()),
                    Integer.valueOf(jsonObject.get("ResponseCode").toString())));
        } catch (ParseException e) {
            e.printStackTrace();
        }


        // 사용량 적재 로직

//
    }
}
