package com.luv2code.spring_boot_library.config;

import com.okta.spring.boot.oauth.Okta;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.accept.ContentNegotiationStrategy;
import org.springframework.web.accept.HeaderContentNegotiationStrategy;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import static org.springframework.security.config.Customizer.withDefaults;

import java.util.List;

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
        .oauth2ResourceServer(oauth2 -> oauth2.jwt(withDefaults()))//在 Header 里携带 JWT Token 来访问。符合“无状态 (Stateless)”架构
        .cors(withDefaults());

        // 关闭 CSRF（仅限纯 API 推荐；若保留 oauth2Login 要谨慎）
        //如果你做的是 前后端分离的 REST API（比如你现在学的 JSON 接口），通常不需要开启 CSRF 防御。
        // 因为 REST API 通常不用 Cookie 存 Session，而是用 JWT 或 Header 里的 Token，黑客很难伪造。
        http.csrf(AbstractHttpConfigurer::disable);

        // 内容协商
        http.setSharedObject(ContentNegotiationStrategy.class, new HeaderContentNegotiationStrategy());

        // Okta: 让 401 返回带消息体的响应
        Okta.configureResourceServer401ResponseBody(http);

        return http.build();
    }

        @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        // 允许的前端来源
        configuration.setAllowedOrigins(List.of(
            "http://localhost:3000",
            "https://library.penghuang.dev"
        ));
        // 允许的方法
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        // 允许的请求头
        configuration.setAllowedHeaders(List.of("Authorization", "Content-Type"));
        // 允许携带凭证（如果有）
        configuration.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
