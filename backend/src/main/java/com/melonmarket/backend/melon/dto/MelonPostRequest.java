package com.melonmarket.backend.melon.dto;

import com.melonmarket.backend.melon.MelonType;
import com.melonmarket.backend.melon.SaleStatus;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record MelonPostRequest(
		@NotBlank(message = "제목을 입력해주세요.")
		@Size(max = 100, message = "제목은 100자 이하로 입력해주세요.")
		String title,

		@NotBlank(message = "내용을 입력해주세요.")
		String content,

		@NotNull(message = "가격을 입력해주세요.")
		@Min(value = 0, message = "가격은 0원 이상이어야 해요.")
		Integer price,

		@NotBlank(message = "판매자 이름을 입력해주세요.")
		String sellerName,

		@NotBlank(message = "지역을 입력해주세요.")
		String region,

		@NotNull(message = "메론 종류를 선택해주세요.")
		MelonType melonType,

		SaleStatus status) {
}
