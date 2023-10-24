package com.itda.memberservice.member.controller;

import com.itda.memberservice.member.entity.domain.Authority;
import com.itda.memberservice.member.entity.dto.request.CreateMemberRequest;
import com.itda.memberservice.member.entity.dto.request.LoginMemberRequest;
import com.itda.memberservice.member.entity.dto.response.MemberResponse;
import com.itda.memberservice.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/sign-up")
    public ResponseEntity<?> signUp(@RequestBody List<CreateMemberRequest> requests) {
        return ResponseEntity.ok(HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginMemberRequest loginMemberRequest) {
        return ResponseEntity.ok(HttpStatus.ACCEPTED);
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
