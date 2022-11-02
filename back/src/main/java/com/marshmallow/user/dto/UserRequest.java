package com.marshmallow.user.dto;

import lombok.Builder;
import lombok.Getter;

public class UserRequest {
    @Getter
    public static class Login {
        private String authId;
        private String nickname;
    }

}
