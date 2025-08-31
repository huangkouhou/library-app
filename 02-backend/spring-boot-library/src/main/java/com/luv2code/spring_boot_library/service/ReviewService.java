package com.luv2code.spring_boot_library.service;

import java.time.LocalDate;
import java.sql.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.luv2code.spring_boot_library.dao.BookRepository;
import com.luv2code.spring_boot_library.dao.ReviewRepository;
import com.luv2code.spring_boot_library.entity.Review;
import com.luv2code.spring_boot_library.requestmodels.ReviewRequest;

@Service
@Transactional
public class ReviewService {

    private BookRepository bookRepository;

    private ReviewRepository reviewRepository;

    //ReviewService 这个类要依赖两个仓库（BookRepository、ReviewRepository），
    //由 Spring 在创建 ReviewService 的时候自动把这两个依赖传进来，然后赋值给类里的同名字段，供后续方法使用。
    public ReviewService(BookRepository bookRepository,
                        ReviewRepository reviewRepository) {
    
        this.bookRepository = bookRepository;
        this.reviewRepository = reviewRepository;
    }

    //POST review function 在 Java 中，如果一个方法 (method) 不返回任何结果，那么 void 关键字是必须添加的
    @Autowired
    public void postReview(String userEmail, ReviewRequest reviewRequest) throws Exception {
        Review validateReview = reviewRepository.findByUserEmailAndBookId(userEmail, reviewRequest.getBookId());
        if (validateReview != null) {
            throw new Exception("Review already created");
        }

        Review review = new Review();
        review.setBookId(reviewRequest.getBookId());
        review.setRating(reviewRequest.getRating());
        review.setUserEmail(userEmail);
        if (reviewRequest.getReviewDescription().isPresent()){
            review.setReviewDescription(reviewRequest.getReviewDescription().map(
                    Object::toString
            ).orElse(null));
        }
        review.setDate(Date.valueOf(LocalDate.now()));
        reviewRepository.save(review);
    }


}
