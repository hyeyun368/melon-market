package com.melonmarket.backend.melon;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MelonPost {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false, length = 100)
	private String title;

	@Column(nullable = false, columnDefinition = "TEXT")
	private String content;

	@Column(nullable = false)
	private Integer price;

	@Column(nullable = false)
	private String sellerName;

	@Column(nullable = false)
	private String region;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false, length = 20)
	private MelonType melonType;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false, length = 20)
	private SaleStatus status;

	@CreationTimestamp
	@Column(nullable = false, updatable = false)
	private LocalDateTime createdAt;

	@UpdateTimestamp
	@Column(nullable = false)
	private LocalDateTime updatedAt;

	public MelonPost(String title, String content, Integer price, String sellerName,
			String region, MelonType melonType, SaleStatus status) {
		this.title = title;
		this.content = content;
		this.price = price;
		this.sellerName = sellerName;
		this.region = region;
		this.melonType = melonType;
		this.status = (status != null) ? status : SaleStatus.ON_SALE;
	}

	public void update(String title, String content, Integer price, String sellerName,
			String region, MelonType melonType, SaleStatus status) {
		this.title = title;
		this.content = content;
		this.price = price;
		this.sellerName = sellerName;
		this.region = region;
		this.melonType = melonType;
		if (status != null) {
			this.status = status;
		}
	}

}
