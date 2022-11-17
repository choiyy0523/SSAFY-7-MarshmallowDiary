package com.marshmallow.user.controller;

import com.marshmallow.user.dto.UserRequest;
import com.marshmallow.user.dto.UserResponse;
import com.marshmallow.user.service.UserService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@ApiOperation(value = "[유저] User Controller")
@RequestMapping("/user")
@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @ApiOperation(value="아이디 중복 검사", notes = "사용할 수 있는 아이디인지 확인")
    @GetMapping("/idcheck")
    public ResponseEntity<?> isValidId(@RequestParam String id) {
        return new ResponseEntity<UserResponse.Result>(userService.isValidId(id), HttpStatus.OK);
    }

    @ApiOperation(value="회원 가입", notes = "회원 가입 기능")
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody UserRequest.Signup signupDto) {
        return new ResponseEntity<UserResponse.Result>(userService.signup(signupDto), HttpStatus.OK);
    }

    @ApiOperation(value="로그인", notes = "로그인 후 access token, refresh token 발급")
    @PostMapping("/signin")
    public ResponseEntity<?> login(@RequestBody UserRequest.Signin signinDto) {
        return new ResponseEntity<UserResponse.Token>(userService.signin(signinDto), HttpStatus.OK);
    }

//    @ApiOperation(value="로그인", notes = "authId를 받아 로그인해서 access token을 보내주는 기능(유저가 없으면 생성 후 토큰 발급)")
//    @PostMapping("/login")
//    public ResponseEntity<?> login(@RequestBody UserRequest.Login loginRequest) {
//        return new ResponseEntity<UserResponse.Token>(userService.login(loginRequest), HttpStatus.OK);
//    }

    @ApiOperation(value="토큰 재발급", notes = "access token 재발급 기능")
    @PostMapping("/reissue")
    public ResponseEntity<?> reissue(@RequestBody UserRequest.Reissue reissueRequest) throws Exception {
        return new ResponseEntity<UserResponse.Token>(userService.reissue(reissueRequest), HttpStatus.OK);
    }

    @ApiOperation(value="회원 탈퇴", notes = "회원 탈퇴 기능")
    @PostMapping(value="/delete")
    public ResponseEntity<?> deleteUser() throws Exception {
        return new ResponseEntity<UserResponse.Result>(userService.delete(), HttpStatus.OK);
    }

    @ApiOperation(value="로그아웃", notes = "로그아웃 기능")
    @PostMapping(value="/logout")
    public ResponseEntity<?> logout() throws Exception {
        return new ResponseEntity<UserResponse.Result>(userService.logout(), HttpStatus.OK);
    }
}
