package com.itda.memberservice.member.repository;

import com.itda.memberservice.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long>, MemberQueryRepository {

    boolean existsByEmployeeId(String employeeId);

    Optional<Member> findByEmployeeId(String employeeId);

    Optional<Member> findByMemberId(Long memberId);

}
