package com.itda.memberservice.member.service;

import com.itda.memberservice.common.util.JwtUtil;
import com.itda.memberservice.member.dto.request.CreateMemberRequest;
import com.itda.memberservice.member.dto.request.LoginMemberRequest;
import com.itda.memberservice.member.dto.response.MemberResponse;
import com.itda.memberservice.member.dto.response.SearchMemberResponse;
import com.itda.memberservice.member.entity.Member;
import com.itda.memberservice.member.repository.MemberRepository;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.persistence.EntityManager;
import jakarta.xml.bind.DatatypeConverter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.crypto.spec.SecretKeySpec;
import java.security.Key;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class MemberService {

    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder encoder;
    @Value("${security.jwt.secret.key}")
    private String secretKey;
    private final EntityManager entityManager;

    public Member register(CreateMemberRequest request){

        log.info("{MemberService} : register 실행");

        return memberRepository.save(Member.builder()
                        .employeeId(request.getEmployeeId())
                        .name(request.getName())
                        .password(encoder.encode(request.getPassword()))
                        .imageUrl(request.getImageUrl())
                        .authority(request.getAuthority())
                        .department(request.getDepartment())
                        .position(request.getPosition())
                        .email(request.getEmail())
                .build());

    }

    public boolean employeeIdDuplicateCheck(String employeeId){

        return memberRepository.existsByEmployeeId(employeeId);

    }

    public String login(LoginMemberRequest request){

        Member member = memberRepository.findByEmployeeId(request.getEmployeeId())
                .orElseThrow(() -> new RuntimeException("해당하는 회원이 존재하지 않습니다."));

        byte[] secretKeyByte = DatatypeConverter.parseBase64Binary(secretKey);

        Key key = new SecretKeySpec(secretKeyByte, SignatureAlgorithm.HS256.getJcaName());

        if (encoder.matches(request.getPwd(), member.getPassword())) {
            Long accessExpiration = (long) (60 * 60 * 24 * 7 * 1000);
            return JwtUtil.createToken(request.getEmployeeId(), key, accessExpiration);
        } else {
            throw new RuntimeException("비밀번호가 일치하지않습니다.");
        }

    }

    public void delete(Long memberId) {

        log.info("{멤버 삭제} : memberId = " + memberId);

        Member member = memberRepository.findByMemberId(memberId)
                .orElseThrow(() -> new RuntimeException("해당 회원은 존재하지않습니다."));

        log.info("{멤버 삭제} : member = " + member);

        memberRepository.delete(member);

    }

    public void changePassword(String password, String employeeId) {

        memberRepository
                .findMemberByEmployeeId(employeeId)
                .changePassword(encoder.encode(password));

    }

    public Member findByEmployeeId(String id){

        return memberRepository.findMemberByEmployeeId(id);

    }

    public List<SearchMemberResponse> findByName(String name) {
        return memberRepository.findByName(name);
    }

    public List<MemberResponse> findAll() {

        return memberRepository.findMemberResponse();

    }

    public MemberResponse myInformation(String employeeId){

        return memberRepository.findMemberResponseByEmployeeId(employeeId);

    }
}
