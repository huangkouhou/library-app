package com.luv2code.spring_boot_library.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.luv2code.spring_boot_library.requestmodels.PaymentInfoRequest;
import com.luv2code.spring_boot_library.service.PaymentService;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;

@CrossOrigin(origins = {"http://localhost:3000", "https://library.penghuang.dev"})
@RestController
@RequestMapping("/api/payment/secure")
public class PaymentController {

    private PaymentService paymentService;

    // 自定义命名空间的 email claim（与 Auth0 Action 中保持一致）
    private static final String EMAIL_CLAIM = "https://library.penghuang.dev/email";

    public PaymentController(PaymentService paymentService){
        this.paymentService = paymentService;
    }

    @PostMapping("/payment-intent")
    public ResponseEntity<String> createPaymentIntent(@RequestBody PaymentInfoRequest paymentInfoRequest)
            throws StripeException{
                
        PaymentIntent paymentIntent = paymentService.createPaymentIntent(paymentInfoRequest);
        String paymentStr = paymentIntent.toJson();

        return new ResponseEntity<>(paymentStr, HttpStatus.OK);
    }


    @PutMapping("/payment-complete")
    public ResponseEntity<String> stripePaymentComplete(@AuthenticationPrincipal Jwt jwt) throws Exception {
        String userEmail = jwt.getClaimAsString(EMAIL_CLAIM);
        if (userEmail == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User email is missing");
        }
        return paymentService.stripePayment(userEmail);
    }
}
                                                    


