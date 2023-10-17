# restdocs 학습

<br/>

## Spring REST Docs vs Swagger

<img src="https://velog.velcdn.com/images/monkeydugi/post/ce5b65d6-3594-4e24-b6ab-13cc18c35242/image.png">

<br/>

## Spring REST Docs

#### 시작전 모든 TEST 파일에서 ControllerTest 사용할거기 때문에 미리 선언

```java
package com.example.restdocs.common;

import com.example.restdocs.member.controller.MemberController;
import com.example.restdocs.member.service.MemberService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

@AutoConfigureRestDocs
@WebMvcTest({
        MemberController.class
})
@ActiveProfiles("ControllerTest")
public abstract class ControllerTest {

    @Autowired protected MockMvc mockMvc;
    @Autowired protected ObjectMapper objectMapper;

    @MockBean protected MemberService memberService;

}
```

#### 기본 회원가입으로 restdocs 작성

```java
package com.example.restdocs.member;


import com.example.restdocs.common.ControllerTest;
import com.example.restdocs.member.model.dto.request.MemberJoinRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;

import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessRequest;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class MemberControllerTest extends ControllerTest {

    @BeforeEach
    void set_up(){

        MemberJoinRequest request = MemberJoinRequest.builder()
                                                                .id("victoryddh")
                                                                .password("1234")
                                                                .name("도하")
                                                                .build();

        memberService.save(request);

    }

    @Test
    @DisplayName("회원가입 성공")
    void Success_join() throws Exception {

        MemberJoinRequest request = MemberJoinRequest.builder()
                                                    .id("victoryddh5")
                                                    .password("1234")
                                                    .name("도하")
                                                    .build();

        mockMvc.perform(RestDocumentationRequestBuilders.post("/api/member/join")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsBytes(request)))
                .andDo(
                        document("member/join",
                                preprocessRequest(prettyPrint()),
                                requestFields(
                                        fieldWithPath("id").description("회원 아이디"),
                                        fieldWithPath("password").description("회원 비밀번호"),
                                        fieldWithPath("name").description("회원 이름")
                                ))
                )
                .andExpect(status().isOk());

    }

}
```

위와 같이 작성을 완료하고 build를 돌리면
<br/>
![Alt text](/DH/images/image.png)
<br/>
위와 같은 snippets 조각들이 생김

그리고 해당 조각들을 힐요한 컬럼으로 짜맞추면 문서가 완성됨

<br>

#### asciidoctor 작성 문법

```asciidoc
= REST Docs
:doctype: book
:icons: font
:source-highlighter: highlightjs
:toc: left
:toclevels: 2
:sectlinks:


ifndef::snippets[]
:snippets: ./build/generated-snippets
endif::[]

=== Request Code
include::{snippets}/member/join/http-request.adoc[]

=== Request-PathParam 요청에 필요한 PathParam
include::{snippets}/member/join/request-body.adoc[]

include::{snippets}/member/join/request-fields.adoc[]

=== Response Code
include::{snippets}/member/join/http-response.adoc[]
```

#### 최종 결과

![Alt text](/DH/images/image-1.png)
