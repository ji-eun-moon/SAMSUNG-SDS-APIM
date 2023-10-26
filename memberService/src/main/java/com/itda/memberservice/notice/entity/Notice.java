package com.itda.memberservice.notice.entity;

import com.itda.memberservice.member.entity.Member;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
public class Notice {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long noticeId;

    private String content;

    @Column(columnDefinition = "BOOLEAN")
    private boolean isRead;

    @ManyToOne
    @JoinColumn(name = "memeber_id")
    private Member member;

    @CreatedDate
    private LocalDateTime createdAt;

}
