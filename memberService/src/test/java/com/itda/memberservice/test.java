//package com.itda.memberservice;
//
//import com.itda.memberservice.member.repository.MemberRepository;
//import com.itda.memberservice.notice.dto.request.NoticeCreateRequest;
//import com.itda.memberservice.notice.service.NoticeService;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//
//import java.util.ArrayList;
//import java.util.List;
//
//@SpringBootTest
//public class test {
//
//    @Autowired
//    MemberRepository memberRepository;
//    @Autowired
//    NoticeService noticeService;
//
//    @Test
//    public void createNotice(){
//        List<Long> list = new ArrayList<>();
//        list.add(2L);
//
//        for (int i = 1; i < 30; i++) {
//            noticeService.sendNotice("admin", NoticeCreateRequest.builder()
//                    .content("아람아 안녕" + i)
//                            .title("아람아 안녕" + i)
//                            .memberIds(list)
//                    .build());
//        }
//    }
//
//}
