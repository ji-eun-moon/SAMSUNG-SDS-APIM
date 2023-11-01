package com.lego.submitservice.client.member;

import com.lego.submitservice.client.member.dto.EmployeeSearchResponse;
import com.lego.submitservice.client.member.dto.SearchMemberResponse;
import com.lego.submitservice.client.member.dto.SkipMemberResponse;
import feign.Param;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.cloud.openfeign.SpringQueryMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Map;

@FeignClient(name = "member-service")
public interface MemberServiceClient {

    @GetMapping("/auth/find-by-name")
    List<SearchMemberResponse> getMemberByName(String name);

    @GetMapping("/auth/find-by-employeeId")
    EmployeeSearchResponse getMemberByEmployeeId(@SpringQueryMap Map<String, String> params);

    @GetMapping("/auth/check-authority")
    String checkAuthority(@SpringQueryMap Map<String, String> params);
}
