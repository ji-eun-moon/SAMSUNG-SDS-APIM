package com.itda.memberservice.member.controller;

import com.itda.memberservice.member.dto.request.ChangePasswordRequest;
import com.itda.memberservice.member.dto.request.CreateMemberRequest;
import com.itda.memberservice.member.dto.request.LoginMemberRequest;
import com.itda.memberservice.member.dto.response.MemberResponse;
import com.itda.memberservice.member.dto.response.SearchMemberResponse;
import com.itda.memberservice.member.entity.Authority;
import com.itda.memberservice.member.entity.Member;
import com.itda.memberservice.member.service.MemberService;
import com.itda.memberservice.memberteam.service.MemberTeamService;
import com.itda.memberservice.team.dto.response.TeamSkipResponse;
import com.itda.memberservice.team.entity.Team;
import com.itda.memberservice.team.service.TeamService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
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

        for (CreateMemberRequest request : requests) {

            // 이미 등록된 회원이라면 스킵
            if (memberService.employeeIdDuplicateCheck(request.getEmployeeId())) {
                continue;
            }

            // 새로 등록한 멤버인 경우
            Member member = memberService.register(request);

            // 리스트에 있는 팀 생성하거나 가져와서 멤버에 추가
            for (String teamName : request.getTeam()) {
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

            return ResponseEntity.ok(token);

        } catch (Exception e) {

            // 아이디 없거나 비밀번호 틀린경우 오류 메시지 반환
            return ResponseEntity.ok(e.getMessage());

        }

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
    public ResponseEntity<?> members() {
        List<MemberResponse> responses = new ArrayList<>();
        List<TeamSkipResponse> teamSkipResponses = new ArrayList<>();
        teamSkipResponses.add(new TeamSkipResponse(1L, "C201"));
        teamSkipResponses.add(new TeamSkipResponse(1L, "C201"));
        responses.add(new MemberResponse("0912472", "이찬웅", "imageUrl", Authority.관리자,
                "개발 1팀", "백엔드 개발", "cksdnd10001@naver.com", teamSkipResponses));
        responses.add(new MemberResponse("0912473", "송아람", "imageUrl", Authority.일반,
                "개발 2팀", "UX/UI 개발", "son9aram@gmail.com", teamSkipResponses));


        return ResponseEntity.ok(responses);
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

        memberService.changePassword(request, "id");

        return ResponseEntity.ok("비밀번호 변경");
    }

    @DeleteMapping("/delete/{member-id}")
    public ResponseEntity<String> deleteMember(@PathVariable("member-id") Long memberId) {

        memberService.delete(memberId);

        return ResponseEntity.ok("회원 삭제 완료");
    }

    // 마이 페이지 회원 정보 조회
    //
}
