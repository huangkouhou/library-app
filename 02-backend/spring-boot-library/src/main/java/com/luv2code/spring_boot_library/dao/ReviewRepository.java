package com.luv2code.spring_boot_library.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.luv2code.spring_boot_library.entity.Review;

public interface ReviewRepository extends JpaRepository<Review, Long>{

    Page<Review> findByBookId(Long bookId, Pageable pageable);

    Review findByUserEmailAndBookId(String userEmail, Long bookId);

    //delete book from Review table
    @Modifying//表示这个查询是 更新/删除操作
    @Query("delete from Review where bookId = :book_id")
    void deleteAllByBookId(@Param("book_id") Long bookId);
}
