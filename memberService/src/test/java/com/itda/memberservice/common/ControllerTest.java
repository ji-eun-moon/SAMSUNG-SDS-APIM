package com.itda.memberservice.common;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.itda.memberservice.member.controller.MemberController;
import com.itda.memberservice.member.service.MemberService;
import com.itda.memberservice.memberteam.service.MemberTeamService;
import com.itda.memberservice.team.service.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

@AutoConfigureRestDocs
@WebMvcTest(
        MemberController.class
)
@ActiveProfiles("ControllerTest")
public abstract class ControllerTest {

    @Autowired protected MockMvc mvc;
    @Autowired protected ObjectMapper objectMapper;

    @MockBean protected MemberService memberService;
    @MockBean protected MemberTeamService memberTeamService;
    @MockBean protected TeamService teamService;

}
