package com.lego.secondsubmit.service;

import com.lego.secondsubmit.dto.response.ProductRes;
import com.lego.secondsubmit.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductService {

    private final ProductRepository productRepository;

    public List<ProductRes> all() {

        return productRepository.all();

    }

    public List<ProductRes> lineSearch(String line) {

        log.info("{} 번 라인 검색", line);
        String str = "라인-" + line;
        log.info("{} 검색", str);
        return productRepository.lineSearch(str);

    }

    public List<ProductRes> dynamicSearch() {

        return productRepository.dynamicSearch();

    }

    public List<ProductRes> statusSearch(String status) {

        log.info("{} 상태 검색", status);
        return productRepository.statusSearch(status);

    }

    public List<ProductRes> productSearch(String product) {

        log.info("{} 상품 검색", product);
        return productRepository.productSearch(product);

    }

    public List<ProductRes> alreadyEndSearch() {

        log.info("{} 전에 끝난 상품 검색", LocalDateTime.now());
        return productRepository.alreadyEndSearch();

    }

    public List<ProductRes> yetStartSearch() {

        log.info("{} 이후 시작 상품 검색", LocalDateTime.now());
        return productRepository.yetStartSearch();

    }
}
