package com.marshmallow.user.dto;

import lombok.Getter;

public class UserRequest {

    @Getter
    public static class Signup {
        private String accountId;
        private String password;
        private String nickname;
    }

    @Getter
    public static class Signin {
        private String accountId;
        private String password;
    }

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
