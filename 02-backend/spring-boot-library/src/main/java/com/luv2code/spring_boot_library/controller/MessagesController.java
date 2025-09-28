package com.luv2code.spring_boot_library.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.luv2code.spring_boot_library.entity.Message;
import com.luv2code.spring_boot_library.requestmodels.AdminQuestionRequest;
import com.luv2code.spring_boot_library.service.MessagesService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@CrossOrigin("https://localhost:3000")
@RestController
@RequestMapping("/api/messages")
public class MessagesController {

    private MessagesService messagesService;

    // 自定义命名空间的 email claim（与 Auth0 Action 中保持一致）
    private static final String EMAIL_CLAIM = "https://library-app.local/email";
    private static final String ROLES_CLAIM = "https://library-app.local/roles";

    public MessagesController(MessagesService messagesService) {
        this.messagesService = messagesService;
    }

    @PostMapping("/secure/add/message")
    public void postMessage(@AuthenticationPrincipal Jwt jwt,
            @RequestBody Message messageRequest) {
        String userEmail = jwt.getClaimAsString(EMAIL_CLAIM);
        if (userEmail == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User email is missing");
        }
        messagesService.postMessage(messageRequest, userEmail);
    }

    @PutMapping("/secure/admin/message")
    public void putMessage(@AuthenticationPrincipal Jwt jwt,
            @RequestBody AdminQuestionRequest adminQuestionRequest) throws Exception {
        String userEmail = jwt.getClaimAsString(EMAIL_CLAIM);
        if (userEmail == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "email missing");
        }

        List<String> roles = jwt.getClaimAsStringList(ROLES_CLAIM);
        boolean isAdmin = roles != null && roles.stream().anyMatch(r -> "admin".equalsIgnoreCase(r));
        if (!isAdmin) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Administration page only.");
        }

        messagesService.putMessage(adminQuestionRequest, userEmail);
    }

}
