package com.luv2code.spring_boot_library.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.luv2code.spring_boot_library.entity.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long>{

    Payment findByUserEmail(String userEmail);
}
