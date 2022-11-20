package com.marshmallow.exception;

public class CanNotRegistDiary extends  Exception{
    public CanNotRegistDiary() {
        super("일기를 등록할 수 없습니다.");
    }
}
