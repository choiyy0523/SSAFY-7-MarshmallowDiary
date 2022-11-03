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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@ApiOperation(value = "[유저] User Controller")
@RequestMapping("/user")
@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @ApiOperation(value="로그인", notes = "authId를 받아 로그인해서 access token을 보내주는 기능(유저가 없으면 생성 후 토큰 발급)")
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserRequest.Login loginRequest) {
        return new ResponseEntity<UserResponse.Token>(userService.login(loginRequest), HttpStatus.OK);
    }

    @ApiOperation(value="로그인", notes = "access token 재발급 기능")
    @PostMapping("/reissue")
    public ResponseEntity<?> reissue(@RequestBody UserRequest.Reissue reissueRequest) throws Exception {
        return new ResponseEntity<UserResponse.Token>(userService.reissue(reissueRequest), HttpStatus.OK);
    }

}
