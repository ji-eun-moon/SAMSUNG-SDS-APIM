package com.itda.memberservice.memberteam.repository;

import com.itda.memberservice.memberteam.entity.MemberTeam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberTeamRepository extends JpaRepository<MemberTeam, Long>, MemberTeamQueryRepository {

}
