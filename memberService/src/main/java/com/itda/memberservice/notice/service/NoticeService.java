package com.itda.memberservice.notice.service;

import com.itda.memberservice.error.CustomException;
import com.itda.memberservice.error.ErrorCode;
import com.itda.memberservice.member.entity.Authority;
import com.itda.memberservice.member.entity.Member;
import com.itda.memberservice.member.repository.MemberRepository;
import com.itda.memberservice.memberteam.repository.MemberTeamRepository;
import com.itda.memberservice.notice.controller.NoticeController;
import com.itda.memberservice.notice.dto.request.NoticeCreateRequest;
import com.itda.memberservice.notice.dto.request.NoticeListRequest;
import com.itda.memberservice.notice.dto.request.NoticeResultRequest;
import com.itda.memberservice.notice.dto.response.*;
import com.itda.memberservice.notice.entity.Notice;
import com.itda.memberservice.notice.repository.NoticeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.AuthorizationServiceException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class NoticeService {

    private final NoticeRepository noticeRepository;
    private final MemberRepository memberRepository;
    private final MemberTeamRepository memberTeamRepository;

    @Transactional(readOnly = true)
    public long unreadNoticeCount(String employeeId) {

        return noticeRepository.unreadNoticeCount(employeeId);

    }

    @Transactional(readOnly = true)
    public Page<ReceiveUnReadNoticeResponse> receiveUnReadNoticeList(String employeeId, Pageable pageable) {

        return noticeRepository.receiveUnReadNoticeList(employeeId, pageable);

    }

    @Transactional(readOnly = true)
    public Page<ReceiveReadNoticeResponse> receiveReadNoticeList(String employeeId, Pageable pageable) {

        return noticeRepository.receiveReadNoticeList(employeeId, pageable);

    }

    @Transactional(readOnly = true)
    public Page<ReceiveNoticeListResponse> receiveAll(String employeeId, Pageable pageable) {

        return noticeRepository.receiveAll(employeeId, pageable);

    }

    public void sendNotice(String employeeId, NoticeCreateRequest request) {

        Member sender = memberRepository.findByEmployeeId(employeeId)
                                    .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        log.info("sender = " + sender.toString());

        for (String employee : request.getEmployeeIds()) {

            Member receiver = memberRepository.findByEmployeeId(employee)
                                    .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

            if (employeeId.equals(receiver.getEmployeeId())) {
                continue;
            }

            log.info("receiver = " + receiver);

            Notice save = noticeRepository.save(Notice.builder()
                    .sender(sender)
                    .receiver(receiver)
                    .title(request.getTitle())
                    .content(request.getContent())
                    .isRead(false)
                    .isSenderDeleted(false)
                    .isReceiverDeleted(false)
                    .build());

            if (NoticeController.sseEmitters.containsKey(receiver.getEmployeeId()) && NoticeController.sseEmitters.get(receiver.getEmployeeId()) != null) {

                log.info("{} 번 사원에게 sseEmitter 전달, sseEmitter = {}", employee, NoticeController.sseEmitters.get(receiver.getEmployeeId()));

                SseEmitter sseEmitter = NoticeController.sseEmitters.get(employee);

                try {

                    Map<String, String> eventData = new HashMap<>();

                    eventData.put("message", "메시지가 도착했습니다.");
                    eventData.put("sender", sender.getName());
                    eventData.put("createdAt", save.getCreatedAt().toString());
                    eventData.put("title", save.getTitle());
                    eventData.put("content", save.getContent());
                    eventData.put("noticeNumber", String.valueOf(unreadNoticeCount(employee)));

                    log.info("eventData = {}", eventData);

                    sseEmitter.send(SseEmitter.event().name("addNotice").data(eventData));

                } catch (IOException e) {
                    e.printStackTrace();
                }
            }

        }

    }

    public ReceiveNoticeDetailResponse receiveDetail(String employeeId, Long noticeId) {

        changeReadNotice(employeeId, noticeId);

        return noticeRepository.receiveDetail(employeeId, noticeId);

    }

    public void changeReadNotice(String employeeId, Long noticeId) {

        Notice notice = noticeRepository.findById(noticeId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOTICE_NOT_FOUND));

        if (!notice.getReceiver().getEmployeeId().equals(employeeId)) {
            throw new CustomException(ErrorCode.NOTICE_USER_INVALID);
        }

        if (!notice.isRead()) {

            noticeRepository.save(Notice.builder()
                    .noticeId(notice.getNoticeId())
                    .title(notice.getTitle())
                    .content(notice.getContent())
                    .isRead(true)
                    .sender(notice.getSender())
                    .receiver(notice.getReceiver())
                    .isSenderDeleted(notice.isSenderDeleted())
                    .isReceiverDeleted(notice.isReceiverDeleted())
                    .createdAt(notice.getCreatedAt())
                    .build());

        }
    }

    @Transactional(readOnly = true)
    public Page<SendUnReadNoticeResponse> sendUnReadNoticeList(String employeeId, Pageable pageable) {

        return noticeRepository.sendUnReadNoticeList(employeeId, pageable);

    }

    @Transactional(readOnly = true)
    public Page<SendReadNoticeResponse> sendReadNoticeList(String employeeId, Pageable pageable) {

        return noticeRepository.sendReadNoticeList(employeeId, pageable);

    }

    @Transactional(readOnly = true)
    public Page<SendNoticeListResponse> sendAll(String employeeId, Pageable pageable) {

        return noticeRepository.sendAll(employeeId, pageable);

    }

    @Transactional(readOnly = true)
    public SendNoticeDetailResponse sendDetail(String employeeId, Long noticeId) {

        SendNoticeDetailResponse response = noticeRepository.sendDetail(employeeId, noticeId);

        if(response == null) {
            throw new CustomException(ErrorCode.NOTICE_NOT_FOUND);
        }

        return response;

    }

    public void receiveDelete(NoticeListRequest request) {

        for (Long i : request.getList()) {
            Notice notice = noticeRepository.findById(i)
                    .orElseThrow(() -> new CustomException(ErrorCode.NOTICE_NOT_FOUND));

            if (notice.isSenderDeleted()) {
                noticeRepository.delete(notice);
                continue;
            }

            noticeRepository.save(
                    Notice.builder()
                            .noticeId(notice.getNoticeId())
                            .title(notice.getTitle())
                            .content(notice.getContent())
                            .isRead(notice.isRead())
                            .receiver(notice.getReceiver())
                            .sender(notice.getSender())
                            .isSenderDeleted(notice.isSenderDeleted())
                            .isReceiverDeleted(true)
                            .createdAt(notice.getCreatedAt())
                            .build()
            );

        }

    }

    public void receiveReadAll(NoticeListRequest request) {

        for (Long i : request.getList()) {
            Notice notice = noticeRepository.findById(i)
                    .orElseThrow(() -> new CustomException(ErrorCode.NOTICE_NOT_FOUND));

            noticeRepository.save(
                    Notice.builder()
                            .noticeId(notice.getNoticeId())
                            .title(notice.getTitle())
                            .content(notice.getContent())
                            .isRead(true)
                            .receiver(notice.getReceiver())
                            .sender(notice.getSender())
                            .isSenderDeleted(notice.isSenderDeleted())
                            .isReceiverDeleted(notice.isReceiverDeleted())
                            .createdAt(notice.getCreatedAt())
                            .build()
            );

        }

    }

    public void sendDelete(NoticeListRequest request) {

        for (Long i : request.getList()) {
            Notice notice = noticeRepository.findById(i)
                    .orElseThrow(() -> new CustomException(ErrorCode.NOTICE_NOT_FOUND));

            if (notice.isReceiverDeleted()) {
                noticeRepository.delete(notice);
                continue;
            }

            noticeRepository.save(
                    Notice.builder()
                            .noticeId(notice.getNoticeId())
                            .title(notice.getTitle())
                            .content(notice.getContent())
                            .isRead(notice.isRead())
                            .receiver(notice.getReceiver())
                            .sender(notice.getSender())
                            .isSenderDeleted(true)
                            .isReceiverDeleted(notice.isReceiverDeleted())
                            .createdAt(notice.getCreatedAt())
                            .build()
            );

        }

    }

    public void sendResult(String employeeId, NoticeResultRequest request) {

        if (request.getApplyName().isEmpty() || request.getResult().isEmpty()) {
            throw new CustomException(ErrorCode.NOTICE_BAD_REQUEST);
        }

        Member sender = memberRepository.findByEmployeeId(employeeId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOTICE_USER_INVALID));

        if (!sender.getAuthority().equals(Authority.관리자)) {
            throw new AuthorizationServiceException("해당 권한이 존재하지 않습니다.");
        }

        List<Member> list = memberTeamRepository.findMembersByTeam(request.getTeamName());

        String title = null, content = null;

        switch (request.getApplyType()) {
            case "사용":

                content = switch (request.getResult()) {
                    case "승인" -> {
                        title = "'" + request.getApplyName() + "' 신청 결과";
                        yield "'" + request.getApplyName() + "' 사용 신청이 승인되었습니다.";
                    }
                    case "거절" -> {
                        title = "'" + request.getApplyName() + "' 신청 결과";
                        yield "'" + request.getApplyName() + "' 사용 신청이 거절되었습니다.";
                    }
                    default -> content;
                };

                break;
            case "제공":

                content = switch (request.getResult()) {
                    case "승인" -> {
                        title = "'" + request.getApplyName() + "' 신청 결과";
                        yield "'" + request.getApplyName() + "' 제공 신청이 승인되었습니다.";
                    }
                    case "거절" -> {
                        title = "'" + request.getApplyName() + "' 신청 결과";
                        yield "'" + request.getApplyName() + "' 제공 신청이 거절되었습니다.";
                    }
                    case "테스트 실패" -> {
                        title = "'" + request.getApplyName() + "' 신청 결과";
                        yield "'" + request.getApplyName() + "' 제공 신청이 테스트 실패로 인해 거절되었습니다.";
                    }
                    default -> content;
                };

                break;
        }

        for (Member receiver : list) {

            Notice saveNotice = sendResultNotice(sender, receiver, title, content);

            if (NoticeController.sseEmitters.containsKey(receiver.getEmployeeId()) && NoticeController.sseEmitters.get(receiver.getEmployeeId()) != null) {

                log.info("{} 번 사원에게 sseEmitter 전달", receiver.getEmployeeId());

                SseEmitter sseEmitter = NoticeController.sseEmitters.get(receiver.getEmployeeId());

                try {

                    Map<String, String> eventData = new HashMap<>();

                    eventData.put("message", "메시지가 도착했습니다.");
                    eventData.put("sender", sender.getName());
                    eventData.put("createdAt", saveNotice.getCreatedAt().toString());
                    eventData.put("title", saveNotice.getTitle());
                    eventData.put("content", saveNotice.getContent());
                    eventData.put("noticeNumber", String.valueOf(unreadNoticeCount(receiver.getEmployeeId())));

                    log.info("eventData = {}", eventData);

                    sseEmitter.send(SseEmitter.event().name("addNotice").data(eventData));

                } catch (IOException e) {
                    e.printStackTrace();
                }
            }

        }

    }

    public Notice sendResultNotice(Member sender, Member receiver, String title, String content) {

        return noticeRepository.save(Notice.builder()
                .title(title)
                .content(content)
                .sender(sender)
                .receiver(receiver)
                .isRead(false)
                .isReceiverDeleted(false)
                .isSenderDeleted(false)
                .build());

    }

    public SseEmitter sseRegister(String employeeId) {

        SseEmitter sseEmitter = new SseEmitter(Long.MAX_VALUE);

        try {
            sseEmitter.send(SseEmitter.event().name("SSE 연결").data("SSE 연결이 완료되었습니다."));

            log.info("{} SSE 연결 완료", employeeId);

        } catch (IOException e) {

            throw new CustomException(ErrorCode.USER_NOT_FOUND);

        }

        NoticeController.sseEmitters.put(employeeId, sseEmitter);

        log.info("{} {} 입력", employeeId, sseEmitter);

        sseEmitter.onCompletion(() -> NoticeController.sseEmitters.remove(employeeId));
        sseEmitter.onTimeout(() -> NoticeController.sseEmitters.remove(employeeId));
        sseEmitter.onError((e) -> NoticeController.sseEmitters.remove(employeeId));

        log.info("SSE 연결 끝");

        return sseEmitter;


    }
}
