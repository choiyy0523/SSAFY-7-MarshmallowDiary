package com.marshmallow.user.dto;

import lombok.Getter;

public class UserRequest {
    @Getter
    public static class Login {
        private String authId;
        private String nickname;
    }

    @Getter
    public static class Reissue {
        private String userId;
        private String refreshToken;
    }

}
