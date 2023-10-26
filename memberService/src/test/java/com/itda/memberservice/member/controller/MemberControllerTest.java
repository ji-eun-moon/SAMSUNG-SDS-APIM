package com.itda.memberservice.member.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.itda.memberservice.member.dto.request.CreateMemberRequest;
import com.itda.memberservice.member.entity.Authority;
import com.itda.memberservice.member.repository.MemberRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
@SpringBootTest
@Transactional
class MemberControllerTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private MemberRepository memberRepository;

    @Test
    @DisplayName("회원 등록")
    public void 회원_등록() throws Exception {

        List<CreateMemberRequest> requestList = new ArrayList<>();

        List<String> teamList = new ArrayList<>();
        teamList.add("teamA");
        teamList.add("teamB");

        requestList.add(CreateMemberRequest.builder()
                        .employeeId("123456789")
                        .password("123456789")
                        .department("department")
                        .name("member1")
                        .email("member1@itda.com")
                        .imageUrl("imageUrl")
                        .position("position")
                        .authority(Authority.일반)
                        .team(teamList)
                .build());

        mvc.perform(MockMvcRequestBuilders
                .post("/auth/sign-up")
                .content(objectMapper.writeValueAsBytes(requestList))
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        Assertions.assertThat(memberRepository.existsMemberByEmployeeId(requestList.get(0).getEmployeeId())).isTrue();

    }

}