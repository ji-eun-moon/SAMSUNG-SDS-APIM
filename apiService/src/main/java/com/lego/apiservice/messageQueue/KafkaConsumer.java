//package com.lego.apiservice.messageQueue;
//
//import com.fasterxml.jackson.core.JsonProcessingException;
//import com.fasterxml.jackson.core.type.TypeReference;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.lego.apiservice.usage.entity.dto.request.CreateUsageRequest;
//import com.lego.apiservice.usage.service.ElasticUsageService;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.json.simple.JSONObject;
//import org.json.simple.parser.JSONParser;
//import org.json.simple.parser.ParseException;
//import org.springframework.kafka.annotation.KafkaListener;
//import org.springframework.stereotype.Service;
//
//import java.util.HashMap;
//import java.util.Map;
//
//@Service
//@Slf4j
//@RequiredArgsConstructor
//public class KafkaConsumer {
//
//    // 레포지 토리 연결
//    private final ElasticUsageService elasticUsageService;
//
//    @KafkaListener(topics = "usage-register-topic")
//    public void usageRegiterQty(String kafkaMessage) {
//        log.info("Kafka Message : " + kafkaMessage);
//        log.info(kafkaMessage);
//        JSONParser parser = new JSONParser();
//        JSONObject jsonObject = null;
//        try {
//            jsonObject = (JSONObject) parser.parse(kafkaMessage);
//
//
//        } catch (ParseException e) {
//            e.printStackTrace();
//        }
//        assert jsonObject != null;
//        log.info("createAt " + jsonObject.get("createAt"));
//        log.info("endpoint " + jsonObject.get("endpoint"));
//        log.info("method " + jsonObject.get("method"));
//        log.info("teamName " + jsonObject.get("teamName"));
//        log.info("categoryId " + jsonObject.get("categoryId"));
//        log.info("ResponseTime " + jsonObject.get("ResponseTime"));
//        log.info("ResponseCode " + jsonObject.get("ResponseCode"));
//
//
//        // 사용량 적재 로직
//
////        elasticUsageService.register(new CreateUsageRequest(map.get("")));
//    }
//}
