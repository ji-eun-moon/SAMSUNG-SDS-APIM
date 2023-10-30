package com.itda.memberservice.member.controller;

import com.itda.memberservice.common.ControllerTest;
import com.itda.memberservice.common.util.JwtUtil;
import com.itda.memberservice.member.dto.request.CreateMemberRequest;
import com.itda.memberservice.member.dto.request.LoginMemberRequest;
import com.itda.memberservice.member.entity.Authority;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.security.Key;
import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessRequest;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class MemberControllerTest extends ControllerTest {

    Key key;


//    @BeforeEach
//    public void init() {
//
//        List<String> teamList1 = new ArrayList<>();
//        teamList1.add("teamA");
//        teamList1.add("teamB");
//
//        List<String> teamList2 = new ArrayList<>();
//        teamList2.add("teamC");
//        teamList2.add("teamD");
//
//        List<CreateMemberRequest> requestList = new ArrayList<>();
//
//        for (int i = 1; i <= 2; i++) {
//
//            List<String> teamListName;
//
//            if (i == 1) {
//                teamListName = teamList1;
//            } else {
//                teamListName = teamList2;
//            }
//
//            requestList.add(CreateMemberRequest
//                    .builder()
//                    .employeeId("employee" + i)
//                    .password("password" + i)
//                    .department("department" + i)
//                    .name("name" + i)
//                    .email("email" + i)
//                    .imageUrl("imageUrl" + i)
//                    .position("position" + i)
//                    .authority(Authority.일반)
//                    .team(teamListName)
//                    .build());
//        }
//
//        byte[] secretKeyByte = DatatypeConverter.parseBase64Binary(secretKey);
//
//        key = new SecretKeySpec(secretKeyByte, SignatureAlgorithm.HS256.getJcaName());
//
//        memberController.signUp(requestList);
//
//    }

    @Test
    @DisplayName("멤버 등록")
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
                    .team(teamListName)
                    .build());
        }

        mvc.perform(RestDocumentationRequestBuilders
                        .post("/auth/sign-up")
                        .content(objectMapper.writeValueAsBytes(requestList))
                        .contentType(MediaType.APPLICATION_JSON))
                .andDo(
                        document("/auth/sign-up",
                                preprocessRequest(prettyPrint()),
                                requestFields(
                                        fieldWithPath("[].employeeId").description("사원번호"),
                                        fieldWithPath("[].password").description("비밀번호"),
                                        fieldWithPath("[].department").description("부서 명"),
                                        fieldWithPath("[].name").description("이름"),
                                        fieldWithPath("[].email").description("이메일"),
                                        fieldWithPath("[].imageUrl").description("이미지 url"),
                                        fieldWithPath("[].position").description("포지션 명"),
                                        fieldWithPath("[].authority").description("회원 권한"),
                                        fieldWithPath("[].team[]").description("소속 팀 리스트")
                                )
                        )
                );


        System.out.println(System.currentTimeMillis() - startTime + "ms");

    }

    @Test
    @DisplayName("멤버 로그인")
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
    @DisplayName("멤버 이름으로 검색")
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

    @Test
    @DisplayName("전체 멤버 조회")
    public void find_member_all() throws Exception {

        long startTime = System.currentTimeMillis();

        MvcResult result = mvc.perform(MockMvcRequestBuilders.get("/auth/all"))
                .andExpect(status().isOk())
                .andReturn();

        System.out.println(result.getResponse().getContentAsString());

        System.out.println(System.currentTimeMillis() - startTime + "ms");

    }

    @Test
    @DisplayName("비밀번호 변경")
    public void change_password() {


    }

    @Test
    @DisplayName("멤버 삭제")
    void delete_member() throws Exception {




    }


}