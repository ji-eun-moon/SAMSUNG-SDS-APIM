package com.lego.submitservice.client.member;

import com.lego.submitservice.client.member.dto.EmployeeSearchResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class MemberService {

    public final MemberServiceClient memberServiceClient;

    public void checkAuthority(String employeeId) {
        Map<String, String> params = new HashMap<>();
        params.put("employeeId", employeeId);
        log.info(memberServiceClient.checkAuthority(params));
        if (memberServiceClient.checkAuthority(params).equals("일반")) {
            throw new IllegalArgumentException("일반 회원은 수정을 할 수 없습니다.");
        }
    }

    public boolean checkTeam(String employeeId, String teamName) {
        Map<String, String> params = new HashMap<>();
        params.put("employeeId", employeeId);
        params.put("teamName", teamName);
        return memberServiceClient.checkTeam(params);
    }

    public EmployeeSearchResponse getMemberByEmployeeId(String employeeId) {
        Map<String, String> params = new HashMap<>();
        params.put("employeeId", employeeId);
        return  memberServiceClient.getMemberByEmployeeId(params);
    }
}
