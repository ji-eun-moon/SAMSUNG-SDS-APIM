package com.itda.memberservice.error;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
public enum ErrorCode {

    // member
    USER_NOT_FOUND(HttpStatus.UNAUTHORIZED, "해당하는 정보의 사용자를 찾을 수 없습니다."),
    USER_PASSWORD_INVALID(HttpStatus.UNAUTHORIZED, "잘못된 비밀번호입니다."),
    EMPLOYEE_ID_NOT_FOUND(HttpStatus.UNAUTHORIZED, "해당 사번의 사용자를 찾을 수 없습니다.");

    private final HttpStatus httpStatus;
    private final String message;

}
