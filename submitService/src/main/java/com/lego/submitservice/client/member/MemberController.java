package com.lego.submitservice.client.member;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {

    private final MemberService memberService;
    private final MemberServiceClient memberServiceClient;

    @GetMapping("")
    public ResponseEntity<?> checkAuthority() {
        memberService.checkAuthority("0912472");
        return ResponseEntity.ok(HttpStatus.ACCEPTED);
    }

    @GetMapping("/employee")
    public ResponseEntity<?> getMemberByEmployeeId() {
        memberService.getMemberByEmployeeId("0912472");
        return ResponseEntity.ok(memberService.getMemberByEmployeeId("0912472"));
    }

    @GetMapping("/team")
    public ResponseEntity<?> checkTeam() {
        return ResponseEntity.ok(memberService.checkTeam("0912472", "project3"));
    }
}
