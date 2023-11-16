package com.example.noticeservice.repository;

import com.example.noticeservice.dto.response.ReceiveUnReadNoticeResponse;
import com.example.noticeservice.usecheck.UseCheck;
import com.example.noticeservice.usecheck.dto.Member;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;

import java.util.HashMap;
import java.util.List;

import static com.example.noticeservice.entity.QNotice.notice;


public class NoticeRepositoryImpl implements NoticeQueryRepository {

    private final JPAQueryFactory queryFactory;
    private final UseCheck useCheck;

    public NoticeRepositoryImpl(EntityManager em, UseCheck useCheck) {
        this.queryFactory = new JPAQueryFactory(em);
        this.useCheck = useCheck;
    }

    @Override
    public Long unreadNoticeCount(Long memberId) {

        return queryFactory
                .select(notice.count())
                .from(notice)
                .where(notice.receiverId.eq(memberId)
                        .and(notice.isRead.eq(false)))
                .fetchFirst();

    }

    @Override
    public Page<ReceiveUnReadNoticeResponse> receiveUnReadNoticeList(String employeeId, Pageable pageable) {
        HashMap<String, String> map = new HashMap<>();
        map.put("employeeId", employeeId);

        Member cur = useCheck.getMemberId(map);

        List<ReceiveUnReadNoticeResponse> list = queryFactory
                .select(Projections.fields(ReceiveUnReadNoticeResponse.class,
                        notice.noticeId,
                        notice.title,
                        notice.createdAt)
                )
                .from(notice)
                .where(notice.receiverId.eq(cur.getMemberId())
                        .and(notice.isRead.eq(false))
                        .and(notice.isReceiverDeleted.eq(false)))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        for (ReceiveUnReadNoticeResponse response : list) {

            HashMap<String, String> map = new HashMap<>();
            Member sender = useCheck.

        }

        Long count = queryFactory
                .select(notice.count())
                .from(notice)
                .where(notice.isRead.eq(false)
                        .and(notice.receiverId.eq(cur.getMemberId()))
                        .and(notice.isReceiverDeleted.eq(false)))
                .fetchFirst();

        return PageableExecutionUtils.getPage(list, pageable, () -> count);

    }

}
