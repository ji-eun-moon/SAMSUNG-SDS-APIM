package com.itda.memberservice.member.controller;

import com.itda.memberservice.member.dto.request.*;
import com.itda.memberservice.member.dto.response.LoginMemberResponse;
import com.itda.memberservice.member.dto.response.MemberResponse;
import com.itda.memberservice.member.dto.response.NameSearchResponse;
import com.itda.memberservice.member.entity.Member;
import com.itda.memberservice.member.service.MemberService;
import com.itda.memberservice.memberteam.service.MemberTeamService;
import com.itda.memberservice.team.entity.Team;
import com.itda.memberservice.team.service.TeamService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
@Tag(name = "AUTH", description = "회원 관련 api")
@Slf4j
public class MemberController {

    private final MemberService memberService;
    private final TeamService teamService;
    private final MemberTeamService memberTeamService;

    @PostMapping("/sign-up")
    @Operation(summary = "회원 가입", description = "정해진 정보를 통해 회원 가입")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "회원 가입 성공"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<String> signUp(@RequestBody List<CreateMemberRequest> requests) {

        log.info("회원가입 실행");

        for (CreateMemberRequest request : requests) {

            // 이미 등록된 회원이라면 스킵
            if (memberService.employeeIdDuplicateCheck(request.getEmployeeId())) {
                continue;
            }

            // 새로 등록한 멤버인 경우
            Member member = memberService.register(request);

            // 리스트에 있는 팀 생성하거나 가져와서 멤버에 추가
            for (String teamName : request.getTeamList()) {
                Team team = teamService.registerTeamOrFind(teamName);

                memberTeamService.register(member, team);

            }

        }

        return ResponseEntity.ok("회원등록이 완료되었습니다.");
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
    public ResponseEntity<?> login(@RequestBody LoginMemberRequest request) {

        try {

            // 로그인 성공시 토큰 반환
            String token = memberService.login(request);

            return ResponseEntity.ok().body(LoginMemberResponse.builder()
                    .token(token)
                    .build());

        } catch (Exception e) {

            // 아이디 없거나 비밀번호 틀린경우 오류 메시지 반환
            log.error("로그인 실패");
            return ResponseEntity.status(401).body(e.getMessage());

        }

    }

    @GetMapping("/find-by-employeeId")
    @Operation(summary = "회원 조회", description = "사번을 통한 회원 검색")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "회원 검색 결과", content = @Content(schema = @Schema(
                    implementation = Member.class
            ))),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> findByEmployeeId(@ModelAttribute EmployeeSearchRequest request) {

        log.info("{MemberController} : 회원조회 \n" +
                "employeeId = " + request.getEmployeeId());

        return ResponseEntity.ok(memberService.findByEmployeeId(request.getEmployeeId()));

    }

    @GetMapping("/find-by-name")
    @Operation(summary = "회원 검색", description = "이름을 통한 회원 검색 / 쪽지용")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "회원 검색 결과", content = @Content(schema = @Schema(
                    implementation = NameSearchResponse.class
            ))),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> findByName(@ModelAttribute NameSearchRequest request) {

        log.info("{MemberController} : 회원 검색 " +
                "name = " + request.getName());

        return ResponseEntity.ok(memberService.findByName(request.getName()));

    }

    @GetMapping("/all")
    @Operation(summary = "전체 회원 조회", description = "전체 회원 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "회원 조회 결과", content = @Content(schema = @Schema(
                    implementation = MemberResponse.class
            ))),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> findAll() {

        log.info("{MemberController} : 전체 회원 조회");

        return ResponseEntity.ok(memberService.findAll());

    }

    @PostMapping("/change-password")
    @Operation(summary = "비밀번호 변경", description = "비밀번호 변경")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "비밀번호 변경 완료"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> changePassword(@RequestHeader("member-id") String employeeId, @RequestBody ChangePasswordRequest request) {

        log.info("{MemberController} : 비밀번호 변경 \n" +
                "employeeId = " + employeeId);

        memberService.changePassword(request, employeeId);

        return ResponseEntity.ok("비밀번호 변경");
    }

    @DeleteMapping("/delete/{member-id}")
    public ResponseEntity<String> deleteMember(@PathVariable("member-id") Long memberId) {

        log.info("{MemberController} : 회원삭제 \n" +
                "memberId = " + memberId);

        try {
            memberService.delete(memberId);

            return ResponseEntity.ok("회원 삭제 완료");
        } catch (Exception e) {

            return ResponseEntity.ok(e.getMessage());

        }

    }

    @GetMapping("/mypage")
    public ResponseEntity<?> myPage(@RequestHeader("member-id") String employeeId){

        log.info("{MemberController} : 마이페이지 \n" +
                "employeeId = " + employeeId);

        return ResponseEntity.ok(memberService.myInformation(employeeId));

    }

    @GetMapping("/check-authority")
    public ResponseEntity<String> checkAuthority(@RequestParam String employeeId) {
        log.info(employeeId);
        return ResponseEntity.ok(memberService.findByEmployeeId(employeeId).getAuthority().toString());
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout() {

        return ResponseEntity.ok("로그아웃 완료");

    }

}
