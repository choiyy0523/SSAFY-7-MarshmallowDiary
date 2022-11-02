package com.marshmallow.user.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

public class UserResponse {

    @Getter
    @ToString
    @Builder
    public static class Login {
        private String userId;
        private String accessToken;
    }

}
