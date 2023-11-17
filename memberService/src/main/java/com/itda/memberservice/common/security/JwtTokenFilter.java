//package com.itda.memberservice.common.security;
//
//import com.itda.memberservice.common.util.JwtUtil;
//import com.itda.memberservice.member.entity.Member;
//import com.itda.memberservice.member.service.MemberService;
//import io.jsonwebtoken.SignatureAlgorithm;
//import jakarta.servlet.FilterChain;
//import jakarta.servlet.ServletException;
//import jakarta.servlet.http.Cookie;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import jakarta.xml.bind.DatatypeConverter;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
//import org.springframework.util.StringUtils;
//import org.springframework.web.filter.OncePerRequestFilter;
//
//import javax.crypto.spec.SecretKeySpec;
//import java.io.IOException;
//import java.security.Key;
//import java.util.ArrayList;
//import java.util.List;
//
//@RequiredArgsConstructor
//@Slf4j
//public class JwtTokenFilter extends OncePerRequestFilter {
//
//    private final MemberService memberService;
//    @Value("${security.jwt.secret.key}")
//    private final String secretKey;
//
//    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
//
//        log.info("{JwtTokenFilter} : doFilter 시작");
//
//        Cookie[] cookies = request.getCookies();
//
//        String jwtToken = null;
//
//        if (cookies == null) {
//            log.info("{JwtTokenFilter} : 쿠키가 없음");
//            filterChain.doFilter(request, response);
//            return ;
//        }
//
//        for (Cookie cookie : cookies) {
//            if (cookie.getName().equals("token")) {
//                jwtToken = cookie.getValue();
//            }
//        }
//
//        System.out.println("{JwtTokenFilter} : requestHeader = " + jwtToken);
//
//        // 토큰 저장하는 곳에 아무것도 없는 경우
//        if (!StringUtils.hasText(jwtToken)) {
//            log.error("{JwtTokenFilter} : requestHeader에 토큰이 존재하지 않습니다.");
//            filterChain.doFilter(request, response);
//            return;
//        }
//
////        // 토큰이 잘못된 형태인 경우
////        if (!jwtToken.startsWith("Bearer ")) {
////            log.error("{JwtTokenFilter} : 잘못된 형태의 토큰입니다.");
////            filterChain.doFilter(request, response);
////            return ;
////        }
//
//        byte[] secretKeyByte = DatatypeConverter.parseBase64Binary(secretKey);
//
//        Key key = new SecretKeySpec(secretKeyByte, SignatureAlgorithm.HS256.getJcaName());
//
//
//        // 기한이 만료된 토큰인 경우
//        if (JwtUtil.isExpired(jwtToken, key)) {
//            log.error("{JwtTokenFilter} : 만료된 토큰입니다.");
//            filterChain.doFilter(request, response);
//            return ;
//        }
//
//        String employeeId = JwtUtil.getId(jwtToken, key);
//
//        log.info("{JwtTokenFilter} : employeeId = " + employeeId);
//
//        Member selectedMember = memberService.findByEmployeeId(employeeId);
//
//        List<GrantedAuthority> list = new ArrayList<>();
//        list.add(new SimpleGrantedAuthority(selectedMember.getAuthority().toString()));
//
//        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
//                selectedMember.getEmployeeId(), null, list
//        );
//
//        authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//
//        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
//        filterChain.doFilter(request, response);
//
//    }
//
//}
