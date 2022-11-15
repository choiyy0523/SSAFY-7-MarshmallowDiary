package com.marshmallow.user.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

public class UserRequest {
    @ToString
    @Builder
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
