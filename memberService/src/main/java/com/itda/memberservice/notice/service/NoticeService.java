package com.itda.memberservice.notice.service;

import com.itda.memberservice.error.CustomException;
import com.itda.memberservice.error.ErrorCode;
import com.itda.memberservice.member.entity.Authority;
import com.itda.memberservice.member.entity.Member;
import com.itda.memberservice.member.repository.MemberRepository;
import com.itda.memberservice.memberteam.repository.MemberTeamRepository;
import com.itda.memberservice.notice.dto.request.NoticeApplyRequest;
import com.itda.memberservice.notice.dto.request.NoticeCreateRequest;
import com.itda.memberservice.notice.dto.request.NoticeListRequest;
import com.itda.memberservice.notice.dto.request.NoticeResultRequest;
import com.itda.memberservice.notice.dto.response.*;
import com.itda.memberservice.notice.entity.Notice;
import com.itda.memberservice.notice.repository.EmitterRepository;
import com.itda.memberservice.notice.repository.NoticeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
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
    private final EmitterRepository emitterRepository;

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

            if (emitterRepository.find(employee).isPresent()) {

                SseEmitter emitter = emitterRepository.find(employee).get();

                log.info("{} 번 사원에게 sseEmitter 전달, sseEmitter = {}", employee, emitter);

                try {

                    Map<String, String> eventData = new HashMap<>();

                    eventData.put("sender", sender.getName());
                    eventData.put("title", save.getTitle());
                    eventData.put("image", sender.getImageUrl());
                    eventData.put("noticeId", String.valueOf(save.getNoticeId()));
                    eventData.put("noticeNumber", String.valueOf(unreadNoticeCount(employee)));

                    log.info("eventData = {}", eventData);

                    emitter.send(SseEmitter.event().name("newNotice").data(eventData, MediaType.APPLICATION_JSON));

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

            if (emitterRepository.find(receiver.getEmployeeId()).isPresent()) {

                SseEmitter emitter = emitterRepository.find(receiver.getEmployeeId()).get();

                log.info("{} 번 사원에게 sseEmitter({}) 전달", receiver.getEmployeeId(), emitter);

                try {

                    Map<String, String> eventData = new HashMap<>();

                    eventData.put("sender", sender.getName());
                    eventData.put("image", sender.getImageUrl());
                    eventData.put("title", saveNotice.getTitle());
                    eventData.put("noticeId", String.valueOf(saveNotice.getNoticeId()));
                    eventData.put("noticeNumber", String.valueOf(unreadNoticeCount(receiver.getEmployeeId())));

                    log.info("eventData = {}", eventData);

                    emitter.send(SseEmitter.event().name("newNotice").data(eventData, MediaType.APPLICATION_JSON));

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
            sseEmitter.send(SseEmitter.event().name("connect").data("SSE 연결이 완료되었습니다.", MediaType.APPLICATION_JSON));

            log.info("{} SSE 연결 완료", employeeId);

        } catch (IOException e) {

            e.printStackTrace();

        }

        emitterRepository.save(employeeId, sseEmitter);

        log.info("{} {} 입력", employeeId, emitterRepository.find(employeeId));

        sseEmitter.onCompletion(() -> {
            log.error("onCompletion Callback");
            emitterRepository.delete(employeeId);
        });
        sseEmitter.onTimeout(() -> {
            log.error("onTimeout Callback");
            emitterRepository.delete(employeeId);
        });
        sseEmitter.onError((e) -> {
            log.error("onError Callback");
            emitterRepository.delete(employeeId);
        });

        log.info("SSE 연결 설정 완료");

        return sseEmitter;


    }

    public void sendStatusChange(String categoryName, String apiName, String status, String teamName) {

        log.info("상태 변경 메시지 보내기");

        List<String> employeeIds = memberTeamRepository.findEmployeeIdByTeamName(teamName);

        for (String employeeId : employeeIds) {

            log.info("받을 사람 employeeId = {}", employeeId);

            noticeRepository.save(Notice.builder()
                    .title("상태 변경 알림")
                    .content(categoryName + "의 " + apiName + " 상태가 " + status + "으로 변경되었습니다.")
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

                Map<String, String> map = new HashMap<>();
                map.put("categoryName", categoryName);
                map.put("apiName", apiName);
                map.put("status", status);

                try {
                    emitter.send(SseEmitter.event()
                            .name("statusChange")
                            .data(map, MediaType.APPLICATION_JSON));
                } catch (IOException e) {

                    e.printStackTrace();

                }

            }

        }

    }

    public void sendApply(String employeeId, NoticeApplyRequest request) {

        if (request.getApplyName().equals("사용")) {

            noticeRepository.save(Notice.builder()
                            .sender(memberRepository.findByEmployeeId(employeeId)
                                    .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND)))
                            .receiver(memberRepository.findByEmployeeId("admin")
                                    .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND)))
                            .isReceiverDeleted(false)
                            .isSenderDeleted(false)
                            .isRead(false)
                            .title("신청 관련 문의입니다.")
                            .content(request.getTeamName() + "(팀)이 " + request.getCategoryName() + " 에 대해 사용신청했습니다.")
                    .build());

            log.info("{} 의 {} 사용 신청 완료", request.getTeamName(), request.getApplyName());

            if (emitterRepository.find("admin").isPresent()) {

                log.info("admin emitter 연결되어있는 상태");

                SseEmitter emitter = emitterRepository.find("admin").get();

                Map<String, String> map = new HashMap<>();
                map.put("teamName", request.getTeamName());
                map.put("applyName", request.getApplyName());
                map.put("categoryName", request.getCategoryName());

                try {
                    emitter.send(SseEmitter.event().name("newApply").data(map, MediaType.APPLICATION_JSON));
                    log.info("admin emitter에 사용 신청 전송 완료");
                } catch (IOException e) {
                    e.printStackTrace();
                }

            }

        } else if (request.getApplyName().equals("제공")) {

            noticeRepository.save(Notice.builder()
                    .sender(memberRepository.findByEmployeeId(employeeId)
                            .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND)))
                    .receiver(memberRepository.findByEmployeeId("admin")
                            .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND)))
                    .isReceiverDeleted(false)
                    .isSenderDeleted(false)
                    .isRead(false)
                    .title("제공 관련 문의입니다.")
                    .content(request.getTeamName() + "(팀)이 " + request.getCategoryName() + " 에 대해 제공신청했습니다.")
                    .build());

            log.info("{} 의 {} 제공 신청 완료", request.getTeamName(), request.getApplyName());

            if (emitterRepository.find("admin").isPresent()) {

                log.info("admin emitter 연결되어있는 상태");

                SseEmitter emitter = emitterRepository.find("admin").get();

                Map<String, String> map = new HashMap<>();
                map.put("teamName", request.getTeamName());
                map.put("applyName", request.getApplyName());
                map.put("categoryName", request.getCategoryName());

                try {
                    emitter.send(SseEmitter.event().name("newApply").data(map, MediaType.APPLICATION_JSON));
                    log.info("admin emitter에 제공 신청 전송 완료");
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }

        }

    }
}
