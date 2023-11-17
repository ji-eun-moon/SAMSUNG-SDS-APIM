package com.lego.secondsubmit.repository;

import com.lego.secondsubmit.dto.response.ProductRes;
import com.lego.secondsubmit.entity.Product;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("SELECT new com.lego.secondsubmit.dto.response.ProductRes(p.line, p.status, p.productName, p.productionQuantity, p.defectQuantity, p.productionStartTime, p.productionEndTime) " +
            "FROM Product p")
    List<ProductRes> all(Pageable pageable);

    @Query("SELECT new com.lego.secondsubmit.dto.response.ProductRes(p.line, p.status, p.productName, p.productionQuantity, p.defectQuantity, p.productionStartTime, p.productionEndTime) " +
            "FROM Product p " +
            "WHERE p.line = :line")
    List<ProductRes> lineSearch(@Param("line") String line, Pageable pageable);

    @Query("SELECT new com.lego.secondsubmit.dto.response.ProductRes(p.line, p.status, p.productName, p.productionQuantity, p.defectQuantity, p.productionStartTime, p.productionEndTime) " +
            "FROM Product p " +
            "WHERE :date >= p.productionStartTime AND :date <= p.productionEndTime")
    List<ProductRes> dynamicSearch(@Param("date") LocalDateTime date, Pageable pageable);

    @Query("SELECT new com.lego.secondsubmit.dto.response.ProductRes(p.line, p.status, p.productName, p.productionQuantity, p.defectQuantity, p.productionStartTime, p.productionEndTime) " +
            "FROM Product p " +
            "WHERE p.status = :status")
    List<ProductRes> statusSearch(@Param("status") String status, Pageable pageable);

    @Query("SELECT new com.lego.secondsubmit.dto.response.ProductRes(p.line, p.status, p.productName, p.productionQuantity, p.defectQuantity, p.productionStartTime, p.productionEndTime) " +
            "FROM Product p " +
            "WHERE p.productName LIKE %:product%")
    List<ProductRes> productSearch(@Param("product") String product, Pageable pageable);

    @Query("SELECT new com.lego.secondsubmit.dto.response.ProductRes(p.line, p.status, p.productName, p.productionQuantity, p.defectQuantity, p.productionStartTime, p.productionEndTime) " +
            "FROM Product p " +
            "WHERE p.productionEndTime <= :date")
    List<ProductRes> alreadyEndSearch(@Param("date") LocalDateTime date, Pageable pageable);

    @Query("SELECT new com.lego.secondsubmit.dto.response.ProductRes(p.line, p.status, p.productName, p.productionQuantity, p.defectQuantity, p.productionStartTime, p.productionEndTime) " +
            "FROM Product p " +
            "WHERE p.productionStartTime >= :date")
    List<ProductRes> yetStartSearch(@Param("date") LocalDateTime date, Pageable pageable);
}
