package com.example.noticeservice.controller;

import com.example.noticeservice.dto.response.ReceiveUnReadNoticeResponse;
import com.example.noticeservice.service.NoticeService;
import com.example.noticeservice.usecheck.UseCheck;
import com.example.noticeservice.usecheck.dto.Member;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
@RequiredArgsConstructor
@Tag(name = "NOTICE", description = "쪽지 관련 api")
@Slf4j
public class NoticeController {

    private final NoticeService noticeService;
    private final UseCheck useCheck;

    @GetMapping("/receive/unread-count")
    @Operation(summary = "안읽은 쪽지 개수", description = "읽지 않은 쪽지 개수")
    public ResponseEntity<Long> unreadNoticeCount(@RequestHeader("member-id") String employeeId) {

        log.info("{} 사번의 읽지 않은 쪽지 갯수 조회", employeeId);

        HashMap<String, String> map = new HashMap<>();
        map.put("employeeId", employeeId);

        Member member = useCheck.getMemberId(map);

        return ResponseEntity.ok(noticeService.unreadNoticeCount(member.getMemberId()));

    }

    @GetMapping("/receive/unread")
    @Operation(summary = "안읽은 쪽지 리스트", description = "아직 읽지 않은 쪽지 리스트 조회")
    public ResponseEntity<Page<ReceiveUnReadNoticeResponse>> receiveUnReadNoticeList(@RequestHeader("member-id") String employeeId, Pageable pageable) {

        log.info("{} 사번의 읽지 않은 쪽지 리스트 조회", employeeId);

        return ResponseEntity.ok(noticeService.receiveUnReadNoticeList(employeeId, pageable));

    }

}
