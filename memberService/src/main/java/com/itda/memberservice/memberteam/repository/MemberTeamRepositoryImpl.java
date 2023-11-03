package com.itda.memberservice.memberteam.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;

import static com.itda.memberservice.memberteam.entity.QMemberTeam.memberTeam;

public class MemberTeamRepositoryImpl implements MemberTeamQueryRepository {

    private final JPAQueryFactory queryFactory;

    public MemberTeamRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public Boolean check(String employeeId, String teamName) {

        return queryFactory
                .select(memberTeam.count())
                .from(memberTeam)
                .where(memberTeam.member.employeeId.eq(employeeId)
                        .and(memberTeam.team.name.eq(teamName)))
                .fetchFirst() > 0;

    }
}
