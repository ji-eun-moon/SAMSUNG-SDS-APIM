package com.lego.apiservice.messageQueue;

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

@Service
@Slf4j
@RequiredArgsConstructor
public class KafkaConsumer {

    // 레포지 토리 연결
    private final ElasticUsageService elasticUsageService;

    @KafkaListener(topics = "${kafka-topic}")
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

            if (jsonObject.isEmpty()) {
                throw new RuntimeException();
            }


            elasticUsageService.register(new CreateUsageRequest(LocalDateTime.parse(jsonObject.get("createdAt").toString()), apiMethod,
                    jsonObject.get("endpoint").toString(), jsonObject.get("teamName").toString(),
                    jsonObject.get("categoryId").toString(), Long.valueOf(jsonObject.get("ResponseTime").toString()) + 10,
                    jsonObject.get("ResponseCode").toString(), jsonObject.get("remoteAddr").toString()));


        } catch (ParseException e) {
            e.printStackTrace();
        }


        // 사용량 적재 로직

//
    }
}
