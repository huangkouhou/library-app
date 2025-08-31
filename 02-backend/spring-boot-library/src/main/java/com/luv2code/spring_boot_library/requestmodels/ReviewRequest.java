package com.luv2code.spring_boot_library.requestmodels;

import java.util.Optional;

import lombok.Data;

@Data
public class ReviewRequest {

    private double rating;

    private Long bookId;

    private Optional<String> reviewDescription;

}

// ReviewRequest is going to be the object that 
// the client side react frontend is going to send to us as the backend object
// 对象（object） = 实例，存放和携带状态；
// 方法（method） = 行为，定义如何操作状态；