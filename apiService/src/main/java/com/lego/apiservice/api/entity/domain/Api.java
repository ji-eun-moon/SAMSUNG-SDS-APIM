package com.lego.apiservice.api.entity.domain;

import com.lego.apiservice.category.entity.domain.Category;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Api {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "api_id")
    private Long id;
    private String input;
    @Column(length = 50000)
    private String output;
    @Column(length = 50000)
    private String outputExample;

    private String title;
    private String content;
    private String endpoint;

    @Enumerated(EnumType.STRING)
    private ApiMethod apiMethod;
    @Enumerated(EnumType.STRING)
    private ApiStatus apiStatus;
    private String responseTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

}
