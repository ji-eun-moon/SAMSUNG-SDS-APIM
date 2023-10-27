package com.itda.memberservice.member.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.itda.memberservice.common.util.JwtUtil;
import com.itda.memberservice.member.dto.request.CreateMemberRequest;
import com.itda.memberservice.member.dto.request.LoginMemberRequest;
import com.itda.memberservice.member.entity.Authority;
import com.itda.memberservice.member.repository.MemberRepository;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.xml.bind.DatatypeConverter;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.crypto.spec.SecretKeySpec;
import java.security.Key;
import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
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

    @Autowired
    private MemberController memberController;

    @Value("${security.jwt.secret.key}")
    private String secretKey;

    Key key;


    @BeforeEach
    public void init(){

        List<String> teamList1 = new ArrayList<>();
        teamList1.add("teamA");
        teamList1.add("teamB");

        List<String> teamList2 = new ArrayList<>();
        teamList2.add("teamC");
        teamList2.add("teamD");

        List<CreateMemberRequest> requestList = new ArrayList<>();

        for (int i = 1; i <= 2; i++) {

            List<String> teamListName = null;

            if (i == 1) {
                teamListName = teamList1;
            } else {
                teamListName = teamList2;
            }

            requestList.add(CreateMemberRequest
                    .builder()
                            .employeeId("employee" + i)
                            .password("password" + i)
                            .department("department" + i)
                            .name("name" + i)
                            .email("email" + i)
                            .imageUrl("imageUrl" + i)
                            .position("position" + i)
                            .authority(Authority.일반)
                            .team(teamListName)
                    .build());
        }

        byte[] secretKeyByte = DatatypeConverter.parseBase64Binary(secretKey);

        key = new SecretKeySpec(secretKeyByte, SignatureAlgorithm.HS256.getJcaName());

        memberController.signUp(requestList);

    }

    @Test
    @DisplayName("회원 등록")
    public void member_register() throws Exception {

        long startTime = System.currentTimeMillis();

        List<CreateMemberRequest> requestList = new ArrayList<>();

        List<String> teamList = new ArrayList<>();
        teamList.add("team123456789");
        teamList.add("team123456788");

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

        assertThat(memberRepository.existsMemberByEmployeeId(requestList.get(0).getEmployeeId())).isTrue();

        System.out.println(System.currentTimeMillis() - startTime + "ms");

    }

    @Test
    @DisplayName("회원 로그인")
    public void member_login() throws Exception {

        long startTime = System.currentTimeMillis();

        LoginMemberRequest request = new LoginMemberRequest("employee1", "password1");

        MvcResult result = mvc.perform(MockMvcRequestBuilders.post("/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsBytes(request)))
                        .andExpect(status().isOk())
                        .andReturn();

        System.out.println("token = " + result.getResponse().getContentAsString());

        assertThat(JwtUtil.getId(result.getResponse().getContentAsString(), key)).isEqualTo(request.getEmployeeId());

        System.out.println(System.currentTimeMillis() - startTime + "ms");

    }

    @Test
    @DisplayName("회원 이름으로 검색")
    public void search_name() throws Exception {

        long startTime = System.currentTimeMillis();

        MvcResult result = mvc.perform(MockMvcRequestBuilders.get("/auth/find-by-name")
                        .contentType(MediaType.APPLICATION_JSON)
                        .param("name", "name1"))
                        .andExpect(status().isOk())
                        .andReturn();

        System.out.println(result.getResponse().getContentAsString());

        System.out.println(System.currentTimeMillis() - startTime + "ms");

    }


}