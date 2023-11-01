package com.lego.apiservice.category.repository;

import com.lego.apiservice.category.entity.domain.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    Optional<Category> findByName(String name);

    @Query("select c " +
            "from Category c " +
            "where c.server.employeeId = :employeeId")
    List<Category> findAllByServer(@Param("employeeId") String employeeId);

}
