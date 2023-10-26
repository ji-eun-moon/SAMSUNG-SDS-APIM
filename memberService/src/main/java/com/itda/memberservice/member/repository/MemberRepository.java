package com.itda.memberservice.member.repository;

import com.itda.memberservice.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long>, MemberQueryRepository {

    boolean existsMemberByEmployeeId(String employeeId);

    Member findByEmployeeId(String employeeId);

}
