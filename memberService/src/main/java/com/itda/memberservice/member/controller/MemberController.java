package com.itda.memberservice.member.controller;

import com.itda.memberservice.member.dto.request.ChangePasswordRequest;
import com.itda.memberservice.member.dto.request.CreateMemberRequest;
import com.itda.memberservice.member.dto.request.LoginMemberRequest;
import com.itda.memberservice.member.dto.response.MemberResponse;
import com.itda.memberservice.member.dto.response.SearchMemberResponse;
import com.itda.memberservice.member.dto.response.SkipMemberResponse;
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
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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
    public ResponseEntity<String> login(@RequestBody LoginMemberRequest request, HttpServletResponse response) {

        try {

            // 로그인 성공시 토큰 반환
            String token = memberService.login(request);

            Cookie cookie = new Cookie("authToken", token);
            cookie.setHttpOnly(true);
            cookie.setSecure(true);
            cookie.setPath("/");
            cookie.setDomain("localhost");

            log.info("로그인 성공");

            response.addCookie(cookie);

            return ResponseEntity.ok().body("로그인 성공");

        } catch (Exception e) {

            // 아이디 없거나 비밀번호 틀린경우 오류 메시지 반환
            log.error("로그인 실패");
            return ResponseEntity.ok(e.getMessage());

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
    public ResponseEntity<?> findByEmployeeId(@RequestParam String employeeId) {

        return ResponseEntity.ok(new SkipMemberResponse(memberService.findByEmployeeId(employeeId)));

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
    public ResponseEntity<?> findByName(String name) {

        return ResponseEntity.ok(memberService.findByName(name));

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

//        log.info("token = " + token);

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
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest request) {

        memberService.changePassword(request.getChangePassword(), "id");

        return ResponseEntity.ok("비밀번호 변경");
    }

    @DeleteMapping("/delete/{member-id}")
    public ResponseEntity<String> deleteMember(@PathVariable("member-id") Long memberId) {

        try {
            memberService.delete(memberId);

            return ResponseEntity.ok("회원 삭제 완료");
        } catch (Exception e) {

            return ResponseEntity.ok(e.getMessage());

        }

    }

    @GetMapping("/mypage")
    public ResponseEntity<?> myPage(Authentication authentication){

        log.info("{MemberController} : 마이페이지 \n" +
                "employeeId = " + authentication.getName());

        return ResponseEntity.ok(memberService.myInformation(authentication.getName()));

    }

    @GetMapping("/check-authority")
    public ResponseEntity<String> checkAuthority(@RequestParam String employeeId) {
        log.info(employeeId);
        return ResponseEntity.ok(memberService.findByEmployeeId(employeeId).getAuthority().toString());
    }

}