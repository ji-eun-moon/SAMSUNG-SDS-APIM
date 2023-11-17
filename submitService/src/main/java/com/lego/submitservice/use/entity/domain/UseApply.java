package com.lego.submitservice.use.entity.domain;

import com.lego.submitservice.provide.entity.domain.State;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UseApply {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "use_apply_id")
    private Long id;
    private Long categoryId;
    private String categoryName;
    private String description;
    private String teamName;

    @Column(nullable = true)
    private String userName;
    private LocalDateTime createdAt;

    @Column(nullable = true)
    private LocalDateTime modifiedAt;

    @Enumerated(EnumType.STRING)
    private State state;

    @Column(nullable = true)
    private String denyReason;

    public void changeState(State state) {
        this.state = state;
    }

    public void setDenyReason(String s) {
        this.denyReason = s;
    }

    public void setModifiedAt() {
        this.modifiedAt = LocalDateTime.now();
    }
}
