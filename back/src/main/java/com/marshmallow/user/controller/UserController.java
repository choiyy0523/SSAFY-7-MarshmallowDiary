package com.marshmallow.user.controller;

import com.marshmallow.user.dto.UserRequest;
import com.marshmallow.user.dto.UserResponse;
import com.marshmallow.user.service.UserService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@ApiOperation(value = "[유저] User Controller")
@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/user/login")
    @ApiOperation(value="로그인", notes = "authId를 받아 로그인해서 access token을 보내주는 기능(유저가 없으면 생성 후 토큰 발급)")
    public ResponseEntity<?> login(@RequestBody UserRequest.Login loginDto) {
        return new ResponseEntity<UserResponse.Login>(userService.login(loginDto), HttpStatus.OK);
    }

}
