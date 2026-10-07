package com.melonmarket.backend.melon.dto;

import java.time.LocalDateTime;

import com.melonmarket.backend.melon.MelonPost;
import com.melonmarket.backend.melon.MelonType;
import com.melonmarket.backend.melon.SaleStatus;

public record MelonPostResponse(
		Long id,
		String title,
		String content,
		Integer price,
		String sellerName,
		String region,
		MelonType melonType,
		SaleStatus status,
		LocalDateTime createdAt,
		LocalDateTime updatedAt) {

	public static MelonPostResponse from(MelonPost post) {
		return new MelonPostResponse(
				post.getId(),
				post.getTitle(),
				post.getContent(),
				post.getPrice(),
				post.getSellerName(),
				post.getRegion(),
				post.getMelonType(),
				post.getStatus(),
				post.getCreatedAt(),
				post.getUpdatedAt());
	}

}
