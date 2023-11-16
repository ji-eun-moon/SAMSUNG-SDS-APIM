package com.example.noticeservice.usecheck;

import com.example.noticeservice.usecheck.dto.Member;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.cloud.openfeign.SpringQueryMap;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.Map;

@FeignClient("member-service")
public interface UseCheck {

    @GetMapping("/auth/get-Member")
    Member getMemberId(@SpringQueryMap Map<String, String> map);

}
