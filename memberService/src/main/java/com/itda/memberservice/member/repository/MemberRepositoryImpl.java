package com.itda.memberservice.member.repository;

import com.itda.memberservice.member.dto.response.EmployeeSearchResponse;
import com.itda.memberservice.member.dto.response.MemberResponse;
import com.itda.memberservice.member.dto.response.NameSearchResponse;
import com.itda.memberservice.team.dto.response.TeamResponse;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;

import java.util.List;

import static com.itda.memberservice.member.entity.QMember.member;
import static com.itda.memberservice.memberteam.entity.QMemberTeam.memberTeam;
import static com.itda.memberservice.team.entity.QTeam.team;

public class MemberRepositoryImpl implements MemberQueryRepository {

    private final JPAQueryFactory queryFactory;

    public MemberRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public EmployeeSearchResponse findMemberByEmployeeId(String employeeId) {

        EmployeeSearchResponse response = queryFactory
                .select(Projections.fields(EmployeeSearchResponse.class,
                        member.employeeId,
                        member.name,
                        member.imageUrl,
                        member.email,
                        member.department,
                        member.position,
                        member.authority))
                .from(member)
                .where(member.employeeId.eq(employeeId))
                .fetchOne();

        if (response == null) {
            throw new RuntimeException("해당하는 회원이 존재하지 않습니다.");
        }

        List<String> teamList = queryFactory
                .select(memberTeam.team.name)
                .from(memberTeam)
                .where(memberTeam.member.employeeId.eq(employeeId))
                .fetch();

        response.setTeamList(teamList);

        return response;

    }

    @Override
    public List<NameSearchResponse> findByName(String name) {
        return queryFactory
                .select(Projections.fields(NameSearchResponse.class,
                        member.memberId,
                        member.employeeId,
                        member.name,
                        member.department,
                        member.position,
                        member.imageUrl))
                .where(member.name.contains(name))
                .from(member)
                .fetch();
    }

    @Override
    public Page<MemberResponse> findMemberResponse(Pageable pageable) {
        List<MemberResponse> results = queryFactory
                .select(Projections.fields(MemberResponse.class,
                        member.memberId,
                        member.employeeId,
                        member.name,
                        member.imageUrl,
                        member.authority,
                        member.department,
                        member.position,
                        member.email
                ))
                .from(member)
                .orderBy(member.createdAt.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        for (MemberResponse result : results) {

            long memberId = result.getMemberId();

            List<TeamResponse> teamResponses = queryFactory
                    .select(Projections.fields(TeamResponse.class,
                            team.name.as("teamName")))
                    .from(team)
                    .where((JPAExpressions.select(memberTeam.team)
                            .from(memberTeam)
                            .where(memberTeam.member.memberId.eq(memberId))).contains(team))
                    .fetch();

            result.setTeams(teamResponses);

        }

        Long count = queryFactory
                .select(member.count())
                .from(member)
                .fetchFirst();

        return PageableExecutionUtils.getPage(results, pageable, () -> count);

    }

    @Override
    public MemberResponse findMemberResponseByEmployeeId(String employeeId) {
        MemberResponse response = queryFactory
                .select(Projections.fields(MemberResponse.class,
                        member.memberId,
                        member.employeeId,
                        member.name,
                        member.imageUrl,
                        member.authority,
                        member.department,
                        member.position,
                        member.email))
                .from(member)
                .where(member.employeeId.eq(employeeId))
                .fetchOne();

        List<TeamResponse> teamResponses = queryFactory
                .select(Projections.fields(TeamResponse.class,
                        team.name.as("teamName")))
                .from(team)
                .where((JPAExpressions.select(memberTeam.team)
                        .from(memberTeam)
                        .where(memberTeam.member.memberId.eq(response.getMemberId()))).contains(team))
                .fetch();

        response.setTeams(teamResponses);

        return response;

    }
}