package com.luv2code.spring_boot_library.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.luv2code.spring_boot_library.requestmodels.AddBookRequest;
import com.luv2code.spring_boot_library.service.AdminService;

@CrossOrigin(origins = {"http://localhost:3000", "https://library.penghuang.dev"})
@RestController
@RequestMapping("/api/admin/secure")
public class AdminController {

    private AdminService adminService;

    private static final String ROLES_CLAIM = "https://library.penghuang.dev";

    public AdminController(AdminService adminService){
        this.adminService = adminService;
    }

    @PutMapping("/increase/book/quantity")
    public void increaseBookQuantity(@AuthenticationPrincipal Jwt jwt,
                                     @RequestParam Long bookId) throws Exception{
    
    List<String> roles = jwt.getClaimAsStringList(ROLES_CLAIM);
    boolean isAdmin = roles != null && roles.stream().anyMatch(r -> "admin".equalsIgnoreCase(r));
    if (!isAdmin) {
        throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Administration page only.");
    }
        adminService.increaseBookQuantity(bookId);                       
    }


    @PutMapping("/decrease/book/quantity")
    public void decreaseBookQuantity(@AuthenticationPrincipal Jwt jwt,
                                     @RequestParam Long bookId) throws Exception{

    List<String> roles = jwt.getClaimAsStringList(ROLES_CLAIM);
    boolean isAdmin = roles != null && roles.stream().anyMatch(r -> "admin".equalsIgnoreCase(r));
    if (!isAdmin) {
        throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Administration page only.");
    }
        adminService.decreaseBookQuantity(bookId);    
    
    }


    @PostMapping("/add/book")
    public void postBook(@AuthenticationPrincipal Jwt jwt,
                         @RequestBody AddBookRequest addBookRequest) throws Exception{

    List<String> roles = jwt.getClaimAsStringList(ROLES_CLAIM);
    boolean isAdmin = roles != null && roles.stream().anyMatch(r -> "admin".equalsIgnoreCase(r));
    if (!isAdmin) {
        throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Administration page only.");
    }
        adminService.postBook(addBookRequest);                       
    }

    @DeleteMapping("/delete/book")
    public void deleteBook(@AuthenticationPrincipal Jwt jwt,
                           @RequestParam Long bookId) throws Exception {

    List<String> roles = jwt.getClaimAsStringList(ROLES_CLAIM);
    boolean isAdmin = roles != null && roles.stream().anyMatch(r -> "admin".equalsIgnoreCase(r));
    if (!isAdmin) {
        throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Administration page only.");
    }
        adminService.deleteBook(bookId);
    }

}
