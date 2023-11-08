package com.lego.apiservice.useCheck.service;

import com.lego.apiservice.category.entity.domain.Category;
import com.lego.apiservice.category.repository.CategoryRepository;
import com.lego.apiservice.global.config.AES128Config;
import com.lego.apiservice.global.exception.BusinessLogicException;
import com.lego.apiservice.useCheck.entity.domain.UseCheck;
import com.lego.apiservice.useCheck.entity.dto.request.UseCheckRequest;
import com.lego.apiservice.useCheck.entity.dto.response.CategoryTokenResponse;
import com.lego.apiservice.useCheck.repository.UseCheckRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class UseCheckService {

    private final UseCheckRepository useCheckRepository;
    private final CategoryRepository categoryRepository;
    private final AES128Config aes128Config;

    @Transactional
    public void register(UseCheckRequest useCheckRequest) throws BusinessLogicException {

        if (!useCheckRepository.findByTeamNameAndCategory(useCheckRequest.getTeamName(), useCheckRequest.getCategoryId()).isEmpty()) {
            throw new RuntimeException("이미 같은 신청이 존재합니다.");
        }

        Category category = categoryRepository.findById(useCheckRequest.getCategoryId()).orElseThrow();
        useCheckRepository.save(UseCheck.builder()
                        .category(category)
                        .teamName(useCheckRequest.getTeamName())
                        .secretKey(aes128Config.encrypt("category" + category.getId() + "&teamName" + useCheckRequest.getTeamName()))
                .build());

        log.info(aes128Config.encrypt("category" + category.getId() + "&teamName" + useCheckRequest.getTeamName()));
        log.info(aes128Config.decrypt(aes128Config.encrypt("category" + category.getId() + "&teamName" + useCheckRequest.getTeamName())));
    }

    public List<CategoryTokenResponse> getToken(String teamName) {

        List<UseCheck> useCheckList = useCheckRepository.findAllByTeamName(teamName);
        List<CategoryTokenResponse> categoryTokenResponses = new ArrayList<>();

        useCheckList.forEach(useCheck -> {
            Category category = categoryRepository.findById(useCheck.getCategory().getId()).orElseThrow();
            categoryTokenResponses.add(new CategoryTokenResponse(category.getId(), category.getName(), useCheck.getSecretKey()));
        });

        return categoryTokenResponses;
    }
}
