package com.itda.memberservice.team.repository;

import com.itda.memberservice.member.dto.response.TeamMemberResponse;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;

import java.util.List;

import static com.itda.memberservice.member.entity.QMember.member;
import static com.itda.memberservice.memberteam.entity.QMemberTeam.memberTeam;

public class TeamRepositoryImpl implements TeamQueryRepository{

    private final JPAQueryFactory queryFactory;

    public TeamRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public Page<TeamMemberResponse> findMembers(String teamName, Pageable pageable) {

        List<TeamMemberResponse> result = queryFactory
                .select(Projections.fields(TeamMemberResponse.class,
                        member.employeeId,
                        member.name,
                        member.imageUrl,
                        member.email,
                        member.department,
                        member.position))
                .from(memberTeam)
                .leftJoin(memberTeam.member, member)
                .where(memberTeam.team.name.eq(teamName))
                .fetch();

        Long count = queryFactory
                .select(member.count())
                .from(member)
                .where(memberTeam.team.name.eq(teamName))
                .fetchFirst();

        return PageableExecutionUtils.getPage(result, pageable, () -> count);

    }
}
