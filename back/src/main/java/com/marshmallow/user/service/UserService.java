package com.marshmallow.user.service;

import com.marshmallow.auth.JwtTokenProvider;
import com.marshmallow.user.dto.UserRequest;
import com.marshmallow.user.dto.UserResponse;
import com.marshmallow.user.entity.User;
import com.marshmallow.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private AuthenticationManagerBuilder authenticationManagerBuilder;
    @Autowired
    JwtTokenProvider tokenProvider;
    @Autowired
    UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserResponse.Login login(UserRequest.Login loginDto) {
        User user = userRepository.findBySocialId(loginDto.getAuthId()).orElseGet(() -> userRepository.saveAndFlush(User.builder().username(loginDto.getAuthId()).socialId(loginDto.getAuthId()).nickname(loginDto.getNickname()).password(passwordEncoder.encode("pwd")).role("ROLE_USER").build()));
        Authentication authentication = authenticationManagerBuilder
                .getObject()
                .authenticate(new UsernamePasswordAuthenticationToken(user.getSocialId(), "pwd"));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = tokenProvider.generateToken(authentication);
        return UserResponse.Login.builder().userId(user.getUserId().toString()).accessToken(token).build();
    }
}
