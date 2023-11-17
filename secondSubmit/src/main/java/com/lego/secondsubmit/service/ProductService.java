package com.lego.secondsubmit.service;

import com.lego.secondsubmit.dto.response.ProductRes;
import com.lego.secondsubmit.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductService {

    private final ProductRepository productRepository;

    public List<ProductRes> all(Pageable pageable) {

        return productRepository.all(pageable);

    }

    public List<ProductRes> lineSearch(String line, Pageable pageable) {

        log.info("{} 번 라인 검색", line);
        String str = "라인-" + line;
        log.info("{} 검색", str);
        return productRepository.lineSearch(str, pageable);

    }

    public List<ProductRes> dynamicSearch(LocalDateTime date, Pageable pageable) {

        return productRepository.dynamicSearch(date, pageable);

    }

    public List<ProductRes> statusSearch(String status, Pageable pageable) {

        log.info("{} 상태 검색", status);
        return productRepository.statusSearch(status, pageable);

    }

    public List<ProductRes> productSearch(String product, Pageable pageable) {

        log.info("{} 상품 검색", product);
        return productRepository.productSearch(product, pageable);

    }

    public List<ProductRes> alreadyEndSearch(LocalDateTime localDateTime, Pageable pageable) {

        return productRepository.alreadyEndSearch(localDateTime, pageable);

    }

    public List<ProductRes> yetStartSearch(LocalDateTime localDateTime, Pageable pageable) {

        return productRepository.yetStartSearch(localDateTime, pageable);

    }
}
