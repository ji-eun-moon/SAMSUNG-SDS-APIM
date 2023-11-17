package com.lego.apiservice.global.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class CustomException extends RuntimeException{

    ErrorCode errorCode;

}
