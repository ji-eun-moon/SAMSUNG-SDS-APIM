package com.itda.memberservice.notice.controller;

import com.itda.memberservice.notice.dto.request.NoticeCreateRequest;
import com.itda.memberservice.notice.dto.response.NoticeListResponse;
import com.itda.memberservice.notice.dto.response.ReadNoticeResponse;
import com.itda.memberservice.notice.dto.response.UnReadNoticeResponse;
import com.itda.memberservice.notice.service.NoticeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notice")
@RequiredArgsConstructor
@Slf4j
public class NoticeController {

    private final NoticeService noticeService;

    // 쪽지 보내기
    @PostMapping("/send")
    public ResponseEntity<String> sendNotice(@RequestHeader("member-id") String employeeId, @RequestBody NoticeCreateRequest request) {

        log.info(("{NoticeController} : 쪽지 보내기 \n" +
                "employeeId = " + employeeId));

        noticeService.sendNotice(employeeId, request);

        return ResponseEntity.ok("쪽지 보내는거 성공");

    }

    // 안읽은 쪽지 개수 조회
    @GetMapping("/unread-count")
    public ResponseEntity<Long> unreadNoticeCount(@RequestHeader("member-id") String employeeId) {

        log.info("{NoticeController} : 안읽은 쪽지 개수 조회 \n" +
                "employeeId = " + employeeId);
        
        return ResponseEntity.ok(noticeService.unreadNoticeCount(employeeId));

    }

    // 받은 쪽지 - 안읽은 쪽지 조회
    @GetMapping("/unread")
    public ResponseEntity<List<UnReadNoticeResponse>> unreadNoticeList(@RequestHeader("member-id") String employeeId) {

        log.info("{NoticeController} : 안읽은 쪽지 조회 \n" +
                "employeeId = " + employeeId);
        
        return ResponseEntity.ok(noticeService.unreadNoticeList(employeeId));

    }

    // 받은 쪽지 - 읽은 쪽지 조회
    @GetMapping("/read")
    public ResponseEntity<List<ReadNoticeResponse>> readNoticeList(@RequestHeader("member-id") String employeeId) {

        log.info("{NoticeController} : 읽은 쪽지 조회 \n" +
                "employeeId = " + employeeId);
        
        return ResponseEntity.ok(noticeService.readNoticeList(employeeId));

    }

    // 받은 쪽지 - 전체 쪽지 조회
    @GetMapping("/all")
    public ResponseEntity<List<NoticeListResponse>> receiveAll(@RequestHeader("member-id") String employeeId) {

        log.info("{NoticeController} : 전체 쪽지 조회 \n" +
                "employeeId = " + employeeId);
        
        return ResponseEntity.ok(noticeService.receiveAll(employeeId));

    }

    // 받은 쪽지 상세 조회

    // 보낸 쪽지 - 안읽은 쪽지 조회

    // 보낸 쪽지 - 읽은 쪽지 조회

    // 보낸 쪽지 - 전체 쪽지 조회

    // 보낸 쪽지 상세 조회

    // 쪽지 삭제 - 양쪽에 한쪽만 삭제

}
