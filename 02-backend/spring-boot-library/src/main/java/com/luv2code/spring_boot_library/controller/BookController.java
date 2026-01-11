package com.luv2code.spring_boot_library.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.luv2code.spring_boot_library.entity.Book;
import com.luv2code.spring_boot_library.responsemodels.ShelfCurrentLoansResponse;
import com.luv2code.spring_boot_library.service.BookService;

@CrossOrigin(origins = {"http://localhost:3000", "https://library.penghuang.dev"})
@RestController
@RequestMapping("/api/books")
public class BookController {

    private BookService bookService;

    // 自定义命名空间的 email claim（与 Auth0 Action 中保持一致）
    private static final String EMAIL_CLAIM = "http://localhost:3000/email";

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping("/secure/currentloans")
    public List<ShelfCurrentLoansResponse> currentLoans(@AuthenticationPrincipal Jwt jwt) throws Exception {

        String userEmail = jwt.getClaimAsString(EMAIL_CLAIM);

        if (userEmail == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User email is missing");
        }
        return bookService.currentLoans(userEmail);
    }

    @GetMapping("/secure/currentloans/count")
    public int currentLoansCount(@AuthenticationPrincipal Jwt jwt) throws Exception {
        String userEmail = jwt.getClaimAsString(EMAIL_CLAIM);

        if (userEmail == null){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User email is missing");
        }
        return bookService.currentLoansCount(userEmail);
    }

    @GetMapping("/secure/ischeckedout/byuser")
    public Boolean checkoutBookByUser(@AuthenticationPrincipal Jwt jwt,
                                      @RequestParam Long bookId) throws Exception {
        String userEmail = jwt.getClaimAsString(EMAIL_CLAIM);

        if (userEmail == null){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User email is missing");
        }

        return bookService.checkoutBookByUser(userEmail, bookId);
    }

    @PutMapping("/secure/checkout")
    @ResponseBody
    public Book checkoutBook(@AuthenticationPrincipal Jwt jwt,
            @RequestParam Long bookId) throws Exception {
        String userEmail = jwt.getClaimAsString(EMAIL_CLAIM);

        if (userEmail == null){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User email is missing");
        }

        return bookService.checkoutBook(userEmail, bookId);
    }

    @PutMapping("/secure/return")
    public void returnBook(@AuthenticationPrincipal Jwt jwt,
            @RequestParam Long bookId) throws Exception {
        String userEmail = jwt.getClaimAsString(EMAIL_CLAIM);

        if (userEmail == null){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User email is missing");
        }

        bookService.returnBook(userEmail, bookId);
    }

    @PutMapping("/secure/renew/loan")
    public void renewLoan(@AuthenticationPrincipal Jwt jwt,
            @RequestParam Long bookId) throws Exception {
        String userEmail = jwt.getClaimAsString(EMAIL_CLAIM);

        if (userEmail == null){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User email is missing");
        }
        
        bookService.renewLoan(userEmail, bookId);
    }

    @GetMapping("/secure/history")
    public List<com.luv2code.spring_boot_library.entity.History> shelfHistories(@AuthenticationPrincipal Jwt jwt) throws Exception {
        String userEmail = jwt.getClaimAsString(EMAIL_CLAIM);
        
        if (userEmail == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User email is missing");
        }

        return bookService.shelfHistory(userEmail);
    }
       
   

}
