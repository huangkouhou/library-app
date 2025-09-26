package com.luv2code.spring_boot_library.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.luv2code.spring_boot_library.entity.Checkout;

public interface CheckoutRepository extends JpaRepository<Checkout, Long>{

    Checkout findByUserEmailAndBookId(String userEmail, Long bookId);

    // return every checkout that we currently have for find books by user email
    List<Checkout> findBooksByUserEmail(String userEmail);

    //delete book from Checkout table
    @Modifying//表示这个查询是 更新/删除操作
    @Query("delete from Checkout where bookId = :book_id")
    void deleteAllByBookId(@Param("book_id") Long bookId);
}
