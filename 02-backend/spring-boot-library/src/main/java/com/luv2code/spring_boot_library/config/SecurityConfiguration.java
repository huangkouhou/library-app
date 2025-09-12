package com.luv2code.spring_boot_library.config;

import com.okta.spring.boot.oauth.Okta;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.accept.ContentNegotiationStrategy;
import org.springframework.web.accept.HeaderContentNegotiationStrategy;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
public class SecurityConfiguration {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        // 保护 /api/**/secure/**，其他放行
        http.authorizeHttpRequests(auth -> auth
                .requestMatchers(
                        "/api/books/secure/**",
                        "/api/reviews/secure/**",//secure our review
                        "/api/messages/secure/**",//secure our message
                        "/api/admin/secure/**",
                        "/api/admin/secure/**"
                ).authenticated()
                .anyRequest().permitAll()
        )
        .oauth2Login(withDefaults())
        .oauth2ResourceServer(oauth2 -> oauth2.jwt(withDefaults()))
        .cors(withDefaults());

        // 关闭 CSRF（仅限纯 API 推荐；若保留 oauth2Login 要谨慎）
        http.csrf(AbstractHttpConfigurer::disable);

        // 内容协商
        http.setSharedObject(ContentNegotiationStrategy.class, new HeaderContentNegotiationStrategy());

        // Okta: 让 401 返回带消息体的响应
        Okta.configureResourceServer401ResponseBody(http);

        return http.build();
    }
}
