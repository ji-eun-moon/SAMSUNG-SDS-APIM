package com.itda.memberservice.member.repository;

import com.itda.memberservice.member.dto.response.SearchMemberResponse;
import com.itda.memberservice.member.entity.Member;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;

import java.util.List;

import static com.itda.memberservice.member.entity.QMember.member;

public class MemberRepositoryImpl implements MemberQueryRepository {

    private final JPAQueryFactory queryFactory;

    public MemberRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public void deleteByMemberId(Long memberId) {

        queryFactory
                .delete(member)
                .where(member.memberId.eq(memberId));

    }

    @Override
    public Member findMemberByEmployeeId(String employeeId) {

        return queryFactory
                .select(member)
                .from(member)
                .where(member.employeeId.eq(employeeId))
                .fetchOne();

    }

    @Override
    public List<SearchMemberResponse> findByName(String name) {
        return queryFactory
                .select(Projections.fields(SearchMemberResponse.class,
                        member.employeeId,
                        member.name,
                        member.department,
                        member.position,
                        member.imageUrl))
                .where(member.name.eq(name))
                .from(member)
                .fetch();
    }
}
