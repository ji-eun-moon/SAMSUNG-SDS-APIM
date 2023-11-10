package com.lego.secondsubmit.repository;

import com.lego.secondsubmit.dto.response.ProductRes;
import com.lego.secondsubmit.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("SELECT new com.lego.secondsubmit.dto.response.ProductRes(p.line, p.status, p.productName, p.productionQuantity, p.defectQuantity, p.productionStartTime, p.productionEndTime) " +
            "FROM Product p")
    List<ProductRes> all();

    @Query("SELECT new com.lego.secondsubmit.dto.response.ProductRes(p.line, p.status, p.productName, p.productionQuantity, p.defectQuantity, p.productionStartTime, p.productionEndTime) " +
            "FROM Product p " +
            "WHERE p.line = :line")
    List<ProductRes> lineSearch(String line);

    @Query("SELECT new com.lego.secondsubmit.dto.response.ProductRes(p.line, p.status, p.productName, p.productionQuantity, p.defectQuantity, p.productionStartTime, p.productionEndTime) " +
            "FROM Product p " +
            "WHERE now() >= p.productionStartTime AND now() <= p.productionEndTime")
    List<ProductRes> dynamicSearch(LocalDateTime productionStartTime, LocalDateTime productionEndTime);

    @Query("SELECT new com.lego.secondsubmit.dto.response.ProductRes(p.line, p.status, p.productName, p.productionQuantity, p.defectQuantity, p.productionStartTime, p.productionEndTime) " +
            "FROM Product p " +
            "WHERE p.status = :status")
    List<ProductRes> statusSearch(String status);

    @Query("SELECT new com.lego.secondsubmit.dto.response.ProductRes(p.line, p.status, p.productName, p.productionQuantity, p.defectQuantity, p.productionStartTime, p.productionEndTime) " +
            "FROM Product p " +
            "WHERE p.productName LIKE %:product%")
    List<ProductRes> productSearch(String product);
}
