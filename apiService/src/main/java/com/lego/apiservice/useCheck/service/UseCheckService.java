package com.lego.apiservice.useCheck.service;

import com.lego.apiservice.category.entity.domain.Category;
import com.lego.apiservice.category.repository.CategoryRepository;
import com.lego.apiservice.global.config.AES128Config;
import com.lego.apiservice.global.exception.BusinessLogicException;
import com.lego.apiservice.useCheck.entity.domain.UseCheck;
import com.lego.apiservice.useCheck.entity.dto.request.UseCheckRequest;
import com.lego.apiservice.useCheck.repository.UseCheckRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

        Category category = categoryRepository.findById(useCheckRequest.getCategoryId()).orElseThrow();
        useCheckRepository.save(UseCheck.builder()
                        .category(category)
                        .teamName(useCheckRequest.getTeamName())
                        .secretKey(aes128Config.encryptAes("category" + category.getId() + "&teamName" + useCheckRequest.getTeamName()))
                .build());
    }
}
