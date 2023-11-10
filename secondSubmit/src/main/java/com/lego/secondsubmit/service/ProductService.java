package com.lego.secondsubmit.service;

import com.lego.secondsubmit.dto.response.ProductRes;
import com.lego.secondsubmit.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public List<ProductRes> all() {

        return productRepository.all();

    }

    public List<ProductRes> lineSearch(Long line) {

        return productRepository.lineSearch("라인 " + line);

    }

    public List<ProductRes> dynamicSearch(LocalDateTime productionStartTime, LocalDateTime productionEndTime) {

        return productRepository.dynamicSearch(productionStartTime, productionEndTime);

    }

    public List<ProductRes> statusSearch(String status) {

        return productRepository.statusSearch(status);

    }

    public List<ProductRes> productSearch(String product) {

        return productRepository.productSearch(product);

    }
}
