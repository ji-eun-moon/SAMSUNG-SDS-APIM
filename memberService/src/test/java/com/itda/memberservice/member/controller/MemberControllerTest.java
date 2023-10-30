package com.itda.memberservice.member.controller;

import com.itda.memberservice.common.ControllerTest;
import com.itda.memberservice.member.dto.request.CreateMemberRequest;
import com.itda.memberservice.member.dto.request.LoginMemberRequest;
import com.itda.memberservice.member.dto.response.LoginMemberResponse;
import com.itda.memberservice.member.entity.Authority;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.xml.bind.DatatypeConverter;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import javax.crypto.spec.SecretKeySpec;
import java.security.Key;
import java.util.ArrayList;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class MemberControllerTest extends ControllerTest {

    Key key;

    @BeforeEach
    @WithMockUser
    public void init() {

        System.out.println("INIT 시작");

        List<String> teamList1 = new ArrayList<>();
        teamList1.add("teamA");
        teamList1.add("teamB");

        List<String> teamList2 = new ArrayList<>();
        teamList2.add("teamC");
        teamList2.add("teamD");

        List<CreateMemberRequest> requestList = new ArrayList<>();

        for (int i = 1; i <= 2; i++) {

            List<String> teamListName;

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
                    .teamList(teamListName)
                    .build());
        }

        String secretKey = "c201_team_itdac201_team_itdac201_team_itdac201_team_itdac201_team_itdac201_team_itdac201_team_itdac201_team_itdac201_team_itdac201_team_itdac201_team_itdac201_team_itdac201_team_itdac201_team_itdac201_team_itdac201_team_itdac201_team_itdac201_team_itdac201_team_itdac201_team_itdac201_team_itdac201_team_itdac201_team_itdac201_team_itdac201_team_itdac201_team_itdac201_team_itdac201_team_itdac201_team_itdac201_team_itdac201_team_itdac201_team_itdac201_team_itdac201_team_itdac201_team_itdac201_team_itdac201_team_itdac201_team_itdac201_team_itdac201_team_itdac201_team_itdac201_team_itdac201_team_itdac201_team_itda";
        byte[] secretKeyByte = DatatypeConverter.parseBase64Binary(secretKey);

        key = new SecretKeySpec(secretKeyByte, SignatureAlgorithm.HS256.getJcaName());
        
        System.out.println("INIT 종료");

    }

    @Test
    @DisplayName("멤버 등록")
    @WithMockUser
    void member_register() throws Exception {

        long startTime = System.currentTimeMillis();

        List<String> teamList1 = new ArrayList<>();
        teamList1.add("teamA");
        teamList1.add("teamB");

        List<String> teamList2 = new ArrayList<>();
        teamList2.add("teamC");
        teamList2.add("teamD");

        List<CreateMemberRequest> requestList = new ArrayList<>();

        for (int i = 1; i <= 2; i++) {

            List<String> teamListName;

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
                    .teamList(teamListName)
                    .build());
        }



        mvc.perform(RestDocumentationRequestBuilders
                        .post("/auth/sign-up")
                        .content(objectMapper.writeValueAsBytes(requestList))
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(csrf()))
                .andDo(
                        document("auth/sign-up",
                                preprocessRequest(prettyPrint()),
                                requestFields(
                                        fieldWithPath("[].employeeId").description("사원 번호"),
                                        fieldWithPath("[].password").description("비밀 번호"),
                                        fieldWithPath("[].department").description("부서 명"),
                                        fieldWithPath("[].name").description("이름"),
                                        fieldWithPath("[].email").description("이메일"),
                                        fieldWithPath("[].imageUrl").description("이미지 url"),
                                        fieldWithPath("[].position").description("포지션 명"),
                                        fieldWithPath("[].authority").description("회원 권한"),
                                        fieldWithPath("[].teamList[]").description("소속 팀 리스트")
                                )
                        )
                )
                .andExpect(status().isOk());

        System.out.println(System.currentTimeMillis() - startTime + "ms");

    }

    @Test
    @DisplayName("멤버 로그인")
    @WithMockUser
    public void member_login() throws Exception {

        LoginMemberRequest request = LoginMemberRequest.builder()
                .employeeId("employee1")
                .pwd("password1")
                .build();

        when(memberService.login(any()))
                .thenReturn(LoginMemberResponse.builder()
                        .token("token")
                        .build());

        ResultActions resultActions = mvc.perform(MockMvcRequestBuilders
                        .post("/auth/login")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsBytes(request)))
                .andDo(
                        document("auth/login",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint()),
                                requestFields(
                                        fieldWithPath("employeeId").description("사원 번호"),
                                        fieldWithPath("pwd").description("비밀 번호")
                                ),
                                responseFields(
                                        fieldWithPath("token").description("토큰 발급")
                                )
                        )
                )
                .andExpect(status().isOk());

        // 요청 내용
        System.out.println(resultActions.andReturn().getRequest().getContentAsString());

        // 응답 내용
        System.out.println(resultActions.andReturn().getResponse().getContentAsString());
    }


//
//    @Test
//    @DisplayName("멤버 이름으로 검색")
//    public void search_name() throws Exception {
//
//        long startTime = System.currentTimeMillis();
//
//        MvcResult result = mvc.perform(MockMvcRequestBuilders.get("/auth/find-by-name")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .param("name", "name1"))
//                .andExpect(status().isOk())
//                .andReturn();
//
//        System.out.println(result.getResponse().getContentAsString());
//
//        System.out.println(System.currentTimeMillis() - startTime + "ms");
//
//    }
//
//    @Test
//    @DisplayName("전체 멤버 조회")
//    public void find_member_all() throws Exception {
//
//        long startTime = System.currentTimeMillis();
//
//        MvcResult result = mvc.perform(MockMvcRequestBuilders.get("/auth/all"))
//                .andExpect(status().isOk())
//                .andReturn();
//
//        System.out.println(result.getResponse().getContentAsString());
//
//        System.out.println(System.currentTimeMillis() - startTime + "ms");
//
//    }
//
//    @Test
//    @DisplayName("비밀번호 변경")
//    public void change_password() {
//
//
//    }
//
//    @Test
//    @DisplayName("멤버 삭제")
//    void delete_member() throws Exception {
//
//
//
//
//    }


}