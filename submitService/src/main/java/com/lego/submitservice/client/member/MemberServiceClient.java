package com.lego.submitservice.client.member;

import com.lego.submitservice.client.member.dto.SearchMemberResponse;
import com.lego.submitservice.client.member.dto.SkipMemberResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@FeignClient(name = "member-service")
public interface MemberServiceClient {

    @GetMapping("/auth/find-by-name")
    List<SearchMemberResponse> getMemberByName(String name);

    @GetMapping("/auth/find-by-employeeId")
    SkipMemberResponse getMemberByEmployeeId(String employeeId);

    @GetMapping("/auth/check-authority")
    String checkAuthority(String employeeId);
}
