package com.marshmallow.user.service;

import com.marshmallow.auth.JwtTokenProvider;
import com.marshmallow.user.dto.UserRequest;
import com.marshmallow.user.dto.UserResponse;
import com.marshmallow.user.entity.User;
import com.marshmallow.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

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
    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    public UserResponse.Token login(UserRequest.Login loginDto) {
        User user = userRepository.findBySocialId(loginDto.getAuthId()).orElseGet(() -> userRepository.saveAndFlush(User.builder().username(loginDto.getAuthId()).socialId(loginDto.getAuthId()).nickname(loginDto.getNickname()).password(passwordEncoder.encode("pwd")).role("ROLE_USER").build()));
        Authentication authentication = authenticationManagerBuilder
                .getObject()
                .authenticate(new UsernamePasswordAuthenticationToken(user.getSocialId(), "pwd"));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String accessToken = tokenProvider.generateToken(authentication);
        String refreshToken = tokenProvider.generateRefreshToken();
//        Base64.Decoder decoder = Base64.getDecoder();
//        String payload = new String(decoder.decode(token.split("[.]")[1]));

        // RefreshToken Redis에 업데이트
        redisTemplate.opsForValue().set(
                user.getUserId().toString(),
                refreshToken
        );

        // refresh token 저장하기
        return UserResponse.Token.builder()
                .userId(user.getUserId().toString())
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }

    public UserResponse.Token reissue(UserRequest.Reissue reissueRequest) throws Exception {
        if (!StringUtils.hasText(reissueRequest.getRefreshToken()) || !tokenProvider.validateToken(reissueRequest.getRefreshToken())) {
            throw new Exception();
        }
        User user = userRepository.findByUsername(reissueRequest.getAuthId());

        // refresh token 확인
        String token = redisTemplate.opsForValue().get(user.getUserId().toString());
        if(!token.equals(reissueRequest.getRefreshToken())) {
            throw new Exception();
        }

        String accessToken = tokenProvider.generateToken(reissueRequest.getAuthId());
        String refreshToken = tokenProvider.generateRefreshToken();

        // RefreshToken Redis에 업데이트
        redisTemplate.opsForValue().set(
                user.getUserId().toString(),
                refreshToken
        );

        return UserResponse.Token.builder()
                .userId(user.getUserId().toString())
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();

    }
}
