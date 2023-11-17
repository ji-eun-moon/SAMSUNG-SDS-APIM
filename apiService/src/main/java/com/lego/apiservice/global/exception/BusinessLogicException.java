package com.lego.apiservice.global.exception;

public class BusinessLogicException extends Exception {
    private ExceptionCode exceptionCode;

    public BusinessLogicException(ExceptionCode code) {
        this.exceptionCode = code;
    }
}
