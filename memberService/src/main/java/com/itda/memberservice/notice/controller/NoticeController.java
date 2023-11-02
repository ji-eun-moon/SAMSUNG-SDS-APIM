package com.itda.memberservice.notice.controller;

import com.itda.memberservice.notice.dto.request.NoticeCreateRequest;
import com.itda.memberservice.notice.dto.response.*;
import com.itda.memberservice.notice.service.NoticeService;
import io.swagger.v3.oas.annotations.Operation;
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
    @Operation(summary = "쪽지 전송", description = "쪽지 전송하기")
    public ResponseEntity<String> sendNotice(@RequestHeader("member-id") String employeeId, @RequestBody NoticeCreateRequest request) {

        log.info(("{NoticeController} : 쪽지 보내기 \n" +
                "employeeId = " + employeeId));

        noticeService.sendNotice(employeeId, request);

        return ResponseEntity.ok("쪽지 보내는거 성공");

    }

    // 안읽은 쪽지 개수 조회
    @GetMapping("/receive/unread-count")
    @Operation(summary = "안읽은 쪽지 개수", description = "읽지 않은 쪽지 개수")
    public ResponseEntity<Long> unreadNoticeCount(@RequestHeader("member-id") String employeeId) {

        log.info("{NoticeController} : 받은 쪽지 - 안읽은 쪽지 개수 조회 \n" +
                "employeeId = " + employeeId);
        
        return ResponseEntity.ok(noticeService.unreadNoticeCount(employeeId));

    }

    // 받은 쪽지 - 안읽은 쪽지 조회
    @GetMapping("/receive/unread")
    @Operation(summary = "안읽은 쪽지 리스트", description = "아직 읽지 않은 쪽지 리스트 조회")
    public ResponseEntity<List<ReceiveUnReadNoticeResponse>> receiveUnReadNoticeList(@RequestHeader("member-id") String employeeId) {

        log.info("{NoticeController} : 받은 쪽지 - 안읽은 쪽지 조회 \n" +
                "employeeId = " + employeeId);
        
        return ResponseEntity.ok(noticeService.receiveUnReadNoticeList(employeeId));

    }

    // 받은 쪽지 - 읽은 쪽지 조회
    @GetMapping("/receive/read")
    @Operation(summary = "읽은 쪽지 리스트", description = "읽은 쪽지 리스트 조회")
    public ResponseEntity<List<ReceiveReadNoticeResponse>> receiveReadNoticeList(@RequestHeader("member-id") String employeeId) {

        log.info("{NoticeController} : 받은 쪽지 - 읽은 쪽지 조회 \n" +
                "employeeId = " + employeeId);
        
        return ResponseEntity.ok(noticeService.receiveReadNoticeList(employeeId));

    }

    // 받은 쪽지 - 전체 쪽지 조회
    @GetMapping("/receive/all")
    @Operation(summary = "전체 쪽지 조회", description = "받은 쪽지 전체 조회")
    public ResponseEntity<List<ReceiveNoticeListResponse>> receiveAll(@RequestHeader("member-id") String employeeId) {

        log.info("{NoticeController} : 받은 쪽지 - 전체 쪽지 조회 \n" +
                "employeeId = " + employeeId);
        
        return ResponseEntity.ok(noticeService.receiveAll(employeeId));

    }

    // 받은 쪽지 상세 조회
    @GetMapping("/receive/{notice_id}")
    @Operation(summary = "쪽지 상세 조회", description = "쪽지 상세 조회하기")
    public ResponseEntity<ReceiveNoticeDetailResponse> receiveDetail(@RequestHeader("member-id") String employeeId, @PathVariable("notice_id") Long noticeId) {

        log.info("{NoticeController} : 쪽지 상세 조회 \n" +
                "employeeId = " + employeeId);

        return ResponseEntity.ok(noticeService.receiveDetail(employeeId, noticeId));

    }

    // 보낸 쪽지 - 안읽은 쪽지 조회
    @GetMapping("/send/unread")
    @Operation(summary = "안읽은 쪽지 리스트", description = "보낸 쪽지 중 읽지 않은 쪽지 리스트 조회")
    public ResponseEntity<List<SendUnReadNoticeResponse>> sendUnReadNoticeList(@RequestHeader("member-id") String employeeId) {

        log.info("{NoticeController} : 보낸 쪽지 - 안읽은 쪽지 리스트 조회 \n" +
                "employeeId = " + employeeId);

        return ResponseEntity.ok(noticeService.sendUnReadNoticeList(employeeId));

    }

    // 보낸 쪽지 - 읽은 쪽지 조회
    @GetMapping("/send/read")
    @Operation(summary = "읽은 쪽지 리스트", description = "보낸 쪽지 중 읽은 쪽지 리스트 조회")
    public ResponseEntity<List<SendReadNoticeResponse>> sendReadNoticeList(@RequestHeader("member-id") String employeeId) {

        log.info("{NoticeController} : 보낸 쪽지 - 읽은 쪽지 리스트 조회 \n" +
                "employeeId = " + employeeId);

        return ResponseEntity.ok(noticeService.sendReadNoticeList(employeeId));

    }

    // 보낸 쪽지 - 전체 쪽지 조회
    @GetMapping("/send/all")
    @Operation(summary = "전체 쪽지 조회", description = "보낸 쪽지 전체 리스트 조회")
    public ResponseEntity<List<SendNoticeListResponse>> sendAll(@RequestHeader("member-id") String employeeId) {

        log.info("{NoticeController} : 보낸 쪽지 - 전체 쪽지 조회 \n" +
                "employeeId = " + employeeId);

        return ResponseEntity.ok(noticeService.sendAll(employeeId));

    }

    // 보낸 쪽지 상세 조회
    @GetMapping("/send/{notice_id}")
    @Operation(summary = "보낸 쪽지 상세 조회", description = "보낸 쪽지 상세 내용 조회")
    public ResponseEntity<SendNoticeDetailResponse> sendDetail(@RequestHeader("member-id") String employeeId, @PathVariable("notice_id") Long noticeId) {

        log.info("{NoticeController} : 보낸 쪽지 상세 조회 \n" +
                "employeeId = " + employeeId);

        return ResponseEntity.ok(noticeService.sendDetail(employeeId, noticeId));

    }

    // 쪽지 삭제 - 양쪽에 한쪽만 삭제

}
