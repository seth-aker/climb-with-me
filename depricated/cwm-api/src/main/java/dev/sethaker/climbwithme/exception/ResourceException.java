package dev.sethaker.climbwithme.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
@Getter
public class ResourceException extends RuntimeException {
    private HttpStatus httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;

    public ResourceException(HttpStatus httpStatus, String message, Throwable cause) {
        super(message, cause);
        this.httpStatus = httpStatus;
    }
    public ResourceException(HttpStatus httpStatus, String message) {
        super(message);
        this.httpStatus = httpStatus;
    }
}
