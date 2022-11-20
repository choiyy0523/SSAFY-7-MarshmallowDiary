package com.marshmallow.exception;

public class AlreadyRegistDiary extends  Exception{
    public AlreadyRegistDiary() {
        super("해당 날짜에 등록된 일기가 존재합니다.");
    }
}
