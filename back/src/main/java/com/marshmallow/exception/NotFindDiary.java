package com.marshmallow.exception;

public class NotFindDiary extends  Exception{
    public NotFindDiary() {
        super("해당 날짜에 등록된 일기가 존재하지 않습니다.");
    }
}
