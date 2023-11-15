package com.itda.memberservice.notice.controller;

import com.itda.memberservice.notice.dto.request.NoticeCreateRequest;
import com.itda.memberservice.notice.dto.request.NoticeListRequest;
import com.itda.memberservice.notice.dto.request.NoticeResultRequest;
import com.itda.memberservice.notice.dto.response.*;
import com.itda.memberservice.notice.service.NoticeService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/notice")
@RequiredArgsConstructor
@Slf4j
public class NoticeController {

    private final NoticeService noticeService;
    public static Map<String, SseEmitter> sseEmitters = new ConcurrentHashMap<>();

    // 실시간 쪽자 확인
    @GetMapping("/sse-connect")
    public SseEmitter sseRegister(@RequestHeader("member-id") String employeeId) {

        return noticeService.sseRegister(employeeId);

    }

    // 쪽지 보내기
    @PostMapping("/send")
    @Operation(summary = "쪽지 전송", description = "쪽지 전송하기")
    public ResponseEntity<String> sendNotice(@RequestHeader("member-id") String employeeId, @RequestBody NoticeCreateRequest request) {

        log.info("{} 번 사원 쪽지 전송", employeeId);

        noticeService.sendNotice(employeeId, request);

        return ResponseEntity.ok("쪽지 보내는거 성공");

    }

    // 안읽은 쪽지 개수 조회
    @GetMapping("/receive/unread-count")
    @Operation(summary = "안읽은 쪽지 개수", description = "읽지 않은 쪽지 개수")
    public ResponseEntity<Long> unreadNoticeCount(@RequestHeader("member-id") String employeeId) {

        log.info("{} 번 사원의 받은 쪽지 중 읽은 쪽지 갯수 조회", employeeId);
        
        return ResponseEntity.ok(noticeService.unreadNoticeCount(employeeId));

    }

    // 받은 쪽지 - 안읽은 쪽지 조회
    @GetMapping("/receive/unread")
    @Operation(summary = "안읽은 쪽지 리스트", description = "아직 읽지 않은 쪽지 리스트 조회")
    public ResponseEntity<Page<ReceiveUnReadNoticeResponse>> receiveUnReadNoticeList(@RequestHeader("member-id") String employeeId, Pageable pageable) {

        log.info("{} 번 사원의 받은 쪽지 중 읽지 않은 쪽지 리스트 조회", employeeId);
        
        return ResponseEntity.ok(noticeService.receiveUnReadNoticeList(employeeId, pageable));

    }

    // 받은 쪽지 - 읽은 쪽지 조회
    @GetMapping("/receive/read")
    @Operation(summary = "읽은 쪽지 리스트", description = "읽은 쪽지 리스트 조회")
    public ResponseEntity<Page<ReceiveReadNoticeResponse>> receiveReadNoticeList(@RequestHeader("member-id") String employeeId, Pageable pageable) {

        log.info("{} 번 사원의 받은 쪽지 중 읽은 쪽지 리스트 조회", employeeId);
        
        return ResponseEntity.ok(noticeService.receiveReadNoticeList(employeeId, pageable));

    }

    // 받은 쪽지 - 전체 쪽지 조회
    @GetMapping("/receive/all")
    @Operation(summary = "전체 쪽지 조회", description = "받은 쪽지 전체 조회")
    public ResponseEntity<Page<ReceiveNoticeListResponse>> receiveAll(@RequestHeader("member-id") String employeeId, Pageable pageable) {

        log.info("{} 번 사원의 받은 쪽지 전체 리스트 조회", employeeId);
        
        return ResponseEntity.ok(noticeService.receiveAll(employeeId, pageable));

    }

    // 받은 쪽지 상세 조회
    @GetMapping("/receive/{notice_id}")
    @Operation(summary = "쪽지 상세 조회", description = "쪽지 상세 조회하기")
    public ResponseEntity<ReceiveNoticeDetailResponse> receiveDetail(@RequestHeader("member-id") String employeeId, @PathVariable("notice_id") Long noticeId) {

        log.info("{} 번 사원의 {} 번 쪽지 상세 조회", employeeId, noticeId);

        return ResponseEntity.ok(noticeService.receiveDetail(employeeId, noticeId));

    }

    // 받은 쪽지 - 리스트 삭제
    @DeleteMapping("/receive/delete")
    @Operation(summary = "받은 쪽지 삭제", description = "받은 쪽지 리스트로 삭제하기")
    public ResponseEntity<String> receiveDelete(@RequestBody NoticeListRequest request) {

        noticeService.receiveDelete(request);

        return ResponseEntity.ok("삭제 완료");

    }

    // 받은 쪽지 - 전체 읽음 처리
    @PostMapping("/receive/read")
    @Operation(summary = "받은 쪽지 읽음 처리", description = "받은 쪽지 리스트로 전체 읽음처리")
    public ResponseEntity<String> receiveReadAll(@RequestBody NoticeListRequest request) {

        noticeService.receiveReadAll(request);

        return ResponseEntity.ok("읽음 처리 완료");
    }

    // 보낸 쪽지 - 안읽은 쪽지 조회
    @GetMapping("/send/unread")
    @Operation(summary = "안읽은 쪽지 리스트", description = "보낸 쪽지 중 읽지 않은 쪽지 리스트 조회")
    public ResponseEntity<Page<SendUnReadNoticeResponse>> sendUnReadNoticeList(@RequestHeader("member-id") String employeeId, Pageable pageable) {

        log.info("{} 번 사원의 보낸 쪽지 중 읽지 않은 쪽지 리스트 조회", employeeId);

        return ResponseEntity.ok(noticeService.sendUnReadNoticeList(employeeId, pageable));

    }

    // 보낸 쪽지 - 읽은 쪽지 조회
    @GetMapping("/send/read")
    @Operation(summary = "읽은 쪽지 리스트", description = "보낸 쪽지 중 읽은 쪽지 리스트 조회")
    public ResponseEntity<Page<SendReadNoticeResponse>> sendReadNoticeList(@RequestHeader("member-id") String employeeId, Pageable pageable) {

        log.info("{} 번 사원의 보낸 쪽지 중 읽은 쪽지 리스트 조회", employeeId);


        return ResponseEntity.ok(noticeService.sendReadNoticeList(employeeId, pageable));

    }

    // 보낸 쪽지 - 전체 쪽지 조회
    @GetMapping("/send/all")
    @Operation(summary = "전체 쪽지 조회", description = "보낸 쪽지 전체 리스트 조회")
    public ResponseEntity<Page<SendNoticeListResponse>> sendAll(@RequestHeader("member-id") String employeeId, Pageable pageable) {

        log.info("{} 번 사원의 보낸 쪽지 전체 리스트 조회", employeeId);


        return ResponseEntity.ok(noticeService.sendAll(employeeId, pageable));

    }

    // 보낸 쪽지 상세 조회
    @GetMapping("/send/{notice_id}")
    @Operation(summary = "보낸 쪽지 상세 조회", description = "보낸 쪽지 상세 내용 조회")
    public ResponseEntity<SendNoticeDetailResponse> sendDetail(@RequestHeader("member-id") String employeeId, @PathVariable("notice_id") Long noticeId) {

        log.info("{} 번 사원의 보낸 쪽지 중 {} 번 쪽지 상세 조회", employeeId, noticeId);


        return ResponseEntity.ok(noticeService.sendDetail(employeeId, noticeId));

    }

    @DeleteMapping("/send/delete")
    @Operation(summary = "받은 쪽지 삭제", description = "받은 쪽지 리스트로 삭제하기")
    public ResponseEntity<String> sendDelete(@RequestBody NoticeListRequest request) {

        noticeService.sendDelete(request);

        return ResponseEntity.ok("삭제 완료");

    }

    @PostMapping("/send/result")
    @Operation(summary = "신청 결과 전송", description = "사용 신청, 제공 신청 결과 전송")
    public ResponseEntity<String> sendResult(@RequestHeader("member-id") String employeeId, @RequestBody NoticeResultRequest request) {

        log.info("{} 에 대한 결과 쪽지 전송", request.getApplyName());

        noticeService.sendResult(employeeId, request);

        return ResponseEntity.ok("결과 전송이 완료되었습니다.");
    }

}
