package com.luv2code.spring_boot_library.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

import com.luv2code.spring_boot_library.entity.History;

public interface HistoryRepository extends JpaRepository<History, Long>{
    //find books by userEmail
    Page<History> findBooksByUserEmail(@RequestParam("email") String userEmail, Pageable pageable);

}
