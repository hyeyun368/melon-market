package com.melonmarket.backend.common;

import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.melonmarket.backend.melon.MelonPostNotFoundException;

@RestControllerAdvice
public class GlobalExceptionHandler {

	// 없는 id를 조회했을 때 → 404
	@ExceptionHandler(MelonPostNotFoundException.class)
	@ResponseStatus(HttpStatus.NOT_FOUND)
	public Map<String, String> handleNotFound(MelonPostNotFoundException e) {
		return Map.of("message", e.getMessage());
	}

	// 입력값 검사에 실패했을 때 → 400, 어느 칸이 왜 틀렸는지 알려줌
	@ExceptionHandler(MethodArgumentNotValidException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public Map<String, Object> handleValidation(MethodArgumentNotValidException e) {
		Map<String, String> errors = new LinkedHashMap<>();
		e.getBindingResult().getFieldErrors()
				.forEach(error -> errors.putIfAbsent(error.getField(), error.getDefaultMessage()));
		return Map.of("message", "입력값을 확인해주세요.", "errors", errors);
	}

}
