package com.luv2code.spring_boot_library.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import com.luv2code.spring_boot_library.entity.Checkout;

public interface CheckoutRepository extends JpaRepository<Checkout, Long>{

    Checkout findByUserEmailAndBookId(String userEmail, Long bookId);
}
