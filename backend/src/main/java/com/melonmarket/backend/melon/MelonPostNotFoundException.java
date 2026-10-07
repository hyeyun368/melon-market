package com.melonmarket.backend.melon;

public class MelonPostNotFoundException extends RuntimeException {

	public MelonPostNotFoundException(Long id) {
		super("판매글을 찾을 수 없어요. (id: " + id + ")");
	}

}
