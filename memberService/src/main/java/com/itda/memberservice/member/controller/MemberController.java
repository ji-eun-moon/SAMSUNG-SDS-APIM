package com.itda.memberservice.member.controller;

import com.itda.memberservice.member.entity.domain.Authority;
import com.itda.memberservice.member.entity.dto.request.CreateMemberRequest;
import com.itda.memberservice.member.entity.dto.request.LoginMemberRequest;
import com.itda.memberservice.member.entity.dto.response.MemberResponse;
import com.itda.memberservice.member.entity.dto.response.SearchMemberResponse;
import com.itda.memberservice.member.service.MemberService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
@Tag(name = "AUTH", description = "회원 관련 api")
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/sign-up")
    @Operation(summary = "회원 가입", description = "정해진 정보를 통해 회원 가입")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "회원 가입 성공"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> signUp(@RequestBody List<CreateMemberRequest> requests) {
        return ResponseEntity.status(HttpStatus.CREATED).body(HttpStatus.CREATED);
    }

    @PostMapping("/login")
    @Operation(summary = "로그인", description = "사번과 비밀번호를 통해 로그인")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "로그인 성공", content = @Content(schema = @Schema(
                    implementation = String.class
            ))),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> login(@RequestBody LoginMemberRequest loginMemberRequest) {
        return ResponseEntity.ok(HttpStatus.ACCEPTED);
    }

    @GetMapping("/find-by-name")
    @Operation(summary = "회원 검색", description = "이름을 통한 회원 검색")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "회원 검색 결과", content = @Content(schema = @Schema(
                    implementation = SearchMemberResponse.class
            ))),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> findByName(@RequestParam(name = "name", defaultValue = "이찬웅") String name) {
        List<SearchMemberResponse> responses = new ArrayList<>();
        responses.add(new SearchMemberResponse("0916995", "송아람", "광주 2반", "C201", "image"));
        responses.add(new SearchMemberResponse("0916995", "송아람", "광주 2반", "C201", "image"));
        responses.add(new SearchMemberResponse("0916995", "송아람", "광주 2반", "C201", "image"));
        responses.add(new SearchMemberResponse("0916995", "송아람", "광주 2반", "C201", "image"));

        return ResponseEntity.ok(responses);
    }

    @GetMapping("/all")
    public ResponseEntity<?> members() {
        List<MemberResponse> responses = new ArrayList<>();
        responses.add(new MemberResponse(1L, "0912472", "이찬웅", "010-9678-7667", "imageUrl", Authority.관리자,
                "개발 1팀", "백엔드 개발", "cksdnd10001@naver.com"));
        responses.add(new MemberResponse(1L, "0912473", "송아람", "010-9678-7667", "imageUrl", Authority.일반,
                "개발 2팀", "UX/UI 개발", "son9aram@gmail.com"));


        return ResponseEntity.ok(responses);
    }

    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody String pwd) {
        return ResponseEntity.ok(HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/delete/{member-id}")
    public ResponseEntity<?> deleteMember(@PathVariable("member-id") Long memberId) {
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(HttpStatus.NO_CONTENT);
    }
}
