package com.itda.memberservice.notice.entity;

import com.itda.memberservice.member.entity.Member;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@EntityListeners(AuditingEntityListener.class)
public class Notice {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long noticeId;

    private String title;
    private String content;

    @Column(columnDefinition = "BOOLEAN")
    private boolean isRead;

    @ManyToOne
    @JoinColumn(name = "sender_id", updatable = false)
    private Member sender;

    @ManyToOne
    @JoinColumn(name = "receiver_id", updatable = false)
    private Member receiver;

    @Column(columnDefinition = "BOOLEAN")
    private boolean isSenderDeleted;

    @Column(columnDefinition = "BOOLEAN")
    private boolean isReceiverDeleted;

    @CreatedDate
    private LocalDateTime createdAt;

}
