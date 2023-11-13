package com.example.noticeservice.repository;

import com.example.noticeservice.dto.response.ReceiveUnReadNoticeResponse;
import com.example.noticeservice.entity.QNotice;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;

import java.util.List;

import static com.example.noticeservice.entity.QNotice.notice;

public class NoticeRepositoryImpl implements NoticeQueryRepository {

    private final JPAQueryFactory queryFactory;
    public NoticeRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
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

        List<ReceiveUnReadNoticeResponse> result = queryFactory
                .select(Projections.fields(ReceiveUnReadNoticeResponse.class,
                        notice.noticeId,
                        notice.title,
                        notice.createdAt,
                        member.employeeId.as("senderEmployeeId"),
                        member.imageUrl.as("senderImage"),
                        member.name.as("senderName")
                ))
                .from(notice)
                .join(notice.sender, member)
                .where(notice.isRead.eq(false)
                        .and(notice.receiver.employeeId.eq(employeeId))
                        .and(notice.isReceiverDeleted.eq(false)))
                .orderBy(notice.createdAt.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        Long count = queryFactory
                .select(notice.count())
                .from(notice)
                .where(notice.isRead.eq(false)
                        .and(notice.receiver.employeeId.eq(employeeId))
                        .and(notice.isReceiverDeleted.eq(false)))
                .fetchFirst();

        return PageableExecutionUtils.getPage(result, pageable, () -> count);

    }

}
