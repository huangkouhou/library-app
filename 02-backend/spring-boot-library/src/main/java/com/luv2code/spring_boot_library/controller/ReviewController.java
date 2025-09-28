package com.luv2code.spring_boot_library.controller;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.luv2code.spring_boot_library.requestmodels.ReviewRequest;
import com.luv2code.spring_boot_library.service.ReviewService;

@CrossOrigin("https://localhost:3000")
@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    private ReviewService reviewService;

    // 自定义命名空间的 email claim（与 Auth0 Action 中保持一致）
    private static final String EMAIL_CLAIM = "https://library-app.local/email";

    public ReviewController (ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping("/secure/user/book")
    public Boolean reviewBookByUser(@AuthenticationPrincipal Jwt jwt,
                                    @RequestParam Long bookId) throws Exception {
        String userEmail = jwt.getClaimAsString(EMAIL_CLAIM);

        if (userEmail == null){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User email is missing");
        }
        return reviewService.userReviewListed(userEmail, bookId);
    }


    @PostMapping("/secure")
    public void postReview(@AuthenticationPrincipal Jwt jwt,
                           @RequestBody ReviewRequest reviewRequest) throws Exception {
        String userEmail = jwt.getClaimAsString(EMAIL_CLAIM);
        if (userEmail == null){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User email is missing");
        }
        reviewService.postReview(userEmail, reviewRequest);
        }
}
