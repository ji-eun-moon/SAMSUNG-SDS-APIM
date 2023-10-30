package com.lego.submitservice.client.member;

import com.lego.submitservice.client.member.dto.SearchMemberResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@FeignClient(name = "member-service")
public interface MemberServiceClient {

    @GetMapping("/auth/find-by-name")
    List<SearchMemberResponse> getMember(String name);
}
