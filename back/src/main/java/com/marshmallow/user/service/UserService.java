package com.marshmallow.user.service;

import com.marshmallow.auth.JwtTokenProvider;
import com.marshmallow.user.dto.UserRequest;
import com.marshmallow.user.dto.UserResponse;
import com.marshmallow.user.entity.User;
import com.marshmallow.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.UUID;
import java.util.concurrent.TimeUnit;

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
    @Value("${jwt.expirationtime.refresh}")
    private long REFRESH_TOKEN_EXPIRE_TIME; // s

    public UserResponse.Result signup(UserRequest.Signup signupDto) {
        userRepository.save(User.builder()
                .nickname(signupDto.getNickname())
                .accountId(signupDto.getAccountId())
                .password(passwordEncoder.encode(signupDto.getPassword()))
                .role("ROLE_USER")
                .build());
        return UserResponse.Result.builder()
                .result("success")
                .message("회원 가입 완료").build();
    }

    public UserResponse.Token signin(UserRequest.Signin signinDto) {
        Authentication authentication = authenticationManagerBuilder
                .getObject()
                .authenticate(new UsernamePasswordAuthenticationToken(signinDto.getAccountId(), signinDto.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String accessToken = tokenProvider.generateToken(authentication);
        String refreshToken = tokenProvider.generateRefreshToken();

        User user = userRepository.findByAccountId(signinDto.getAccountId()).orElseThrow();

        // RefreshToken Redis에 업데이트
        redisTemplate.opsForValue().set(
                user.getUserId().toString(),
                refreshToken
        );
        redisTemplate.expire(user.getUserId().toString(), REFRESH_TOKEN_EXPIRE_TIME, TimeUnit.SECONDS);

        // refresh token 저장하기
        return UserResponse.Token.builder()
                .userId(user.getUserId().toString())
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }


//    public UserResponse.Token login(UserRequest.Login loginDto) {
//        User user = userRepository.findByAccountId(loginDto.getAccountId()).orElseGet(() -> userRepository.saveAndFlush(User.builder().username(loginDto.getAuthId()).socialId(loginDto.getAuthId()).nickname(loginDto.getNickname()).password(passwordEncoder.encode("pwd")).role("ROLE_USER").build()));
//        Authentication authentication = authenticationManagerBuilder
//                .getObject()
//                .authenticate(new UsernamePasswordAuthenticationToken(user.getSocialId(), "pwd"));
//        SecurityContextHolder.getContext().setAuthentication(authentication);
//        String accessToken = tokenProvider.generateToken(authentication);
//        String refreshToken = tokenProvider.generateRefreshToken();
//
//        // RefreshToken Redis에 업데이트
//        redisTemplate.opsForValue().set(
//                user.getUserId().toString(),
//                refreshToken
//        );
//        redisTemplate.expire(user.getUserId().toString(), REFRESH_TOKEN_EXPIRE_TIME, TimeUnit.SECONDS);
//
//        // refresh token 저장하기
//        return UserResponse.Token.builder()
//                .userId(user.getUserId().toString())
//                .accessToken(accessToken)
//                .refreshToken(refreshToken)
//                .build();
//    }

    public UserResponse.Token reissue(UserRequest.Reissue reissueRequest) throws Exception {
        if (!StringUtils.hasText(reissueRequest.getRefreshToken()) || !tokenProvider.validateToken(reissueRequest.getRefreshToken())) {
            throw new Exception();
        }
        User user = userRepository.findByUserId(UUID.fromString(reissueRequest.getUserId()));

        // refresh token 확인
        String token = redisTemplate.opsForValue().get(user.getUserId().toString());
        if(!token.equals(reissueRequest.getRefreshToken())) {
            throw new Exception();
        }

        String accessToken = tokenProvider.generateToken(user.getAccountId());
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

    public UserResponse.Result delete() {
        userRepository.delete(getCurrentUser());
        return UserResponse.Result.builder()
                .result("success")
                .message("회원 탈퇴 완료").build();
    }

    public UserResponse.Result logout() {
        redisTemplate.delete(getCurrentUser().getUserId().toString());
        return UserResponse.Result.builder()
                .result("success")
                .message("로그아웃 완료").build();
    }

    private User getCurrentUser() {
        String id = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByAccountId(id).orElseThrow();
    }
}
