package com.itda.memberservice.common.kafka;

import com.itda.memberservice.notice.service.NoticeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class KafkaConsumer {

    private final NoticeService noticeService;

    @KafkaListener(topics = "${kafka-topic}")
    public void apiStatusChange(String kafkaMessage) {

        log.info("KafkaListener 동작");

        JSONParser parser = new JSONParser();

        try {
            JSONObject jsonObject = (JSONObject) parser.parse(kafkaMessage);

            String categoryName = jsonObject.get("categoryName").toString();
            String apiName = jsonObject.get("apiName").toString();
            String status = jsonObject.get("status").toString();
            String teamName = jsonObject.get("teamName").toString();

            log.info("{} , {} , {} , {}", categoryName, apiName, status, teamName);

            noticeService.sendStatusChange(categoryName, apiName, status, teamName);

        } catch (ParseException e) {
            e.printStackTrace();
        }

    }

}
