package com.itda.memberservice.common.kafka;

import com.itda.memberservice.error.CustomException;
import com.itda.memberservice.error.ErrorCode;
import com.itda.memberservice.member.repository.MemberRepository;
import com.itda.memberservice.memberteam.repository.MemberTeamRepository;
import com.itda.memberservice.notice.entity.Notice;
import com.itda.memberservice.notice.repository.EmitterRepository;
import com.itda.memberservice.notice.repository.NoticeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.http.MediaType;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class KafkaConsumer {

    private final NoticeRepository noticeRepository;
    private final EmitterRepository emitterRepository;
    private final MemberRepository memberRepository;
    private final MemberTeamRepository memberTeamRepository;

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

            List<String> employeeIds = memberTeamRepository.findEmployeeIdByTeamName(teamName);

            Map<String, String> map = new HashMap<>();
            map.put("categoryName", categoryName);
            map.put("apiName", apiName);
            map.put("status", status);
            map.put("teamName", teamName);

            String title = apiName + " 상태 변경 알림";
            String content = categoryName + "의 " + apiName + " API 상태가 " + status + "로 변경되었습니다.";

            for (String employeeId : employeeIds) {

                log.info("받을 사람 employeeId = {}", employeeId);

                noticeRepository.save(Notice.builder()
                                .title(title)
                                .content(content)
                                .isRead(false)
                                .isSenderDeleted(false)
                                .isReceiverDeleted(false)
                                .sender(memberRepository.findByEmployeeId("admin")
                                        .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND)))
                                .receiver(memberRepository.findByEmployeeId(employeeId)
                                        .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND)))
                        .build());

                if (emitterRepository.find(employeeId).isPresent()) {

                    log.info("{} 번 사원 SSE 연결 여부 = {}", employeeId, emitterRepository.find(employeeId).isPresent());

                    SseEmitter emitter = emitterRepository.find(employeeId).get();

                    emitter.send(SseEmitter.event()
                            .name("statusChange")
                            .data(map, MediaType.APPLICATION_JSON));

                }

            }


        } catch (ParseException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

}
